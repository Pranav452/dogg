import { Button } from "@/components/ui/button";

// Make the component a Server Component by default
export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <Button>Click me</Button>
    </main>
  );
}
