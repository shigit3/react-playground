/**
 * 单元 4 - Step 3: API 请求和异步操作
 *
 * 学习目标：
 * 1. 理解为什么 useEffect 不能直接是 async 函数
 * 2. 学会在 useEffect 中发送 API 请求
 * 3. 处理加载状态和错误状态
 * 4. 理解请求取消（AbortController）
 *
 * 为什么 useEffect 不能直接是 async？
 * - useEffect 期望返回一个清理函数或 undefined
 * - async 函数返回 Promise，不符合要求
 *
 * 正确的异步写法：
 * useEffect(() => {
 *   async function fetchData() {
 *     const data = await fetch(...)
 *   }
 *   fetchData()
 * }, [])
 */

import { useState } from "react";
import Step3Example from "./step3-example";
import Step3Practice from "./step3-practice";

export default function Step3Async() {
  const [activeTab, setActiveTab] = useState<"example" | "practice">("example");

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>Step 3: API 请求和异步操作</h1>

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
        <h3 style={{ margin: "0 0 10px 0" }}>⚠️ 为什么不能直接写 async？</h3>
        <pre
          style={{
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >{`// ❌ 错误：useEffect 不能直接是 async
useEffect(async () => {
  const data = await fetch(url)
}, [])

// ✅ 正确：在内部定义 async 函数
useEffect(() => {
  async function fetchData() {
    const data = await fetch(url)
  }
  fetchData()
}, [])`}</pre>
        <p style={{ marginTop: "10px" }}>
          <strong>原因：</strong>useEffect 期望返回清理函数或 undefined，而
          async 函数返回 Promise
        </p>
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
        <h3 style={{ margin: "0 0 10px 0" }}>📖 API 请求的标准模式</h3>
        <pre
          style={{
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >{`const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true)
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  fetchData()
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
      {activeTab === "example" ? <Step3Example /> : <Step3Practice />}
    </div>
  );
}
