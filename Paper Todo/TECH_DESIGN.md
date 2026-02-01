
---

# 🛠️ 技术设计文档 (TECH_DESIGN.md)

## 1. 技术栈概览 (Technology Stack)

| 类别 | 技术选型 | 选型理由 |
| --- | --- | --- |
| **框架** | React 18+ | 基于组件的现代化 UI 库。 |
| **语言** | TypeScript | 提供强类型支持（针对 Todo 和 State 接口），减少运行时错误。 |
| **构建工具** | Vite | 极速的热更新 (HMR) 和构建性能。 |
| **样式** | Tailwind CSS | 原子化 CSS，通过 Utility Class 快速构建复古 UI。 |
| **图标** | Lucide React | 风格统一、简洁的 SVG 图标库。 |
| **状态管理** | Zustand | 轻量级状态管理库，样板代码极少，比 Redux 更简单。 |
| **日期处理** | date-fns | 轻量级的日期格式化工具。 |
| **工具库** | clsx, tailwind-merge | 处理动态类名合并 (对于构建可复用的 UI 组件至关重要)。 |
| **持久化** | LocalStorage | 通过 Zustand 中间件实现浏览器端的自动数据保存。 |

---

## 2. 项目目录结构 (Project Structure)

项目遵循基于“功能特性”的模块化结构，保持组件组织清晰。

```text
src/
├── assets/              # 静态资源 (图片, 字体)
├── components/
│   ├── layout/          # 布局组件
│   │   ├── AppLayout.tsx
│   │   └── Header.tsx
│   ├── sidebar/         # 左侧边栏专用组件
│   │   ├── StatsCard.tsx  # 统计面板
│   │   └── FilterCard.tsx # 分类筛选
│   ├── todo/            # 待办事项核心业务组件
│   │   ├── TodoInput.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoItem.tsx
│   └── ui/              # 可复用的“复古风”基础 UI 组件
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Badge.tsx
├── hooks/               # 自定义 React Hooks (如有需要)
├── lib/                 # 工具函数库
│   ├── utils.ts         # cn() 类名合并辅助函数
│   └── constants.ts     # 常量配置 (如分类列表, 优先级枚举)
├── store/               # 状态管理
│   └── useTodoStore.ts  # Zustand Store 定义
├── types/               # TypeScript 类型定义
│   └── index.ts         # 共享接口 (Todo, Filter 等)
├── App.tsx              # 主入口组件
└── main.tsx             # DOM 渲染入口

```

---

## 3. 样式系统与 Tailwind 配置

为了实现 PRD 中定义的 **"复古纸张 (Retro Paper)"** 风格，我们需要扩展 Tailwind 的默认配置。

### 3.1 Tailwind 配置文件 (`tailwind.config.js`)

我们需要定义自定义的纸张颜色和特殊的“硬阴影”效果。

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F5F0", // 全局主背景（米色/纸张色）
        ink: "#1A1A1A",   // 柔和的黑色（用于文字）
      },
      boxShadow: {
        // 标志性的“硬阴影” (无模糊)
        retro: "4px 4px 0px 0px rgba(0, 0, 0, 1)", 
        'retro-sm': "2px 2px 0px 0px rgba(0, 0, 0, 1)",
      },
      borderRadius: {
        base: "4px", // 细微的圆角，避免过于生硬，但保持几何感
      }
    },
  },
  plugins: [],
}

```

### 3.2 通用 UI 模式 (Common Patterns)

* **容器/卡片:** `bg-white border-2 border-black shadow-retro`
* **输入框:** `bg-transparent border-2 border-black focus:outline-none focus:shadow-retro-sm transition-all`
* **按钮:** `bg-black text-white hover:bg-gray-800 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all` (点击时的下压效果)

---

## 4. 状态管理 (Zustand Store)

我们将使用单个 Store `useTodoStore`，并配合 `persist` 中间件来处理 LocalStorage 的同步。

### 4.1 状态定义 (`src/store/useTodoStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, Category, Priority } from '../types';

interface TodoState {
  todos: Todo[];
  filterCategory: Category | 'All';
  searchQuery: string;
  
  // Actions (动作)
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'isCompleted'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilterCategory: (category: Category | 'All') => void;
  setSearchQuery: (query: string) => void;
  
  // Computed (通常在组件中作为 Selector 实现，也可以作为 Helper)
  getStats: () => { total: number; pending: number; completed: number; rate: number };
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      filterCategory: 'All',
      searchQuery: '',

      // 添加任务：自动生成 ID 和 时间戳，添加到数组最前面
      addTodo: (newTodo) => set((state) => ({
        todos: [
          {
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            isCompleted: false,
            ...newTodo,
          },
          ...state.todos, 
        ],
      })),

      // 切换完成状态
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        ),
      })),

      // 删除任务
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      })),

      setFilterCategory: (category) => set({ filterCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // 获取统计数据
      getStats: () => {
        const { todos } = get();
        const total = todos.length;
        const completed = todos.filter(t => t.isCompleted).length;
        return {
            total,
            pending: total - completed,
            completed,
            rate: total === 0 ? 0 : Math.round((completed / total) * 100)
        };
      }
    }),
    {
      name: 'fish-todo-storage', // LocalStorage 的 Key
    }
  )
);

```

---

## 5. 组件逻辑与数据流 (Logic & Data Flow)

### 5.1 侧边栏 (Sidebar - Stats & Filter)

* **StatsCard:** 订阅 `todos` 的变化。每次渲染重新计算统计数据（或使用 `getStats`）。
* **FilterCard:** 读取 Store 中的 `filterCategory`。点击时 dispatch `setFilterCategory`。

### 5.2 任务输入 (Todo Input)

* **状态:** 维护本地状态 `text` (文本), `category` (分类), `priority` (优先级)。
* **动作:** 校验输入不为空 -> 调用 `store.addTodo` -> 重置本地输入框。

### 5.3 任务列表 (Todo List)

* **过滤逻辑 (Filtering):**
列表组件应在渲染映射（map）之前过滤 todos：
```typescript
const visibleTodos = todos.filter(todo => {
    const matchesCategory = filter === 'All' || todo.category === filter;
    // 搜索时不区分大小写
    const matchesSearch = todo.text.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
});

```


* **排序逻辑 (Sorting):**
建议对 `visibleTodos` 进行排序优化用户体验：
1. 未完成 (Pending) 的排在前面。
2. 同状态下，优先级高的排在前面 (High -> Medium -> Low)。



---

## 6. AI Agent 开发步骤建议

1. **脚手架初始化:** 使用 Vite 初始化 React + TypeScript 项目。
2. **依赖安装:** 安装 `zustand`, `date-fns`, `lucide-react`, `clsx`, `tailwind-merge`。
3. **样式配置:** 修改 `tailwind.config.js`，添加复古色板和阴影配置。
4. **类型定义:** 在 `src/types/index.ts` 中定义核心接口。
5. **Store 实现:** 编写 `useTodoStore` 并开启持久化。
6. **组件开发:** 按照 `Layout` -> `Sidebar` -> `Input` -> `List` 的顺序构建 UI。
7. **样式微调:** 调整 CSS 细节以匹配“纸质/复古”美学（如边框粗细、内边距、字体颜色）。