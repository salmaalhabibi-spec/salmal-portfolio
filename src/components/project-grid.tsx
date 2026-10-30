import { Link } from "@tanstack/react-router";
import type { Project } from "@/data/projects";

export function ProjectGrid({
  projects,
  empty,
  className,
}: {
  projects: Project[];
  empty?: string;
  className?: string;
}) {
  if (projects.length === 0) {
    return <p className="empty-note">{empty ?? "No projects in this collection yet."}</p>;
  }

  return (
    <ul className={className ? `work-grid ${className}` : "work-grid"}>
      {projects.map((project) => (
        <li key={project.slug}>
          <Link to="/projects/$slug" params={{ slug: project.slug }} className="project-card">
            <div className="card-media">
              <img
                src={project.cover.src}
                width={project.cover.width}
                height={project.cover.height}
                alt={project.cover.alt}
                decoding="async"
              />
              <div className="card-overlay">
                <p className="card-overlay-title">{project.title}</p>
                <p className="card-overlay-cat">{project.category}</p>
                <span className="card-overlay-cta">View project</span>
              </div>
            </div>
            <div className="card-caption">
              <h2>{project.title}</h2>
              <p>{project.year}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
