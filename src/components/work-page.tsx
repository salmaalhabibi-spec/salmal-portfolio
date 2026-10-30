import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { ProjectGrid } from "@/components/project-grid";
import type { Project } from "@/data/projects";

export function WorkPage({
  projects,
  empty,
}: {
  projects: Project[];
  empty?: string;
}) {
  const shown = projects;
  return (
    <main>
      <section className="hero">
        <h1>Interior Architect & 3D Visualizer.</h1>
        <p className="hero-lede">A collection of spaces, concepts, and design explorations.</p>
        <div className="hero-actions">
          <Link to="/residential" className="hero-btn">
            Residential
          </Link>
          <Link to="/commercial" className="hero-btn">
            Commercial
          </Link>
        </div>
        <a className="hero-down" href="#work">
          <ChevronDown aria-hidden="true" />
          <span className="sr-only">Scroll to projects</span>
        </a>
      </section>
      <div className="page page-work" id="work">
        <h2 className="sr-only">Projects</h2>
        <ProjectGrid projects={shown} empty={empty} />
      </div>
    </main>
  );
}
