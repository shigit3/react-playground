# React 学习日志

记录每个单元的学习过程和心得

---

## 单元 1：JSX 和组件基础

**学习日期：** 2026-03-18  
**学习时长：** 约 2 小时  
**学习方式：** 渐进式学习（边学边练）

### 学习过程

#### 知识点 1：JSX 基础语法

- 学习了 JSX 与 HTML 的 3 个主要区别
- 练习：创建个人卡片（step1-jsx-basics.tsx）
- 掌握：className、style 对象、标签闭合

#### 知识点 2：函数组件和 Props

- 学习了组件定义和 Props 传递
- 练习：创建 RepoCard 组件（step2-props.tsx）
- 掌握：TypeScript 接口定义、Props 解构
- 亮点：主动拆分了组件文件

#### 知识点 3：列表渲染

- 学习了 map() 和 key 的使用
- 练习：用 map() 渲染仓库列表（step3-list.tsx）
- 遇到问题：箭头函数 `{}` 和 `()` 的区别
- 解决：理解了必须用 `()` 或写 `return`

#### 知识点 4：条件渲染

- 学习了三元运算符和 && 运算符
- 练习：添加条件渲染逻辑（step4-conditional.tsx）
- 掌握：根据条件显示不同内容

#### 知识点 5：组件组合（children）

- 学习了 children prop 的使用
- 练习：创建 Container 和 Section 组件（step5-children.tsx）
- 遇到问题：忘记写 return
- 理解：children 可以是任何 ReactNode

#### 最终练习：GitHub 仓库浏览器

- 创建了 6+ 个组件
- 实现了搜索、筛选、排序功能
- 使用了所有单元 1 的知识点
- 改进：用 children 优化了 Toolbar 组件

### 遇到的问题和解决

1. **箭头函数返回值问题**
   - 问题：`map(repo => { <Component /> })` 返回 undefined
   - 原因：用了 `{}` 但没写 `return`
   - 解决：改用 `()` 或加 `return`

2. **组件函数忘记 return**
   - 问题：组件不显示内容
   - 原因：函数没有返回 JSX
   - 解决：所有组件函数必须 return JSX

3. **ReactNode 导入方式**
   - 问题：TypeScript 报错
   - 原因：配置要求用 type 导入
   - 解决：`import { type ReactNode } from "react"`

### 学习心得

**做得好的地方：**

- 主动拆分组件文件，代码结构清晰
- TypeScript 类型定义完整
- 善于提问，理解概念深入
- 能够举一反三，思考不同实现方式

**需要改进的地方：**

- 过滤逻辑要用 `includes()` 而不是 `===`
- 注意箭头函数的返回值写法

**与 Vue 的对比感受：**

- React 更接近原生 JavaScript
- JSX 比 template 更灵活，但需要记住一些规则
- 组件组合（children）比 Vue 的 slot 更直观

### 掌握程度

**95%** - 完全可以进入下一单元

### 下一步计划

学习单元 2：useState 状态管理，让组件"动起来"

---

## 单元 2：useState 状态管理

**学习日期：** 2026-03-21  
**学习时长：** 约 2.5 小时  
**学习方式：** 渐进式学习（边学边练）

### 学习过程

#### 知识点 1：useState 基础用法

- 学习了 useState 的基本使用和状态更新机制
- 练习：计数器、开关、输入框（step1-basic-useState.tsx）
- 掌握：状态定义、状态更新、不能直接修改状态
- 练习任务：点赞器 ✅

#### 知识点 2：函数式更新和异步性

- 学习了为什么需要函数式更新
- 练习：连续更新问题、闭包陷阱、定时器场景（step2-functional-update.tsx）
- 遇到问题：理解闭包陷阱的原理
- 解决：函数式更新 `prev => prev + 1` 总是基于最新值
- 练习任务：连击计数器 ✅

#### 知识点 3：对象和数组状态的更新

- 学习了不可变更新原则
- 练习：对象更新、嵌套对象、数组增删改（step3-object-array-state.tsx）
- 掌握：展开运算符、map/filter/reduce
- 理解：React 通过引用比较检测变化
- 练习任务：购物车（简化版）✅

#### 最终练习：购物车应用

- 实现了完整的购物车功能
- 使用了所有单元 2 的知识点
- 遇到问题：在 setState 回调中用了外层的 state 而不是 prev
- 解决：永远在回调函数中使用参数 prev，不用外层 state
- 改进：添加了商品状态显示、小计计算

### 遇到的问题和解决

1. **闭包陷阱（定时器场景）**
   - 问题：定时器中 `setCount(count + 1)` 只会基于初始值
   - 原因：闭包捕获了初始渲染时的 count 值
   - 解决：使用函数式更新 `setCount(prev => prev + 1)`

2. **直接修改对象/数组**
   - 问题：`user.name = '李四'` 或 `arr.push(4)` 后界面不更新
   - 原因：引用没变，React 检测不到变化
   - 解决：必须创建新对象/数组

3. **setState 回调中用外层 state**
   - 问题：`setCart(prev => { const item = cart.find(...) })`
   - 原因：用了闭包中的 cart，不是最新的 prev
   - 解决：永远使用参数 prev

4. **数组中对象的更新**
   - 问题：忘记创建新对象，直接 `item.quantity++`
   - 原因：不理解嵌套更新也需要不可变
   - 解决：`{ ...item, quantity: item.quantity + 1 }`

### 学习心得

**做得好的地方：**

- 理解了不可变更新的原理（引用比较）
- 能正确使用函数式更新避免闭包陷阱
- 熟练使用数组方法（map、filter、reduce）
- 注意边界情况和用户体验

**需要改进的地方：**

- 在 setState 回调中要用 prev，不要用外层 state
- 嵌套更新时要记得逐层创建新引用

**与 Vue 的对比感受：**

- Vue 可以直接修改，React 必须不可变更新
- Vue 的响应式更方便，React 的不可变更新更明确
- React 需要更多手动操作，但也更可控

### 掌握程度

**90%** - 完全可以进入下一单元

### 下一步计划

学习单元 3：事件处理和表单

---

## 单元 3：事件处理和表单

**学习日期：** 2026-03-25  
**学习时长：** 约 2 小时  
**学习方式：** 渐进式学习（边学边练）

### 学习过程

#### 最终练习：GitHub 仓库搜索过滤器

- 实现了实时搜索、语言筛选、排序功能
- 使用了受控组件、事件处理、表单处理
- 遇到问题：过滤逻辑冗余、单选框状态管理错误、排序修改原数组
- 解决：优化了代码结构，修正了错误写法

### 遇到的问题和解决

1. **过滤逻辑冗余**
   - 问题：用三元运算符写了两遍搜索过滤逻辑
   - 原因：没有想到可以链式调用
   - 解决：改用链式 filter，逻辑更清晰

   ```tsx
   // ❌ 错误：重复逻辑
   const filtered =
     language === "all"
       ? data.filter((item) => item.name.includes(keyword))
       : data
           .filter((item) => item.name.includes(keyword))
           .filter((item) => item.language === language);

   // ✅ 正确：链式调用
   const filtered = data
     .filter((item) => item.name.includes(keyword))
     .filter((item) => language === "all" || item.language === language);
   ```

2. **单选框状态管理错误**
   - 问题：为每个单选框维护了单独的状态（nameRadio、starsRadio）
   - 原因：不理解单选框只需要一个状态
   - 解决：只用一个 sortBy 状态，checked 通过比较值来确定

   ```tsx
   // ❌ 错误：状态冗余
   const [sortBy, setSortBy] = useState("name");
   const [nameRadio, setNameRadio] = useState(true);
   const [starsRadio, setStarsRadio] = useState(false);

   // ✅ 正确：只需要一个状态
   const [sortBy, setSortBy] = useState("name");

   <input
     type="radio"
     checked={sortBy === "name"}
     onChange={(e) => setSortBy(e.target.value)}
   />;
   ```

3. **排序修改原数组**
   - 问题：直接对 filteredRepos 调用 sort()
   - 原因：忘记 sort() 会修改原数组
   - 解决：先用展开运算符复制数组

   ```tsx
   // ❌ 错误：修改原数组
   const sorted = filteredRepos.sort();

   // ✅ 正确：先复制再排序
   const sorted = [...filteredRepos].sort((a, b) => {
     if (sortBy === "name") {
       return a.name.localeCompare(b.name);
     }
     return b.stars - a.stars;
   });
   ```

### 学习心得

**做得好的地方：**

- 能独立完成综合练习
- 实现了所有要求的功能
- 代码结构清晰，逻辑完整

**需要改进的地方：**

- 单选框的状态管理理解不够深入
- 过滤逻辑可以更简洁
- 要注意数组方法是否会修改原数组

**与 Vue 的对比感受：**

- Vue 的 v-model 更简洁，React 需要手动绑定 value 和 onChange
- React 的单选框需要理解状态和 checked 的关系
- React 更接近原生 JavaScript，需要更多手动控制

### 掌握程度

**85%** - 基本掌握，可以进入下一单元

### 下一步计划

学习单元 4：useEffect 副作用处理

---

## 单元 4：useEffect 副作用

**学习日期：** 2026-03-26  
**学习时长：** 约 3 小时  
**学习方式：** 渐进式学习（边学边练）

### 学习过程

#### Step 1：useEffect 基础

- 学习了 useEffect 的三种依赖数组
- 练习：控制台记录、浏览器标题同步、挂载提示
- 掌握：依赖数组的作用、执行时机
- 理解：挂载时一定会执行一次

#### Step 2：清理函数（cleanup）

- 学习了为什么需要清理函数
- 练习：倒计时器（10秒）
- 掌握：清理定时器、清理函数的执行时机
- 理解：依赖变化时会先执行清理函数

#### Step 3：API 请求和异步操作

- 学习了为什么 useEffect 不能直接是 async
- 练习：GitHub 仓库搜索器
- 掌握：try-catch-finally、AbortController
- 理解：throw 会直接跳到 catch 块

#### 最终练习：GitHub 用户信息面板

- 实现了用户信息展示、仓库列表、自动刷新
- 使用了 Promise.all、AbortController、触发器模式
- 遇到问题：不理解触发器模式、AbortController 的使用场景
- 解决：理解了用状态变化触发副作用的模式

### 遇到的问题和解决

1. **触发器模式（Trigger Pattern）**
   - 问题：不知道如何在 useEffect 外部触发副作用
   - 原因：想直接调用函数，但无法使用清理函数
   - 解决：用状态变化触发 useEffect

   ```tsx
   // 最初的想法（有问题）
   async function fetchInfo(controller: AbortController) {
     // 获取数据
   }
   const handleRefresh = () => {
     const controller = new AbortController();
     fetchInfo(controller); // 无法取消
   };

   // 优化后的方案
   const [refreshTrigger, setRefreshTrigger] = useState(0);

   useEffect(() => {
     const controller = new AbortController();
     fetchData();
     return () => controller.abort();
   }, [username, refreshTrigger]);

   const handleRefresh = () => {
     setRefreshTrigger((prev) => prev + 1); // 触发 useEffect
   };
   ```

2. **AbortController 的使用场景**
   - 问题：不理解什么时候需要 AbortController
   - 原因：不清楚它的作用和使用时机
   - 解决：理解了只在有清理函数的地方才有意义

   **需要 AbortController：**
   - ✅ useEffect 中（有清理函数）
   - ✅ 依赖变化时取消旧请求

   **不需要 AbortController：**
   - ❌ 普通函数中（没有清理函数）
   - ❌ 定时器中（用触发器模式更简单）

3. **定时器中的 AbortController**
   - 问题：在 setInterval 中创建 controller，但无法取消
   - 原因：每次都用同一个 controller
   - 解决：用触发器模式，在 useEffect 中统一处理

### 学习心得

**做得好的地方：**

- 能独立完成 API 请求和错误处理
- 理解了 try-catch-finally 的执行流程
- 主动使用了 AbortController（虽然有些地方不需要）
- 善于提问，理解概念深入

**需要改进的地方：**

- 触发器模式是 React 特有的思维方式，需要时间适应
- AbortController 的使用场景需要更清晰的判断
- 从 Vue 的"直接调用方法"转换到 React 的"状态触发"需要练习

**与 Vue 的对比感受：**

- Vue 可以直接调用方法，React 需要通过状态触发
- React 的 useEffect 是"副作用执行时机"，Vue 的 watch 是"监听变化"
- React 更声明式，需要适应这种思维模式

**重要收获：**

- 理解了"触发器模式"：用状态变化触发副作用
- 理解了 AbortController 只在有清理函数的地方才有意义
- 理解了 useEffect 在挂载时一定会执行一次

### 掌握程度

**85%** - 基本掌握，触发器模式需要多练习

### 下一步计划

学习单元 5：useRef 和 DOM 操作

---

## 单元 5：useRef 和 DOM 操作

**学习日期：** 2026-04-01  
**学习时长：** 约 2 小时  
**学习方式：** 渐进式学习（边学边练）

### 学习过程

#### Step 1：useRef 获取 DOM 引用

- 学习了 useRef 获取 DOM 元素的方法
- 练习：视频播放器控制、图片滚动导航、文本选中
- 掌握：ref 绑定、ref.current 访问、DOM API 调用
- 理解：ref.current 在事件处理或 useEffect 中使用

#### Step 2：useRef 存储不触发渲染的值

- 学习了 useRef 和 useState 的核心区别
- 练习：秒表、输入变化次数、useState vs useRef 对比
- 掌握：定时器 ID 存储、上一次的值存储
- 理解：ref 变化不触发渲染

#### 最终练习：番茄钟计时器

- 实现了工作/休息模式切换、倒计时、番茄钟计数
- 使用了 useState + useRef + useEffect 综合应用
- 优化：用配置对象消除重复的 if-else
- 完成度：基础功能 ✅，进阶功能 ⏸️（待完成）

### 遇到的问题和解决

1. **clearInterval 不会把变量变成 null**
   - 问题：以为 clearInterval 会把 timerRef.current 变成 null
   - 原因：不理解 clearInterval 只是停止定时器，不修改变量
   - 解决：理解了定时器 ID 就像"地址"，clearInterval 通过地址找到定时器并停止，但地址还在

   ```tsx
   // 错误理解
   timerRef.current = setInterval(...);  // current = 123
   clearInterval(timerRef.current);      // 以为 current 变成 null

   // 正确理解
   timerRef.current = setInterval(...);  // current = 123（地址）
   clearInterval(timerRef.current);      // 停止 123 号定时器，但 current 还是 123
   timerRef.current = null;              // 需要手动清空地址
   ```

2. **为什么不能用 +1 而要用时间戳**
   - 问题：不理解为什么秒表要用 `Date.now() - startTime` 而不是 `prev + 1`
   - 原因：以为定时器是准确的
   - 解决：理解了定时器不准确，会有累积误差

   ```tsx
   // ❌ 不准确：依赖定时器
   setInterval(() => {
     setTime((prev) => prev + 10); // 假设每次准确 +10ms
   }, 10);
   // 实际：11ms、23ms、35ms... 误差累积

   // ✅ 准确：基于时间戳
   startTimeRef.current = Date.now() - time;
   setInterval(() => {
     setTime(Date.now() - startTimeRef.current); // 每次重新计算
   }, 10);
   // 实际：11ms、23ms、35ms... 但显示准确
   ```

3. **暂停后继续的实现原理**
   - 问题：不理解 `Date.now() - time` 如何实现暂停后继续
   - 原因：以为是从"暂停的时间点"继续
   - 解决：理解了是从"暂停时的显示值"继续，time 是 state 会保持值

   ```tsx
   // 关键理解
   const [time, setTime] = useState(0); // state 会保持值

   // 暂停时
   time = 500; // 显示 0.500 秒

   // 5 秒后继续（time 还是 500）
   startTimeRef.current = Date.now() - time; // 现在 - 已过时间
   // 这样计算出来的时间就能接上
   ```

4. **代码优雅性问题**
   - 问题：重复的 if-else 判断模式不优雅
   - 原因：没有想到用配置对象
   - 解决：用配置对象统一管理，消除重复

   ```tsx
   // ❌ 不优雅：重复判断
   if (mode === "work") {
     setSeconds(25 * 60);
   } else {
     setSeconds(5 * 60);
   }

   // ✅ 优雅：配置对象
   const MODE_CONFIG = {
     work: { duration: 25 * 60, label: "工作" },
     break: { duration: 5 * 60, label: "休息" },
   } as const;

   setSeconds(MODE_CONFIG[mode].duration);
   ```

### 学习心得

**做得好的地方：**

- 能独立完成番茄钟的核心功能
- 善于提问，深入理解概念（定时器 ID、时间戳计算）
- 能够发现代码优雅性问题并寻求改进
- 理解了 useRef 的两个核心用途

**需要改进的地方：**

- 对浏览器 API（定时器、时间戳）的理解需要加深
- 代码优雅性（配置对象、DRY 原则）需要多练习

**与 Vue 的对比感受：**

- Vue 的 ref 既可以是响应式值，也可以是 DOM 引用；React 分为 useState 和 useRef
- React 明确区分"触发渲染"和"不触发渲染"，概念更清晰
- useRef 的 `.current` 和 Vue 的 `.value` 类似，但用途不同

**重要收获：**

1. **useRef 的本质**：
   - 返回一个对象 `{ current: value }`
   - 对象本身不变（引用稳定）
   - 修改 `.current` 不触发渲染

2. **定时器 ID 的理解**：
   - setInterval 返回的是"地址"（数字 ID）
   - clearInterval 通过"地址"找到定时器并停止
   - 需要手动设置 `null` 来清空"地址"

3. **时间戳计算的优势**：
   - 不依赖定时器准确性
   - 每次基于真实时间计算
   - 支持暂停后继续（`Date.now() - time`）

4. **代码优雅性原则**：
   - DRY（Don't Repeat Yourself）
   - 单一数据源（配置对象）
   - 易于扩展

### 掌握程度

**90%** - 完全掌握核心概念，可以进入下一单元

### 待完成任务

- [ ] 番茄钟进阶功能（可选）：
  - [ ] 自定义时长输入框
  - [ ] 音效提示
  - [ ] 进度条显示
  - [ ] 保存历史记录到 localStorage
  - [ ] 长休息模式（4 个番茄钟后休息 15 分钟）

### 下一步计划

学习单元 6：TypeScript 集成（从这里开始全部用 TS 写代码）

---
