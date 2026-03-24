/**
 * 单元 3 - 步骤 4：表单提交
 *
 * 学习目标：
 * 1. 掌握表单提交事件处理
 * 2. 理解 e.preventDefault() 的作用
 * 3. 学会处理表单数据
 */

import { useState, type ChangeEvent } from "react";

/**
 * 知识点 1：表单提交事件
 *
 * <form onSubmit={handleSubmit}>
 *   <button type="submit">提交</button>
 * </form>
 *
 * 注意：
 * - 必须用 e.preventDefault() 阻止默认的页面刷新
 * - button 的 type="submit" 会触发表单提交
 * - 按 Enter 键也会触发表单提交
 */

/**
 * 知识点 2：表单事件类型（React 19）
 *
 * React 19 中，推荐使用 React.FormEvent：
 * const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
 *   e.preventDefault();
 * }
 *
 * 或者让 TypeScript 自动推断：
 * const handleSubmit = (e: React.FormEvent) => {
 *   e.preventDefault();
 * }
 */

/**
 * 知识点 3：与 Vue 的对比
 *
 * Vue:
 * <form @submit.prevent="handleSubmit">
 *
 * React:
 * <form onSubmit={handleSubmit}>
 *   // 需要在函数里调用 e.preventDefault()
 * </form>
 */

interface FormData {
  username: string;
  email: string;
  password: string;
}

function Step4FormSubmit() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // 处理输入变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 清除该字段的错误
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // 验证表单
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.username) {
      newErrors.username = "用户名不能为空";
    } else if (formData.username.length < 3) {
      newErrors.username = "用户名至少 3 个字符";
    }

    if (!formData.email) {
      newErrors.email = "邮箱不能为空";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "邮箱格式不正确";
    }

    if (!formData.password) {
      newErrors.password = "密码不能为空";
    } else if (formData.password.length < 6) {
      newErrors.password = "密码至少 6 个字符";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止默认的页面刷新

    console.log("表单提交被触发");

    if (validateForm()) {
      // 模拟 API 请求
      console.log("提交的数据：", formData);
      setSubmitStatus("success");

      // 3秒后重置状态
      setTimeout(() => {
        setSubmitStatus("idle");
        setFormData({ username: "", email: "", password: "" });
      }, 3000);
    } else {
      setSubmitStatus("error");
      console.log("验证失败：", errors);
    }
  };

  // 练习代码：登录表单
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [loginErrors, setLoginErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [loginStatus, setLoginStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [welcomeMessage, setWelcomeMessage] = useState("");

  // 验证登录表单
  const validateLoginForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!loginForm.username) {
      newErrors.username = "用户名不能为空";
    } else if (loginForm.username.length < 3) {
      newErrors.username = "用户名至少 3 个字符";
    }

    if (!loginForm.password) {
      newErrors.password = "密码不能为空";
    } else if (loginForm.password.length < 6) {
      newErrors.password = "密码至少 6 个字符";
    }

    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理登录表单输入
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // 清除该字段的错误
    if (loginErrors[name as keyof typeof loginErrors]) {
      setLoginErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // 处理登录表单提交
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateLoginForm()) {
      // 显示加载状态
      setLoginStatus("loading");

      // 模拟异步登录（1秒延迟）
      setTimeout(() => {
        setLoginStatus("success");
        const message = loginForm.remember
          ? `欢迎回来，${loginForm.username}！（已记住登录状态）`
          : `欢迎回来，${loginForm.username}！`;
        setWelcomeMessage(message);

        // 3秒后重置
        setTimeout(() => {
          setLoginStatus("idle");
          setLoginForm({ username: "", password: "", remember: false });
          setWelcomeMessage("");
        }, 3000);
      }, 1000);
    } else {
      setLoginStatus("error");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>步骤 4：表单提交</h2>

      {/* 示例：完整的表单提交流程 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例：用户注册表单</h3>

        <form onSubmit={handleSubmit}>
          {/* 用户名 */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              用户名：
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="至少 3 个字符"
              style={{
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
                borderColor: errors.username ? "red" : "#ccc",
                border: "1px solid",
              }}
            />
            {errors.username && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.username}
              </p>
            )}
          </div>

          {/* 邮箱 */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              邮箱：
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={{
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
                borderColor: errors.email ? "red" : "#ccc",
                border: "1px solid",
              }}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* 密码 */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              密码：
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="至少 6 个字符"
              style={{
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
                borderColor: errors.password ? "red" : "#ccc",
                border: "1px solid",
              }}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4a90e2",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            注册
          </button>
        </form>

        {/* 提交状态提示 */}
        {submitStatus === "success" && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#d4edda",
              color: "#155724",
              border: "1px solid #c3e6cb",
              borderRadius: "4px",
            }}
          >
            ✅ 注册成功！
          </div>
        )}

        {submitStatus === "error" && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
            }}
          >
            ❌ 请修正表单错误后重试
          </div>
        )}

        <div style={{ marginTop: "15px", fontSize: "12px", color: "#999" }}>
          <p>💡 提示：</p>
          <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
            <li>试试直接点击提交按钮（会显示验证错误）</li>
            <li>填写正确的信息后提交（会显示成功提示）</li>
            <li>在输入框里按 Enter 键也会提交表单</li>
          </ul>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* 🎯 练习任务 */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#f0f8ff",
          border: "2px solid #4a90e2",
        }}
      >
        <h3>🎯 你的练习任务：</h3>
        <p>实现一个登录表单，包含以下功能：</p>
        <ol>
          <li>用户名输入框（必填，至少 3 个字符）</li>
          <li>密码输入框（必填，至少 6 个字符）</li>
          <li>"记住我" 复选框</li>
          <li>提交按钮</li>
          <li>
            提交时验证：
            <ul>
              <li>如果验证失败，显示错误信息</li>
              <li>如果验证成功，模拟登录（延迟 1 秒）</li>
              <li>登录成功后显示欢迎信息：「欢迎回来，[用户名]！」</li>
              <li>如果勾选了"记住我"，在欢迎信息中提示</li>
            </ul>
          </li>
        </ol>

        {/* 👇 在这里写你的代码 */}
        <div style={{ marginTop: "15px" }}>
          <form onSubmit={handleLoginSubmit}>
            {/* 用户名 */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                用户名：
              </label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                placeholder="至少 3 个字符"
                disabled={loginStatus === "loading"}
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                  borderColor: loginErrors.username ? "red" : "#ccc",
                  border: "1px solid",
                }}
              />
              {loginErrors.username && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  {loginErrors.username}
                </p>
              )}
            </div>

            {/* 密码 */}
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                密码：
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="至少 6 个字符"
                disabled={loginStatus === "loading"}
                style={{
                  padding: "8px",
                  width: "100%",
                  boxSizing: "border-box",
                  borderColor: loginErrors.password ? "red" : "#ccc",
                  border: "1px solid",
                }}
              />
              {loginErrors.password && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                  {loginErrors.password}
                </p>
              )}
            </div>

            {/* 记住我 */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="remember"
                  checked={loginForm.remember}
                  onChange={handleLoginChange}
                  disabled={loginStatus === "loading"}
                  style={{ marginRight: "8px" }}
                />
                记住我
              </label>
            </div>

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loginStatus === "loading"}
              style={{
                padding: "10px 20px",
                backgroundColor: loginStatus === "loading" ? "#ccc" : "#4a90e2",
                color: "white",
                border: "none",
                cursor: loginStatus === "loading" ? "not-allowed" : "pointer",
                width: "100%",
              }}
            >
              {loginStatus === "loading" ? "登录中..." : "登录"}
            </button>
          </form>

          {/* 成功提示 */}
          {loginStatus === "success" && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#d4edda",
                color: "#155724",
                border: "1px solid #c3e6cb",
                borderRadius: "4px",
              }}
            >
              ✅ {welcomeMessage}
            </div>
          )}

          {/* 错误提示 */}
          {loginStatus === "error" && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
                borderRadius: "4px",
              }}
            >
              ❌ 请修正表单错误后重试
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
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
          <li>完成后告诉我"完成了"</li>
        </ul>
      </div>
    </div>
  );
}

export default Step4FormSubmit;
