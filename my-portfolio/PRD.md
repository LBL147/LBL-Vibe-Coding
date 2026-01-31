# 个人作品集网站 PRD (Product Requirement Document)

## 1. 项目概述
构建一个现代、极简、响应式的个人作品集网站，旨在展示计算机专业学生的个人技术栈、项目经验及联系方式。
- **核心理念**：Vibe Coding，利用 AI 辅助快速迭代，保持代码整洁与高性能。
- **技术栈**：React + TypeScript + Vite + Tailwind CSS。
- **部署平台**：Vercel。

## 2. 页面结构与核心功能

### 2.1 导航栏 (Navbar)
- **布局**：固定在顶部，背景半透明磨砂效果 (Glassmorphism)。
- **内容**：左侧为 Logo/名字，右侧为导航链接（关于、技能、项目、联系）。
- **移动端**：汉堡菜单折叠。

### 2.2 英雄区 (Hero Section)
- **布局**：全屏居中展示。
- **内容**：
    - **头像**：圆形高画质头像，带微动效（如悬停光晕）。
    - **大标题**：你好，我是 [你的名字]。
    - **副标题/Tagline**：计算机专业学生 | 全栈开发者 | AI 应用探索者。
    - **CTA 按钮**：“查看我的项目” (滚动锚点) 和 “下载简历”。

### 2.3 关于我 (About Me)
- **布局**：左文右图或居中文字。
- **文案方向**：
    - 介绍自己是一名热衷于技术创新的计算机专业学生。
    - 提及正在参与“挑战杯”竞赛，关注科技创新与未来产业方向。
    - 强调具备跨学科（物理+计算机）思维与全栈开发能力。

### 2.4 技能展示 (Tech Stack)
采用 Grid 布局或标签云展示，分为以下几类：
- **前端核心**：React, TypeScript, Vue.js, Tailwind CSS
- **后端/语言**：Java, Python
- **工具/其他**：Git, Vite, Vercel, AI Prompting
*(注：虽然本项目用 React，但履历中包含 Java 和 Vue 能体现全栈基础)*

### 2.5 项目展示 (Projects) - **核心板块**
使用卡片式设计 (Card Layout)，需包含截图、标题、描述、技术标签、Demo/Repo 链接。
*建议展示以下 3-4 个精选项目（基于过往开发经历）：*

#### 项目 A：智能气象雷达系统 (挑战杯参赛作品)
- **描述**：通过计算机技术与物理学跨学科融合，开发的科技创新类项目。专注于气象数据分析与未来产业应用。
- **标签**：Python, Data Analysis, Physics, Research
- **亮点**：挑战杯“科技创新和未来产业”赛道作品。

#### 项目 B：Elm-Project 全栈外卖应用
- **描述**：一个完整的前后端分离 Web 应用。前端实现复杂交互，后端处理业务逻辑与数据存储。
- **标签**：Vue.js, Java, Jetty, Database
- **亮点**：完整的前后端对接与部署经验。

#### 项目 C：AI 智能天气查询工具
- **描述**：基于 AI 提示词工程构建的网页应用，提供自然语言交互的天气查询体验。
- **标签**：AI Integration, Web, Prompt Engineering
- **亮点**：探索 AI 与 Web 开发的结合。

#### 项目 D：Java 学生综合管理系统
- **描述**：基于 Java 开发的教务管理工具，支持学生档案管理、成绩评定及文件批处理功能。
- **标签**：Java, Automation, File I/O
- **亮点**：解决了实际的作业互评与文件重命名痛点。

### 2.6 联系方式 (Contact)
- **布局**：极简页脚。
- **内容**：
    - 邮箱链接 (mailto)
    - GitHub 图标链接
    - 简单的版权声明

## 3. 设计规范 (Design System)

### 3.1 配色方案 (Dark Mode 优先)
- **背景色**：深灰/黑 (`bg-slate-900`)
- **主色调**：靛蓝或紫罗兰渐变 (`from-indigo-500 to-purple-500`)，用于按钮和高亮文字。
- **文本色**：灰白 (`text-slate-200`) 以减少眼部疲劳。

### 3.2 交互体验
- **滚动动画**：使用 `framer-motion` 或 AOS 实现元素进入视口时的上浮淡入效果。
- **响应式**：
    - Mobile (< 768px)：单列布局。
    - Desktop (> 768px)：多列 Grid 布局。

## 4. 开发计划 (Action Plan)
1. **初始化**：`npm create vite@latest portfolio -- --template react-ts`
2. **样式库**：安装 Tailwind CSS 并配置 `tailwind.config.js`。
3. **组件拆分**：Header, Hero, About, Skills, Projects, Footer。
4. **内容填充**：将上述项目描述填入数据文件。
5. **部署**：Push 到 GitHub 并连接 Vercel 自动部署。