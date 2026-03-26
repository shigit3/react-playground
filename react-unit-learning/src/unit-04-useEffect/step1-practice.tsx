/**
 * Step 1 练习：useEffect 基础
 *
 * 练习目标：
 * 1. 实现一个计数器，在控制台记录每次 count 变化
 * 2. 实现一个标题同步器，将 count 显示在浏览器标题上
 * 3. 实现一个挂载提示，组件挂载时显示欢迎消息
 *
 * 提示：
 * - 使用 document.title 修改浏览器标题
 * - 使用 console.log 记录日志
 * - 注意依赖数组的使用
 */

import { useEffect, useState } from "react";

export default function Step1Practice() {
  const [count, setCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  // TODO: 练习 1 - 在控制台记录 count 变化
  // 提示：使用 useEffect，依赖 count
  useEffect(() => {
    console.log(`count变化了，现在是${count}`);
  }, [count]);

  // TODO: 练习 2 - 将 count 同步到浏览器标题
  // 提示：document.title = `Count: ${count}`
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // TODO: 练习 3 - 组件挂载时显示欢迎消息
  // 提示：使用空依赖数组 []，设置 showWelcome 为 true
  useEffect(() => {
    setShowWelcome(true);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Step 1 练习：useEffect 基础</h2>

      {/* 欢迎消息 */}
      {showWelcome && (
        <div
          style={{
            padding: "15px",
            background: "#d1fae5",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          🎉 欢迎！组件已成功挂载
        </div>
      )}

      {/* 计数器 */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <h3>计数器</h3>
        <p style={{ fontSize: "32px", fontWeight: "bold", margin: "20px 0" }}>
          {count}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 20px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          增加
        </button>
      </div>

      {/* 提示 */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        <h4>💡 检查清单：</h4>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>打开控制台，点击"增加"按钮，能看到 count 变化的日志吗？</li>
          <li>查看浏览器标签页标题，显示当前 count 值了吗？</li>
          <li>刷新页面，能看到欢迎消息吗？</li>
        </ul>
        <p style={{ margin: "10px 0", color: "#6b7280" }}>
          完成后告诉我"完成了"，我会检查你的代码！
        </p>
      </div>
    </div>
  );
}
