import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProject, projects, type ProjectBlock } from "@/data/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectGrid } from "@/components/project-grid";
import { site } from "@/data/site";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.headline ?? loaderData.title} — ${site.portfolioTitle}`
          : site.portfolioTitle,
      },
    ],
  }),
  component: ProjectPage,
});

function Block({ block }: { block: ProjectBlock }) {
  if (block.kind === "list") {
    return (
      <section>
        <h2>{block.title}</h2>
        <ul className="objective-list">
          {block.items.map((item) => (
            <li key={item.label}>
              <strong>{item.label}:</strong> {item.text}
            </li>
          ))}
        </ul>
      </section>
    );
  }
  if (block.kind === "line") {
    return (
      <section>
        <h2>{block.title}</h2>
        <p className="block-line">{block.text}</p>
      </section>
    );
  }
  return (
    <section>
      <h2>{block.title}</h2>
      <p className="block-body">{block.body}</p>
    </section>
  );
}

function ProjectPage() {
  const project = Route.useLoaderData();
  const related = projects.filter((item) => item.slug !== project.slug);
  return (
    <main className="page page-project">
      <header className="project-intro">
        <h1>{project.headline ?? project.title}</h1>
        {project.question ? <p className="project-question">{project.question}</p> : null}
        {project.overview ? <p className="project-overview">{project.overview}</p> : null}
        {project.meta && project.meta.length > 0 ? (
          <ul className="project-meta">
            {project.meta.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        {project.blocks && project.blocks.length > 0 ? (
          <div className="project-blocks">
            {project.blocks.map((block) => (
              <Block key={block.title} block={block} />
            ))}
          </div>
        ) : null}
      </header>
      <ProjectGallery groups={project.gallery} />
      {related.length > 0 ? (
        <section className="related" aria-labelledby="related-heading">
          <h2 id="related-heading">You may also like</h2>
          <ProjectGrid projects={related} className="work-grid-3" />
        </section>
      ) : null}
    </main>
  );
}
