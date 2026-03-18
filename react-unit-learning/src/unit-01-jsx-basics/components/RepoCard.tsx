// TODO: 1. 定义 RepoCardProps 接口
interface RepoCardProps {
  name: string;
  stars: number;
  language: string;
  description?: string;
  isArchived?: boolean;
}

// TODO: 2. 创建 RepoCard 组件
export default function RepoCard({
  name,
  stars,
  language,
  description,
  isArchived,
}: RepoCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        margin: "8px 0",
        backgroundColor: isArchived ? "#f5f5f5" : "white",
        borderRadius: "8px",
      }}
    >
      {/* 仓库名 */}
      <div
        style={{
          color: "yellowgreen",
          marginBottom: "8px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {name}
        {isArchived && (
          <span
            style={{
              marginLeft: "8px",
              fontSize: "12px",
              color: "#999",
              backgroundColor: "#e0e0e0",
              padding: "2px 6px",
              borderRadius: "3px",
            }}
          >
            已归档
          </span>
        )}
      </div>

      {/* 描述 */}
      {description && (
        <div style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>
          {description}
        </div>
      )}

      {/* Star 数和语言 */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div>
          ⭐{stars.toLocaleString()}
          {stars > 100000 && <span style={{ marginLeft: "8px" }}>🔥</span>}
        </div>
        <div
          style={{
            fontFamily: "ui-monospace",
            backgroundColor: "#e3f2fd",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {language}
        </div>
      </div>
    </div>
  );
}
