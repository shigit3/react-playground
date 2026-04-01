import { useState, useRef, useEffect } from "react";

/**
 * 示例：useRef 存储不触发渲染的值
 *
 * 场景：
 * 1. 存储定时器 ID（清理定时器）
 * 2. 存储上一次的值（对比变化）
 * 3. 存储渲染次数（调试）
 */

export default function Step2Example() {
  return (
    <div>
      <Example1Timer />
      <hr style={{ margin: "30px 0" }} />
      <Example2PrevValue />
      <hr style={{ margin: "30px 0" }} />
      <Example3RenderCount />
    </div>
  );
}

// 示例 1：存储定时器 ID
function Example1Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 用 useRef 存储定时器 ID（不需要触发渲染）
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (isRunning) return;

    setIsRunning(true);
    // 存储定时器 ID，方便后续清理
    timerRef.current = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  };

  const stop = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setCount(0);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h3>示例 1：定时器（存储定时器 ID）</h3>
      <div style={{ fontSize: "32px", fontWeight: "bold", margin: "20px 0" }}>
        {count} 秒
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={start}
          disabled={isRunning}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          开始
        </button>
        <button
          onClick={stop}
          disabled={!isRunning}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          暂停
        </button>
        <button
          onClick={reset}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          重置
        </button>
      </div>
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        💡 timerRef.current 存储定时器 ID，修改它不会触发重新渲染
      </div>
    </div>
  );
}

// 示例 2：存储上一次的值
function Example2PrevValue() {
  const [count, setCount] = useState(0);

  // 用 useRef 存储上一次的值
  const prevCountRef = useRef<number>(0);

  useEffect(() => {
    // 每次渲染后，更新 prevCountRef
    prevCountRef.current = count;
  });

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return (
    <div>
      <h3>示例 2：对比上一次的值</h3>
      <div style={{ fontSize: "24px", margin: "20px 0" }}>
        <div>当前值：{count}</div>
        <div style={{ color: "#666" }}>上一次的值：{prevCountRef.current}</div>
        <div style={{ color: "#2196f3", fontWeight: "bold" }}>
          变化：{count - prevCountRef.current > 0 ? "+" : ""}
          {count - prevCountRef.current}
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={increment}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          +1
        </button>
        <button
          onClick={decrement}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          -1
        </button>
      </div>
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        💡 prevCountRef 在 useEffect 中更新，不会触发额外渲染
      </div>
    </div>
  );
}

// 示例 3：渲染次数计数
function Example3RenderCount() {
  const [count, setCount] = useState(0);

  // 用 useRef 记录渲染次数（调试用）
  const renderCountRef = useRef(0);

  // 每次渲染时递增（不会触发新的渲染）
  renderCountRef.current += 1;

  return (
    <div>
      <h3>示例 3：渲染次数计数（调试）</h3>
      <div style={{ fontSize: "24px", margin: "20px 0" }}>
        <div>Count: {count}</div>
        <div style={{ color: "#f44336" }}>
          组件已渲染 {renderCountRef.current} 次
        </div>
      </div>
      <button
        onClick={() => setCount((c) => c + 1)}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        增加 Count（触发渲染）
      </button>
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        ⚠️ 注意：renderCountRef.current += 1 不会触发渲染，
        <br />
        只有 setCount 才会触发渲染
      </div>
    </div>
  );
}
