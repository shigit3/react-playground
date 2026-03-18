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
