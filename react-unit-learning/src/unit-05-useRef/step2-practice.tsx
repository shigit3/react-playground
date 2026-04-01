import { useState, useRef, useEffect } from "react";

/**
 * 练习：useRef 存储不触发渲染的值
 *
 * 任务：
 * 1. 实现一个秒表，支持开始、暂停、继续、重置
 * 2. 实现一个输入框，显示输入变化次数（不是字符数）
 * 3. 实现一个按钮点击计数器，对比 useState 和 useRef 的区别
 *
 * 提示：
 * - 秒表需要存储定时器 ID 和开始时间
 * - 输入变化次数用 useRef 存储，不触发渲染
 * - 对比实验：一个用 useState，一个用 useRef
 */

export default function Step2Practice() {
  return (
    <div>
      <Practice1Stopwatch />
      <hr style={{ margin: "30px 0" }} />
      <Practice2InputChangeCount />
      <hr style={{ margin: "30px 0" }} />
      <Practice3Comparison />
    </div>
  );
}

// 练习 1：秒表
function Practice1Stopwatch() {
  const [time, setTime] = useState(0); // 显示的时间（毫秒）
  const [isRunning, setIsRunning] = useState(false);

  // TODO: 创建 refs
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // TODO: 实现开始功能
  const start = () => {
    if (timerRef.current) return; // 防止重复启动

    setIsRunning(true);
    // 记录开始时间（减去已经过的时间，支持暂停后继续）
    startTimeRef.current = Date.now() - time;

    timerRef.current = window.setInterval(() => {
      // 用当前时间减去开始时间，得到精确的经过时间
      setTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  // TODO: 实现暂停功能
  const pause = () => {
    setIsRunning(false);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // TODO: 实现重置功能
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // TODO: 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 格式化时间显示
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, "0")}`;
  };

  return (
    <div>
      <h3>练习 1：秒表</h3>
      <div
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          margin: "20px 0",
          fontFamily: "monospace",
        }}
      >
        {formatTime(time)}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={start}
          disabled={isRunning}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          {time === 0 ? "开始" : "继续"}
        </button>
        <button
          onClick={pause}
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
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <strong>💡 提示：</strong>
        <ul style={{ marginTop: "5px", paddingLeft: "20px", margin: 0 }}>
          <li>用 timerRef 存储 setInterval 的返回值</li>
          <li>用 startTimeRef 存储开始时间（Date.now()）</li>
          <li>每 10ms 更新一次时间显示</li>
        </ul>
      </div>
    </div>
  );
}

// 练习 2：输入变化次数
function Practice2InputChangeCount() {
  const [text, setText] = useState("");

  // TODO: 用 useRef 存储输入变化次数
  const changeCountRef = useRef(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    // TODO: 递增变化次数
    // 你的代码
    // 这题我没太懂什么意思其实
    changeCountRef.current += 1;
  };

  return (
    <div>
      <h3>练习 2：输入变化次数</h3>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="输入一些文字..."
        style={{
          padding: "8px",
          width: "300px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />
      <div style={{ fontSize: "18px", marginTop: "10px" }}>
        <div>当前文本：{text}</div>
        <div>字符数：{text.length}</div>
        <div style={{ color: "#2196f3", fontWeight: "bold" }}>
          输入变化次数：{changeCountRef.current}
        </div>
      </div>
      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <strong>💡 提示：</strong> 在 handleChange 中递增
        changeCountRef.current，
        <br />
        但这不会触发重新渲染，只有 setText 才会触发渲染
      </div>
    </div>
  );
}

// 练习 3：对比 useState 和 useRef
function Practice3Comparison() {
  // TODO: 创建两个计数器
  const [stateCount, setStateCount] = useState(0); // 用 useState
  const refCount = useRef(0); // 用 useRef

  const incrementState = () => {
    // TODO: 递增 stateCount
    // 你的代码
    setStateCount((prev) => prev + 1);
  };

  const incrementRef = () => {
    // TODO: 递增 refCount.current
    // 你的代码
    refCount.current++;
  };

  return (
    <div>
      <h3>练习 3：useState vs useRef 对比</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "2px solid #4caf50",
            borderRadius: "8px",
            backgroundColor: "#f1f8f4",
          }}
        >
          <h4>useState（会触发渲染）</h4>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}
          >
            {stateCount}
          </div>
          <button
            onClick={incrementState}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            点击 +1
          </button>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            ✅ 点击后立即看到变化
          </div>
        </div>

        <div
          style={{
            padding: "20px",
            border: "2px solid #f44336",
            borderRadius: "8px",
            backgroundColor: "#fef5f5",
          }}
        >
          <h4>useRef（不触发渲染）</h4>
          <div
            style={{ fontSize: "32px", fontWeight: "bold", margin: "10px 0" }}
          >
            {refCount.current}
          </div>
          <button
            onClick={incrementRef}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            点击 +1
          </button>
          <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            ⚠️ 点击后不会立即看到变化
            <br />
            （但值确实变了，点左边按钮触发渲染就能看到）
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <strong>🎯 实验：</strong>
        <ol style={{ marginTop: "5px", paddingLeft: "20px", marginBottom: 0 }}>
          <li>先点击右边的 useRef 按钮几次，观察数字不变</li>
          <li>再点击左边的 useState 按钮，观察右边的数字突然更新</li>
          <li>理解：useRef 的值变了，但不触发渲染，所以 UI 不更新</li>
        </ol>
      </div>
    </div>
  );
}
