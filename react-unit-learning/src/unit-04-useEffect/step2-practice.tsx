/**
 * Step 2 练习：清理函数
 *
 * 练习目标：
 * 实现一个倒计时器，要求：
 * 1. 从 10 秒开始倒计时
 * 2. 支持开始/暂停
 * 3. 倒计时结束时显示提示
 * 4. 支持重置
 * 5. 正确清理定时器
 *
 * 提示：
 * - 使用 setInterval 实现倒计时
 * - 使用清理函数清理定时器
 * - 倒计时到 0 时自动停止
 */

import { useEffect, useState } from "react";

export default function Step2Practice() {
  const [seconds, setSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  // TODO: 实现倒计时逻辑
  // 提示：
  // 1. 使用 useEffect 监听 isRunning
  // 2. 当 isRunning 为 true 时，启动 setInterval
  // 3. 每秒减少 seconds（使用函数式更新）
  // 4. 当 seconds 为 0 时，停止倒计时
  // 5. 返回清理函数，清理定时器

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (seconds > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(10);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Step 2 练习：倒计时器</h2>

      <div
        style={{
          padding: "40px",
          border: "2px solid #e5e7eb",
          borderRadius: "12px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {/* 倒计时显示 */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: seconds === 0 ? "#ef4444" : "#3b82f6",
            marginBottom: "20px",
          }}
        >
          {seconds}
        </div>

        {/* 倒计时结束提示 */}
        {seconds === 0 && (
          <div
            style={{
              padding: "15px",
              background: "#fee2e2",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#dc2626",
            }}
          >
            ⏰ 时间到！
          </div>
        )}

        {/* 控制按钮 */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={seconds === 0}
              style={{
                padding: "12px 24px",
                background: seconds === 0 ? "#d1d5db" : "#10b981",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: seconds === 0 ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              开始
            </button>
          ) : (
            <button
              onClick={handlePause}
              style={{
                padding: "12px 24px",
                background: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              暂停
            </button>
          )}
          <button
            onClick={handleReset}
            style={{
              padding: "12px 24px",
              background: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            重置
          </button>
        </div>
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
        <h4>💡 实现提示：</h4>
        <pre
          style={{
            background: "#1e293b",
            color: "#e2e8f0",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "14px",
          }}
        >{`useEffect(() => {
  if (!isRunning) return
  
  const timer = setInterval(() => {
    setSeconds(prev => {
      if (prev <= 1) {
        setIsRunning(false)
        return 0
      }
      return prev - 1
    })
  }, 1000)
  
  return () => clearInterval(timer)
}, [isRunning])`}</pre>
        <h4 style={{ marginTop: "15px" }}>✅ 检查清单：</h4>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>点击"开始"按钮，倒计时是否正常运行？</li>
          <li>点击"暂停"按钮，倒计时是否停止？</li>
          <li>倒计时到 0 时，是否自动停止并显示提示？</li>
          <li>点击"重置"按钮，是否恢复到 10 秒？</li>
          <li>打开控制台，是否没有报错或警告？</li>
        </ul>
        <p style={{ margin: "10px 0", color: "#6b7280" }}>
          完成后告诉我"完成了"，我会检查你的代码！
        </p>
      </div>
    </div>
  );
}
