/**
 * 单元 3 - 最终综合练习：实时搜索过滤器
 *
 * 练习目标：整合单元 3 所有知识点
 * - 事件绑定
 * - 事件对象和类型
 * - 受控组件
 * - 表单处理
 */

import React, { useState, type ChangeEvent } from "react";

// 模拟 GitHub 仓库数据
interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
}

const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "react",
    description: "A JavaScript library for building user interfaces",
    language: "JavaScript",
    stars: 200000,
  },
  {
    id: 2,
    name: "vue",
    description: "Progressive JavaScript Framework",
    language: "TypeScript",
    stars: 180000,
  },
  {
    id: 3,
    name: "angular",
    description: "One framework. Mobile & desktop.",
    language: "TypeScript",
    stars: 85000,
  },
  {
    id: 4,
    name: "svelte",
    description: "Cybernetically enhanced web apps",
    language: "JavaScript",
    stars: 65000,
  },
  {
    id: 5,
    name: "next.js",
    description: "The React Framework",
    language: "JavaScript",
    stars: 95000,
  },
  {
    id: 6,
    name: "nuxt",
    description: "The Intuitive Vue Framework",
    language: "TypeScript",
    stars: 45000,
  },
  {
    id: 7,
    name: "vite",
    description: "Next Generation Frontend Tooling",
    language: "TypeScript",
    stars: 55000,
  },
  {
    id: 8,
    name: "webpack",
    description: "A bundler for javascript and friends",
    language: "JavaScript",
    stars: 63000,
  },
];

function FinalPractice() {
  // 🎯 任务 1：创建搜索关键词状态

  const [searchKeyword, setSearchKeyword] = useState("");

  // 🎯 任务 2：创建语言筛选状态

  const [selectedLanguage, setSelectedLanguage] = useState("all");

  // 🎯 任务 3：创建排序方式状态

  const [sortBy, setSortBy] = useState("name");
  // ❌ 错误写法：单选框不需要单独维护多个状态
  // const [nameRadio, setNameRadio] = useState(true);
  // const [starsRadio, setStarsRadio] = useState(false);

  // ❌ 错误写法：不需要为每个单选框写单独的处理函数
  // function handleNameRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const { value, checked } = e.target;
  //   setSortBy(value);
  //   setStarsRadio((prev) => !prev);
  //   setNameRadio(checked);
  // }

  // function handleStarsRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   const { value, checked } = e.target;
  //   setSortBy(value);
  //   setNameRadio((prev) => !prev);
  //   setStarsRadio(checked);
  // }

  // ✅ 正确写法：只需要一个处理函数
  function handleSortChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSortBy(e.target.value);
  }

  // 🎯 任务 4：实现搜索处理函数

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 更新搜索关键词
    setSearchKeyword(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedLanguage(e.target.value);
  };

  // 🎯 任务 5：实现过滤逻辑

  // ❌ 错误写法：逻辑冗余，重复了搜索关键词的过滤
  // const filteredRepos =
  //   selectedLanguage === "all"
  //     ? mockRepositories.filter(
  //         (item) =>
  //           item.name.includes(searchKeyword) ||
  //           item.description.includes(searchKeyword),
  //       )
  //     : mockRepositories
  //         .filter(
  //           (item) =>
  //             item.name.includes(searchKeyword) ||
  //             item.description.includes(searchKeyword),
  //         )
  //         .filter((item) => item.language === selectedLanguage);

  // ✅ 正确写法：链式调用，逻辑清晰
  const filteredRepos = mockRepositories
    .filter(
      (item) =>
        item.name.includes(searchKeyword) ||
        item.description.includes(searchKeyword),
    )
    .filter(
      (item) =>
        selectedLanguage === "all" || item.language === selectedLanguage,
    );

  // 🎯 任务 6：实现排序逻辑

  // ❌ 错误写法：直接修改原数组，且排序逻辑不完整
  // const sortedRepos =
  //   sortBy === "name"
  //     ? filteredRepos.sort()
  //     : filteredRepos.sort((a, b) => a.stars - b.stars);

  // ✅ 正确写法：先复制数组再排序，避免修改原数组
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return b.stars - a.stars; // b - a 让 star 多的排前面
  });

  // 🎯 任务 7：实现清空搜索功能

  const handleClearSearch = () => {
    // 清空搜索关键词和语言筛选
    setSearchKeyword("");
    setSelectedLanguage("all");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔍 GitHub 仓库搜索</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        单元 3 最终练习：实时搜索和过滤
      </p>

      {/* 搜索和筛选区域 */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        {/* 搜索框 */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            搜索仓库：
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={searchKeyword}
              onChange={handleSearchChange}
              type="text"
              placeholder="输入仓库名称或描述..."
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "4px",
              }}
            />
            <button
              onClick={handleClearSearch}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              清空
            </button>
          </div>
        </div>

        {/* 语言筛选 */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            编程语言：
          </label>
          <select
            style={{
              padding: "10px",
              fontSize: "16px",
              border: "2px solid #ddd",
              borderRadius: "4px",
              width: "200px",
            }}
            value={selectedLanguage}
            onChange={handleSelectChange}
          >
            <option value="all">全部</option>
            <option value="JavaScript">JavaScript</option>
            <option value="TypeScript">TypeScript</option>
          </select>
        </div>

        {/* 排序方式 */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            排序方式：
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="sortBy"
                value="name"
                style={{ marginRight: "5px" }}
                checked={sortBy === "name"}
                onChange={handleSortChange}
              />
              按名称
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="sortBy"
                value="stars"
                style={{ marginRight: "5px" }}
                checked={sortBy === "stars"}
                onChange={handleSortChange}
              />
              按 Star 数
            </label>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <div
        style={{
          padding: "10px 15px",
          backgroundColor: "#e7f3ff",
          borderRadius: "4px",
          marginBottom: "20px",
          fontSize: "14px",
          color: "#0066cc",
        }}
      >
        找到 {sortedRepos.length} 个仓库
        {/* TODO: 如果有搜索关键词，显示关键词 */}
        <div>关键字：{searchKeyword || "无"}</div>
      </div>

      {/* 仓库列表 */}
      <div>
        {sortedRepos.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#999",
              fontSize: "18px",
            }}
          >
            😕 没有找到匹配的仓库
          </div>
        ) : (
          sortedRepos.map((repo) => (
            <div
              key={repo.id}
              style={{
                padding: "20px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "white",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 10px 0", color: "#0066cc" }}>
                    {repo.name}
                  </h3>
                  <p style={{ margin: "0 0 10px 0", color: "#666" }}>
                    {repo.description}
                  </p>
                  <div
                    style={{ display: "flex", gap: "15px", fontSize: "14px" }}
                  >
                    <span
                      style={{
                        padding: "4px 8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                      }}
                    >
                      {repo.language}
                    </span>
                    <span>⭐ {repo.stars.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 提示信息 */}
      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "4px",
        }}
      >
        <strong>💡 练习要求：</strong>
        <ul style={{ marginTop: "10px", marginBottom: 0, paddingLeft: "20px" }}>
          <li>实现实时搜索（搜索仓库名称和描述）</li>
          <li>实现语言筛选（JavaScript / TypeScript / 全部）</li>
          <li>实现排序功能（按名称 / 按 Star 数）</li>
          <li>实现清空搜索功能</li>
          <li>显示搜索结果数量和关键词</li>
          <li>所有输入都要使用受控组件</li>
        </ul>
      </div>
    </div>
  );
}

export default FinalPractice;
