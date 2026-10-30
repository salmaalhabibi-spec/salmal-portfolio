import { createFileRoute, Link } from "@tanstack/react-router";
import { about } from "@/data/about";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: `About — ${site.portfolioTitle}` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="page">
      <h1 className="page-title">About</h1>
      <div className="about-layout">
        <img
          className="about-portrait"
          src={about.portrait.src}
          width={about.portrait.width}
          height={about.portrait.height}
          alt={about.portrait.alt}
          decoding="async"
        />
        <div className="about-copy">
          <h2>{about.summaryHeading}</h2>
          <p>{about.summary}</p>
          <h2>{about.educationHeading}</h2>
          {about.education.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <div className="resume-wrap">
        <Link to="/resume" className="btn">
          My Resume
        </Link>
      </div>
    </main>
  );
}
