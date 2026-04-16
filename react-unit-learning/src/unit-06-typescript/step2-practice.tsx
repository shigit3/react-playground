import {
  useState,
  type ChangeEvent,
  type MouseEvent,
  type SubmitEvent,
} from "react";

export default function Step2Practice() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [savedTitle, setSavedTitle] = useState("");
  const [savedDetails, setSavedDetails] = useState("");
  const [submitCount, setSubmitCount] = useState(0);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: 用 e.target.value 更新 title
    setTitle(e.target.value);
  };

  const handleDetailsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: 用 e.target.value 更新 details
    setDetails(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    // TODO: 阻止默认提交，并把当前输入保存到 savedTitle / savedDetails
    // TODO: 同时把 submitCount + 1
    e.preventDefault();
    setSavedTitle(title.trim());
    setSavedDetails(details.trim());
    setSubmitCount((prev) => prev + 1);
  };

  const handleClear = (_e: MouseEvent<HTMLButtonElement>) => {
    // TODO: 清空 title、details、savedTitle、savedDetails
    // TODO: 是否重置 submitCount 由你决定
    setTitle("");
    setDetails("");
    setSavedTitle("");
    setSavedDetails("");
    setSubmitCount(0);
  };

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <section
        style={{
          padding: "16px",
          backgroundColor: "#fff7ed",
          border: "1px solid #fdba74",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>练习：反馈表单</h2>
        <p>目标：给表单事件正确加上 TypeScript 类型。</p>
        <ol>
          <li>
            标题输入框使用 <code>ChangeEvent&lt;HTMLInputElement&gt;</code>
          </li>
          <li>
            详情输入框使用 <code>ChangeEvent&lt;HTMLTextAreaElement&gt;</code>
          </li>
          <li>
            表单提交使用 <code>SubmitEvent&lt;HTMLFormElement&gt;</code>
          </li>
          <li>
            清空按钮使用 <code>MouseEvent&lt;HTMLButtonElement&gt;</code>
          </li>
          <li>提交后在下方预览区显示保存结果</li>
        </ol>
      </section>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          padding: "16px",
          backgroundColor: "#f8fafc",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
        }}
      >
        <label style={{ display: "grid", gap: "6px" }}>
          <span>反馈标题</span>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="例如：按钮点击反馈不明显"
            style={{ padding: "10px 12px", fontSize: "16px" }}
          />
        </label>

        <label style={{ display: "grid", gap: "6px" }}>
          <span>反馈详情</span>
          <textarea
            value={details}
            onChange={handleDetailsChange}
            placeholder="描述你观察到的问题或建议"
            rows={5}
            style={{
              padding: "10px 12px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />
        </label>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button type="submit">保存反馈</button>
          <button type="button" onClick={handleClear}>
            清空内容
          </button>
        </div>
      </form>

      <section
        style={{
          padding: "16px",
          backgroundColor: "#eff6ff",
          border: "1px solid #93c5fd",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>预览区</h2>
        <p>当前标题输入：{title || "（空）"}</p>
        <p>当前详情字数：{details.length}</p>
        <p>已提交次数：{submitCount}</p>
        <hr />
        <p>已保存标题：{savedTitle || "还没有保存"}</p>
        <p>已保存详情：{savedDetails || "还没有保存"}</p>
      </section>

      <section
        style={{
          padding: "16px",
          backgroundColor: "#fef2f2",
          border: "1px solid #fca5a5",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>完成标准</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>四个事件处理函数都写对类型</li>
          <li>标题和详情能实时更新</li>
          <li>提交时不会刷新页面</li>
          <li>点“保存反馈”后，预览区能显示已保存结果</li>
          <li>完成后告诉我“完成了”，我来帮你检查</li>
        </ul>
      </section>
    </div>
  );
}
