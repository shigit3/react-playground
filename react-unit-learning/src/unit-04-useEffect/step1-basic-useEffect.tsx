/**
 * 单元 4 - Step 1: useEffect 基础
 *
 * 学习目标：
 * 1. 理解什么是副作用（Side Effect）
 * 2. useEffect 的基本语法
 * 3. 依赖数组的三种情况
 * 4. 与 Vue 生命周期的对比
 *
 * 什么是副作用？
 * - 数据获取（API 请求）
 * - 订阅（WebSocket、事件监听）
 * - 手动修改 DOM
 * - 定时器（setTimeout、setInterval）
 * - 日志记录
 *
 * useEffect 语法：
 * useEffect(() => {
 *   // 副作用代码
 *   return () => {
 *     // 清理函数（可选）
 *   }
 * }, [依赖数组])
 *
 * 依赖数组的三种情况：
 * 1. 无依赖数组：每次渲染都执行
 * 2. 空数组 []：只在挂载时执行一次（类似 Vue 的 onMounted）
 * 3. [dep1, dep2]：依赖变化时执行
 */

import { useState } from "react";
import Step1Example from "./step1-example";
import Step1Practice from "./step1-practice";

export default function Step1BasicUseEffect() {
  const [activeTab, setActiveTab] = useState<"example" | "practice">("example");

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>Step 1: useEffect 基础</h1>

      {/* 知识点说明 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#eff6ff",
          borderRadius: "8px",
          borderLeft: "4px solid #3b82f6",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>📖 核心概念</h3>
        <p>
          <strong>useEffect 的三种依赖数组：</strong>
        </p>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>
            <code>useEffect(() =&gt; {"{}"}, [])</code> - 只在挂载时执行（类似
            Vue 的 onMounted）
          </li>
          <li>
            <code>useEffect(() =&gt; {"{}"}, [count])</code> - count
            变化时执行（类似 Vue 的 watch）
          </li>
          <li>
            <code>useEffect(() =&gt; {"{}"})</code> - 每次渲染都执行（⚠️
            通常不推荐）
          </li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          <strong>清理函数：</strong>
        </p>
        <pre
          style={{
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >{`useEffect(() => {
  // 副作用代码
  
  return () => {
    // 清理函数（组件卸载时执行）
  }
}, [])`}</pre>
      </div>

      {/* 标签切换 */}
      <div style={{ marginBottom: "20px", borderBottom: "2px solid #e5e7eb" }}>
        <button
          onClick={() => setActiveTab("example")}
          style={{
            padding: "10px 20px",
            border: "none",
            background: activeTab === "example" ? "#3b82f6" : "transparent",
            color: activeTab === "example" ? "white" : "#6b7280",
            cursor: "pointer",
            borderRadius: "4px 4px 0 0",
            fontWeight: activeTab === "example" ? "bold" : "normal",
            fontSize: "16px",
          }}
        >
          📚 示例代码
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          style={{
            padding: "10px 20px",
            border: "none",
            background: activeTab === "practice" ? "#3b82f6" : "transparent",
            color: activeTab === "practice" ? "white" : "#6b7280",
            cursor: "pointer",
            borderRadius: "4px 4px 0 0",
            fontWeight: activeTab === "practice" ? "bold" : "normal",
            fontSize: "16px",
          }}
        >
          ✏️ 练习代码
        </button>
      </div>

      {/* 内容区域 */}
      {activeTab === "example" ? <Step1Example /> : <Step1Practice />}
    </div>
  );
}
