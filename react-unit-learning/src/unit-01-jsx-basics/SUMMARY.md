# 单元 1 学习总结

## 🎯 学习目标

能写出基本的 React 组件，理解 JSX 语法和组件组合

## ✅ 已掌握的知识点

### 1. JSX 语法规则

- `class` → `className`
- `for` → `htmlFor`
- `style` 必须是对象：`style={{ color: 'red', fontSize: '16px' }}`
- 标签必须闭合：`<input />` 或 `<input></input>`
- 注释用 `{/* */}` 而不是 `//`

### 2. 函数组件

```tsx
// 基础组件
function Welcome() {
  return <h1>Hello!</h1>;
}

// 带 Props 的组件
interface GreetingProps {
  name: string;
  age?: number;
}

function Greeting({ name, age }: GreetingProps) {
  return <h1>Hello, {name}!</h1>;
}
```

### 3. Props 传递

- Props 是只读的，不能修改
- 用解构接收：`{ name, age }`
- TypeScript 类型定义：`interface` 或 `type`
- 展开传递：`<Component {...props} />`

### 4. 列表渲染

```tsx
{
  repos.map((repo) => <RepoCard key={repo.id} {...repo} />);
}
```

- 必须添加 `key` 属性
- key 应该用唯一 ID，不要用 index（除非列表不会变化）

### 5. 条件渲染

```tsx
// 三元运算符（两种情况）
{
  isLoggedIn ? <Dashboard /> : <Login />;
}

// && 运算符（只显示一种）
{
  hasError && <ErrorMessage />;
}

// 变量存储（复杂逻辑）
const content = isLoading ? <Spinner /> : <Content />;
```

### 6. 组件组合（children）

```tsx
interface CardProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

## 🆚 与 Vue 的对比

| 功能     | Vue 3                       | React 19                        |
| -------- | --------------------------- | ------------------------------- |
| 条件渲染 | `v-if` / `v-else`           | `{condition ? <A /> : <B />}`   |
| 列表渲染 | `v-for="item in items"`     | `{items.map(item => <Item />)}` |
| 插槽     | `<slot />`                  | `{children}`                    |
| 属性绑定 | `:class` / `v-bind`         | `className={value}`             |
| 样式绑定 | `:style="{ color: 'red' }"` | `style={{ color: 'red' }}`      |

## 💡 重要概念

### 箭头函数的两种形式

```tsx
// 用 () 包裹 - 自动返回
{
  repos.map((repo) => <RepoCard {...repo} />);
}

// 用 {} 包裹 - 必须写 return
{
  repos.map((repo) => {
    return <RepoCard {...repo} />;
  });
}
```

### 组件必须返回 JSX

```tsx
// ❌ 错误：没有 return
function MyComponent() {
  <div>Hello</div>;
}

// ✅ 正确
function MyComponent() {
  return <div>Hello</div>;
}
```

### ReactNode 类型导入

```tsx
// TypeScript 配置要求
import { type ReactNode } from "react";
```

## 🎓 完成的练习

### 渐进式练习

1. ✅ step1-jsx-basics - JSX 基础语法
2. ✅ step2-props - 组件和 Props
3. ✅ step3-list - 列表渲染
4. ✅ step4-conditional - 条件渲染
5. ✅ step5-children - 组件组合

### 最终练习

✅ final-practice - GitHub 仓库浏览器

- 创建了 6+ 个组件
- 实现了搜索、筛选、排序功能
- 使用了所有单元 1 的知识点

## 📝 学习心得

### 掌握得好的地方

- 组件拆分合理
- TypeScript 类型定义完整
- 代码结构清晰
- 主动拆分组件文件

### 需要注意的点

- 过滤逻辑用 `includes()` 而不是 `===`
- 箭头函数的 `()` 和 `{}` 区别
- 组件函数必须 return JSX

## 🚀 下一步

准备学习单元 2：useState 状态管理，让组件"动起来"！

---

**完成日期：** 2026-03-18
**学习方式：** 渐进式学习（边学边练）
**掌握程度：** 95%
