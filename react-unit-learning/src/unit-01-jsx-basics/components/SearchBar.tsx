// 接收 Props: searchTerm (string)
// 显示一个输入框（暂时只是展示，不需要交互）
// 提示：<input type="text" placeholder="搜索仓库..." value={searchTerm} />

export default function SearchBar({ searchTerm }: { searchTerm: string }) {
  return (
    <input
      type="text"
      placeholder="搜索仓库..."
      value={searchTerm}
      style={{
        width: "100%",
        padding: "10px",
        fontSize: "14px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
      readOnly
    />
  );
}
