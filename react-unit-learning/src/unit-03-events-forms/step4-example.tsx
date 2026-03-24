/**
 * 单元 3 - 步骤 4：表单提交（示例代码）
 */

import { useState, type ChangeEvent } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

function Step4Example() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("提交的数据：", formData);
      setSubmitStatus("success");

      setTimeout(() => {
        setSubmitStatus("idle");
        setFormData({ username: "", email: "", password: "" });
      }, 3000);
    } else {
      setSubmitStatus("error");
    }
  };

  return (
    <div
      style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>示例：用户注册表单</h3>

      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Step4Example;
