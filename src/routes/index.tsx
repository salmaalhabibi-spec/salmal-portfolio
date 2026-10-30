import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/components/work-page";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: site.portfolioTitle }],
  }),
  component: Home,
});

function Home() {
  return <WorkPage projects={projects} />;
}
