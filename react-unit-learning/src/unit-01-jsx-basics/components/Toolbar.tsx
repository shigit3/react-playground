// 组合 SearchBar, FilterBar, SortButton
// 使用 flexbox 布局 + children 组件组合

import { type ReactNode } from "react";

interface ToolbarProps {
  children: ReactNode;
}

export default function Toolbar({ children }: ToolbarProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      {children}
    </div>
  );
}
