import { Button, Container, Label } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <Label className="text-accent">404</Label>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">This page doesn&apos;t exist.</h1>
      <div className="mt-8">
        <Button href="/">Back home</Button>
      </div>
    </Container>
  );
}
