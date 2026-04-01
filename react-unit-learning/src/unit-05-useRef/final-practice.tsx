import { useState, useRef, useEffect } from "react";

/**
 * 最终综合练习：番茄钟计时器
 *
 * 功能要求：
 * 1. 支持工作模式（25分钟）和休息模式（5分钟）
 * 2. 支持开始、暂停、继续、重置
 * 3. 倒计时结束时自动切换模式并提示
 * 4. 显示当前是第几个番茄钟
 * 5. 支持自定义时长
 *
 * 技术要点：
 * - useState: 管理时间、模式、运行状态
 * - useRef: 存储定时器 ID
 * - useEffect: 监听倒计时结束，清理定时器
 *
 * 提示：
 * - 倒计时可以用简单的 setInterval + 每秒减 1
 * - 不需要用复杂的时间戳方式（这次简单点）
 * - 到 0 时自动切换模式
 */

type Mode = "work" | "break";

// 配置对象（更优雅）
const MODE_CONFIG = {
  work: { duration: 1 * 60, label: "🔥 工作时间", color: "#e74c3c" },
  break: { duration: 5 * 60, label: "☕ 休息时间", color: "#27ae60" },
} as const;

export default function FinalPractice() {
  // TODO: 状态管理
  const [seconds, setSeconds] = useState(MODE_CONFIG.work.duration); // 剩余秒数
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<Mode>("work");
  const [pomodoroCount, setPomodoroCount] = useState(0); // 完成的番茄钟数量

  // TODO: 定时器 ref
  const timerRef = useRef<number | null>(null);

  // TODO: 实现开始功能
  const start = () => {
    // 你的代码
    setIsRunning(true);
    if (timerRef.current) return;
    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
  };

  // TODO: 实现暂停功能
  const pause = () => {
    // 你的代码
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // TODO: 实现重置功能
  const reset = () => {
    setIsRunning(false);
    setSeconds(MODE_CONFIG[mode].duration); // 使用配置
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // TODO: 实现切换模式功能
  const switchMode = () => {
    // 停止定时器
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    // 切换模式（更优雅的写法）
    const newMode: Mode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setSeconds(MODE_CONFIG[newMode].duration);
  };

  // TODO: 监听倒计时结束
  useEffect(() => {
    if (seconds !== 0) return;

    // 停止定时器
    setIsRunning(false);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 切换模式（复用逻辑）
    const newMode: Mode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setSeconds(MODE_CONFIG[newMode].duration);

    // 工作模式结束，增加计数
    if (mode === "work") {
      setPomodoroCount((prev) => prev + 1);
    }
  }, [seconds, mode]);

  // TODO: 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  // 格式化时间显示
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        🍅 番茄钟计时器
      </h2>

      {/* 模式指示 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: MODE_CONFIG[mode].color,
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {MODE_CONFIG[mode].label}
      </div>

      {/* 时间显示 */}
      <div
        style={{
          fontSize: "80px",
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "monospace",
          margin: "40px 0",
          color: "#333",
        }}
      >
        {formatTime(seconds)}
      </div>

      {/* 番茄钟计数 */}
      <div
        style={{
          textAlign: "center",
          fontSize: "18px",
          marginBottom: "30px",
          color: "#666",
        }}
      >
        已完成 {pomodoroCount} 个番茄钟 🍅
      </div>

      {/* 控制按钮 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={start}
          disabled={isRunning}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#27ae60",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          {seconds === MODE_CONFIG[mode].duration ? "开始" : "继续"}
        </button>
        <button
          onClick={pause}
          disabled={!isRunning}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f39c12",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          暂停
        </button>
        <button
          onClick={reset}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          重置
        </button>
        <button
          onClick={switchMode}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          切换模式
        </button>
      </div>

      {/* 提示信息 */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <strong>💡 实现提示：</strong>
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          <li>
            用 <code>setInterval</code> 每秒减 1（简单方式）
          </li>
          <li>
            用 <code>useEffect</code> 监听 <code>seconds</code>，到 0 时自动切换
          </li>
          <li>切换模式时重置时间：工作 25 分钟，休息 5 分钟</li>
          <li>工作模式结束时增加番茄钟计数</li>
          <li>
            可以用 <code>alert()</code> 或 <code>console.log()</code>{" "}
            提示倒计时结束
          </li>
        </ul>
      </div>

      {/* 进阶功能（可选 - 未完成） */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#e3f2fd",
          borderRadius: "8px",
          fontSize: "14px",
        }}
      >
        <strong>🚀 进阶功能（可选 - 待完成）：</strong>
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          <li>⏸️ 添加自定义时长输入框</li>
          <li>
            ⏸️ 添加音效提示（可以用 <code>new Audio(url).play()</code>）
          </li>
          <li>⏸️ 添加进度条显示</li>
          <li>⏸️ 保存番茄钟历史记录到 localStorage</li>
          <li>⏸️ 添加长休息模式（完成 4 个番茄钟后休息 15 分钟）</li>
        </ul>
        <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
          💡 提示：这些功能可以在学完后面的单元后回来完成
        </div>
      </div>
    </div>
  );
}
