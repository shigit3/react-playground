# React 19 + TypeScript 学习路径

> 从 Vue3 + TS 转 React 的完整技术栈学习指南

## 技术栈

- React 19 + TypeScript
- Vite / Rspack
- React Router v6 / TanStack Router
- Zustand
- TanStack Query v5
- React Hook Form + Zod
- Tailwind CSS + shadcn/ui

---

## 📚 如何使用这个学习路径

### 📁 文件结构说明

```
react-unit-learning/
├── LEARNING_LOG.md              # 全局学习日志（记录所有单元的学习过程）
├── src/
│   └── unit-XX-xxx/
│       ├── SUMMARY.md           # 单元知识总结（学完后复习用）
│       ├── stepX-xxx.tsx        # 渐进式练习主文件（带标签切换）
│       ├── stepX-example.tsx    # 示例代码（供参考）
│       ├── stepX-practice.tsx   # 练习代码（你写的）
│       ├── final-practice.tsx   # 最终综合练习
│       └── components/          # 组件文件
└── learning-path.md             # 👈 你现在看的文件（学习路径总览）
```

**💡 文件组织最佳实践：**

随着学习深入，单个步骤的代码会越来越复杂。为了避免示例代码和练习代码混在一起导致混乱，推荐使用以下结构：

- `stepX-xxx.tsx` - 主文件，包含知识点说明和标签切换
- `stepX-example.tsx` - 示例代码，供学习参考
- `stepX-practice.tsx` - 练习代码，你自己编写

这样的好处：

- ✅ 示例和练习完全分离，不会互相干扰
- ✅ 可以通过标签快速切换查看
- ✅ 练习时专注于自己的代码
- ✅ 代码清晰，易于维护和复习

### 🎯 使用场景

**开始新单元时：**

1. 📖 看本文件（learning-path.md）了解单元目标和内容
2. 💬 告诉 AI："开始学习单元 X"
3. 👨‍💻 跟着 AI 做渐进式练习（stepX-xxx.tsx）
4. 🎯 完成最终综合练习（final-practice.tsx）

**学完单元后：**

1. 📝 查看 `src/unit-XX-xxx/SUMMARY.md` 复习知识点
2. ✍️ 在 `LEARNING_LOG.md` 记录学习心得和问题
3. ✅ 更新本文件中的学习进度

**复习时：**

1. 📚 直接看 `SUMMARY.md` 快速回顾知识点
2. 📖 看 `LEARNING_LOG.md` 回忆学习过程和遇到的问题
3. 💻 重新运行练习代码加深印象

### 学习方法：渐进式学习（边学边练）

每个单元采用**小步快跑**的方式：

**第 1 步：学习一个小知识点**

- AI 讲解核心概念（5-10 分钟）
- 对比 Vue 的写法，理解差异
- 看简单示例代码

**第 2 步：立即动手练习**

- 完成一个小练习（5-10 分钟）
- 只练习刚学的知识点
- 及时反馈，不积累错误

**第 3 步：检查和反馈**

- 告诉 AI "完成了"
- AI 检查代码，给出反馈
- 解答疑问，纠正错误

**第 4 步：继续下一个知识点**

- 重复步骤 1-3
- 逐步掌握整个单元

**第 5 步：最终综合练习**

- 完成一个综合项目
- 整合所有知识点
- 检验学习成果

**第 6 步：总结和记录**

- 查看 SUMMARY.md 复习知识点
- 在 LEARNING_LOG.md 记录学习心得
- 回到本文件勾选进度

### 为什么这样学？

✅ **及时反馈** - 不会积累错误理解  
✅ **成就感强** - 每个小练习都能完成  
✅ **记忆深刻** - 边学边练，印象更深  
✅ **符合认知** - 小步快跑，循序渐进

### 学习节奏建议

**快速上手（2周）：**

- 单元 1-6 + 单元 12 + 单元 14
- 目标：能参与项目开发

**标准掌握（6周）：**

- 单元 1-14
- 目标：能独立开发功能模块

**深度精通（10周）：**

- 全部单元 1-19
- 目标：能做架构设计和性能优化

### 随时可以

- ❓ 问概念："为什么 React 要不可变更新？"
- 📝 要示例："给我一个 useEffect 的例子"
- 🆚 求对比："这个在 Vue 里怎么写？"
- 🐛 调 bug："这段代码报错了"
- ✅ 要反馈："这样写对吗？"

---

## 📈 学习进度

- [x] 单元 1：JSX 和组件基础 ✅ (2026-03-18)
- [x] 单元 2：useState 状态管理 ✅ (2026-03-22)
- [x] 单元 3：事件处理和表单 ✅ (2026-03-25)
- [x] 单元 4：useEffect 副作用 ✅ (2026-03-26)
- [x] 单元 5：useRef 和 DOM 操作 ✅ (2026-04-01)
- [ ] 单元 6：TypeScript 集成
- [ ] 单元 7：useMemo 和 useCallback
- [ ] 单元 8：组件进阶模式
- [ ] 单元 9：自定义 Hooks
- [ ] 单元 10：useReducer 复杂状态
- [ ] 单元 11：Context 和 useContext
- [ ] 单元 12：React Router v6
- [ ] 单元 13：Zustand 状态管理
- [ ] 单元 14：TanStack Query v5
- [ ] 单元 15：React Hook Form + Zod
- [ ] 单元 16：Tailwind CSS
- [ ] 单元 17：shadcn/ui 组件库
- [ ] 单元 18：React 19 新特性深入
- [ ] 单元 19：项目实战 - 开发者工具平台

---

## 学习单元

### 单元 1：JSX 和组件基础

**目标：** 能写出基本的 React 组件

- JSX 语法规则（className、htmlFor、style 对象）
- 函数组件定义
- Props 传递和接收
- 组件组合（children）
- 条件渲染（三元运算符、&&）
- 列表渲染（map + key）

**练习：** 做一个 GitHub 仓库卡片列表，展示仓库名、star 数、语言标签

**⚠️ 常见错误：**

- 使用 `class` 而不是 `className`
- 忘记在 `map` 里加 `key` 属性
- JSX 里写注释用 `//` 而不是 `{/* */}`
- `style` 属性传字符串而不是对象

**✅ 自检清单：**

- [ ] 能解释 JSX 和 HTML 的 3 个主要区别吗？
- [ ] 能独立写一个接收 Props 的组件吗？
- [ ] 理解为什么列表渲染必须加 key 吗？
- [ ] 能用三元运算符和 && 做条件渲染吗？

---

### 单元 2：useState 状态管理

**目标：** 掌握组件内状态

- useState 基本用法
- 状态更新（不可变更新）
- 函数式更新（prevState => newState）
- 多个状态的管理
- 对象和数组状态的更新

**练习：** 实现一个购物车应用，支持添加商品、修改数量、删除商品、计算总价

**⚠️ 常见错误：**

- 直接修改状态：`count = count + 1` ❌
- 直接修改对象/数组：`state.name = 'new'` ❌
- 在循环或条件语句中调用 useState
- 忘记状态更新是异步的，连续调用 setState 可能不符合预期

**✅ 自检清单：**

- [ ] 理解为什么不能直接修改状态吗？
- [ ] 能用函数式更新处理基于旧值的更新吗？
- [ ] 会更新对象和数组状态（不可变方式）吗？
- [ ] 理解状态更新触发重新渲染的机制吗？

---

### 单元 3：事件处理和表单

**目标：** 处理用户交互

- 事件绑定（onClick、onChange）
- 事件对象和类型
- 受控组件 vs 非受控组件（基础）
- 表单提交
- 阻止默认行为

**练习：** 做一个实时搜索框，输入关键词过滤 GitHub 仓库列表

**⚠️ 常见错误：**

- 事件处理写成 `onClick={handleClick()}` 而不是 `onClick={handleClick}`
- 忘记 `e.preventDefault()` 阻止表单默认提交
- 受控组件忘记绑定 `value` 和 `onChange`
- 在高频渲染场景（大列表、memo 组件）里直接写箭头函数可能影响性能

**✅ 自检清单：**

- [ ] 理解受控组件和非受控组件的区别吗？
- [ ] 能正确处理表单提交事件吗？
- [ ] 理解事件处理函数的两种写法（直接传 vs 箭头函数）吗？
- [ ] 能对比 Vue 的 v-model 和 React 的受控组件吗？

---

### 单元 4：useEffect 副作用

**目标：** 处理副作用和生命周期

- useEffect 基本用法
- 依赖数组的作用
- 清理函数（cleanup）
- 常见场景（API 请求、订阅、定时器）
- 与 Vue 生命周期的对比

**练习：** 调用 GitHub API 获取热门仓库，实现自动刷新和本地缓存；或实现一个简单的倒计时器

**⚠️ 常见错误：**

- 忘记写依赖数组，导致无限循环
- 依赖数组里漏掉变量，导致闭包陷阱
- 忘记清理副作用（定时器、订阅、事件监听）
- 在 useEffect 里直接写 async 函数（应该在内部定义）

**✅ 自检清单：**

- [ ] 理解依赖数组的三种情况（无、空数组、有依赖）吗？
- [ ] 能写出正确的清理函数吗？
- [ ] 能对比 Vue 的 onMounted/onUnmounted 和 useEffect 吗？
- [ ] 理解为什么 useEffect 不能直接是 async 函数吗？

---

### 单元 5：useRef 和 DOM 操作

**目标：** 访问 DOM 和持久化值

- useRef 获取 DOM 引用
- useRef 存储不触发渲染的值
- forwardRef 转发引用
- useImperativeHandle 暴露方法

**练习：** 实现一个番茄钟计时器（综合运用 useState + useRef），支持开始、暂停、重置、工作/休息切换

**⚠️ 常见错误：**

- 在渲染期间读取或写入 `ref.current`（应该在事件处理或 useEffect 里）
- 混淆 useRef 和 useState 的使用场景
- 忘记 ref 变化不会触发重新渲染
- forwardRef 的类型定义写错

**✅ 自检清单：**

- [ ] 理解 useRef 的两个用途（DOM 引用 + 持久化值）吗？
- [ ] 知道什么时候用 useRef 而不是 useState 吗？
- [ ] 能对比 Vue 的 ref 和 React 的 useRef 吗？
- [ ] 理解 forwardRef 的使用场景吗？

---

### 单元 6：TypeScript 集成

**目标：** 类型安全的 React 开发（从这里开始用 TS 写代码）

- 组件 Props 类型定义（interface vs type）
- 事件类型（ChangeEvent、MouseEvent、FormEvent）
- useState 泛型
- useRef 泛型
- children 类型（ReactNode、ReactElement）
- 泛型组件
- 自定义 Hook 类型

**练习：** 将之前的番茄钟和搜索框改写成 TypeScript 版本

**⚠️ 常见错误：**

- Props 类型用 `type` 还是 `interface` 纠结（都可以，团队统一即可）
- 事件类型写错：`onChange: (e: Event)` ❌ 应该是 `ChangeEvent<HTMLInputElement>`
- useState 不写泛型导致类型推断错误
- children 类型用 `JSX.Element` 而不是 `ReactNode`

**✅ 自检清单：**

- [ ] 能正确定义组件 Props 类型吗？
- [ ] 能写出常见事件的类型吗（onClick、onChange、onSubmit）？
- [ ] 理解 ReactNode、ReactElement、JSX.Element 的区别吗？
- [ ] 能给 useState 和 useRef 正确添加泛型吗？

---

### 单元 7：useMemo 和 useCallback

**目标：** 性能优化

- useMemo 缓存计算结果
- useCallback 缓存函数
- React.memo 组件缓存
- 何时需要优化
- TypeScript 下的类型推断

**练习：** 优化大数据表格（1000+ 行），实现高性能过滤和排序（用 TS）

**💡 练习提示：**

- 使用简单的 table 或 div 渲染即可，重点是优化逻辑
- 用 useMemo 缓存过滤和排序结果
- 用 useCallback 缓存事件处理函数
- 用 React.memo 优化行组件

**⚠️ 常见错误：**

- 过度优化：到处用 useMemo/useCallback（大部分时候不需要）
- 依赖数组写错，导致缓存失效
- 用 useMemo 缓存组件而不是用 React.memo
- 不理解引用相等性，导致优化无效

**✅ 自检清单：**

- [ ] 理解什么时候需要用 useMemo/useCallback 吗？
- [ ] 能对比 Vue 的 computed 和 React 的 useMemo 吗？
- [ ] 理解 React.memo 的作用和使用场景吗？
- [ ] 知道过度优化的坏处吗？

---

### 单元 8：组件进阶模式

**目标：** 掌握组件设计模式

- 受控组件 vs 非受控组件（深入理解）
- 组件组合模式（Compound Components）
- Render Props 模式
- HOC 高阶组件（了解即可，现代开发少用）
- 组件懒加载（lazy + Suspense）
- ErrorBoundary 错误边界
- Fragment 和 Portal（createPortal）

**练习：** 做一个命令面板（类似 VS Code 的 Cmd+K），支持搜索和快捷键

**💡 练习提示：**

- 用 Portal 渲染模态框（挂载到 document.body）
- 用 useEffect + addEventListener 监听键盘事件（Cmd/Ctrl + K）
- 用 lazy + Suspense 懒加载命令列表
- 搜索功能复用之前学过的过滤逻辑

**⚠️ 常见错误：**

- lazy 导入的组件没有用 Suspense 包裹
- Portal 的容器元素不存在
- ErrorBoundary 只能捕获子组件错误，不能捕获自身错误
- HOC 忘记转发 ref

**✅ 自检清单：**

- [ ] 理解 lazy + Suspense 的工作原理吗？
- [ ] 知道 ErrorBoundary 的使用场景和限制吗？
- [ ] 理解 Portal 的作用（模态框、提示框）吗？
- [ ] 能对比 Vue 的 Teleport 和 React 的 Portal 吗？

---

### 单元 9：自定义 Hooks

**目标：** 逻辑复用

- 自定义 Hook 规则
- 提取通用逻辑
- Hook 组合
- 常见自定义 Hook 模式
- TypeScript 下的 Hook 类型定义

**练习：** 封装 useKeyPress（快捷键）、useDebounce、useLocalStorage（本地存储），全部用 TS

**💡 练习提示：**

- useKeyPress：用 useEffect + addEventListener 监听键盘
- useDebounce：用 useState + useEffect + setTimeout 实现防抖
- useLocalStorage：用 useState + useEffect 同步本地存储，处理 JSON 序列化

**⚠️ 常见错误：**

- 自定义 Hook 名字不以 `use` 开头
- 在自定义 Hook 里违反 Hook 规则（条件调用、循环调用）
- 忘记返回清理函数
- TypeScript 类型定义不够精确

**✅ 自检清单：**

- [ ] 理解自定义 Hook 的命名规则和原因吗？
- [ ] 能识别哪些逻辑适合提取成自定义 Hook 吗？
- [ ] 能对比 Vue 的 composables 和 React 的自定义 Hooks 吗？
- [ ] 能给自定义 Hook 写正确的 TS 类型吗？

---

### 单元 10：useReducer 复杂状态

**目标：** 管理复杂状态逻辑

- useReducer 基本用法
- reducer 函数编写（TS 类型定义）
- dispatch 派发 action
- 与 useState 的选择
- 结合 Context 使用

**练习：** 实现一个待办事项应用，支持撤销/重做、分类管理、批量操作（用 TS）

**💡 练习提示：**

- 用 useReducer 管理待办列表和历史记录栈
- action 类型：ADD、DELETE、TOGGLE、UNDO、REDO、BATCH_DELETE
- 用 TypeScript 联合类型定义 action
- 历史记录用数组实现（past、present、future）

**⚠️ 常见错误：**

- reducer 函数里直接修改 state（应该返回新对象）
- action 类型没有用 TypeScript 联合类型定义
- 过度使用 useReducer（简单状态用 useState 就够了）
- 忘记 reducer 必须是纯函数

**✅ 自检清单：**

- [ ] 理解什么时候用 useReducer 而不是 useState 吗？
- [ ] 能写出类型安全的 reducer 和 action 吗？
- [ ] 理解 reducer 必须是纯函数的原因吗？
- [ ] 能对比 Vuex/Pinia 的 actions 和 useReducer 吗？

---

### 单元 11：Context 和 useContext

**目标：** 跨组件状态共享

- createContext 创建上下文
- Provider 提供数据
- useContext 消费数据
- Context 的性能问题
- 结合 useReducer 使用

**练习：** 实现多语言切换（i18n）+ 主题切换，支持系统偏好检测

**💡 练习提示：**

- 创建 ThemeContext 和 I18nContext
- 用 window.matchMedia('(prefers-color-scheme: dark)') 检测系统主题
- 用 useLocalStorage（单元 9 封装的）持久化用户选择
- 用 useMemo 优化 Context value，避免不必要的重新渲染

**⚠️ 常见错误：**

- 在 Provider 外使用 useContext 会返回默认值（如果默认值是 undefined 可能导致错误）
- Context value 每次渲染都创建新对象，导致所有消费者重新渲染
- 过度使用 Context 导致性能问题
- 忘记给 Context 设置默认值或类型

**✅ 自检清单：**

- [ ] 理解 Context 的使用场景（全局状态、主题、i18n）吗？
- [ ] 知道 Context 的性能问题和优化方法吗？
- [ ] 能对比 Vue 的 provide/inject 和 React 的 Context 吗？
- [ ] 理解什么时候用 Context，什么时候用状态管理库吗？

---

### 单元 12：React Router v6

**目标：** 单页应用路由

- 路由配置（BrowserRouter、Routes、Route）
- 路由跳转（Link、useNavigate、Navigate 组件）
- 路由参数（useParams、useSearchParams）
- 嵌套路由和 Outlet
- 懒加载（lazy + Suspense）
- 编程式导航和路由状态（useLocation）
- Data Router 进阶（createBrowserRouter、loader、action）

**练习：** 做一个笔记应用，支持 Markdown 实时预览、路由切换笔记、侧边栏导航

**💡 练习提示：**

- 使用 react-markdown 库渲染 Markdown（`npm install react-markdown`）
- 路由结构：`/` 首页、`/notes/:id` 笔记详情、`/notes/new` 新建笔记
- 用 useParams 获取笔记 ID，用 useSearchParams 处理搜索
- 用 lazy + Suspense 懒加载笔记编辑器组件
- 进阶：用 createBrowserRouter + loader 预加载笔记数据

**备选：** TanStack Router（类型安全更好，但学习曲线稍陡）

**💡 关于 loader/action：**

- 注意：`<Routes>` 里的声明式路由不支持 loader/action
- loader/action 需要使用 createBrowserRouter 等 Data Router API
- 基础学习先掌握声明式路由，进阶时再学 Data Router

**⚠️ 常见错误：**

- 忘记用 `<BrowserRouter>` 包裹根组件
- 嵌套路由忘记在父组件里放 `<Outlet />`
- 路径写错：`/user/:id` vs `/user:id`
- useNavigate 在组件外调用（应该在组件内或事件处理函数里）

**✅ 自检清单：**

- [ ] 能配置基本的路由和嵌套路由吗？
- [ ] 理解 Link 和 useNavigate 的使用场景吗？
- [ ] 能获取和使用路由参数（params、search）吗？
- [ ] 能对比 Vue Router 和 React Router 的差异吗？

---

### 单元 13：Zustand 状态管理

**目标：** 全局状态管理

- 创建 store
- 使用 store（useStore）
- 状态更新（set、get）
- 选择器优化
- 中间件（persist、devtools）
- TypeScript 类型定义

**练习：** 实现通知系统（Toast），支持队列、自动消失、持久化

**⚠️ 常见错误：**

- 在 store 外直接修改状态
- 选择器没有优化，导致不必要的重新渲染
- TypeScript 类型定义不完整
- 忘记使用 persist 中间件的正确配置

**✅ 自检清单：**

- [ ] 能创建和使用 Zustand store 吗？
- [ ] 理解选择器优化的重要性吗？
- [ ] 能配置 persist 和 devtools 中间件吗？
- [ ] 能对比 Pinia 和 Zustand 的差异吗？

---

### 单元 14：TanStack Query v5

**目标：** 服务端状态管理

- QueryClient 配置
- useQuery 数据获取
- useMutation 数据修改
- 缓存策略（staleTime、gcTime）
- 自动重新请求
- 乐观更新
- 无限滚动（useInfiniteQuery）

**练习：** 做一个 GitHub 仓库浏览器，支持搜索、收藏、无限滚动

**💡 练习提示：**

- 使用 GitHub API：`https://api.github.com/search/repositories?q={keyword}`
- 用 useQuery 获取仓库列表，queryKey: ['repos', keyword]
- 用 useMutation 处理收藏操作（本地存储）
- 用 useInfiniteQuery 实现无限滚动（page 参数）
- 收藏功能结合 Zustand 或 useLocalStorage

**⚠️ 常见错误：**

- 忘记在根组件配置 QueryClientProvider
- queryKey 写得不够具体，导致缓存混乱
- 不理解 staleTime 和 gcTime 的区别（v5 已将 cacheTime 改名为 gcTime）
- useMutation 后忘记 invalidate 相关查询

**✅ 自检清单：**

- [ ] 理解客户端状态和服务端状态的区别吗？
- [ ] 能配置合理的缓存策略吗？
- [ ] 理解乐观更新的使用场景吗？
- [ ] 知道 TanStack Query 比手写 fetch 的优势吗？

---

### 单元 15：React Hook Form + Zod

**目标：** 高性能表单处理

- useForm 基本用法
- register 注册字段
- handleSubmit 提交处理
- 错误处理和显示
- Zod schema 验证
- 与 UI 组件集成
- 动态表单和字段数组

**练习：** 做一个用户注册表单，支持多步骤、动态字段、实时验证

**💡 练习提示：**

- 第一步：基本信息（用户名、邮箱、密码）
- 第二步：个人资料（头像、简介、技能标签 - 用 useFieldArray）
- 第三步：确认信息
- 用 Zod 定义验证规则（邮箱格式、密码强度、必填项）
- 条件显示：根据用户类型显示不同字段

**⚠️ 常见错误：**

- 受控组件和 React Hook Form 混用导致冲突
- Zod schema 定义不完整
- 错误信息没有正确显示
- 字段数组（useFieldArray）的 key 管理错误

**✅ 自检清单：**

- [ ] 理解 React Hook Form 的性能优势吗？
- [ ] 能用 Zod 定义复杂的表单验证规则吗？
- [ ] 能处理动态表单和字段数组吗？
- [ ] 能对比 Vue 的 v-model 和 React Hook Form 的方式吗？

---

### 单元 16：Tailwind CSS

**目标：** 快速样式开发

- 安装和配置
- 常用工具类
- 响应式设计（sm、md、lg）
- 伪类（hover、focus、active）
- 自定义配置（colors、spacing）
- 与 React 组件结合

**练习：** 做一个 Bento Grid 布局（类似 Apple 官网），响应式卡片网格

**⚠️ 常见错误：**

- 动态类名拼接：`className={'text-' + color}` ❌（Tailwind 无法识别）
- 忘记配置 content 路径，导致样式被 purge
- 响应式断点理解错误（移动优先原则）
- 自定义配置后忘记重启开发服务器

**✅ 自检清单：**

- [ ] 能用 Tailwind 快速实现常见布局吗？
- [ ] 理解移动优先的响应式设计吗？
- [ ] 知道如何处理动态类名吗（clsx/cn 工具）？
- [ ] 能自定义 Tailwind 配置吗？

---

### 单元 17：shadcn/ui 组件库

**目标：** 使用现代组件库

- 安装和配置
- 按需添加组件
- 组件定制
- 常用组件（Button、Input、Dialog、Select、Table）
- 表单组件集成

**练习：** 用 shadcn/ui 做一个任务管理看板，包含卡片、表格、对话框、下拉菜单

**💡 练习提示：**

- 安装 shadcn/ui：`npx shadcn@latest init`
- 添加组件：`npx shadcn@latest add button card table dialog select`
- 用 Card 组件展示任务卡片
- 用 Table 组件展示任务列表
- 用 Dialog 组件实现新建/编辑任务
- 用 Select 组件实现状态筛选
- 结合 React Hook Form 处理表单

**⚠️ 常见错误：**

- 忘记安装依赖（shadcn 组件可能依赖其他包）
- 表单组件和 React Hook Form 集成方式错误
- 主题配置不生效

**💡 关于定制：**

- shadcn/ui 的设计理念是"copy-paste, not install"
- 组件源码在 components/ui 里，官方鼓励你直接修改
- 这是它和传统组件库（如 Ant Design）的最大区别

**✅ 自检清单：**

- [ ] 理解 shadcn/ui 和传统组件库的区别吗？
- [ ] 能按需添加和定制组件吗？
- [ ] 能将 shadcn/ui 组件集成到表单中吗？
- [ ] 知道如何配置主题和样式变量吗？

---

### 单元 18：React 19 新特性深入

**目标：** 掌握最新特性

- useActionState（表单 Actions）
- useFormStatus（表单状态）
- useOptimistic（乐观更新）
- use() hook（异步处理）
- Suspense 和 ErrorBoundary 深入
- useTransition（并发特性）
- useDeferredValue（延迟更新）

**练习：** 做一个聊天界面，支持消息发送、乐观更新、打字机效果

**💡 练习提示：**

- 用 useOptimistic 实现消息乐观更新（发送前立即显示）
- 用 useTransition 处理消息发送，避免阻塞输入
- 打字机效果：用 useState + useEffect + setInterval 逐字显示
- 模拟 API 延迟：`await new Promise(resolve => setTimeout(resolve, 1000))`
- 可选：用 ReadableStream 模拟流式响应（参考 MDN 文档）

**⚠️ 常见错误：**

- 误以为 use() hook 不能在条件语句中使用（实际上它是特例，可以在条件和循环中调用）
- useOptimistic 的回滚逻辑写错
- useTransition 和 useDeferredValue 使用场景混淆
- 过度使用新特性（不是所有场景都需要）

**✅ 自检清单：**

- [ ] 理解 use() hook 和传统 hooks 的区别吗？
- [ ] 知道什么时候用 useOptimistic 吗？
- [ ] 理解 useTransition 的使用场景吗？
- [ ] 能判断哪些新特性是必学，哪些是了解即可吗？

---

### 单元 19：项目实战 - 开发者工具平台

**目标：** 整合所有知识

**项目描述：** 做一个开发者工具集合平台（类似 DevToys）

**核心功能：**

1. JSON 格式化/压缩工具
2. Base64 编码/解码
3. 正则表达式测试器（实时匹配高亮）
4. Markdown 编辑器（实时预览）
5. 代码片段管理（支持搜索、标签、收藏）
6. URL 编码/解码工具
7. 颜色选择器和转换工具
8. 时间戳转换器

**技术整合：**

- Vite + React 19 + TypeScript
- React Router v6（工具切换）
- Zustand（全局配置、历史记录）
- React Hook Form + Zod（表单验证）
- Tailwind CSS + shadcn/ui（UI）
- react-markdown（Markdown 渲染）

**💡 实现提示：**

- 代码高亮：使用 `<pre><code>` + CSS 即可，或用 prism-react-renderer
- 正则测试：用 JavaScript 原生 RegExp + match 方法
- 颜色转换：用简单的算法转换 HEX/RGB/HSL
- 不需要复杂的代码编辑器，textarea 即可

**进阶功能：**

- 暗黑模式切换（复用单元 11 的主题系统）
- 工具使用历史记录（Zustand + persist）
- 数据本地持久化（localStorage）
- 快捷键支持（复用单元 8 的命令面板）
- 工具收藏和自定义排序

**⚠️ 常见错误：**

- 项目结构混乱，没有合理的文件组织
- 状态管理混乱（该用 Zustand 的用了 useState）
- 没有做代码分割，首屏加载慢
- 忘记处理边界情况和错误状态
- 组件拆分不合理，单个组件过大

**✅ 自检清单：**

- [ ] 能独立搭建项目架构吗？
- [ ] 能合理选择状态管理方案吗（本地 vs 全局 vs 服务端）？
- [ ] 能做性能优化（懒加载、代码分割）吗？
- [ ] 代码质量达到生产级别了吗？
- [ ] 能独立解决开发中遇到的问题吗？

---

## 学习补充

- 每次学习尽量至少完成一个完整单元
- 单元 1-11 是基础，建议优先扎实掌握
- 单元 12-18 偏工具链和新特性，可以边学边查文档
- 单元 19 是综合实战，用来检验整体学习成果

## 附录：补充知识点

以下是实际开发中会用到的补充内容，可以在需要时查阅：

**性能优化：**

- React DevTools Profiler 使用
- 虚拟列表（react-window / react-virtuoso）
- 代码分割策略
- 图片懒加载

**测试：**

- Vitest + React Testing Library
- 组件测试
- Hook 测试
- E2E 测试（Playwright）

**工程化：**

- ESLint + Prettier 配置
- Husky + lint-staged
- 环境变量管理
- 构建优化

**常用工具库：**

- date-fns / dayjs（日期处理）
- axios / ky（HTTP 请求）
- immer（不可变数据）
- lodash-es（工具函数）

## 附录：与 Vue 的思维转换

**⚠️ 重要提示：** 以下对照仅为"思路类比"，帮助理解概念，并非严格的一一对应关系。

| Vue 3            | React 19                                  | 说明                                                                |
| ---------------- | ----------------------------------------- | ------------------------------------------------------------------- |
| `ref()`          | `useState()` / `useRef()`                 | Vue 的 ref 既可以是响应式值，也可以是 DOM 引用；React 分为两个 Hook |
| `computed()`     | `useMemo()`                               | 计算属性 vs 记忆化值，概念较接近                                    |
| `watch()`        | `useEffect()`                             | 思路类似但不等价，watch 有更多选项（immediate、deep、flush）        |
| `onMounted()`    | `useEffect(() => {}, [])`                 | 组件挂载后执行                                                      |
| `onUnmounted()`  | `useEffect(() => { return cleanup }, [])` | 组件卸载前执行清理                                                  |
| `provide/inject` | `Context + useContext`                    | 跨组件传递数据                                                      |
| `v-if`           | `{condition && <Component />}`            | 条件渲染                                                            |
| `v-for`          | `{array.map(item => <Component />)}`      | 列表渲染                                                            |
| `v-model`        | `value + onChange`                        | 双向绑定 vs 受控组件                                                |
| `v-bind:prop`    | `prop={value}`                            | 单个属性绑定                                                        |
| `v-bind="obj"`   | `{...props}`                              | 对象展开绑定                                                        |
| `composables`    | `custom hooks`                            | 逻辑复用                                                            |
| `Teleport`       | `createPortal`                            | 传送门渲染                                                          |

**核心差异：**

- Vue 的响应式系统是自动追踪依赖的，React 需要手动声明依赖数组
- Vue 的 ref/reactive 可以直接修改（`.value`），React 必须通过 setState 不可变更新
- Vue 的 watch 可以精确监听某个值的变化，React 的 useEffect 是"副作用执行时机"的概念
- Vue 的模板语法是声明式的，React 的 JSX 是 JavaScript 表达式

## 附录：推荐资源

- React 官方文档：https://react.dev
- TanStack Query：https://tanstack.com/query
- Zustand：https://zustand-demo.pmnd.rs
- React Hook Form：https://react-hook-form.com
- shadcn/ui：https://ui.shadcn.com
- Tailwind CSS：https://tailwindcss.com

学完这套路径，你就能独立开发 React 项目了。
