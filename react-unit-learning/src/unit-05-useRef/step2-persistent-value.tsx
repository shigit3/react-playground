import { useState } from "react";
import Step2Example from "./step2-example";
import Step2Practice from "./step2-practice";

/**
 * Step 2: useRef 存储不触发渲染的值
 *
 * 学习目标：
 * 1. 理解 useRef 和 useState 的区别
 * 2. 使用 useRef 存储定时器 ID
 * 3. 使用 useRef 存储上一次的值
 * 4. 知道什么时候用 useRef，什么时候用 useState
 *
 * 核心区别：
 * useState: 值变化 → 触发重新渲染 → UI 更新
 * useRef:   值变化 → 不触发渲染 → UI 不变（但值已经变了）
 *
 * 使用场景：
 * - 定时器 ID（不需要显示在 UI 上）
 * - 上一次的值（用于对比）
 * - 渲染次数计数（调试用）
 * - 任何"幕后"数据（不影响 UI 的数据）
 *
 * 与 Vue 对比：
 * Vue 中所有 ref 都是响应式的，没有"不触发渲染"的概念
 * React 明确区分：useState（响应式）vs useRef（非响应式）
 */

export default function Step2PersistentValue() {
  const [activeTab, setActiveTab] = useState<"example" | "practice">("example");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Step 2: useRef 存储不触发渲染的值</h2>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setActiveTab("example")}
          style={{
            padding: "8px 16px",
            backgroundColor: activeTab === "example" ? "#007bff" : "#e0e0e0",
            color: activeTab === "example" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          示例代码
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          style={{
            padding: "8px 16px",
            backgroundColor: activeTab === "practice" ? "#007bff" : "#e0e0e0",
            color: activeTab === "practice" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          练习代码
        </button>
      </div>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {activeTab === "example" ? <Step2Example /> : <Step2Practice />}
      </div>
    </div>
  );
}
