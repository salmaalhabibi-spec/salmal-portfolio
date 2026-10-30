import { Instagram, Mail } from "lucide-react";
import { site, type SocialId } from "@/data/site";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" />
      <path d="M9 10a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

function SocialGlyph({ id }: { id: SocialId }) {
  if (id === "behance") return <span className="social-word" aria-hidden="true">Bē</span>;
  if (id === "linkedin") return <span className="social-word social-in" aria-hidden="true">in</span>;
  if (id === "instagram") return <Instagram aria-hidden="true" strokeWidth={1.6} />;
  if (id === "email") return <Mail aria-hidden="true" strokeWidth={1.6} />;
  return <WhatsAppIcon />;
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`socials ${className}`.trim()}>
      {site.socials.map((item) => {
        const external = item.href.startsWith("http");
        return (
          <li key={item.id}>
            <a
              href={item.href}
              aria-label={item.label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <SocialGlyph id={item.id} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
