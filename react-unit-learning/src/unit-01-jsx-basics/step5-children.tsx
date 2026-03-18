// 练习 5：组件组合（children）
// 任务：创建 Container 和 Section 组件

import { type ReactNode } from "react";
import RepoCard from "./components/RepoCard";

// TODO: 1. 创建 Container 组件
// 接收 children，添加最大宽度和内边距样式
interface ContainerProps {
  children: ReactNode;
}
function Container({ children }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        // border: "1px solid blue",
      }}
    >
      {children}
    </div>
  );
}

// TODO: 2. 创建 Section 组件
// 接收 title 和 children，显示标题和内容
interface SectionProps {
  title: string;
  children: ReactNode;
}
function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default function App() {
  const repos = [
    { id: 1, name: "react", stars: 220000, language: "JavaScript" },
    { id: 2, name: "vue", stars: 210000, language: "TypeScript" },
    { id: 3, name: "svelte", stars: 75000, language: "TypeScript" },
    {
      id: 4,
      name: "angular.js",
      stars: 59000,
      language: "JavaScript",
      isArchived: true,
    },
  ];

  const activeRepos = repos.filter((repo) => !repo.isArchived);
  const archivedRepos = repos.filter((repo) => repo.isArchived);

  return (
    <Container>
      <h1>GitHub Repositories</h1>

      <Section title={`活跃仓库 (${activeRepos.length})`}>
        {activeRepos.map((repo) => (
          <RepoCard key={repo.id} {...repo} />
        ))}
      </Section>

      {archivedRepos.length > 0 && (
        <Section title={`已归档 (${archivedRepos.length})`}>
          {archivedRepos.map((repo) => (
            <RepoCard key={repo.id} {...repo} />
          ))}
        </Section>
      )}
    </Container>
  );
}
