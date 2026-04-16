/**
 * 单元 6 - Step 2: React 事件类型
 *
 * 学习目标：
 * 1. 掌握常见 React 事件类型
 * 2. 理解事件类型和 DOM 元素类型的组合写法
 * 3. 能给 onClick、onChange、onSubmit 正确标注类型
 * 4. 避免把原生 Event 直接拿来当 React 事件类型
 */

import { useState } from "react";

import Step2Example from "./step2-example";
import Step2Practice from "./step2-practice";

type ActiveTab = "example" | "practice";

export default function Step2EventTypes() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("example");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Step 2: React 事件类型</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#eef6ff",
          borderRadius: "8px",
          borderLeft: "4px solid #1d4ed8",
        }}
      >
        <h3 style={{ marginTop: 0 }}>这一步要掌握什么</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>
            <code>MouseEvent&lt;HTMLButtonElement&gt;</code> 处理按钮点击
          </li>
          <li>
            <code>ChangeEvent&lt;HTMLInputElement&gt;</code> 处理输入框变化
          </li>
          <li>
            <code>SubmitEvent&lt;HTMLFormElement&gt;</code> 处理表单提交
          </li>
          <li>重点不是只记名字，而是记住“事件类型 + 具体元素类型”这套写法</li>
        </ul>
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #cbd5e1",
        }}
      >
        <h3 style={{ marginTop: 0 }}>常见写法</h3>
        <pre
          style={{
            margin: 0,
            padding: "14px",
            backgroundColor: "#0f172a",
            color: "#e2e8f0",
            borderRadius: "6px",
            overflowX: "auto",
          }}
        >{`const handleClick = (e: MouseEvent<HTMLButtonElement>) => {}
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {}
const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
  e.preventDefault()
}`}</pre>
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#fff7ed",
          borderRadius: "8px",
          borderLeft: "4px solid #ea580c",
        }}
      >
        <h3 style={{ marginTop: 0 }}>常见错误</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>
            把 React 事件写成原生 <code>Event</code>
          </li>
          <li>只写事件类型，不写元素类型，导致拿不到准确的 target 属性提示</li>
          <li>
            给 <code>onSubmit</code> 忘记调用 <code>e.preventDefault()</code>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: "20px", borderBottom: "2px solid #e5e7eb" }}>
        <button
          onClick={() => setActiveTab("example")}
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: activeTab === "example" ? "#2563eb" : "transparent",
            color: activeTab === "example" ? "white" : "#475569",
            cursor: "pointer",
            borderRadius: "6px 6px 0 0",
            fontWeight: activeTab === "example" ? 700 : 500,
          }}
        >
          查看示例
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: activeTab === "practice" ? "#2563eb" : "transparent",
            color: activeTab === "practice" ? "white" : "#475569",
            cursor: "pointer",
            borderRadius: "6px 6px 0 0",
            fontWeight: activeTab === "practice" ? 700 : 500,
          }}
        >
          开始练习
        </button>
      </div>

      {activeTab === "example" ? <Step2Example /> : <Step2Practice />}
    </div>
  );
}
