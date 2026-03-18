// 接收 Props: label (string)
// 显示一个按钮（暂时只是展示，不需要交互）

export default function SortButton({ label }: { label: string }) {
  return (
    <button
      style={{
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
      }}
    >
      {label}
    </button>
  );
}
