/**
 * 单元 6 - Step 1: Props 类型定义
 *
 * 学习目标：
 * 1. 使用 interface 和 type 定义 Props
 * 2. 可选属性和默认值
 * 3. children 类型（ReactNode）
 * 4. 对比 interface vs type
 */

import { useState } from "react";

import Step1Example from "./step1-example";
import Step1Practice from "./step1-practice";

// 选择查看示例代码还是练习代码
type ViewMode = "example" | "practice";

export default function Step1PropsTypes() {
  const [mode, setMode] = useState<ViewMode>("example");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Step 1: Props 类型定义</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setMode("example")}
          style={{
            padding: "8px 16px",
            marginRight: "10px",
            backgroundColor: mode === "example" ? "#007bff" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          查看示例
        </button>
        <button
          onClick={() => setMode("practice")}
          style={{
            padding: "8px 16px",
            backgroundColor: mode === "practice" ? "#007bff" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          开始练习
        </button>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "2px solid #dee2e6",
        }}
      >
        {mode === "example" ? <Step1Example /> : <Step1Practice />}
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
        }}
      >
        <h3>💡 知识点</h3>
        <ul>
          <li>
            <strong>interface vs type：</strong>都可以定义 Props，团队统一即可
          </li>
          <li>
            <strong>interface：</strong>可以声明合并，更适合定义对象形状
          </li>
          <li>
            <strong>type：</strong>可以定义联合类型、交叉类型，更灵活
          </li>
          <li>
            <strong>可选属性：</strong>用 <code>?</code> 标记，如{" "}
            <code>title?: string</code>
          </li>
          <li>
            <strong>默认值：</strong>用解构赋值设置，如{" "}
            <code>{'{ title = "默认标题" }'}</code>
          </li>
          <li>
            <strong>children：</strong>使用 <code>ReactNode</code>{" "}
            类型（最宽泛）
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f8d7da",
          borderRadius: "4px",
        }}
      >
        <h3>⚠️ 常见错误</h3>
        <ul>
          <li>
            ❌ children 类型用 <code>JSX.Element</code>
            （太严格，不支持字符串、数字等）
          </li>
          <li>❌ 可选属性忘记处理 undefined 情况</li>
          <li>❌ Props 类型定义不完整，导致类型推断错误</li>
          <li>
            ✅ 推荐：children 用 <code>ReactNode</code>，支持所有可渲染内容
          </li>
        </ul>
      </div>
    </div>
  );
}

