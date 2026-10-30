import { useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: `Contact — ${site.portfolioTitle}` }],
  }),
  component: ContactPage,
});

function whatsappWithMessage(base: string, text: string) {
  const url = new URL(base);
  url.searchParams.set("text", text.slice(0, 1500));
  return url.toString();
}

function enquiryText(name: string, email: string, phone: string, message: string) {
  const lines = [`Hello, I’m ${name}.`, `Email: ${email}`];
  if (phone) lines.push(`Mobile: ${phone}`);
  lines.push("", message);
  return lines.join("\n");
}

async function emailEnquiry(name: string, email: string, phone: string, message: string) {
  const response = await fetch(`https://formsubmit.co/ajax/${site.contactEmail}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      message,
      _replyto: email,
      _subject: `Portfolio enquiry from ${name}`,
      _template: "table",
      _captcha: "false",
    }),
  });
  if (!response.ok) return false;
  const body = (await response.json()) as { success?: string | boolean };
  return body.success === true || body.success === "true";
}

function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const whatsapp = site.socials.find((item) => item.id === "whatsapp")?.href;

  function readForm() {
    const data = new FormData(formRef.current ?? undefined);
    return {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
    };
  }

  function invalid(name: string, email: string, message: string) {
    if (!name || !email || !message) return "Please fill in your name, email, and message.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    return "";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNote("");
    const { name, email, phone, message, company } = readForm();
    const problem = invalid(name, email, message);
    if (problem) {
      setError(problem);
      return;
    }
    if (company) {
      formRef.current?.reset();
      setNote("Your message was sent. I’ll reply by email.");
      return;
    }

    setSending(true);
    try {
      const sent = await emailEnquiry(name, email, phone, message);
      if (!sent) {
        setError("The message could not be sent. Please try again.");
        return;
      }
      formRef.current?.reset();
      setNote("Your message was sent. I’ll reply by email.");
    } catch {
      setError("The message could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function onWhatsApp() {
    if (!whatsapp) return;
    setError("");
    setNote("");
    const { name, email, phone, message } = readForm();
    const problem = invalid(name, email, message);
    if (problem) {
      setError(problem);
      return;
    }
    window.open(
      whatsappWithMessage(whatsapp, enquiryText(name, email, phone, message)),
      "_blank",
      "noopener,noreferrer",
    );
    setNote("WhatsApp opened with your message. Press send there.");
  }

  return (
    <main className="page">
      <h1 className="page-title">Contact</h1>
      <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>Name *</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your Name..." />
        </label>
        <label className="field">
          <span>Email Address *</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your Email Address..."
          />
        </label>
        <label className="field">
          <span>Mobile Number</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Your Mobile Number..."
          />
        </label>
        <label className="field">
          <span>Message *</span>
          <textarea name="message" required placeholder="Your Message..." />
        </label>
        <label className="hp-field" aria-hidden="true">
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}
        <button className="btn btn-left" type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send message"}
        </button>
        {note ? (
          <p className="form-note" role="status">
            {note}
          </p>
        ) : null}
      </form>
      {whatsapp ? (
        <div className="contact-whatsapp">
          <p>Or send the same message on WhatsApp.</p>
          <button className="btn btn-line" type="button" onClick={onWhatsApp}>
            Message on WhatsApp
          </button>
        </div>
      ) : null}
    </main>
  );
}
