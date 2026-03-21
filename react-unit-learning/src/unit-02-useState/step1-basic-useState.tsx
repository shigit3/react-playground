// 单元 2 - Step 1: useState 基础用法
// 学习目标：理解 useState 的基本使用和状态更新机制

import { useState } from "react";

/**
 * 示例 1：计数器 - 最简单的 useState 使用
 *
 * 在 Vue 中：
 * const count = ref(0)
 * count.value++
 *
 * 在 React 中：
 * const [count, setCount] = useState(0)
 * setCount(count + 1)
 */
function Counter() {
  // useState 返回一个数组：[当前值, 更新函数]
  const [count, setCount] = useState(0);

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>计数器</h3>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
}

/**
 * 示例 2：切换开关 - boolean 状态
 */
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>开关</h3>
      <p>状态: {isOn ? "开启" : "关闭"}</p>
      {/* 切换状态的两种方式 */}
      <button onClick={() => setIsOn(!isOn)}>切换</button>
      <button onClick={() => setIsOn(true)}>开启</button>
      <button onClick={() => setIsOn(false)}>关闭</button>
    </div>
  );
}

/**
 * 示例 3：输入框 - string 状态
 */
function Input() {
  const [text, setText] = useState("");

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>输入框</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入一些文字..."
      />
      <p>你输入了: {text}</p>
      <p>字符数: {text.length}</p>
    </div>
  );
}

/**
 * 练习任务 点赞
 */

function Likes() {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <span style={{ fontWeight: "bold" }}>点赞器</span>
      <div>点赞数：{likes}</div>
      <div>
        <button
          onClick={() => {
            setLikes(likes + 1);
          }}
        >
          点赞
        </button>
        <button
          onClick={() => {
            // if (likes >= 1) {
            //   setLikes(likes - 1);
            // }
            setLikes(Math.max(0, likes - 1));
          }}
        >
          取消点赞
        </button>
      </div>
      <span>{likes > 0 ? `已有 ${likes} 人点赞` : "还没有人点赞"}</span>
    </div>
  );
}

// 主组件
export default function Step1BasicUseState() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Step 1: useState 基础用法</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Counter />
        <Toggle />
        <Input />
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
            <strong>useState 返回数组：</strong>[当前值, 更新函数]
          </li>
          <li>
            <strong>状态更新触发重新渲染：</strong>调用 setState
            会让组件重新渲染
          </li>
          <li>
            <strong>不能直接修改状态：</strong>count = count + 1 ❌，必须用
            setCount(count + 1) ✅
          </li>
          <li>
            <strong>初始值只在首次渲染时使用：</strong>useState(0) 的 0
            只在组件挂载时生效
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
        <p>在下方实现一个"点赞"组件：</p>
        <ul>
          <li>显示点赞数（初始为 0）</li>
          <li>点击"点赞"按钮，点赞数 +1</li>
          <li>点击"取消点赞"按钮，点赞数 -1（但不能小于 0）</li>
          <li>
            显示点赞状态文字（0 赞时显示"还没有人点赞"，否则显示"已有 X
            人点赞"）
          </li>
        </ul>
      </div>

      {/* 👇 在这里完成练习 */}
      <div style={{ marginTop: "20px" }}>
        <h3>你的练习：</h3>
        {/* TODO: 实现 LikeButton 组件 */}
        <Likes />
      </div>
    </div>
  );
}
