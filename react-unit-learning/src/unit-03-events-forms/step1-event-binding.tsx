/**
 * 单元 3 - 步骤 1：事件绑定基础
 *
 * 学习目标：
 * 1. 理解 React 中的事件绑定语法
 * 2. 掌握事件处理函数的两种写法
 * 3. 对比 Vue 的 @click 和 React 的 onClick
 */

import { useState } from "react";

/**
 * 知识点 1：React 事件命名采用小驼峰（camelCase）
 * - Vue: @click, @input, @submit
 * - React: onClick, onInput, onSubmit
 */

/**
 * 知识点 2：事件处理函数的两种写法
 *
 * 方式 1：直接传递函数引用（推荐）
 * onClick={handleClick}
 *
 * 方式 2：使用箭头函数（需要传参数时）
 * onClick={() => handleClick(id)}
 *
 * ⚠️ 常见错误：
 * onClick={handleClick()} ❌ 这会立即执行函数！
 * onClick={handleClick}   ✅ 这才是正确的
 *
 * 💡 最佳实践：状态更新使用函数式更新
 * setCount(count + 1)        ❌ 直接依赖旧值（可能有问题）
 * setCount(prev => prev + 1) ✅ 函数式更新（推荐）
 */

function Step1EventBinding() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  // 方式 1：普通函数（使用函数式更新）
  function handleIncrement() {
    setCount((prev) => prev + 1);
  }

  // 方式 2：箭头函数（使用函数式更新）
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  // 带参数的事件处理（使用函数式更新）
  const handleAddNumber = (num: number) => {
    setCount((prev) => prev + num);
  };

  function handleClick() {
    setMessage("你好，React！");
  }

  const handleClick2 = () => {
    setMessage("事件处理很简单");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>步骤 1：事件绑定基础</h2>

      {/* 示例 1：基本的点击事件 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 1：基本点击事件</h3>
        <p>当前计数：{count}</p>

        {/* 方式 1：直接传递函数引用 */}
        <button onClick={handleIncrement} style={{ marginRight: "10px" }}>
          +1
        </button>

        {/* 方式 2：箭头函数包裹 */}
        <button onClick={handleDecrement}>-1</button>
      </div>

      {/* 示例 2：传递参数 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 2：传递参数</h3>
        <button
          onClick={() => handleAddNumber(5)}
          style={{ marginRight: "10px" }}
        >
          +5
        </button>
        <button onClick={() => handleAddNumber(10)}>+10</button>
      </div>

      {/* 示例 3：内联箭头函数（简单逻辑） */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 3：内联箭头函数</h3>
        <button onClick={() => setCount(0)}>重置计数</button>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* 🎯 练习任务 */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f0f8ff",
          border: "2px solid #4a90e2",
        }}
      >
        <h3>🎯 你的练习任务：</h3>
        <p>在下方实现一个简单的消息显示器：</p>
        <ol>
          <li>创建一个 message 状态（已创建）</li>
          <li>
            添加 3 个按钮，点击后分别显示不同的消息：
            <ul>
              <li>"你好，React！"</li>
              <li>"事件处理很简单"</li>
              <li>"我正在学习 React"</li>
            </ul>
          </li>
          <li>添加一个"清空消息"按钮</li>
          <li>在按钮下方显示当前消息</li>
        </ol>

        {/* 👇 在这里写你的代码 */}
        <div style={{ marginTop: "15px" }}>
          {/* TODO: 添加 4 个按钮 */}
          <button onClick={handleClick}>按钮1</button>
          <button onClick={handleClick2}>按钮2</button>
          <button onClick={() => setMessage("我正在学习 React")}>按钮3</button>
          <button onClick={() => setMessage("")}>清空消息</button>

          {/* TODO: 显示消息 */}
          <p
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "white",
              minHeight: "40px",
            }}
          >
            {/* 消息显示区域 */}
            {message || "暂无消息"}
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
        }}
      >
        <strong>💡 提示：</strong>
        <ul style={{ marginTop: "10px", marginBottom: 0 }}>
          <li>
            可以使用内联箭头函数：
            <code>onClick={'() => setMessage("文本")'}</code>
          </li>
          <li>也可以定义单独的处理函数</li>
          <li>完成后告诉我"完成了"，我会检查你的代码</li>
        </ul>
      </div>
    </div>
  );
}

export default Step1EventBinding;
