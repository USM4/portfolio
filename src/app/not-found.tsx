import { Button, Container, Label } from "@/components/ui";
import { Shell } from "@/components/Shell";
import { getDict } from "@/i18n";

export default function NotFound() {
  const t = getDict("en");
  return (
    <Shell lang="en">
      <Container className="flex min-h-[70vh] flex-col items-start justify-center pt-24">
        <Label className="text-accent">404</Label>
        <h1 className="mt-4 text-4xl font-medium tracking-tight">{t.notFound.title}</h1>
        <div className="mt-8">
          <Button href="/">{t.notFound.back}</Button>
        </div>
      </Container>
    </Shell>
  );
}
