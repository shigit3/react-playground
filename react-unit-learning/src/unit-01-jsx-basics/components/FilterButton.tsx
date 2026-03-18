// 接收 Props: label (string), isActive (boolean)
// 根据 isActive 显示不同的样式（激活时背景色不同）
// 提示：style={{ backgroundColor: isActive ? '#007bff' : '#e0e0e0' }}

export default function FilterButton({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  return (
    <button
      style={{
        backgroundColor: isActive ? "#007bff" : "#e0e0e0",
        color: isActive ? "white" : "#333",
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
