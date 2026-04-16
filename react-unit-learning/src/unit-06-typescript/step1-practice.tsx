/**
 * Step 1 练习：Props 类型定义
 *
 * 任务：创建一个用户资料卡片组件
 *
 * 要求：
 * 1. 定义 UserProfile 组件的 Props 类型（使用 interface 或 type）
 * 2. 必需属性：name（姓名）、avatar（头像 URL）
 * 3. 可选属性：bio（简介）、role（角色，只能是 'admin' | 'user' | 'guest'）
 * 4. 支持 children（显示额外内容，如按钮）
 * 5. 为 role 设置默认值 'user'
 *
 * 提示：
 * - children 类型用 ReactNode
 * - 联合类型用 'admin' | 'user' | 'guest'
 * - 可选属性用 ?
 */

import type { ReactNode } from "react";

// TODO: 在这里定义 UserProfileProps 类型
interface UserProfileProps {
  name: string;
  avatar: string;
  bio?: string;
  role?: "admin" | "user" | "guest";
  children?: ReactNode;
}

// TODO: 实现 UserProfile 组件
function UserProfile({
  name,
  avatar,
  bio,
  role = "user",
  children,
}: UserProfileProps) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      {bio && <p>{bio}</p>}
      {role && <p>{role}</p>}
      {children && <div>{children}</div>}
    </div>
  );
}

// ============================================
// 测试区域（不要修改）
// ============================================

export default function Step1Practice() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>练习：用户资料卡片</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* 测试 1: 基本使用 */}
        <UserProfile
          name="张三"
          avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        />

        {/* 测试 2: 带简介和角色 */}
        <UserProfile
          name="李四"
          avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
          bio="全栈开发工程师，热爱开源"
          role="admin"
        />

        {/* 测试 3: 带 children */}
        <UserProfile
          name="王五"
          avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Bella"
          bio="前端开发者"
          role="user"
        >
          <button
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            关注
          </button>
        </UserProfile>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#d1ecf1",
          borderRadius: "4px",
        }}
      >
        <h3>✅ 完成标准</h3>
        <ul>
          <li>正确定义 Props 类型（interface 或 type）</li>
          <li>必需属性和可选属性都正确标记</li>
          <li>role 使用联合类型限制可选值</li>
          <li>children 类型为 ReactNode</li>
          <li>组件能正确渲染所有测试用例</li>
        </ul>
        <p>
          <strong>完成后告诉我"完成了"，我会检查你的代码！</strong>
        </p>
      </div>
    </div>
  );
}
