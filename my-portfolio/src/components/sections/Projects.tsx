import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { projects } from "../../data/projects";

export const Projects = () => (
  <motion.section
    id="projects"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    className="mx-auto max-w-6xl px-6 py-24"
  >
    <SectionTitle title="精选项目" subtitle="融合 AI、物理与全栈技术的实战经验" />
    <div className="mt-12 grid gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="flex h-full flex-col gap-6">
            <div className="h-48 w-full rounded-lg bg-gradient-to-tr from-indigo-500/30 to-purple-500/20"></div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-text-main">{project.title}</h3>
                  <p className="text-sm text-text-muted">{project.highlight}</p>
                </div>
                <div className="flex items-center gap-3 text-text-muted">
                  <a href="#" aria-label="GitHub" className="transition-colors hover:text-text-main">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" aria-label="Live Demo" className="transition-colors hover:text-text-main">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <p className="text-base text-text-muted">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.section>
);
