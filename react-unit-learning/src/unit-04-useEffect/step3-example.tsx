/**
 * Step 3 示例：API 请求和异步操作
 */

import { useState, useEffect } from "react";

// 示例 1：基本的 API 请求
function Example1() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 在内部定义 async 函数
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch("https://api.github.com/users/github");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("请求失败:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          padding: "15px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <h3>示例 1：基本的 API 请求</h3>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 1：基本的 API 请求</h3>
      {user && (
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            style={{ width: "60px", height: "60px", borderRadius: "50%" }}
          />
          <div>
            <p style={{ margin: "5px 0", fontWeight: "bold" }}>{user.name}</p>
            <p style={{ margin: "5px 0", color: "#6b7280" }}>@{user.login}</p>
            <p style={{ margin: "5px 0", fontSize: "14px" }}>{user.bio}</p>
          </div>
        </div>
      )}
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 使用 GitHub API 获取用户信息
      </p>
    </div>
  );
}

// 示例 2：处理加载和错误状态
function Example2() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("github");

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=5&sort=stars`,
        );

        if (!response.ok) {
          throw new Error("用户不存在");
        }

        const data = await response.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchRepos();
    }
  }, [username]);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 2：处理加载和错误状态</h3>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="输入 GitHub 用户名"
        style={{
          padding: "8px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "4px",
          width: "100%",
          marginBottom: "15px",
        }}
      />

      {loading && <p>加载中...</p>}

      {error && (
        <div
          style={{
            padding: "10px",
            background: "#fee2e2",
            borderRadius: "4px",
            color: "#dc2626",
            marginBottom: "10px",
          }}
        >
          ❌ {error}
        </div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
            前 5 个仓库（按 star 排序）：
          </p>
          {repos.map((repo) => (
            <div
              key={repo.id}
              style={{
                padding: "10px",
                background: "#f9fafb",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            >
              <p style={{ margin: "0", fontWeight: "bold" }}>{repo.name}</p>
              <p
                style={{
                  margin: "5px 0 0 0",
                  fontSize: "14px",
                  color: "#6b7280",
                }}
              >
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </p>
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 试试输入不同的用户名，观察加载和错误状态
      </p>
    </div>
  );
}

// 示例 3：请求取消（AbortController）
function Example3() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 创建 AbortController
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        // 模拟慢速请求
        const response = await fetch("https://api.github.com/users/github", {
          signal: controller.signal, // 传入 signal
        });
        const json = await response.json();
        setData(json.login);
        setLoading(false);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("请求被取消");
        } else {
          console.error("请求失败:", err);
          setLoading(false);
        }
      }
    }

    fetchData();

    // 清理函数：取消请求
    return () => {
      console.log("🧹 取消请求");
      controller.abort();
    };
  }, []);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 3：请求取消（AbortController）</h3>
      {loading ? <p>加载中...</p> : <p>用户名: {data}</p>}
      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 打开控制台，快速切换页面，可以看到请求被取消的日志
      </p>
    </div>
  );
}

// 示例 4：依赖变化时重新请求
function Example4() {
  const [userId, setUserId] = useState(1);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${userId}`,
      );
      const data = await response.json();
      setPost(data);
      setLoading(false);
    }

    fetchPost();
  }, [userId]); // userId 变化时重新请求

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <h3>示例 4：依赖变化时重新请求</h3>

      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => setUserId((prev) => Math.max(1, prev - 1))}
          disabled={userId === 1}
          style={{
            padding: "8px 16px",
            background: userId === 1 ? "#d1d5db" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: userId === 1 ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          上一篇
        </button>
        <button
          onClick={() => setUserId((prev) => prev + 1)}
          style={{
            padding: "8px 16px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          下一篇
        </button>
      </div>

      {loading ? (
        <p>加载中...</p>
      ) : (
        post && (
          <div
            style={{
              padding: "15px",
              background: "#f9fafb",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
              Post #{post.id}: {post.title}
            </p>
            <p style={{ margin: 0, color: "#6b7280" }}>{post.body}</p>
          </div>
        )
      )}

      <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>
        💡 点击按钮切换文章，观察 useEffect 如何响应依赖变化
      </p>
    </div>
  );
}

// 主组件
export default function Step3Example() {
  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Step 3 示例：API 请求和异步操作</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Example1 />
        <Example2 />
        <Example3 />
        <Example4 />
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          background: "#eff6ff",
          borderRadius: "8px",
          borderLeft: "4px solid #3b82f6",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>📖 API 请求最佳实践</h4>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>在 useEffect 内部定义 async 函数</li>
          <li>使用 try-catch-finally 处理错误和加载状态</li>
          <li>使用 AbortController 取消未完成的请求</li>
          <li>依赖数组包含所有请求参数</li>
          <li>检查响应状态码（response.ok）</li>
        </ul>
      </div>
    </div>
  );
}
