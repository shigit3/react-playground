/**
 * 单元 3 - 步骤 3：受控组件
 *
 * 学习目标：
 * 1. 理解受控组件和非受控组件的区别
 * 2. 掌握受控组件的实现方式
 * 3. 对比 Vue 的 v-model 和 React 的受控组件
 */

import { useState, type ChangeEvent } from "react";

/**
 * 知识点 1：受控组件 vs 非受控组件
 *
 * 受控组件（Controlled Component）：✅ 推荐
 * - 表单数据由 React 状态管理
 * - value 由 state 控制，onChange 更新 state
 * - 类似 Vue 的 v-model（但需要手动绑定）
 * - 优势：实时验证、条件禁用、动态输入
 *
 * 非受控组件（Uncontrolled Component）：
 * - 表单数据由 DOM 自己管理
 * - 使用 ref 获取值（需要学习 useRef，单元 5）
 * - 适用场景：文件上传、与第三方库集成
 *
 * 示例对比：
 * // 受控组件（推荐）
 * <input value={name} onChange={e => setName(e.target.value)} />
 *
 * // 非受控组件（特殊场景，单元 5 会学）
 * <input ref={inputRef} />
 * const value = inputRef.current.value; // 需要时才获取
 *
 * 💡 现代 React 开发中，99% 的场景都用受控组件
 */

/**
 * 知识点 2：Vue vs React 的表单绑定
 *
 * Vue:
 * <input v-model="username" />
 *
 * React:
 * <input
 *   value={username}
 *   onChange={e => setUsername(e.target.value)}
 * />
 *
 * React 需要手动绑定 value 和 onChange，更显式但也更灵活
 */

/**
 * 知识点 3：受控组件的优势
 *
 * ✅ 实时验证
 * ✅ 条件禁用提交按钮
 * ✅ 强制输入格式
 * ✅ 动态输入（如多个输入框）
 */

function Step3ControlledComponents() {
  // 单个输入框
  const [username, setUsername] = useState("");

  // 多个输入框
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 其他表单元素
  const [gender, setGender] = useState("");
  const [agree, setAgree] = useState(false);
  const [bio, setBio] = useState("");

  // 处理用户名输入（只允许字母和数字）
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 过滤非法字符
    const filtered = value.replace(/[^a-zA-Z0-9]/g, "");
    setUsername(filtered);
  };

  // 处理邮箱输入
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 处理密码输入
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 简单的邮箱验证
  const isEmailValid = email.includes("@") && email.includes(".");

  // 密码强度检查
  const isPasswordStrong = password.length >= 8;

  // 练习相关代码
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
    setName(value);
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    // 1. 先去掉所有非数字字符
    const digits = e.target.value.replace(/\D/g, "");
    // 2. 限制最多11位
    const limited = digits.slice(0, 11);
    // 3. 格式化显示
    let formatted = limited;
    if (limited.length > 7) {
      formatted = limited.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
    } else if (limited.length > 3) {
      formatted = limited.replace(/(\d{3})(\d{0,4})/, "$1-$2");
    }
    setPhone(formatted);
  }

  function handleSubmit() {
    console.log(`用户名${name}，手机号${phone}，年龄${age}`);
  }

  const isNameValid = name.length >= 3 && name.length <= 20;

  const isPhoneValid = phone.replace(/-/g, "").length === 11;

  const ageOptions = [
    { key: "placeholder", value: "", label: "请选择" },
    ...Array.from({ length: 43 }, (_, i) => {
      const age = i + 18;
      return {
        key: age,
        value: age,
        label: `${age} 岁`,
      };
    }),
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2>步骤 3：受控组件</h2>

      {/* 示例 1：基本的受控输入 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 1：受控输入（带格式限制）</h3>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="只能输入字母和数字"
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
        <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
          当前值：{username || "（空）"}
        </p>
        <p style={{ fontSize: "12px", color: "#999" }}>
          💡 试试输入特殊字符，会被自动过滤
        </p>
      </div>

      {/* 示例 2：带验证的表单 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 2：带实时验证的表单</h3>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            邮箱：
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="your@email.com"
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              borderColor: email && !isEmailValid ? "red" : "#ccc",
            }}
          />
          {email && !isEmailValid && (
            <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              ❌ 邮箱格式不正确
            </p>
          )}
          {email && isEmailValid && (
            <p style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
              ✅ 邮箱格式正确
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            密码：
          </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="至少 8 位"
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              borderColor: password && !isPasswordStrong ? "red" : "#ccc",
            }}
          />
          <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>
            密码强度：{password.length}/8
          </p>
        </div>

        <button
          disabled={!isEmailValid || !isPasswordStrong}
          style={{
            padding: "10px 20px",
            backgroundColor:
              isEmailValid && isPasswordStrong ? "#4a90e2" : "#ccc",
            color: "white",
            border: "none",
            cursor:
              isEmailValid && isPasswordStrong ? "pointer" : "not-allowed",
          }}
        >
          提交
        </button>
      </div>

      {/* 示例 3：其他表单元素 */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
        }}
      >
        <h3>示例 3：其他表单元素</h3>

        {/* select 下拉框 */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            性别：
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
          >
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="female">女</option>
            <option value="other">其他</option>
          </select>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
            选择：{gender || "未选择"}
          </p>
        </div>

        {/* checkbox 复选框 */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            我同意服务条款
          </label>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
            状态：{agree ? "✅ 已同意" : "❌ 未同意"}
          </p>
        </div>

        {/* textarea 文本域 */}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>
            个人简介：
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="介绍一下自己..."
            rows={4}
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
          <p style={{ fontSize: "14px", color: "#666", marginTop: "5px" }}>
            字数：{bio.length}/200
          </p>
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
        <p>实现一个用户注册表单，包含以下功能：</p>
        <ol>
          <li>
            用户名输入框：
            <ul>
              <li>只允许字母、数字、下划线</li>
              <li>长度 3-20 个字符</li>
              <li>实时显示是否符合要求</li>
            </ul>
          </li>
          <li>
            手机号输入框：
            <ul>
              <li>只允许数字</li>
              <li>自动格式化为 xxx-xxxx-xxxx</li>
              <li>验证是否为 11 位</li>
            </ul>
          </li>
          <li>年龄选择：下拉框（18-60）</li>
          <li>提交按钮：只有所有验证通过才能点击</li>
          <li>点击提交后，在控制台输出所有表单数据</li>
        </ol>

        {/* 👇 在这里写你的代码 */}
        <div style={{ marginTop: "15px" }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              用户名：
            </label>
            <input
              placeholder="字母、数字、下划线，3-20字符"
              value={name}
              onChange={handleNameChange}
              style={{
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
                borderColor: name && !isNameValid ? "red" : "#ccc",
              }}
            />
            {name && !isNameValid && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                ❌ 用户名长度必须在 3-20 个字符之间
              </p>
            )}
            {name && isNameValid && (
              <p style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
                ✅ 用户名格式正确
              </p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              手机号：
            </label>
            <input
              placeholder="11位手机号"
              value={phone}
              onChange={handlePhoneChange}
              style={{
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
                borderColor: phone && !isPhoneValid ? "red" : "#ccc",
              }}
            />
            {phone && !isPhoneValid && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                ❌ 手机号必须是 11 位数字
              </p>
            )}
            {phone && isPhoneValid && (
              <p style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
                ✅ 手机号格式正确
              </p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              年龄：
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ padding: "8px", width: "100%" }}
            >
              {ageOptions.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={!(isNameValid && isPhoneValid && age !== "")}
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor:
                isNameValid && isPhoneValid && age !== "" ? "#4a90e2" : "#ccc",
              color: "white",
              border: "none",
              cursor:
                isNameValid && isPhoneValid && age !== ""
                  ? "pointer"
                  : "not-allowed",
            }}
          >
            提交
          </button>
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
            用正则表达式过滤字符：<code>{"/[^a-zA-Z0-9_]/g"}</code>
          </li>
          <li>
            手机号格式化：
            <code>
              {"phone.replace(/(\\d{3})(\\d{4})(\\d{4})/, '$1-$2-$3')"}
            </code>
          </li>
          <li>
            checkbox 用 <code>checked</code> 而不是 <code>value</code>
          </li>
          <li>
            记得用函数式更新：<code>{"setState(prev => ...)"}</code>
          </li>
          <li>完成后告诉我"完成了"</li>
        </ul>
      </div>
    </div>
  );
}

export default Step3ControlledComponents;
