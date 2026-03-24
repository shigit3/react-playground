/**
 * 单元 3 - 步骤 2：事件对象和类型
 *
 * 学习目标：
 * 1. 理解 React 的合成事件（SyntheticEvent）
 * 2. 掌握常用事件类型（MouseEvent、ChangeEvent、KeyboardEvent）
 * 3. 学会使用事件对象获取信息
 */

import {
  useState,
  type MouseEvent,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

/**
 * 知识点 1：React 的合成事件
 *
 * React 不直接使用原生 DOM 事件，而是使用合成事件（SyntheticEvent）
 * - 跨浏览器兼容
 * - 性能优化（事件委托）
 * - API 与原生事件基本一致
 */

/**
 * 知识点 2：常用事件类型（TypeScript）
 *
 * MouseEvent<HTMLButtonElement>   - 鼠标事件（点击、移动等）
 * ChangeEvent<HTMLInputElement>   - 输入变化事件
 * KeyboardEvent<HTMLInputElement> - 键盘事件
 * FormEvent<HTMLFormElement>      - 表单提交事件
 * FocusEvent<HTMLInputElement>    - 焦点事件
 */

/**
 * 知识点 3：事件对象常用属性
 *
 * e.target        - 触发事件的元素
 * e.currentTarget - 绑定事件的元素
 * e.preventDefault() - 阻止默认行为
 * e.stopPropagation() - 阻止事件冒泡
 */

function Step2EventObject() {
  const [clickInfo, setClickInfo] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [keyInfo, setKeyInfo] = useState("");
  const [message, setMessage] = useState("");
  const [last, setLast] = useState("");

  // 鼠标事件：获取点击位置
  const handleMouseClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("事件类型:", e.type);
    console.log("目标元素:", e.currentTarget);
    const info = `点击位置：X=${e.clientX}, Y=${e.clientY}`;
    setClickInfo(info);
  };

  // 输入事件：获取输入值
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    console.log("当前输入:", value);
  };

  // 键盘事件：检测按键
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const info = `按键：${e.key} (code: ${e.code})`;
    setKeyInfo(info);

    // 检测特殊键
    if (e.key === "Enter") {
      console.log("按下了回车键");
    }
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault(); // 阻止浏览器保存
      console.log("按下了 Ctrl+S");
    }
  };

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  function handleAreaKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.ctrlKey && e.key === "b") {
      setMessage((prev) => `${prev}**粗体**`);
      setLast("Ctrl+B");
    } else if (e.ctrlKey && e.key === "i") {
      setMessage((prev) => `${prev}*斜体*`);
      setLast("Ctrl+I");
    } else if (e.key === "Escape") {
      setMessage("");
      setLast("Escape");
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>步骤 2：事件对象和类型</h2>

      {/* 示例 1：鼠标事件 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 1：鼠标事件（MouseEvent）</h3>
        <button
          onClick={handleMouseClick}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          点击我，查看点击位置
        </button>
        <p style={{ marginTop: "10px", color: "#666" }}>
          {clickInfo || "还没有点击"}
        </p>
      </div>

      {/* 示例 2：输入事件 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 2：输入事件（ChangeEvent）</h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="输入一些文字..."
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
        <p style={{ marginTop: "10px", color: "#666" }}>
          当前输入：{inputValue || "（空）"}
        </p>
        <p style={{ fontSize: "14px", color: "#999" }}>
          字符数：{inputValue.length}
        </p>
      </div>

      {/* 示例 3：键盘事件 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 3：键盘事件（KeyboardEvent）</h3>
        <input
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="按下任意键..."
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
        <p style={{ marginTop: "10px", color: "#666" }}>
          {keyInfo || "还没有按键"}
        </p>
        <p style={{ fontSize: "14px", color: "#999" }}>
          💡 试试按 Enter 或 Ctrl+S
        </p>
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
        <p>实现一个简单的文本编辑器，包含以下功能：</p>
        <ol>
          <li>一个 textarea 输入框</li>
          <li>实时显示字符数和单词数</li>
          <li>
            检测快捷键：
            <ul>
              <li>Ctrl+B：在文本末尾添加 "**粗体**"</li>
              <li>Ctrl+I：在文本末尾添加 "*斜体*"</li>
              <li>Escape：清空文本</li>
            </ul>
          </li>
          <li>显示最后按下的快捷键</li>
        </ol>

        {/* 👇 在这里写你的代码 */}
        <div style={{ marginTop: "15px" }}>
          {/* TODO: 添加 textarea */}
          <textarea
            value={message}
            onChange={handleChange}
            onKeyDown={handleAreaKeyDown}
            placeholder="随便啦..."
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />

          {/* TODO: 显示统计信息 */}
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            <p>字符数：{message.length}</p>
            <p>
              单词数：
              {message.length > 0 ? message.trim().split(/\s+/).length : 0}
            </p>
            <p>最后快捷键：{last || "还没用过快捷键"}</p>
          </div>
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
            textarea 的类型是{" "}
            <code>ChangeEvent&lt;HTMLTextAreaElement&gt;</code>
          </li>
          <li>
            键盘事件类型是 <code>KeyboardEvent&lt;HTMLTextAreaElement&gt;</code>
          </li>
          <li>
            单词数可以用 <code>text.trim().split(/\s+/).length</code> 计算
          </li>
          <li>
            记得用 <code>e.preventDefault()</code> 阻止浏览器默认行为
          </li>
          <li>完成后告诉我"完成了"</li>
        </ul>
      </div>
    </div>
  );
}

export default Step2EventObject;
