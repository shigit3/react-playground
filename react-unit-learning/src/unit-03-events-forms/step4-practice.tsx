/**
 * 单元 3 - 步骤 4：表单提交（练习代码）
 *
 * 🎯 练习任务：实现一个登录表单
 * 1. 用户名输入框（必填，至少 3 个字符）
 * 2. 密码输入框（必填，至少 6 个字符）
 * 3. "记住我" 复选框
 * 4. 提交按钮
 * 5. 提交时验证，成功后模拟登录（延迟 1 秒）
 * 6. 显示欢迎信息，如果勾选"记住我"则提示
 */

import { useState } from "react";

function Step4Practice() {
  // TODO: 在这里实现登录表单
  // 提示：参考 step4-example.tsx 的结构

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>🎯 练习：登录表单</h2>

      <div
        style={{
          padding: "15px",
          backgroundColor: "#f0f8ff",
          border: "2px solid #4a90e2",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>任务要求：</h3>
        <ol>
          <li>用户名输入框（必填，至少 3 个字符）</li>
          <li>密码输入框（必填，至少 6 个字符）</li>
          <li>"记住我" 复选框</li>
          <li>提交按钮</li>
          <li>提交时验证，成功后模拟登录（延迟 1 秒）</li>
          <li>显示欢迎信息：「欢迎回来，[用户名]！」</li>
          <li>如果勾选"记住我"，在欢迎信息中提示</li>
        </ol>
      </div>

      {/* 👇 在这里写你的代码 */}
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "#999" }}>开始编写你的登录表单...</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "4px",
        }}
      >
        <strong>💡 提示：</strong>
        <ul style={{ marginTop: "10px", marginBottom: 0 }}>
          <li>
            使用 <code>{"<form onSubmit={handleSubmit}>"}</code>
          </li>
          <li>
            必须调用 <code>e.preventDefault()</code>
          </li>
          <li>
            用 <code>setTimeout</code> 模拟异步登录
          </li>
          <li>
            可以用一个 <code>isLoading</code> 状态显示加载中
          </li>
          <li>
            checkbox 用 <code>checked</code> 属性，不是 <code>value</code>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Step4Practice;
