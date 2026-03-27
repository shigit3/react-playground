// 可选：用 children 封装卡片容器组件
// 这不是必须的，只是展示 children 的用法

interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      {title && <h3 style={{ marginTop: 0, marginBottom: "12px" }}>{title}</h3>}
      {children}
    </div>
  );
}
