/**
 * Step 2 示例：清理函数（cleanup）
 */

import { useState, useEffect } from "react";

// 示例 1：定时器需要清理
function Example1() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    console.log("⏰ 启动定时器");
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // 清理函数：组件卸载或依赖变化时执行
    return () => {
      console.log("🧹 清理定时器");
      clearInterval(timer);
    };
  }, [isRunning]);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 1：定时器清理</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>Count: {count}</p>
      <button
        onClick={() => setIsRunning(!isRunning)}
        style={{
          padding: "8px 16px",
          background: isRunning ? "#ef4444" : "#10b981",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isRunning ? "停止" : "开始"}
      </button>
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 打开控制台查看定时器的启动和清理日志
      </p>
    </div>
  );
}

// 示例 2：事件监听需要清理
function Example2() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!isTracking) return;

    console.log("👆 开始监听鼠标移动");

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 清理函数：移除事件监听
    return () => {
      console.log("🧹 移除鼠标监听");
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTracking]);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 2：事件监听清理</h3>
      <button
        onClick={() => setIsTracking(!isTracking)}
        style={{
          padding: "8px 16px",
          background: isTracking ? "#ef4444" : "#10b981",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        {isTracking ? "停止追踪" : "开始追踪"}
      </button>
      {isTracking && (
        <div
          style={{
            padding: "10px",
            background: "#f3f4f6",
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
        >
          鼠标位置: X: {position.x}, Y: {position.y}
        </div>
      )}
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 点击"开始追踪"后移动鼠标，查看位置变化
      </p>
    </div>
  );
}

// 示例 3：组件卸载时清理
function ChildComponent() {
  useEffect(() => {
    console.log("✅ 子组件挂载");

    return () => {
      console.log("❌ 子组件卸载，执行清理");
    };
  }, []);

  return (
    <div
      style={{
        padding: "15px",
        background: "#dbeafe",
        borderRadius: "8px",
        margin: "10px 0",
      }}
    >
      我是子组件，打开控制台查看挂载和卸载日志
    </div>
  );
}

function Example3() {
  const [show, setShow] = useState(true);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 3：组件卸载时清理</h3>
      <button
        onClick={() => setShow(!show)}
        style={{
          padding: "8px 16px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {show ? "隐藏" : "显示"}子组件
      </button>
      {show && <ChildComponent />}
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 点击按钮切换子组件，查看控制台的挂载和卸载日志
      </p>
    </div>
  );
}

// 示例 4：为什么需要清理？（错误示例对比）
function Example4Bad() {
  const [count, setCount] = useState(0);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // ❌ 错误：没有清理定时器
    // 每次 trigger 变化都会创建新的定时器，但旧的定时器没有清理
    console.log("❌ 创建了新的定时器，但没有清理旧的");
    setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    // 多次点击按钮后，会有多个定时器同时运行！
  }, [trigger]);

  return (
    <div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#dc2626",
          marginBottom: "10px",
        }}
      >
        Count: {count}
      </div>
      <button
        onClick={() => setTrigger((prev) => prev + 1)}
        style={{
          padding: "6px 12px",
          background: "#dc2626",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        重新创建定时器（不清理旧的）
      </button>
      <div style={{ fontSize: "12px", color: "#991b1b", marginTop: "5px" }}>
        已创建 {trigger + 1} 个定时器
      </div>
    </div>
  );
}

function Example4Good() {
  const [count, setCount] = useState(0);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // ✅ 正确：清理定时器
    console.log("✅ 创建新定时器，并清理旧的");
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log("🧹 清理旧定时器");
      clearInterval(timer);
    };
  }, [trigger]);

  return (
    <div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#059669",
          marginBottom: "10px",
        }}
      >
        Count: {count}
      </div>
      <button
        onClick={() => setTrigger((prev) => prev + 1)}
        style={{
          padding: "6px 12px",
          background: "#059669",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        重新创建定时器（清理旧的）
      </button>
      <div style={{ fontSize: "12px", color: "#047857", marginTop: "5px" }}>
        触发了 {trigger + 1} 次，但只有 1 个定时器
      </div>
    </div>
  );
}

function Example4() {
  const [showBad, setShowBad] = useState(false);
  const [showGood, setShowGood] = useState(false);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 4：为什么需要清理？</h3>

      <div
        style={{
          padding: "15px",
          background: "#fef3c7",
          borderRadius: "8px",
          marginBottom: "15px",
          borderLeft: "4px solid #f59e0b",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>⚠️ 不清理的后果</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>
            <strong>内存泄漏：</strong>定时器、事件监听器不会自动销毁
          </li>
          <li>
            <strong>重复执行：</strong>每次渲染都创建新的副作用
          </li>
          <li>
            <strong>性能问题：</strong>大量未清理的副作用会拖慢应用
          </li>
          <li>
            <strong>意外行为：</strong>组件卸载后仍在执行副作用
          </li>
        </ul>
      </div>

      {/* 错误示例 */}
      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => setShowBad(!showBad)}
          style={{
            padding: "8px 16px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          {showBad ? "隐藏" : "显示"}错误示例（❌ 不清理）
        </button>
        {showBad && (
          <div
            style={{
              padding: "15px",
              background: "#fee2e2",
              borderRadius: "8px",
              border: "1px solid #fca5a5",
            }}
          >
            <p
              style={{
                margin: "0 0 10px 0",
                fontWeight: "bold",
                color: "#dc2626",
              }}
            >
              ❌ 错误：没有清理定时器
            </p>
            <Example4Bad />
            <p
              style={{
                fontSize: "14px",
                color: "#991b1b",
                marginTop: "10px",
              }}
            >
              💡 多次点击按钮，count
              会越来越快！因为每次都创建新定时器但不清理旧的，多个定时器同时运行
            </p>
          </div>
        )}
      </div>

      {/* 正确示例 */}
      <div>
        <button
          onClick={() => setShowGood(!showGood)}
          style={{
            padding: "8px 16px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          {showGood ? "隐藏" : "显示"}正确示例（✅ 清理）
        </button>
        {showGood && (
          <div
            style={{
              padding: "15px",
              background: "#d1fae5",
              borderRadius: "8px",
              border: "1px solid #6ee7b7",
            }}
          >
            <p
              style={{
                margin: "0 0 10px 0",
                fontWeight: "bold",
                color: "#059669",
              }}
            >
              ✅ 正确：清理定时器
            </p>
            <Example4Good />
            <p
              style={{
                fontSize: "14px",
                color: "#047857",
                marginTop: "10px",
              }}
            >
              💡 多次点击按钮，count
              速度保持不变！因为每次创建新定时器前都清理了旧的
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 主组件
export default function Step2Example() {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Step 2 示例：清理函数</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Example1 />
        <Example2 />
        <Example3 />
        <Example4 />
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          background: "#eff6ff",
          borderRadius: "8px",
          borderLeft: "4px solid #3b82f6",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>📖 清理函数规则</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>清理函数在组件卸载时执行</li>
          <li>清理函数在下次 effect 执行前也会执行（清理上一次的副作用）</li>
          <li>定时器、事件监听、订阅等都需要清理</li>
          <li>清理函数是可选的，不是所有 effect 都需要清理</li>
        </ul>
      </div>
    </div>
  );
}
