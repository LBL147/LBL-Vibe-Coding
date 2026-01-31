import { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend-core",
    title: "前端核心",
    description: "前端核心：React, TypeScript, Vue.js, Tailwind CSS",
    skills: [
      { id: "react", name: "React" },
      { id: "typescript", name: "TypeScript" },
      { id: "vue", name: "Vue.js" },
      { id: "tailwind", name: "Tailwind CSS" },
    ],
  },
  {
    id: "backend-language",
    title: "后端 / 语言",
    description: "后端/语言：Java, Python",
    skills: [
      { id: "java", name: "Java" },
      { id: "python", name: "Python" },
    ],
  },
  {
    id: "tools",
    title: "工具 / 其他",
    description: "工具/其他：Git, Vite, Vercel, AI Prompting",
    skills: [
      { id: "git", name: "Git" },
      { id: "vite", name: "Vite" },
      { id: "vercel", name: "Vercel" },
      { id: "ai-prompting", name: "AI Prompting" },
    ],
  },
];
