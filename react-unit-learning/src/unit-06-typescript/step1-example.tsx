/**
 * Step 1 示例：Props 类型定义
 */

import type { ReactNode } from "react";

// ============================================
// 1. 使用 interface 定义 Props
// ============================================

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary"; // 可选属性 + 联合类型
  disabled?: boolean;
}

function Button({
  text,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const styles = {
    primary: { backgroundColor: "#007bff", color: "white" },
    secondary: { backgroundColor: "#6c757d", color: "white" },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {text}
    </button>
  );
}

// ============================================
// 2. 使用 type 定义 Props
// ============================================

type CardProps = {
  title: string;
  description?: string; // 可选
  children: ReactNode; // children 类型
  footer?: ReactNode;
};

function Card({ title, description, children, footer }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0" }}>{title}</h3>
      {description && (
        <p style={{ color: "#6c757d", fontSize: "14px" }}>{description}</p>
      )}
      <div style={{ marginTop: "12px" }}>{children}</div>
      {footer && (
        <div
          style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #dee2e6",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

// ============================================
// 3. 泛型 Props（进阶）
// ============================================

type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage?: string;
};

function List<T>({
  items,
  renderItem,
  emptyMessage = "暂无数据",
}: ListProps<T>) {
  if (items.length === 0) {
    return (
      <p style={{ color: "#6c757d", fontStyle: "italic" }}>{emptyMessage}</p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// ============================================
// 示例使用
// ============================================

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Step1Example() {
  const users: User[] = [
    { id: 1, name: "张三", email: "zhangsan@example.com" },
    { id: 2, name: "李四", email: "lisi@example.com" },
    { id: 3, name: "王五", email: "wangwu@example.com" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Props 类型定义示例</h2>

      {/* 示例 1: Button 组件 */}
      <Card title="示例 1: Button 组件" description="使用 interface 定义 Props">
        <div style={{ display: "flex", gap: "10px" }}>
          <Button text="主要按钮" onClick={() => alert("点击了主要按钮")} />
          <Button
            text="次要按钮"
            onClick={() => alert("点击了次要按钮")}
            variant="secondary"
          />
          <Button text="禁用按钮" onClick={() => {}} disabled />
        </div>
      </Card>

      {/* 示例 2: Card 组件 */}
      <Card
        title="示例 2: Card 组件"
        description="使用 type 定义 Props，支持 children"
        footer={<small style={{ color: "#6c757d" }}>这是 footer 内容</small>}
      >
        <p>这是 Card 的 children 内容</p>
        <p>children 类型是 ReactNode，可以是任何可渲染的内容</p>
      </Card>

      {/* 示例 3: 泛型 List 组件 */}
      <Card title="示例 3: 泛型 List 组件" description="类型安全的列表渲染">
        <List<User>
          items={users}
          renderItem={(user) => (
            <div style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
              <strong>{user.name}</strong> - {user.email}
            </div>
          )}
        />
      </Card>
    </div>
  );
}
