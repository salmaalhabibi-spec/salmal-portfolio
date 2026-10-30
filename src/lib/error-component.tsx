import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="page narrow">
      <span className="text-fg" aria-hidden="true">
        <TriangleAlert className="mx-auto size-10" strokeWidth={1.75} />
      </span>
      <h1 className="page-title">Something went wrong</h1>
      <p className="lede">{errorMessage(error)}</p>
    </main>
  );
}
