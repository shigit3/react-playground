/**
 * 单元 4 - Step 2: 清理函数（cleanup）
 *
 * 学习目标：
 * 1. 理解为什么需要清理函数
 * 2. 学会清理定时器
 * 3. 学会清理事件监听
 * 4. 理解清理函数的执行时机
 *
 * 清理函数的执行时机：
 * 1. 组件卸载时
 * 2. 下次 effect 执行前（清理上一次的副作用）
 *
 * 需要清理的常见场景：
 * - setInterval / setTimeout
 * - addEventListener
 * - WebSocket 连接
 * - 订阅（subscription）
 * - 手动创建的 DOM 元素
 */

import { useState } from "react";
import Step2Example from "./step2-example";
import Step2Practice from "./step2-practice";

export default function Step2Cleanup() {
  const [activeTab, setActiveTab] = useState<"example" | "practice">("example");

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>Step 2: 清理函数（cleanup）</h1>

      {/* 知识点说明 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#fef3c7",
          borderRadius: "8px",
          borderLeft: "4px solid #f59e0b",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>⚠️ 为什么需要清理函数？</h3>
        <p>如果不清理副作用，会导致：</p>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>
            <strong>内存泄漏：</strong>定时器、事件监听器不会自动销毁
          </li>
          <li>
            <strong>重复执行：</strong>每次渲染都创建新的副作用
          </li>
          <li>
            <strong>性能问题：</strong>大量未清理的副作用会拖慢应用
          </li>
          <li>
            <strong>意外行为：</strong>组件卸载后仍在执行副作用
          </li>
        </ul>
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#eff6ff",
          borderRadius: "8px",
          borderLeft: "4px solid #3b82f6",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>📖 清理函数语法</h3>
        <pre
          style={{
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >{`useEffect(() => {
  // 1. 创建副作用
  const timer = setInterval(() => {
    console.log('tick')
  }, 1000)
  
  // 2. 返回清理函数
  return () => {
    clearInterval(timer)
  }
}, [依赖数组])`}</pre>
        <p style={{ marginTop: "10px" }}>
          <strong>清理函数执行时机：</strong>
        </p>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>组件卸载时</li>
          <li>依赖变化，下次 effect 执行前</li>
        </ul>
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
      {activeTab === "example" ? <Step2Example /> : <Step2Practice />}
    </div>
  );
}
