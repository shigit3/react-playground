import { useState } from "react";
import Step1Example from "./step1-example";
import Step1Practice from "./step1-practice";

/**
 * Step 1: useRef 获取 DOM 引用
 *
 * 学习目标：
 * 1. 使用 useRef 获取 DOM 元素引用
 * 2. 在 useEffect 或事件处理中操作 DOM
 * 3. 理解 ref.current 的使用
 *
 * 与 Vue 对比：
 * Vue:  const inputRef = ref(null)  →  inputRef.value.focus()
 * React: const inputRef = useRef(null)  →  inputRef.current.focus()
 *
 * 关键点：
 * - useRef 返回一个可变的 ref 对象，.current 属性被初始化为传入的参数
 * - ref 对象在组件的整个生命周期内保持不变
 * - 修改 .current 不会触发重新渲染
 * - 只能在 useEffect 或事件处理函数中读写 ref.current
 */

export default function Step1DomRef() {
  const [activeTab, setActiveTab] = useState<"example" | "practice">("example");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Step 1: useRef 获取 DOM 引用</h2>

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
        {activeTab === "example" ? <Step1Example /> : <Step1Practice />}
      </div>
    </div>
  );
}
