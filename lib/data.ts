export const APP_NAME = "Alex Morgan";
export const APP_TAGLINE = "Creative Developer";
export const APP_EMAIL = "hello@alexmorgan.dev";

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const primaryCTA = {
  label: "View My Work",
  href: "#projects",
};

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "Github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "Linkedin",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: "Twitter",
  },
];