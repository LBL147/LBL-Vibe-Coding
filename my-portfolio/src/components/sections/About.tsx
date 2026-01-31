import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { Card } from "../ui/Card";
import { skillCategories } from "../../data/skills";

export const About = () => (
  <motion.section
    id="about"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    className="mx-auto max-w-6xl px-6 py-24"
  >
    <SectionTitle title="关于我" subtitle="跨学科思维驱动的全栈探索者" />
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr,1.1fr]" id="skills">
      <div className="space-y-6 text-lg text-text-muted">
        <p>
          我是一名热衷技术创新的计算机专业学生，正在参与“挑战杯”科技创新和未来产业赛道。喜欢把物理与计算机结合，探索更具前瞻性的解决方案。
        </p>
        <p>
          通过扎实的全栈能力，我能够在前端交互、后端逻辑以及 AI Prompt 工程之间自由切换，让想法在最短时间落地。
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <Card key={category.id} className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-text-main">{category.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{category.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-slate-600 px-3 py-1 text-sm text-text-main"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  </motion.section>
);
