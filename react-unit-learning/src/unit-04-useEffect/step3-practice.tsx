/**
 * Step 3 练习：GitHub 仓库搜索器
 *
 * 练习目标：
 * 实现一个 GitHub 仓库搜索器，要求：
 * 1. 输入关键词搜索仓库
 * 2. 显示加载状态
 * 3. 显示错误状态
 * 4. 显示搜索结果（仓库列表）
 * 5. 点击仓库名跳转到 GitHub
 *
 * API：
 * https://api.github.com/search/repositories?q={keyword}&per_page=10
 *
 * 提示：
 * - 使用 useState 管理 keyword、repos、loading、error
 * - 使用 useEffect 监听 keyword 变化
 * - 使用 try-catch-finally 处理错误
 * - 检查 response.ok
 */

import { useEffect, useState } from "react";

export default function Step3Practice() {
  const [keyword, setKeyword] = useState("react");
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: 实现搜索逻辑
  // 提示：
  // 1. 使用 useEffect 监听 keyword
  // 2. 在 useEffect 内部定义 async 函数
  // 3. 使用 try-catch-finally 处理错误和加载状态
  // 4. 检查 response.ok，如果不 ok 抛出错误
  // 5. 将结果保存到 repos
  useEffect(() => {
    const controller = new AbortController();
    async function fetchRepos() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${keyword}&per_page=10`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("请求出错了");
        }

        const data = await response.json();
        setError("");
        setRepos([...data.items]);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("请求被取消了");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
    return () => {
      controller.abort();
    };
  }, [keyword]);

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h2>Step 3 练习：GitHub 仓库搜索器</h2>

      {/* 搜索框 */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="输入关键词搜索仓库..."
          style={{
            padding: "12px 16px",
            border: "2px solid #e5e7eb",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
            outline: "none",
          }}
        />
      </div>

      {/* 加载状态 */}
      {loading && (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#6b7280",
            marginTop: "20px",
          }}
        >
          🔍 搜索中...
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div
          style={{
            padding: "15px",
            background: "#fee2e2",
            borderRadius: "8px",
            color: "#dc2626",
            marginTop: "20px",
          }}
        >
          ❌ {error}
        </div>
      )}

      {/* 搜索结果 */}
      {!loading && !error && repos.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <p style={{ color: "#6b7280", marginBottom: "15px" }}>
            找到 {repos.length} 个仓库
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {repos.map((repo) => (
              <div
                key={repo.id}
                style={{
                  padding: "20px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
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
                  {repo.full_name}
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
      )}

      {/* 空状态 */}
      {!loading && !error && repos.length === 0 && keyword && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6b7280",
            marginTop: "20px",
          }}
        >
          😕 没有找到相关仓库
        </div>
      )}

      {/* 提示 */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          background: "#f3f4f6",
          borderRadius: "8px",
        }}
      >
        <h4>💡 实现提示：</h4>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>使用 useEffect 监听 keyword 变化</li>
          <li>在 useEffect 内部定义 async 函数</li>
          <li>
            API 地址：
            <code>
              https://api.github.com/search/repositories?q=$&#123;keyword&#125;&per_page=10
            </code>
          </li>
          <li>
            返回的数据在 <code>data.items</code> 里
          </li>
          <li>使用 try-catch-finally 处理三种状态</li>
        </ul>
        <h4 style={{ marginTop: "15px" }}>✅ 检查清单：</h4>
        <ul style={{ margin: "10px 0", paddingLeft: "20px" }}>
          <li>输入关键词后，是否显示加载状态？</li>
          <li>搜索完成后，是否显示仓库列表？</li>
          <li>点击仓库名，是否能跳转到 GitHub？</li>
          <li>输入不存在的关键词，是否显示空状态？</li>
          <li>打开控制台，是否没有报错？</li>
        </ul>
        <p style={{ margin: "10px 0", color: "#6b7280" }}>
          完成后告诉我"完成了"，我会检查你的代码！
        </p>
      </div>
    </div>
  );
}
