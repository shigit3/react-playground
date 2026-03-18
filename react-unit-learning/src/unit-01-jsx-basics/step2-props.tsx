// 练习 2：组件和 Props
// 任务：创建一个 RepoCard 组件，练习 Props 的定义和使用

import RepoCard from "./components/RepoCard";

export default function App() {
  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>GitHub Repositories</h1>
      {/* TODO: 3. 使用 RepoCard 组件 3 次，传入不同数据 */}
      {/* 提示：<RepoCard name="react" stars={220000} language="JavaScript" /> */}
      <RepoCard name="react" stars={220000} language="JavaScript" />
      <RepoCard name="vue" stars={210000} language="JavaScript" />
      <RepoCard name="spring boot" stars={100} language="Java" />
    </div>
  );
}
