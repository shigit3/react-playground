/**
 * Step 1 示例：useEffect 基础用法
 */

import { useState, useEffect } from "react";

// 示例 1：无依赖数组 - 每次渲染都执行
function Example1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("🔄 每次渲染都执行，当前 count:", count);
    // ⚠️ 注意：这会导致每次渲染都执行，通常不推荐
  });

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 1：无依赖数组</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 打开控制台查看日志，每次点击按钮都会执行 useEffect
      </p>
    </div>
  );
}

// 示例 2：空依赖数组 - 只在挂载时执行一次
function Example2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("✅ 组件挂载时执行一次");
    // 类似 Vue 的 onMounted
  }, []); // 空数组表示没有依赖

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 2：空依赖数组 []</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 打开控制台查看日志，只在组件首次渲染时执行一次
      </p>
    </div>
  );
}

// 示例 3：有依赖数组 - 依赖变化时执行
function Example3() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("张三");

  useEffect(() => {
    console.log("🎯 count 变化了，新值:", count);
    // 只在 count 变化时执行
  }, [count]); // 依赖 count

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 3：有依赖数组 [count]</h3>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button
        onClick={() => setCount(count + 1)}
        style={{ marginRight: "10px" }}
      >
        增加 Count
      </button>
      <button onClick={() => setName(name === "张三" ? "李四" : "张三")}>
        切换 Name
      </button>
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 打开控制台查看日志，只有点击"增加 Count"时才会执行 useEffect
      </p>
    </div>
  );
}

// 示例 4：与 Vue 生命周期对比
function Example4() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 相当于 Vue 的 onMounted
    console.log("📦 组件挂载完成");
    setMounted(true);

    return () => {
      // 相当于 Vue 的 onUnmounted
      console.log("🗑️ 组件即将卸载");
    };
  }, []);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 4：与 Vue 生命周期对比</h3>
      <p>组件状态: {mounted ? "已挂载" : "挂载中..."}</p>
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          background: "#f3f4f6",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <p>
          <strong>Vue 3 对比：</strong>
        </p>
        <pre style={{ margin: "5px 0" }}>{`onMounted(() => {
  console.log('组件挂载完成')
})

onUnmounted(() => {
  console.log('组件即将卸载')
})`}</pre>
        <p style={{ marginTop: "10px" }}>
          <strong>React 19：</strong>
        </p>
        <pre style={{ margin: "5px 0" }}>{`useEffect(() => {
  console.log('组件挂载完成')
  
  return () => {
    console.log('组件即将卸载')
  }
}, [])`}</pre>
      </div>
    </div>
  );
}

// 主组件
export default function Step1Example() {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Step 1 示例：useEffect 基础</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Example1 />
        <Example2 />
        <Example3 />
        <Example4 />
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          background: "#fef3c7",
          borderRadius: "8px",
          borderLeft: "4px solid #f59e0b",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>⚠️ 常见错误</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>忘记写依赖数组，导致无限循环</li>
          <li>依赖数组里漏掉变量，导致闭包陷阱</li>
          <li>在 useEffect 里直接写 async 函数（应该在内部定义）</li>
        </ul>
      </div>
    </div>
  );
}
