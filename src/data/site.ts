export type SocialId = "behance" | "linkedin" | "instagram" | "email" | "whatsapp";

export type SocialLink = {
  id: SocialId;
  label: string;
  /**
   * Paste a full URL, for example https://www.instagram.com/yourname
   * Email may be mailto:you@domain.com
   * Leave "#" until the address is ready.
   */
  href: string;
};

export const site = {
  name: "Salma Ibrahim Alhabibi",
  portfolioTitle: "Salma Ibrahim Alhabibi Portfolio",
  tagline: "Have a space in mind? Let's bring it to life!",
  /**
   * Address that receives the contact form via the visitor's email app.
   */
  contactEmail: "salmaalhabibi@gmail.com",
  /**
   * In-site résumé page. The About button links here.
   */
  resumeHref: "/resume",
  socials: [
    { id: "behance", label: "Behance", href: "https://www.behance.net/salmaalhabibi" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/salmaalhabibi/" },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/salmaalhabibi/" },
    { id: "email", label: "Email", href: "mailto:salmaalhabibi@gmail.com" },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/201552524163",
    },
  ] as SocialLink[],
};
