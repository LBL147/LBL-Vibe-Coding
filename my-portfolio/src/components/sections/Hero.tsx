import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export const Hero = () => (
  <motion.section
    id="hero"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex min-h-screen items-center justify-center px-6 pt-32"
  >
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
      <div className="relative mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1 shadow-2xl">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-bg-dark text-4xl font-semibold text-text-main">
          VC
        </div>
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-text-muted">Vibe Coding</p>
      <h1 className="mt-4 text-4xl font-bold leading-tight text-text-main md:text-6xl">
        你好，我是 <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">AI 驱动的全栈开发者</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-text-muted">
        计算机专业学生 | 全栈开发者 | AI 应用探索者。我专注于通过跨学科思维构建高性能的创新产品。
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="#projects">查看我的项目</Button>
        <Button href="#contact" variant="outline">
          联系我
        </Button>
      </div>
    </div>
  </motion.section>
);
