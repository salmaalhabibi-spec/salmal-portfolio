import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronUp, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { SocialLinks } from "@/components/social-links";

const NAV = [
  { to: "/", label: "Work", exact: true },
  { to: "/about", label: "About", exact: false },
  { to: "/contact", label: "Contact", exact: false },
] as const;

function usePath() {
  return useRouterState({ select: (state) => state.location.pathname });
}

function isActive(path: string, to: string, exact: boolean) {
  if (
    to === "/" &&
    (path === "/" ||
      path.startsWith("/projects") ||
      path === "/residential" ||
      path === "/commercial")
  ) {
    return true;
  }
  if (exact) return path === to;
  return path === to || path.startsWith(`${to}/`);
}

export function SiteShell({ children }: { children: ReactNode }) {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let frame = 0;
    const apply = () => {
      frame = 0;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const work = document.getElementById("work");
      if (reduce || !work) {
        el.style.opacity = "1";
        el.style.pointerEvents = "";
        return;
      }
      const headerHeight = el.getBoundingClientRect().height;
      const workTop = work.getBoundingClientRect().top;
      const start = headerHeight + 72;
      const end = headerHeight * 0.35;
      const fade = Math.min(1, Math.max(0, (start - workTop) / (start - end)));
      const opacity = 1 - fade;
      el.style.opacity = opacity.toFixed(3);
      el.style.pointerEvents = opacity < 0.15 ? "none" : "";
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [path]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = menuRef.current;
    const previous = document.activeElement as HTMLElement | null;
    const items = () =>
      Array.from(root?.querySelectorAll<HTMLElement>("a, button") ?? []);
    items()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = items();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);

  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="site-header" ref={headerRef}>
        <div className="header-side header-start">
          <nav className="nav-desktop" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link${isActive(path, item.to, item.exact) ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <Link to="/" className="brand">
          <span>{site.name}</span>
          <span className="brand-tail">Portfolio</span>
        </Link>
        <div className="header-side header-end">
          <SocialLinks className="socials-desktop" />
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </header>
      {open ? (
        <div
          id="site-menu"
          ref={menuRef}
          className="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="menu-top">
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
              <X aria-hidden="true" />
            </button>
          </div>
          <nav className="menu-nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={isActive(path, item.to, item.exact) ? "is-active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <SocialLinks className="menu-socials" />
        </div>
      ) : null}
      <div id="content">{children}</div>
      <footer className="site-footer">
        <SocialLinks className="footer-socials" />
        <p className="tagline">{site.tagline}</p>
      </footer>
      <button
        type="button"
        className="to-top"
        onClick={() => {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }}
      >
        <ChevronUp aria-hidden="true" />
        <span className="sr-only">Back to top</span>
      </button>
    </>
  );
}
