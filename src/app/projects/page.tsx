import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  { id: 1, title: "Project A", description: "A concise description of Project A." },
  { id: 2, title: "Project B", description: "A concise description of Project B." },
  { id: 3, title: "Project C", description: "A concise description of Project C." },
];

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="text-foreground/80">A selection of recent work.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm">View</Button>
              <Button size="sm" variant="secondary">Source</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
