/**
 * 单元 4 最终练习：GitHub 用户信息面板
 *
 * 综合运用所有 useEffect 知识点：
 * 1. 基础用法 - 组件挂载时获取数据
 * 2. 清理函数 - 清理定时器和请求
 * 3. 异步操作 - API 请求和错误处理
 * 4. 依赖数组 - 响应用户输入
 *
 * 功能要求：
 * 1. 输入 GitHub 用户名，显示用户信息
 * 2. 显示用户的前 5 个仓库
 * 3. 支持自动刷新（每 30 秒）
 * 4. 显示上次更新时间
 * 5. 支持手动刷新
 * 6. 处理加载、错误、空状态
 * 7. 组件卸载时清理定时器和请求
 *
 * API：
 * - 用户信息：https://api.github.com/users/{username}
 * - 用户仓库：https://api.github.com/users/{username}/repos?per_page=5&sort=stars
 *
 * 提示：
 * - 使用多个 useEffect 分别处理不同的副作用
 * - 使用 AbortController 取消请求
 * - 使用 setInterval 实现自动刷新
 * - 使用 Date 对象记录更新时间
 */

import { useEffect, useState } from "react";

export default function FinalPractice() {
  const [username, setUsername] = useState("github");
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // 用于触发刷新

  // TODO 1: 实现获取用户信息和仓库的逻辑
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=stars`,
            { signal: controller.signal },
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("请求出错了");
        }

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        setUser(userData);
        setRepos(reposData);
        setLastUpdate(new Date());
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("请求被取消");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [username, refreshTrigger]); // 依赖 username 和 refreshTrigger

  // TODO 2: 实现自动刷新功能
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1); // 触发刷新
    }, 30000);

    return () => clearInterval(timer);
  }, [autoRefresh]);

  // TODO 3: 实现手动刷新功能
  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1); // 触发刷新
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "system-ui",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>GitHub 用户信息面板</h1>

      {/* 搜索栏 */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          padding: "20px",
          background: "#f9fafb",
          borderRadius: "8px",
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="输入 GitHub 用户名..."
          style={{
            flex: 1,
            padding: "12px 16px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          onClick={handleRefresh}
          disabled={loading}
          style={{
            padding: "12px 24px",
            background: loading ? "#d1d5db" : "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          🔄 刷新
        </button>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            background: "white",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          <span>自动刷新（30秒）</span>
        </label>
      </div>

      {/* 上次更新时间 */}
      {lastUpdate && (
        <div
          style={{
            marginTop: "10px",
            color: "#6b7280",
            fontSize: "14px",
            textAlign: "right",
          }}
        >
          上次更新：{lastUpdate.toLocaleTimeString()}
        </div>
      )}

      {/* 加载状态 */}
      {loading && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6b7280",
            marginTop: "20px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>⏳</div>
          <div>加载中...</div>
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div
          style={{
            padding: "20px",
            background: "#fee2e2",
            borderRadius: "8px",
            color: "#dc2626",
            marginTop: "20px",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>❌</div>
          <div>{error}</div>
        </div>
      )}

      {/* 用户信息和仓库列表 */}
      {!loading && !error && user && (
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "20px",
          }}
        >
          {/* 用户信息卡片 */}
          <div
            style={{
              padding: "20px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              background: "white",
            }}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{
                width: "100%",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            />
            <h2 style={{ margin: "0 0 5px 0" }}>{user.name || user.login}</h2>
            <p style={{ margin: "0 0 15px 0", color: "#6b7280" }}>
              @{user.login}
            </p>
            {user.bio && (
              <p style={{ margin: "0 0 15px 0", fontSize: "14px" }}>
                {user.bio}
              </p>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                  background: "#f9fafb",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#3b82f6",
                  }}
                >
                  {user.public_repos}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>仓库</div>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "10px",
                  background: "#f9fafb",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#10b981",
                  }}
                >
                  {user.followers}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280" }}>关注者</div>
              </div>
            </div>
          </div>

          {/* 仓库列表 */}
          <div>
            <h3 style={{ margin: "0 0 15px 0" }}>热门仓库（按 star 排序）</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    background: "white",
                    transition: "all 0.2s",
                  }}
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#3b82f6",
                      textDecoration: "none",
                    }}
                  >
                    {repo.name}
                  </a>
                  <p
                    style={{
                      margin: "10px 0",
                      color: "#6b7280",
                      fontSize: "14px",
                    }}
                  >
                    {repo.description || "暂无描述"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      fontSize: "14px",
                      color: "#6b7280",
                    }}
                  >
                    <span>⭐ {repo.stargazers_count.toLocaleString()}</span>
                    <span>🍴 {repo.forks_count.toLocaleString()}</span>
                    {repo.language && <span>💻 {repo.language}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 实现提示 */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        <h3>💡 实现提示</h3>

        <h4>TODO 1: 获取数据</h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>使用 useEffect 监听 username</li>
          <li>使用 Promise.all 同时获取用户信息和仓库</li>
          <li>使用 AbortController 取消请求</li>
          <li>更新 lastUpdate 为 new Date()</li>
        </ul>

        <h4>TODO 2: 自动刷新</h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>使用 useEffect 监听 autoRefresh</li>
          <li>当 autoRefresh 为 true 时，启动 setInterval（30000ms）</li>
          <li>定时器触发时，可以通过改变一个计数器状态来触发数据重新获取</li>
          <li>清理函数中清理定时器</li>
        </ul>

        <h4>TODO 3: 手动刷新</h4>
        <ul>
          <li>可以通过改变一个计数器状态来触发数据重新获取</li>
          <li>或者直接调用获取数据的函数（需要提取到 useEffect 外部）</li>
        </ul>

        <h4>✅ 检查清单</h4>
        <ul>
          <li>输入用户名后，是否显示用户信息和仓库？</li>
          <li>点击"刷新"按钮，是否重新获取数据？</li>
          <li>勾选"自动刷新"，是否每 30 秒自动刷新？</li>
          <li>上次更新时间是否正确显示？</li>
          <li>输入不存在的用户名，是否显示错误？</li>
          <li>打开控制台，切换页面，是否没有报错？</li>
        </ul>
      </div>
    </div>
  );
}
