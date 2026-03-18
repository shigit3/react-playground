// 显示语言筛选按钮：All, JavaScript, TypeScript, Python, Java
// 使用 FilterButton 组件
// 接收 Props: activeFilter (string)

import FilterButton from "./FilterButton";

const languages = ["All", "JavaScript", "TypeScript", "Python", "Java"];

export default function FilterBar({ activeFilter }: { activeFilter: string }) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {languages.map((lang, index) => (
        <FilterButton
          key={index}
          label={lang}
          isActive={activeFilter === lang}
        />
      ))}
    </div>
  );
}
