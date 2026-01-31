import { Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/",
    Icon: Github,
  },
  {
    id: "mail",
    label: "Email",
    href: "mailto:hello@vibecoding.dev",
    Icon: Mail,
  },
];

export const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="border-t border-white/5 bg-bg-dark/80"
  >
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-sm text-text-muted md:flex-row md:text-left">
      <p>© {new Date().getFullYear()} Vibe Coding. 保留所有权利。</p>
      <div className="flex items-center gap-4">
        {socials.map(({ id, label, href, Icon }) => (
          <a
            key={id}
            href={href}
            aria-label={label}
            className="text-text-muted transition-colors hover:text-text-main"
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  </motion.footer>
);
