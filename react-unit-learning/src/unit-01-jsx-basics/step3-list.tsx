// 练习 3：列表渲染
// 任务：用 map() 渲染仓库列表

import RepoCard from "./components/RepoCard";

export default function App() {
  // TODO: 1. 创建一个数组，包含多个仓库数据
  // 提示：每个对象需要有 id, name, stars, language
  const repos = [
    {
      id: 1,
      name: "react",
      stars: 220000,
      language: "JavaScript",
    },
    { id: 2, name: "vue", stars: 210000, language: "TypeScript" },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>GitHub Repositories</h1>
      {/* TODO: 2. 用 map() 渲染列表 */}
      {/* 提示：{repos.map(repo => <RepoCard key={repo.id} ... />)} */}
      {repos.map((repo) => (
        <RepoCard key={repo.id} {...repo} />
      ))}
    </div>
  );
}
