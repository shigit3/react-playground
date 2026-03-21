// 单元 2 - Step 2: 函数式更新和状态更新的异步性
// 学习目标：理解为什么需要函数式更新，避免常见陷阱

import { useState, useRef } from "react";

/**
 * 示例 1：状态更新的陷阱 - 连续更新问题
 *
 * ⚠️ 问题：连续调用 setState 时，可能不会得到预期结果
 */
function CounterProblem() {
  const [count, setCount] = useState(0);

  // ❌ 错误示例：连续更新
  const handleBadIncrement = () => {
    setCount(count + 1); // count = 0, 设置为 1
    setCount(count + 1); // count 还是 0, 设置为 1
    setCount(count + 1); // count 还是 0, 设置为 1
    // 结果：只增加了 1，而不是 3
  };

  // ✅ 正确示例：使用函数式更新
  const handleGoodIncrement = () => {
    setCount((prev) => prev + 1); // prev = 0, 返回 1
    setCount((prev) => prev + 1); // prev = 1, 返回 2
    setCount((prev) => prev + 1); // prev = 2, 返回 3
    // 结果：增加了 3
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>连续更新问题</h3>
      <p>当前计数: {count}</p>
      <button onClick={handleBadIncrement}>❌ 错误方式 +3</button>
      <button onClick={handleGoodIncrement} style={{ marginLeft: "10px" }}>
        ✅ 正确方式 +3
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: "10px" }}>
        重置
      </button>
    </div>
  );
}

/**
 * 示例 2：异步更新问题
 *
 * ⚠️ 状态更新是异步的，不能立即读取新值
 */
function AsyncUpdateProblem() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("更新前:", count);
    setCount(count + 1);
    console.log("更新后:", count); // ⚠️ 这里还是旧值！
    // 状态更新是异步的，这里读取的还是旧值
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>异步更新问题</h3>
      <p>当前计数: {count}</p>
      <button onClick={handleClick}>+1 (打开控制台查看)</button>
      <p style={{ fontSize: "14px", color: "#666" }}>
        💡 点击按钮后，打开浏览器控制台，你会发现"更新后"打印的还是旧值
      </p>
    </div>
  );
}

/**
 * 示例 3：对比普通方式 vs 函数式更新
 *
 * 💡 试试快速点击按钮，看看有什么区别
 */
function ShoppingCart() {
  const [quantityBad, setQuantityBad] = useState(1);
  const [quantityGood, setQuantityGood] = useState(1);

  // ❌ 普通方式 - 快速点击可能丢失更新
  const incrementBad = () => setQuantityBad(quantityBad + 1);

  // ✅ 函数式更新 - 永远不会丢失更新
  const incrementGood = () => setQuantityGood((prev) => prev + 1);

  // 模拟快速连续点击（比人手快得多）
  const rapidClickBad = () => {
    // 连续调用 5 次，看看能增加多少
    for (let i = 0; i < 5; i++) {
      setQuantityBad(quantityBad + 1);
    }
  };

  const rapidClickGood = () => {
    // 连续调用 5 次，看看能增加多少
    for (let i = 0; i < 5; i++) {
      setQuantityGood((prev) => prev + 1);
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>对比：普通方式 vs 函数式更新</h3>

      <div style={{ marginBottom: "20px" }}>
        <h4>❌ 普通方式（有问题）</h4>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>数量: {quantityBad}</span>
          <button onClick={incrementBad}>+1</button>
          <button onClick={rapidClickBad}>快速 +5 次</button>
          <button onClick={() => setQuantityBad(1)}>重置</button>
        </div>
        <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}>
          点击"快速 +5 次"，你会发现只增加了 1，而不是 5
        </p>
      </div>

      <div>
        <h4>✅ 函数式更新（正确）</h4>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>数量: {quantityGood}</span>
          <button onClick={incrementGood}>+1</button>
          <button onClick={rapidClickGood}>快速 +5 次</button>
          <button onClick={() => setQuantityGood(1)}>重置</button>
        </div>
        <p style={{ fontSize: "12px", color: "#666", margin: "5px 0 0 0" }}>
          点击"快速 +5 次"，正确增加了 5
        </p>
      </div>
    </div>
  );
}

/**
 * 示例 4：定时器场景 - 必须使用函数式更新
 *
 * 在定时器、事件监听等异步场景中，必须使用函数式更新
 */
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const start = () => {
    setIsRunning(true);

    // ❌ 错误：使用闭包中的 seconds
    // const interval = setInterval(() => {
    //   setSeconds(seconds + 1); // seconds 永远是 0
    // }, 1000);

    // ✅ 正确：使用函数式更新
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1); // 总是基于最新值
    }, 1000);

    // 5秒后自动停止
    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
    }, 5000);
  };

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>定时器</h3>
      <p>已运行: {seconds} 秒</p>
      <button onClick={start} disabled={isRunning}>
        开始 (5秒自动停止)
      </button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        重置
      </button>
    </div>
  );
}

function Combo() {
  const [comboCount, setComboCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // ✅ 使用 useRef 保存 interval，重新渲染时不会丢失
  const intervalRef = useRef<number | null>(null);

  const superCombo = () => {
    setComboCount((prev) => prev + 1);
    setComboCount((prev) => prev + 1);
    setComboCount((prev) => prev + 1);
  };

  const autoCombo = () => {
    setIsRunning(true);

    // 保存到 ref.current
    intervalRef.current = setInterval(() => {
      setComboCount((prev) => prev + 1);
    }, 1000);

    setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsRunning(false);
    }, 5000);
  };

  const reset = () => {
    console.log("interval:", intervalRef.current); // 现在能正确打印了
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setComboCount(0);
    setIsRunning(false);
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>连击计数器</h3>
      <div style={{ fontSize: "24px", margin: "10px 0" }}>
        连击次数：{comboCount}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            setComboCount((prev) => prev + 1);
          }}
        >
          连击 +1
        </button>
        <button onClick={superCombo}>超级连击 +3</button>
        <button onClick={autoCombo} disabled={isRunning}>
          自动连击 (5秒)
        </button>
        <button onClick={reset}>重置</button>
      </div>
      <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
        💡 打开控制台，点击"重置"可以看到 interval 的值
      </p>
    </div>
  );
}

// 主组件
export default function Step2FunctionalUpdate() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Step 2: 函数式更新和异步性</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <CounterProblem />
        <AsyncUpdateProblem />
        <ShoppingCart />
        <Timer />
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>💡 关键知识点</h3>
        <ul>
          <li>
            <strong>函数式更新：</strong>
            <code>setState(prev =&gt; prev + 1)</code> 而不是{" "}
            <code>setState(value + 1)</code>
          </li>
          <li>
            <strong>何时使用函数式更新：</strong>
            <ul>
              <li>新状态依赖旧状态时</li>
              <li>连续多次更新时</li>
              <li>在定时器、事件监听等异步场景中</li>
            </ul>
          </li>
          <li>
            <strong>状态更新是异步的：</strong>
            调用 setState 后不能立即读取新值
          </li>
          <li>
            <strong>React 会批量处理更新：</strong>
            多次 setState 会合并成一次重新渲染（性能优化）
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#ffe6e6",
          borderRadius: "8px",
        }}
      >
        <h3>⚠️ 常见错误</h3>
        <ul>
          <li>
            <strong>连续更新不用函数式：</strong>
            <pre
              style={{
                background: "#fff",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {`// ❌ 错误
setCount(count + 1);
setCount(count + 1);  // 只会 +1

// ✅ 正确
setCount(prev => prev + 1);
setCount(prev => prev + 1);  // 会 +2`}
            </pre>
          </li>
          <li>
            <strong>在定时器中不用函数式：</strong>
            <pre
              style={{
                background: "#fff",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              {`// ❌ 错误 - 闭包陷阱
setInterval(() => {
  setCount(count + 1);  // count 永远是初始值
}, 1000);

// ✅ 正确
setInterval(() => {
  setCount(prev => prev + 1);  // 总是最新值
}, 1000);`}
            </pre>
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#fff3cd",
          borderRadius: "8px",
        }}
      >
        <h3>🎯 练习任务</h3>
        <p>实现一个"连击计数器"：</p>
        <ul>
          <li>显示连击次数（初始为 0）</li>
          <li>点击"连击"按钮，连击数 +1</li>
          <li>点击"超级连击"按钮，连击数一次 +3（必须用函数式更新）</li>
          <li>点击"自动连击"按钮，每秒自动 +1，持续 5 秒</li>
          <li>点击"重置"按钮，连击数归零</li>
        </ul>
        <p style={{ color: "#856404" }}>
          💡 提示：自动连击必须使用函数式更新，否则会有闭包陷阱
        </p>
      </div>

      {/* 👇 在这里完成练习 */}
      <div style={{ marginTop: "20px" }}>
        <h3>你的练习：</h3>
        {/* TODO: 实现 ComboCounter 组件 */}
        <Combo />
      </div>
    </div>
  );
}
