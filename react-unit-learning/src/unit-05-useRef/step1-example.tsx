import { useRef, useEffect } from "react";

/**
 * 示例：使用 useRef 操作 DOM
 *
 * 场景：
 * 1. 自动聚焦输入框
 * 2. 滚动到指定元素
 * 3. 测量元素尺寸
 */

export default function Step1Example() {
  // 1. 自动聚焦输入框
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. 滚动到底部
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 3. 测量元素尺寸
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 组件挂载后自动聚焦
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const measureBox = () => {
    if (boxRef.current) {
      const { width, height } = boxRef.current.getBoundingClientRect();
      alert(`盒子尺寸：${width.toFixed(0)}px × ${height.toFixed(0)}px`);
    }
  };

  return (
    <div>
      <h3>示例 1：自动聚焦输入框</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder="页面加载后自动聚焦"
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      <h3>示例 2：滚动到底部</h3>
      <div
        style={{
          height: "150px",
          overflow: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ padding: "5px" }}>
            消息 {i + 1}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <button
        onClick={scrollToBottom}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        滚动到底部
      </button>

      <h3>示例 3：测量元素尺寸</h3>
      <div
        ref={boxRef}
        style={{
          width: "200px",
          height: "100px",
          backgroundColor: "#e3f2fd",
          border: "2px solid #2196f3",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        点击按钮测量我
      </div>
      <button
        onClick={measureBox}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        测量尺寸
      </button>
    </div>
  );
}
