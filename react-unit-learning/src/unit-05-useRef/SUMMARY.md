# 单元 5：useRef 和 DOM 操作 - 知识总结

## 核心知识点

### 1. useRef 的两个用途

#### 用途 1：获取 DOM 引用

```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} />;
```

#### 用途 2：存储不触发渲染的值

```tsx
const timerRef = useRef<number | null>(null);

timerRef.current = setInterval(() => {
  console.log("tick");
}, 1000);

clearInterval(timerRef.current);
```

---

## useState vs useRef

| 特性     | useState             | useRef                   |
| -------- | -------------------- | ------------------------ |
| 值变化   | 触发重新渲染         | 不触发渲染               |
| 用途     | UI 相关的数据        | "幕后"数据               |
| 更新方式 | `setState(newValue)` | `ref.current = newValue` |
| 示例     | 计数器、表单输入     | 定时器 ID、上一次的值    |

---

## 使用场景

### 1. DOM 操作

```tsx
// 自动聚焦
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();

// 滚动到元素
const elementRef = useRef<HTMLDivElement>(null);
elementRef.current?.scrollIntoView({ behavior: "smooth" });

// 测量尺寸
const boxRef = useRef<HTMLDivElement>(null);
const { width, height } = boxRef.current?.getBoundingClientRect();
```

### 2. 定时器 ID

```tsx
const timerRef = useRef<number | null>(null);

const start = () => {
  timerRef.current = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
};

const stop = () => {
  if (timerRef.current !== null) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
};

// 清理
useEffect(() => {
  return () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  };
}, []);
```

### 3. 存储上一次的值

```tsx
const [count, setCount] = useState(0);
const prevCountRef = useRef(0);

useEffect(() => {
  prevCountRef.current = count;
});

// 可以对比当前值和上一次的值
const diff = count - prevCountRef.current;
```

---

## 关键规则

### ✅ 正确用法

```tsx
// 在事件处理中使用
const handleClick = () => {
  inputRef.current?.focus();
};

// 在 useEffect 中使用
useEffect(() => {
  inputRef.current?.focus();
}, []);

// 修改 ref.current 不触发渲染
timerRef.current = 123;
```

### ❌ 错误用法

```tsx
// 不要在渲染期间读写 ref.current
function Component() {
  const ref = useRef(0);
  ref.current += 1; // ❌ 错误！

  return <div>{ref.current}</div>; // ❌ 错误！
}

// 不要期望修改 ref 触发渲染
timerRef.current = 123; // 不会触发渲染
```

---

## 与 Vue 的对比

| Vue 3        | React 19                  | 说明                                                                |
| ------------ | ------------------------- | ------------------------------------------------------------------- |
| `ref()`      | `useState()` / `useRef()` | Vue 的 ref 既可以是响应式值，也可以是 DOM 引用；React 分为两个 Hook |
| `ref.value`  | `ref.current`             | 访问方式不同                                                        |
| 自动追踪依赖 | 手动声明依赖              | Vue 响应式系统自动，React 需要手动                                  |

---

## 常见错误

### 1. 忘记清理定时器

```tsx
// ❌ 错误
const start = () => {
  setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
};

// ✅ 正确
const timerRef = useRef<number | null>(null);

const start = () => {
  timerRef.current = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
};

useEffect(() => {
  return () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  };
}, []);
```

### 2. 混淆 useState 和 useRef

```tsx
// ❌ 错误：需要显示在 UI 上，应该用 useState
const countRef = useRef(0);
countRef.current += 1; // UI 不会更新

// ✅ 正确
const [count, setCount] = useState(0);
setCount((c) => c + 1); // UI 会更新
```

### 3. 在渲染期间使用 ref

```tsx
// ❌ 错误
function Component() {
  const ref = useRef(0);
  console.log(ref.current); // 不要在渲染期间读取
  ref.current += 1; // 不要在渲染期间写入
  return <div />;
}

// ✅ 正确
function Component() {
  const ref = useRef(0);

  useEffect(() => {
    console.log(ref.current); // 在 useEffect 中读取
    ref.current += 1; // 在 useEffect 中写入
  });

  return <div />;
}
```

---

## 实战技巧

### 1. 定时器的两种实现方式

#### 方式 1：useEffect（简单场景）

```tsx
const [isRunning, setIsRunning] = useState(false);

useEffect(() => {
  if (!isRunning) return;

  const timer = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  return () => clearInterval(timer);
}, [isRunning]);
```

**适用场景：**

- 简单的开关式定时器
- 只需要"开始"和"停止"

#### 方式 2：useRef（复杂场景）

```tsx
const timerRef = useRef<number | null>(null);

const start = () => {
  timerRef.current = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
};

const stop = () => {
  if (timerRef.current !== null) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
};
```

**适用场景：**

- 需要多个控制按钮（开始、暂停、继续、重置）
- 需要在事件处理函数中访问定时器 ID

### 2. 秒表的正确实现

```tsx
// ❌ 不准确：依赖定时器准确性
setInterval(() => {
  setTime((prev) => prev + 10);
}, 10);

// ✅ 准确：基于时间戳
const startTimeRef = useRef(0);

const start = () => {
  startTimeRef.current = Date.now() - time;
  timerRef.current = setInterval(() => {
    setTime(Date.now() - startTimeRef.current);
  }, 10);
};
```

### 3. 配置对象优化代码

```tsx
// ❌ 重复的 if-else
if (mode === "work") {
  setSeconds(25 * 60);
} else {
  setSeconds(5 * 60);
}

// ✅ 配置对象
const MODE_CONFIG = {
  work: { duration: 25 * 60, label: "工作" },
  break: { duration: 5 * 60, label: "休息" },
} as const;

setSeconds(MODE_CONFIG[mode].duration);
```

---

## 总结

### useRef 的本质

- 返回一个对象 `{ current: value }`
- 对象本身不变（引用稳定）
- 修改 `.current` 不触发渲染

### 核心用途

1. DOM 引用（focus、scroll、measure）
2. 定时器 ID（setTimeout/setInterval）
3. 存储上一次的值（对比变化）

### 关键区别

- **useState**：值变化 → 触发渲染 → UI 更新
- **useRef**：值变化 → 不触发渲染 → UI 不变

### 选择原则

- 需要显示在 UI 上？用 **useState**
- 不需要显示，只是"幕后"数据？用 **useRef**

---

## 下一步

单元 6 将学习 TypeScript 集成，包括：

- 组件 Props 类型定义
- 事件类型
- useState 和 useRef 的泛型
- children 类型

useRef 虽然简单，但在实际开发中非常常用。掌握它的使用场景和最佳实践，会让你的代码更加优雅和高效！
