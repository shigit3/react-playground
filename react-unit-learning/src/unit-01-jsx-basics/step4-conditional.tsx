// 练习 4：条件渲染
// 任务：在 RepoCard 中添加条件渲染逻辑

import RepoCard from "./components/RepoCard";

export default function App() {
  const repos = [
    { id: 1, name: "react", stars: 220000, language: "JavaScript" },
    { id: 2, name: "vue", stars: 210000, language: "TypeScript" },
    { id: 3, name: "svelte", stars: 75000, language: "TypeScript" },
    // TODO: 给这个仓库添加 isArchived: true
    {
      id: 4,
      name: "angular.js",
      stars: 59000,
      language: "JavaScript",
      isArchived: true,
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>GitHub Repositories</h1>
      {repos.map((repo) => (
        <RepoCard key={repo.id} {...repo} />
      ))}
    </div>
  );
}
