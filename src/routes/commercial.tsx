import { createFileRoute } from "@tanstack/react-router";
import { WorkPage } from "@/components/work-page";
import { projectsBySector } from "@/data/projects";
import { site } from "@/data/site";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [{ title: `Commercial — ${site.portfolioTitle}` }],
  }),
  component: CommercialPage,
});

function CommercialPage() {
  return <WorkPage projects={projectsBySector("commercial")} />;
}
