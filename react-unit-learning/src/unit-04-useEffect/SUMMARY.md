# 单元 4：useEffect 副作用 - 知识总结

> 完成日期：2026-03-26

## 📚 核心知识点

### 1. useEffect 基础

**三种依赖数组：**

```typescript
// 1. 无依赖数组 - 每次渲染都执行（⚠️ 通常不推荐）
useEffect(() => {
  console.log("每次渲染都执行");
});

// 2. 空依赖数组 - 只在挂载时执行一次
useEffect(() => {
  console.log("只在挂载时执行");
}, []);

// 3. 有依赖 - 挂载时执行 + 依赖变化时执行
useEffect(() => {
  console.log("count 变化了");
}, [count]);
```

**执行时机：**

- 组件挂载时：一定会执行一次
- 依赖变化时：再次执行
- 组件卸载时：执行清理函数

---

### 2. 清理函数（cleanup）

**为什么需要清理？**

- 防止内存泄漏（定时器、事件监听）
- 避免组件卸载后的状态更新错误
- 取消未完成的请求

**清理函数的执行时机：**

1. 组件卸载时
2. 依赖变化，下次 effect 执行前

```typescript
useEffect(() => {
  // 创建副作用
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  // 返回清理函数
  return () => {
    clearInterval(timer);
  };
}, []);
```

**需要清理的常见场景：**

- ⏰ `setInterval` / `setTimeout`
- 👆 `addEventListener`
- 🌐 WebSocket 连接
- 📡 订阅（subscription）
- 🔗 API 请求（AbortController）

---

### 3. 异步操作和 API 请求

**为什么 useEffect 不能直接是 async？**

```typescript
// ❌ 错误
useEffect(async () => {
  const data = await fetch(url);
}, []);

// ✅ 正确
useEffect(() => {
  async function fetchData() {
    const data = await fetch(url);
  }
  fetchData();
}, []);
```

**原因：** useEffect 期望返回清理函数或 undefined，而 async 函数返回 Promise。

**API 请求的标准模式：**

```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, []);
```

---

### 4. AbortController（请求取消）

**什么时候需要？**

- 依赖变化时取消旧请求
- 组件卸载时取消未完成的请求
- 避免"组件卸载后仍在更新状态"的错误

**使用方法：**

```typescript
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const response = await fetch(url, {
        signal: controller.signal, // 传入 signal
      });
      const data = await response.json();
      setData(data);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("请求被取消");
      }
    }
  }

  fetchData();

  return () => controller.abort(); // 清理时取消请求
}, [url]);
```

**重要：** AbortController 只在有清理函数的地方才有意义（useEffect 中）。

---

### 5. 触发器模式（Trigger Pattern）

**场景：** 需要在 useEffect 外部触发副作用

**解决方案：** 用状态变化触发 useEffect

```typescript
const [refreshTrigger, setRefreshTrigger] = useState(0);

// 统一在 useEffect 中处理
useEffect(() => {
  const controller = new AbortController();
  fetchData();
  return () => controller.abort();
}, [username, refreshTrigger]);

// 手动刷新：改变触发器
const handleRefresh = () => {
  setRefreshTrigger((prev) => prev + 1);
};

// 自动刷新：定时改变触发器
useEffect(() => {
  if (!autoRefresh) return;
  const timer = setInterval(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, 30000);
  return () => clearInterval(timer);
}, [autoRefresh]);
```

**好处：**

- ✅ 统一在 useEffect 中处理副作用
- ✅ 可以使用清理函数
- ✅ 可以取消旧请求

---

## 🆚 与 Vue 的对比

| 场景     | Vue 3                    | React 19                                  |
| -------- | ------------------------ | ----------------------------------------- |
| 组件挂载 | `onMounted(() => {})`    | `useEffect(() => {}, [])`                 |
| 组件卸载 | `onUnmounted(() => {})`  | `useEffect(() => { return cleanup }, [])` |
| 监听变化 | `watch(count, () => {})` | `useEffect(() => {}, [count])`            |
| 异步操作 | 可以直接 async           | 需要在内部定义 async 函数                 |

**核心差异：**

- Vue 的 watch 可以精确监听某个值
- React 的 useEffect 是"副作用执行时机"的概念
- React 需要手动声明依赖数组

---

## ⚠️ 常见错误

1. **忘记写依赖数组** → 无限循环
2. **依赖数组里漏掉变量** → 闭包陷阱
3. **忘记清理副作用** → 内存泄漏
4. **useEffect 直接写 async** → 类型错误
5. **在普通函数中创建 AbortController** → 无法取消

---

## ✅ 最佳实践

1. **依赖数组要完整** - 包含所有使用的外部变量
2. **副作用要清理** - 定时器、事件监听、请求都要清理
3. **用 try-catch-finally** - 统一处理加载、错误、成功状态
4. **用触发器模式** - 在 useEffect 外部触发副作用
5. **检查 response.ok** - 处理 HTTP 错误

---

## 🎯 实战技巧

### 1. 同时获取多个 API

```typescript
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    const [userRes, reposRes] = await Promise.all([
      fetch(userUrl, { signal: controller.signal }),
      fetch(reposUrl, { signal: controller.signal }),
    ]);
    // ...
  }

  fetchData();
  return () => controller.abort();
}, []);
```

### 2. 防抖搜索

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    searchAPI(keyword);
  }, 500);

  return () => clearTimeout(timer);
}, [keyword]);
```

### 3. 自动刷新

```typescript
useEffect(() => {
  if (!autoRefresh) return;

  const timer = setInterval(() => {
    fetchData();
  }, 30000);

  return () => clearInterval(timer);
}, [autoRefresh]);
```

---

## 📝 学习心得

**掌握的知识点：**

- ✅ useEffect 的三种依赖数组
- ✅ 清理函数的使用和执行时机
- ✅ API 请求的标准模式
- ✅ AbortController 的使用场景
- ✅ 触发器模式（Trigger Pattern）

**需要继续练习的：**

- 复杂的副作用组合
- 性能优化（避免不必要的请求）
- 错误边界处理

**与 Vue 的思维转换：**

- React 是声明式的，通过状态变化触发副作用
- Vue 可以直接调用方法，React 需要通过状态触发
- 需要时间适应 React 的思维模式

---

## 🔗 相关资源

- [React 官方文档 - useEffect](https://react.dev/reference/react/useEffect)
- [AbortController MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Promise.all MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

---

**下一步：** 单元 5 - useRef 和 DOM 操作
