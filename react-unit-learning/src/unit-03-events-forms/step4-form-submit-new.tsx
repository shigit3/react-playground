/**
 * 单元 3 - 步骤 4：表单提交
 *
 * 学习目标：
 * 1. 掌握表单提交事件处理
 * 2. 理解 e.preventDefault() 的作用
 * 3. 学会处理表单数据
 */

import { useState } from "react";
import Step4Example from "./step4-example";
import Step4Practice from "./step4-practice";

/**
 * 知识点 1：表单提交事件
 *
 * <form onSubmit={handleSubmit}>
 *   <button type="submit">提交</button>
 * </form>
 *
 * 注意：
 * - 必须用 e.preventDefault() 阻止默认的页面刷新
 * - button 的 type="submit" 会触发表单提交
 * - 按 Enter 键也会触发表单提交
 */

/**
 * 知识点 2：表单事件类型（React 19）
 *
 * React 19 中，推荐使用 React.FormEvent：
 * const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
 *   e.preventDefault();
 * }
 *
 * 或者让 TypeScript 自动推断：
 * const handleSubmit = (e: React.FormEvent) => {
 *   e.preventDefault();
 * }
 */

/**
 * 知识点 3：与 Vue 的对比
 *
 * Vue:
 * <form @submit.prevent="handleSubmit">
 *
 * React:
 * <form onSubmit={handleSubmit}>
 *   // 需要在函数里调用 e.preventDefault()
 * </form>
 */

function Step4FormSubmit() {
  const [activeTab, setActiveTab] = useState<"example" | "practice">("example");

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>步骤 4：表单提交</h2>

      {/* 知识点说明 */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>📚 核心知识点</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>
            <strong>表单提交：</strong>使用 <code>onSubmit</code> 事件
          </li>
          <li>
            <strong>阻止刷新：</strong>必须调用 <code>e.preventDefault()</code>
          </li>
          <li>
            <strong>表单验证：</strong>提交前验证所有字段
          </li>
          <li>
            <strong>异步处理：</strong>用 <code>setTimeout</code> 模拟 API 请求
          </li>
        </ul>
      </div>

      {/* 标签切换 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          borderBottom: "2px solid #ddd",
        }}
      >
        <button
          onClick={() => setActiveTab("example")}
          style={{
            padding: "10px 20px",
            backgroundColor:
              activeTab === "example" ? "#4a90e2" : "transparent",
            color: activeTab === "example" ? "white" : "#666",
            border: "none",
            borderBottom:
              activeTab === "example" ? "2px solid #4a90e2" : "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: activeTab === "example" ? "bold" : "normal",
          }}
        >
          📖 示例代码
        </button>
        <button
          onClick={() => setActiveTab("practice")}
          style={{
            padding: "10px 20px",
            backgroundColor:
              activeTab === "practice" ? "#4a90e2" : "transparent",
            color: activeTab === "practice" ? "white" : "#666",
            border: "none",
            borderBottom:
              activeTab === "practice" ? "2px solid #4a90e2" : "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: activeTab === "practice" ? "bold" : "normal",
          }}
        >
          ✏️ 练习区域
        </button>
      </div>

      {/* 内容区域 */}
      {activeTab === "example" ? <Step4Example /> : <Step4Practice />}
    </div>
  );
}

export default Step4FormSubmit;
