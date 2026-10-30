import { createFileRoute } from "@tanstack/react-router";
import { resume } from "@/data/resume";
import { site } from "@/data/site";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [{ title: `Resume — ${site.portfolioTitle}` }],
  }),
  component: ResumePage,
});

function ResumePage() {
  return (
    <main className="page">
      <article className="resume-sheet">
        <header className="resume-head">
          <h1 className="resume-name">{resume.name}</h1>
          <p className="resume-role">{resume.role}</p>
          {resume.lines.map((line) => (
            <p key={line.tel} className="resume-contact">
              {line.text}
              {" | "}
              <a href={`tel:${line.tel}`}>{line.phone}</a>
            </p>
          ))}
        </header>

        <section>
          <h2>Professional Summary</h2>
          <p>{resume.summary}</p>
        </section>

        <section>
          <h2>Professional Experience</h2>
          {resume.experience.map((job) => (
            <div key={`${job.title}-${job.dates}`} className="resume-job">
              <p className="resume-job-title">
                <strong>{job.title}</strong>
                {" | "}
                {job.place}
                {" | "}
                <em>{job.dates}</em>
              </p>
              {job.bullets.length > 0 ? (
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {resume.education.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>

        <section>
          <h2>Awards & Leadership</h2>
          {resume.awards.map((award) => (
            <p key={award.lead}>
              <strong>{award.lead}</strong>
              {award.text}
            </p>
          ))}
        </section>

        <section>
          <h2>Technical Skills</h2>
          {resume.skills.map((skill) => (
            <p key={skill.label}>
              <strong>{skill.label}:</strong> {skill.text}
            </p>
          ))}
        </section>

        <section>
          <h2>Courses & Languages</h2>
          <p>
            <strong>Courses:</strong> {resume.courses}
          </p>
          <p>
            <strong>Languages:</strong> {resume.languages}
          </p>
        </section>
      </article>
    </main>
  );
}
