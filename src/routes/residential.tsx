import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/components/work-page";
import { projectsBySector } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/residential")({
  head: () => ({
    meta: [{ title: `Residential — ${site.portfolioTitle}` }],
  }),
  component: ResidentialPage,
});

function ResidentialPage() {
  return (
    <WorkPage
      projects={projectsBySector("residential")}
      empty="Residential projects will appear here."
    />
  );
}
