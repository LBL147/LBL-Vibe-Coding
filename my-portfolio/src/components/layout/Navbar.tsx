import { useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { id: "about", label: "关于" },
  { id: "skills", label: "技能" },
  { id: "projects", label: "项目" },
  { id: "contact", label: "联系" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => setIsMenuOpen((prev) => !prev);
  const handleNavigate = () => setIsMenuOpen(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-bg-dark/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="hero"
          smooth
          duration={500}
          className="cursor-pointer text-lg font-semibold text-text-main"
        >
          Vibe Coding
        </Link>
        <div className="hidden items-center gap-6 text-sm text-text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.id}
              smooth
              duration={500}
              offset={-80}
              className="cursor-pointer transition-colors hover:text-text-main"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={handleToggle}
          aria-label="切换导航菜单"
          aria-expanded={isMenuOpen}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-text-main transition hover:border-primary/50 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-white/5 bg-bg-dark/95 px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3 text-sm text-text-muted">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.id}
                smooth
                duration={500}
                offset={-60}
                onClick={handleNavigate}
                className="rounded-lg px-4 py-2 text-base font-medium transition hover:bg-white/5 hover:text-text-main"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
