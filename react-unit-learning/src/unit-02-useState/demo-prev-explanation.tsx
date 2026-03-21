// 演示：prev 到底是什么
import { useState } from "react";

export default function PrevExplanation() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("=== 开始点击 ===");
    console.log("1. 当前 count 的值:", count); // 假设是 0

    // 第一次调用 setCount
    setCount((prev) => {
      console.log("2. 第一次 setCount，prev =", prev); // prev = 0
      return prev + 1; // 返回 1
    });

    // 第二次调用 setCount
    setCount((prev) => {
      console.log("3. 第二次 setCount，prev =", prev); // prev = 1 (上一次的返回值)
      return prev + 1; // 返回 2
    });

    // 第三次调用 setCount
    setCount((prev) => {
      console.log("4. 第三次 setCount，prev =", prev); // prev = 2 (上一次的返回值)
      return prev + 1; // 返回 3
    });

    console.log("5. 三次 setCount 调用完毕，但 count 还是:", count); // 还是 0！
    console.log("=== 点击结束 ===");
    // 组件重新渲染后，count 才会变成 3
  };

  // 对比：不用函数式更新
  const handleClickBad = () => {
    console.log("=== 开始点击（错误方式）===");
    console.log("1. 当前 count 的值:", count); // 假设是 0

    setCount(count + 1); // count = 0, 设置为 1
    console.log("2. 第一次 setCount，使用的 count =", count); // 0

    setCount(count + 1); // count 还是 0, 设置为 1
    console.log("3. 第二次 setCount，使用的 count =", count); // 0

    setCount(count + 1); // count 还是 0, 设置为 1
    console.log("4. 第三次 setCount，使用的 count =", count); // 0

    console.log("5. 三次 setCount 调用完毕，count 还是:", count); // 还是 0
    console.log("=== 点击结束 ===");
    // 组件重新渲染后，count 只会变成 1（不是 3）
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>prev 到底是什么？</h1>

      <div style={{ fontSize: "24px", margin: "20px 0" }}>
        当前 count: {count}
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={handleClick}>✅ 函数式更新 +3 (打开控制台)</button>
        <button onClick={handleClickBad}>❌ 普通方式 +3 (打开控制台)</button>
        <button onClick={() => setCount(0)}>重置</button>
      </div>

      <div
        style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}
      >
        <h3>💡 关键理解</h3>
        <div style={{ marginBottom: "20px" }}>
          <h4>函数式更新：prev 是"最新值"</h4>
          <pre
            style={{ background: "#fff", padding: "10px", borderRadius: "4px" }}
          >
            {`setCount(prev => prev + 1);  // prev = 0, 返回 1
setCount(prev => prev + 1);  // prev = 1 (上一次的返回值)
setCount(prev => prev + 1);  // prev = 2 (上一次的返回值)
// 结果：count 变成 3 ✅`}
          </pre>
        </div>

        <div>
          <h4>普通方式：count 是"闭包中的旧值"</h4>
          <pre
            style={{ background: "#fff", padding: "10px", borderRadius: "4px" }}
          >
            {`// 假设当前 count = 0
setCount(count + 1);  // count = 0, 设置为 1
setCount(count + 1);  // count 还是 0, 设置为 1
setCount(count + 1);  // count 还是 0, 设置为 1
// 结果：count 变成 1 ❌`}
          </pre>
        </div>
      </div>

      <div
        style={{
          background: "#e7f3ff",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>🔍 深入理解</h3>
        <p>
          <strong>为什么 prev 是最新值？</strong>
        </p>
        <p>React 内部维护了一个更新队列：</p>
        <ol>
          <li>
            第一次 <code>setCount(prev =&gt; prev + 1)</code>：React 记录"当前值
            + 1"
          </li>
          <li>
            第二次 <code>setCount(prev =&gt; prev + 1)</code>：React
            记录"上一步的结果 + 1"
          </li>
          <li>
            第三次 <code>setCount(prev =&gt; prev + 1)</code>：React
            记录"上一步的结果 + 1"
          </li>
          <li>组件重新渲染时，React 按顺序执行这些更新</li>
        </ol>

        <p style={{ marginTop: "20px" }}>
          <strong>为什么普通方式不行？</strong>
        </p>
        <p>
          因为 <code>count</code> 是闭包中的值，在函数执行时就已经确定了：
        </p>
        <pre
          style={{ background: "#fff", padding: "10px", borderRadius: "4px" }}
        >
          {`const handleClick = () => {
  // 这里的 count 是 0（闭包捕获的值）
  setCount(count + 1);  // 0 + 1 = 1
  setCount(count + 1);  // 0 + 1 = 1（count 还是 0）
  setCount(count + 1);  // 0 + 1 = 1（count 还是 0）
};`}
        </pre>
      </div>

      <div
        style={{
          background: "#fff3cd",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>📝 总结</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                方式
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                使用的值
              </th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                结果
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <code>setCount(count + 1)</code>
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                闭包中的旧值（始终是 0）
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                ❌ 只 +1
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <code>setCount(prev =&gt; prev + 1)</code>
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                React 提供的最新值（0 → 1 → 2）
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                ✅ +3
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
