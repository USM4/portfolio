"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Float, Grid, RoundedBox, Stars } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { pulse, readStage } from "@/lib/stage";

const LIME = "#c6ff3d";
const GLOW = new THREE.Color(LIME).multiplyScalar(2.2);
const WHITE_GLOW = new THREE.Color("#ffffff").multiplyScalar(1.6);
const BODY = { color: "#121217", metalness: 0.55, roughness: 0.35 } as const;

/** Station centers along the pipeline (storefront → cloud). */
const P: [number, number, number][] = [
  [-14, 0, 0],
  [-7, 0.6, -3.5],
  [0, 0, 0],
  [7, -0.6, -3.5],
  [14, 0, 0],
];

const live = { stage: -1 };

/* ───────────────────────── camera rig ───────────────────────── */

function keyframe(s: number, mobile: boolean): [THREE.Vector3, THREE.Vector3] {
  if (s <= -1)
    return mobile
      ? [new THREE.Vector3(0, 10, 34), new THREE.Vector3(0, -3, -2)]
      : [new THREE.Vector3(-9, 7.5, 20), new THREE.Vector3(-5, -1.5, -2)];
  if (s >= 5)
    return mobile
      ? [new THREE.Vector3(0, 22, 30), new THREE.Vector3(0, -2, -2)]
      : [new THREE.Vector3(0, 16, 25), new THREE.Vector3(0, -2, -2)];
  const [x, y, z] = P[s];
  return mobile
    ? [new THREE.Vector3(x, y + 1.6, z + 10), new THREE.Vector3(x, y - 1.6, z)]
    : [new THREE.Vector3(x - 2.4, y + 1.5, z + 9.2), new THREE.Vector3(x - 3.0, y, z)];
}

function CameraRig() {
  const { camera, size, pointer } = useThree();
  const look = useRef(new THREE.Vector3(-5, -1.5, -2));
  const target = useRef({ pos: new THREE.Vector3(), look: new THREE.Vector3() });

  useFrame((_, dt) => {
    const mobile = size.width < 768;
    const s = readStage();
    live.stage = s;
    const a = Math.floor(s),
      b = Math.ceil(s),
      f = s - a;
    const [pa, la] = keyframe(a, mobile);
    const [pb, lb] = keyframe(b, mobile);
    const { pos, look: tl } = target.current;
    pos.copy(pa).lerp(pb, f);
    tl.copy(la).lerp(lb, f);
    pos.x += pointer.x * 0.8;
    pos.y += pointer.y * 0.4;
    const k = 1 - Math.exp(-dt * 2.6);
    camera.position.lerp(pos, k);
    look.current.lerp(tl, k);
    camera.lookAt(look.current);
  });
  return null;
}

/** 0..1 how "active" a station is (camera parked on it). */
const activeOf = (i: number) => Math.max(0, 1 - Math.abs(live.stage - i) * 1.4);

/* ───────────────────────── stations ───────────────────────── */

function Storefront() {
  const g = useRef<THREE.Group>(null);
  useFrame((st) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(st.clock.elapsedTime * 0.3) * 0.25 + 0.25;
    g.current.scale.setScalar(1 + activeOf(0) * 0.08);
  });
  return (
    <group ref={g} position={P[0]}>
      {/* browser frame */}
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[4.6, 3.4, 0.08]} />
        <meshStandardMaterial {...BODY} />
        <Edges color={LIME} threshold={15} />
      </mesh>
      <mesh position={[-1.7, 1.45, -0.34]}>
        <boxGeometry args={[0.9, 0.12, 0.02]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      {[0, 1, 2].map((c) =>
        [0, 1].map((r) => (
          <Float key={`${c}${r}`} speed={1.4} floatIntensity={0.35} rotationIntensity={0.15}>
            <group position={[-1.4 + c * 1.4, 0.55 - r * 1.45, 0.15 + (c + r) * 0.06]}>
              <RoundedBox args={[1.1, 1.25, 0.1]} radius={0.05}>
                <meshStandardMaterial color="#1a1a21" metalness={0.4} roughness={0.4} />
                <Edges color="#3a3a46" />
              </RoundedBox>
              <mesh position={[0, 0.15, 0.06]}>
                <planeGeometry args={[0.85, 0.6]} />
                <meshStandardMaterial color="#24242d" />
              </mesh>
              <mesh position={[-0.2, -0.38, 0.06]}>
                <planeGeometry args={[0.45, 0.07]} />
                <meshBasicMaterial color={(c + r) % 2 ? WHITE_GLOW : GLOW} toneMapped={false} />
              </mesh>
            </group>
          </Float>
        )),
      )}
    </group>
  );
}

function Checkout() {
  const ring = useRef<THREE.Mesh>(null);
  const card = useRef<THREE.Group>(null);
  const coins = useRef<THREE.Group>(null);
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    if (ring.current) ring.current.rotation.z = t * 0.4;
    if (card.current) {
      card.current.rotation.y = Math.sin(t * 0.6) * 0.6;
      card.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
    if (coins.current) {
      coins.current.rotation.z = t * 0.9;
      coins.current.scale.setScalar(1 + activeOf(1) * 0.1);
    }
  });
  return (
    <group position={P[1]}>
      <mesh ref={ring}>
        <torusGeometry args={[1.9, 0.035, 16, 120]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, 0.5]}>
        <torusGeometry args={[2.3, 0.01, 8, 120, Math.PI * 1.3]} />
        <meshBasicMaterial color="#5a5a66" />
      </mesh>
      <group ref={card}>
        <RoundedBox args={[2.4, 1.5, 0.06]} radius={0.08}>
          <meshStandardMaterial color="#17171d" metalness={0.8} roughness={0.25} />
          <Edges color={LIME} />
        </RoundedBox>
        <mesh position={[-0.75, 0.2, 0.04]}>
          <boxGeometry args={[0.38, 0.28, 0.02]} />
          <meshBasicMaterial color={GLOW} toneMapped={false} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.75 + i * 0.5, -0.35, 0.04]}>
            <planeGeometry args={[0.38, 0.07]} />
            <meshBasicMaterial color="#6b6b78" />
          </mesh>
        ))}
      </group>
      <group ref={coins}>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 1.9, Math.sin(a) * 1.9, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshBasicMaterial color={WHITE_GLOW} toneMapped={false} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function Backend() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    if (outer.current) outer.current.rotation.set(t * 0.12, t * 0.18, 0);
    if (inner.current) inner.current.rotation.set(-t * 0.25, -t * 0.2, 0);
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08 + activeOf(2) * 0.25);
  });
  return (
    <group position={P[2]}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.3, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={LIME} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.45, 2]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Data() {
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const g = useRef<THREE.Group>(null);
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    rings.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + 0.75 * Math.max(0, Math.sin(t * 2 - i * 0.9));
    });
    if (g.current) {
      g.current.rotation.y = t * 0.2;
      g.current.scale.setScalar(1 + activeOf(3) * 0.08);
    }
  });
  return (
    <group ref={g} position={P[3]}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[0, -0.85 + i * 0.85, 0]}>
          <mesh>
            <cylinderGeometry args={[1.3, 1.3, 0.6, 48]} />
            <meshStandardMaterial {...BODY} />
            <Edges color="#4a4a56" threshold={30} />
          </mesh>
          <mesh
            ref={(m) => {
              rings.current[i] = m;
            }}
            position={[0, 0.31, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[1.31, 0.025, 8, 96]} />
            <meshBasicMaterial color={GLOW} toneMapped={false} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Cloud() {
  const pods = useRef<(THREE.Mesh | null)[]>([]);
  const N = 5;
  useFrame((st) => {
    const t = st.clock.elapsedTime;
    const a = activeOf(4);
    pods.current.forEach((m, i) => {
      if (!m) return;
      const x = i % N,
        z = Math.floor(i / N);
      m.position.y = 0.3 + Math.max(0, Math.sin(t * 2.2 - (x + z) * 0.6)) * (0.35 + a * 0.4);
    });
  });
  return (
    <group position={P[4]} rotation={[0.15, -0.5, 0]}>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.7, 2.7, 0.1, 6]} />
        <meshStandardMaterial {...BODY} />
        <Edges color={LIME} />
      </mesh>
      {Array.from({ length: N * N }).map((_, i) => {
        const x = (i % N) - (N - 1) / 2,
          z = Math.floor(i / N) - (N - 1) / 2;
        const lit = (i * 7) % 5 === 0;
        return (
          <mesh
            key={i}
            ref={(m) => {
              pods.current[i] = m;
            }}
            position={[x * 0.72, 0.3, z * 0.72]}
          >
            <boxGeometry args={[0.48, 0.48, 0.48]} />
            {lit ? (
              <meshBasicMaterial color={GLOW} toneMapped={false} />
            ) : (
              <meshStandardMaterial color="#1b1b22" metalness={0.5} roughness={0.4} />
            )}
            {!lit && <Edges color="#55556a" />}
          </mesh>
        );
      })}
    </group>
  );
}

/* ───────────────────────── traffic ───────────────────────── */

function Traffic() {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [[-20, -0.5, 3], ...P, [20, -0.5, 3]].map((p) => new THREE.Vector3(...(p as [number, number, number]))),
        false,
        "catmullrom",
        0.4,
      ),
    [],
  );
  const COUNT = 46;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const offsets = useMemo(() => Array.from({ length: COUNT }, (_, i) => i / COUNT + ((i * 37) % 11) * 0.001), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const progress = useRef(0);

  useFrame((_, dt) => {
    pulse.boost = Math.max(0, pulse.boost - dt * 0.35);
    progress.current += dt * 0.018 * (1 + pulse.boost * 6);
    if (!mesh.current) return;
    for (let i = 0; i < COUNT; i++) {
      const u = (offsets[i] + progress.current) % 1;
      curve.getPointAt(u, dummy.position);
      dummy.scale.setScalar(i % 6 === 0 ? 1.6 : 1);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 400, 0.018, 8, false]} />
        <meshBasicMaterial color={LIME} transparent opacity={0.28} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={GLOW} toneMapped={false} />
      </instancedMesh>
    </>
  );
}

/* ───────────────────────── canvas ───────────────────────── */

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [-9, 7.5, 20], near: 0.1, far: 200 }}
      onCreated={({ gl }) => gl.setClearColor("#07070a")}
    >
      <fog attach="fog" args={["#07070a", 16, 58]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 6]} intensity={1.4} />
      <pointLight position={[0, 4, 4]} color={LIME} intensity={30} distance={20} />
      <Stars radius={90} depth={50} count={2500} factor={3.2} saturation={0} fade speed={0.6} />
      <Grid
        position={[0, -3.2, 0]}
        infiniteGrid
        cellSize={1}
        sectionSize={5}
        cellThickness={0.5}
        sectionThickness={0.9}
        cellColor="#16161c"
        sectionColor="#2b3a12"
        fadeDistance={60}
        fadeStrength={1.6}
      />
      <Traffic />
      <Storefront />
      <Checkout />
      <Backend />
      <Data />
      <Cloud />
      <CameraRig />
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.6} luminanceSmoothing={0.2} />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
