# 技术设计文档 (TECH_DESIGN)

本项目围绕 “Vibe Coding” 主题打造现代化个人作品集网站，旨在提供统一的数据来源、移动优先的布局和玻璃态视觉风格。以下规范为工程实现的唯一技术依据。

## 1. 技术栈与关键依赖
- **构建链路**：Vite + React 18 + TypeScript。
- **样式系统**：Tailwind CSS（禁止内联样式），通过 `tailwind.config.js` 自定义配色与阴影。
- **动画**：Framer Motion 负责所有视口进入动效。
- **滚动锚点**：`react-scroll`。
- **图标**：`lucide-react`，保持统一线性风格。

## 2. 目录结构约定
```
src/
  ├── types/        # 接口定义，唯一数据契约
  ├── data/         # 静态内容，必须实现 types 中的接口
  ├── components/
  │     ├── ui/     # 原子组件（Button、Card、SectionTitle 等）
  │     ├── layout/ # Navbar、Footer 等全局布局
  │     └── sections/# Hero、About、Projects、Contact 等页面区块
  ├── App.tsx       # Section 组装
  ├── main.tsx      # React 入口
  └── index.css     # Tailwind 指令与全局样式
```
拓展目录时必须遵循该层级，确保组件粒度清晰、便于复用。

## 3. 数据模型（Single Source of Truth）
所有渲染数据仅可来自 `src/data/*`，并严格按照 `src/types/index.ts` 接口定义。禁止直接在组件内硬编码描述性文案或列表数据。

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  highlight: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}
```

- **项目数据**：`src/data/projects.ts`，包含描述、技术标签、亮点以及未来可扩展的链接字段。
- **技能数据**：`src/data/skills.ts`，按类别分组，供 About/Skills Section 同步展示。
- 新增字段必须先更新 `types`，再同步数据与使用组件，严禁 `any`。

## 4. 样式系统与视觉语言
- Tailwind 主题扩展：
  - `bg-dark = #0f172a`：全局背景。
  - `primary = #6366f1`：主色/按钮/高亮。
  - `text-main = #f8fafc`、`text-muted = #94a3b8`：标题/正文配色。
- **Glassmorphism**：卡片、导航、页脚使用 `bg-slate-800/50 + border-slate-700 + backdrop-blur`，形成磨砂质感。
- **版式**：标题对齐 `text-text-main`，正文 `text-text-muted`，使用 `max-w-*` 约束行宽，留足内外间距。
- **响应式策略**：移动优先，使用 `md:`、`lg:` 前缀扩展布局。`grid` 配合 `gap-*` 构建项目/技能列表。
- 禁止内联样式与自定义 CSS 文件，除非在 `index.css` 中进行 Tailwind 指令级别配置。

## 5. 组件设计
- **UI 原子**
  - `Button`：支持 `primary` / `outline` 变体，默认圆角 Pill，Hover 需轻微缩放或阴影变化，包含 `focus-visible` 样式。
  - `Card`：玻璃卡片容器，含基础投影与 Hover 交互，可接收额外类名组合。
  - `SectionTitle`：统一标题/副标题栈，居中排版。
- **Layout**
  - `Navbar`：固定顶部、玻璃背景，左 Logo（或名字）+ 右导航链接，使用 `react-scroll` 滚动；移动端需实现汉堡菜单（扩展时保持相同结构）。
  - `Footer`：版权文案 + 社交图标列表，图标来自 `lucide-react`。
- **Sections**
  - `Hero`：居中头像占位、Tagline、主标题、副标题与 CTA 按钮，按钮指向项目与联系区。
  - `About`：左侧文案（挑战杯、跨学科背景），右侧技能卡片栅格，数据来源 `skillCategories`。
  - `Projects`：遍历 `projects` 数据生成卡片，包含标题、亮点、描述、标签及 GitHub/Live 链接入口（Icon 按钮需 `aria-label`）。
  - `Contact`：说明文案 + CTA（mailto），可扩展社交入口。

新增组件时需：
1. 若属于区块，放入 `sections/` 并复用 `SectionTitle`。
2. 提供 hover/焦点反馈。
3. 若需要数据，先定义接口与数据文件。

## 6. 动画与交互
- Section 统一动效：`initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`，并设置 `viewport={{ once: true, amount: 0.2 }}`。
- 卡片 Hover：`hover:-translate-y-1` + 阴影增强。
- CTA 按钮：`hover:scale-105`，键盘焦点使用 `focus-visible:outline`。
- `react-scroll` Links 需设置 `offset` 抵消固定导航高度和滚动动画时长。

## 7. 可访问性
- 图标链接设置 `aria-label`；外部链接使用 `target="_blank" rel="noreferrer"`。
- 按钮/链接具备键盘焦点状态，确保 `focus-visible` 样式显著。
- 语义化元素优先（Section/Heading），便于屏幕阅读器导航。

## 8. 构建与部署
- `npm run dev`：本地开发（Vite HMR）。
- `npm run build`：先 `tsc -b` 再 `vite build`，确保类型安全。
- `npm run preview`：构建产物本地验证。
- 部署平台：Vercel，部署前确认 `dist/` 输出可直接托管。

所有未来的新增/修改必须先核对本文件；若设计方向有调整，应同步更新本技术文档以保持单一事实来源。
