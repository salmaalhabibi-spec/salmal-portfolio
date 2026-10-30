import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <main className="page narrow">
      <h1 className="page-title">Page not found</h1>
      <p className="lede">That page isn’t part of this portfolio.</p>
      <p>
        <Link to="/" className="text-link">
          Back to work
        </Link>
      </p>
    </main>
  );
}
