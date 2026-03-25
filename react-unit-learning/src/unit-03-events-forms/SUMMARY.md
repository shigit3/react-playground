# 单元 3：事件处理和表单 - 知识总结

## 核心知识点

### 1. 事件绑定

```tsx
// ✅ 正确：传递函数引用
<button onClick={handleClick}>点击</button>

// ✅ 正确：需要传参时用箭头函数
<button onClick={() => handleClick(id)}>删除</button>

// ❌ 错误：直接调用函数（会立即执行）
<button onClick={handleClick()}>点击</button>
```

### 2. 事件对象和类型

```tsx
// 输入框事件
function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  console.log(e.target.value);
}

// 表单提交事件
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); // 阻止默认提交行为
  // 处理表单数据
}

// 点击事件
function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
  console.log(e.currentTarget); // 推荐用 currentTarget
}
```

**常用事件类型：**

- `ChangeEvent<HTMLInputElement>` - 输入框变化
- `ChangeEvent<HTMLSelectElement>` - 下拉框变化
- `FormEvent<HTMLFormElement>` - 表单提交
- `MouseEvent<HTMLButtonElement>` - 鼠标点击
- `KeyboardEvent<HTMLInputElement>` - 键盘事件

### 3. 受控组件

受控组件：表单元素的值由 React 状态控制

```tsx
const [value, setValue] = useState("");

// ✅ 受控组件：value 和 onChange 都要绑定
<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

**为什么要用受控组件？**

- 单一数据源（状态是唯一真相）
- 可以实时验证和格式化输入
- 方便实现复杂的表单逻辑

### 4. 表单处理

```tsx
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault(); // 必须阻止默认行为

  // 处理表单数据
  console.log(formData);
}

<form onSubmit={handleSubmit}>
  {/* 表单字段 */}
  <button type="submit">提交</button>
</form>;
```

### 5. 单选框（Radio）的正确写法

```tsx
// ✅ 正确：只需要一个状态
const [sortBy, setSortBy] = useState("name");

function handleSortChange(e: React.ChangeEvent<HTMLInputElement>) {
  setSortBy(e.target.value);
}

<input
  type="radio"
  name="sortBy"
  value="name"
  checked={sortBy === "name"}
  onChange={handleSortChange}
/>

<input
  type="radio"
  name="sortBy"
  value="stars"
  checked={sortBy === "stars"}
  onChange={handleSortChange}
/>
```

**关键点：**

- 只需要一个状态变量
- `checked` 属性通过比较状态值来确定
- 所有单选框共用一个 `onChange` 处理函数
- `name` 属性相同，确保互斥

### 6. 下拉框（Select）

```tsx
const [language, setLanguage] = useState("all");

<select value={language} onChange={(e) => setLanguage(e.target.value)}>
  <option value="all">全部</option>
  <option value="JavaScript">JavaScript</option>
  <option value="TypeScript">TypeScript</option>
</select>;
```

## 与 Vue 的对比

| 功能       | Vue 3                 | React                          |
| ---------- | --------------------- | ------------------------------ |
| 双向绑定   | `v-model="value"`     | `value={value} onChange={...}` |
| 事件绑定   | `@click="handler"`    | `onClick={handler}`            |
| 阻止默认   | `@submit.prevent`     | `e.preventDefault()`           |
| 事件修饰符 | `@click.stop.prevent` | 手动调用 `e.stopPropagation()` |

**核心差异：**

- Vue 的 `v-model` 是语法糖，React 需要手动绑定 `value` 和 `onChange`
- Vue 有事件修饰符，React 需要在处理函数中手动调用
- React 的事件是合成事件（SyntheticEvent），不是原生 DOM 事件

## 常见错误和陷阱

### ❌ 错误 1：事件处理函数直接调用

```tsx
// ❌ 错误：会立即执行
<button onClick={handleClick()}>点击</button>

// ✅ 正确
<button onClick={handleClick}>点击</button>
<button onClick={() => handleClick(id)}>点击</button>
```

### ❌ 错误 2：忘记阻止表单默认提交

```tsx
// ❌ 错误：页面会刷新
function handleSubmit(e: React.FormEvent) {
  console.log("提交");
}

// ✅ 正确
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  console.log("提交");
}
```

### ❌ 错误 3：受控组件只绑定 value 不绑定 onChange

```tsx
// ❌ 错误：输入框无法输入（只读）
<input value={value} />

// ✅ 正确：必须同时绑定
<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### ❌ 错误 4：单选框状态冗余

```tsx
// ❌ 错误：维护多个状态
const [nameRadio, setNameRadio] = useState(true);
const [starsRadio, setStarsRadio] = useState(false);

// ✅ 正确：只需要一个状态
const [sortBy, setSortBy] = useState("name");
```

### ❌ 错误 5：过滤逻辑冗余

```tsx
// ❌ 错误：重复的过滤逻辑
const filtered = condition
  ? data.filter((item) => item.name.includes(keyword))
  : data
      .filter((item) => item.name.includes(keyword))
      .filter((item) => item.type === type);

// ✅ 正确：链式调用
const filtered = data
  .filter((item) => item.name.includes(keyword))
  .filter((item) => condition || item.type === type);
```

### ❌ 错误 6：直接修改原数组

```tsx
// ❌ 错误：sort() 会修改原数组
const sorted = data.sort();

// ✅ 正确：先复制再排序
const sorted = [...data].sort();
```

## 最佳实践

1. **事件处理函数命名**：用 `handle` 前缀，如 `handleClick`、`handleChange`
2. **类型安全**：给事件处理函数添加正确的类型注解
3. **阻止默认行为**：表单提交时记得 `e.preventDefault()`
4. **受控组件**：优先使用受控组件，保持单一数据源
5. **避免内联箭头函数**：如果不需要传参，直接传函数引用
6. **状态最小化**：避免冗余状态，能计算出来的就不要存储

## 实战技巧

### 实时搜索过滤

```tsx
const [keyword, setKeyword] = useState("");

const filtered = data.filter(
  (item) => item.name.includes(keyword) || item.description.includes(keyword),
);
```

### 多条件过滤

```tsx
const filtered = data
  .filter(
    (item) => item.name.includes(keyword) || item.description.includes(keyword),
  )
  .filter((item) => language === "all" || item.language === language);
```

### 排序逻辑

```tsx
const sorted = [...filtered].sort((a, b) => {
  if (sortBy === "name") {
    return a.name.localeCompare(b.name);
  }
  return b.stars - a.stars; // 降序
});
```

## 自检清单

- [x] 理解受控组件和非受控组件的区别
- [x] 能正确处理表单提交事件（阻止默认行为）
- [x] 理解事件处理函数的两种写法（直接传 vs 箭头函数）
- [x] 能给事件处理函数添加正确的 TypeScript 类型
- [x] 理解单选框只需要一个状态变量
- [x] 能实现实时搜索和多条件过滤
- [x] 知道如何避免直接修改原数组
- [x] 能对比 Vue 的 v-model 和 React 的受控组件

## 下一步

继续学习 **单元 4：useEffect 副作用**，掌握：

- 副作用处理（API 请求、订阅、定时器）
- 依赖数组的作用
- 清理函数
- 与 Vue 生命周期的对比
