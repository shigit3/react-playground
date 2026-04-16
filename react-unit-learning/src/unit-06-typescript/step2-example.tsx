import {
  useState,
  type ChangeEvent,
  type MouseEvent,
  type SubmitEvent,
} from "react";

export default function Step2Example() {
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [buttonLog, setButtonLog] = useState("还没有点击快捷按钮");
  const [email, setEmail] = useState("");
  const [savedEmail, setSavedEmail] = useState("");

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleQuickFill = (e: MouseEvent<HTMLButtonElement>) => {
    setKeyword("react typescript");
    setButtonLog(`刚点击了按钮：${e.currentTarget.textContent ?? "未知按钮"}`);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedKeyword(keyword.trim());
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSaveEmail = (e: MouseEvent<HTMLButtonElement>) => {
    setSavedEmail(email.trim());
    setButtonLog(`保存邮箱按钮被点击：${e.currentTarget.textContent ?? "保存"}`);
  };

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <section
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>示例 1：输入框 + 提交表单</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
          <input
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="输入搜索关键词"
            style={{ padding: "10px 12px", fontSize: "16px" }}
          />
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button type="submit">提交搜索</button>
            <button type="button" onClick={handleQuickFill}>
              填入 React TS
            </button>
          </div>
        </form>
        <p>当前输入：{keyword || "（空）"}</p>
        <p>上次提交：{submittedKeyword || "还没有提交"}</p>
      </section>

      <section
        style={{
          padding: "16px",
          backgroundColor: "#fefce8",
          border: "1px solid #fde68a",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>示例 2：按钮点击事件</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="输入邮箱"
            style={{ padding: "10px 12px", minWidth: "260px" }}
          />
          <button type="button" onClick={handleSaveEmail}>
            保存邮箱
          </button>
        </div>
        <p>输入中的邮箱：{email || "（空）"}</p>
        <p>已保存邮箱：{savedEmail || "还没有保存"}</p>
        <p>按钮日志：{buttonLog}</p>
      </section>

      <section
        style={{
          padding: "16px",
          backgroundColor: "#eff6ff",
          border: "1px solid #93c5fd",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>这一页要记住的点</h2>
        <ul style={{ marginBottom: 0 }}>
          <li>
            <code>onChange</code> 常见写法是{" "}
            <code>ChangeEvent&lt;HTMLInputElement&gt;</code>
          </li>
          <li>
            <code>onClick</code> 常见写法是{" "}
            <code>MouseEvent&lt;HTMLButtonElement&gt;</code>
          </li>
          <li>
            <code>onSubmit</code> 常见写法是{" "}
            <code>SubmitEvent&lt;HTMLFormElement&gt;</code>
          </li>
        </ul>
      </section>
    </div>
  );
}
