// 单元 1 最终练习：GitHub 仓库浏览器
// 要求：只用单元 1 学到的知识（JSX、Props、列表、条件渲染、组件组合）
// 不使用 state（下个单元才学）

// import { type ReactNode } from "react";
import RepoCard from "./components/RepoCard";
import Toolbar from "./components/Toolbar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import SortButton from "./components/SortButton";

// 模拟数据
const allRepos = [
  {
    id: 1,
    name: "vue",
    stars: 220000,
    language: "TypeScript",
    description: "A declarative, efficient, and flexible JavaScript library",
  },
  {
    id: 2,
    name: "vue",
    stars: 210000,
    language: "TypeScript",
    description: "Progressive JavaScript Framework",
  },
  {
    id: 3,
    name: "angular",
    stars: 93000,
    language: "TypeScript",
    description: "One framework. Mobile & desktop.",
  },
  {
    id: 4,
    name: "svelte",
    stars: 75000,
    language: "TypeScript",
    description: "Cybernetically enhanced web apps",
  },
  {
    id: 5,
    name: "next.js",
    stars: 120000,
    language: "JavaScript",
    description: "The React Framework for Production",
  },
  {
    id: 6,
    name: "nuxt",
    stars: 50000,
    language: "TypeScript",
    description: "The Intuitive Vue Framework",
  },
  {
    id: 7,
    name: "express",
    stars: 63000,
    language: "JavaScript",
    description: "Fast, unopinionated, minimalist web framework",
  },
  {
    id: 8,
    name: "django",
    stars: 75000,
    language: "Python",
    description: "The Web framework for perfectionists with deadlines",
  },
  {
    id: 9,
    name: "flask",
    stars: 65000,
    language: "Python",
    description: "A lightweight WSGI web application framework",
  },
  {
    id: 10,
    name: "spring-boot",
    stars: 71000,
    language: "Java",
    description: "Spring Boot makes it easy to create stand-alone apps",
  },
];

// TODO 1: 创建 SearchBar 组件

// TODO 2: 创建 FilterButton 组件

// TODO 3: 创建 SortButton 组件

// TODO 4: 创建 FilterBar 组件

// TODO 5: 创建 Toolbar 组件
// 组合 SearchBar, FilterBar, SortButton
// 使用 flexbox 布局

// TODO 6: 完成 App 组件
// 根据 searchTerm 和 activeFilter 过滤 repos
// 根据 sortBy 排序 repos
// 显示过滤后的结果数量

export default function App() {
  // 这些是模拟的状态值（实际应该用 useState，但我们还没学）
  const searchTerm = "vue"; // 搜索关键词（试试改成 "vue" 或 "react"）
  const activeFilter = "TypeScript"; // 当前激活的语言筛选（试试改成 "JavaScript"）
  const sortBy = "name"; // 排序方式: "stars" | "name"

  // TODO: 实现过滤逻辑
  // 1. 根据 searchTerm 过滤（仓库名包含关键词）
  // 2. 根据 activeFilter 过滤（语言匹配，"All" 显示全部）
  // 3. 根据 sortBy 排序
  const filteredRepos = allRepos
    .filter((repo) => {
      // 1. 搜索过滤（仓库名包含关键词，不区分大小写）
      const matchesSearch = repo.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // 2. 语言过滤（"All" 显示全部）
      const matchesLanguage = repo.language === activeFilter;

      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      // 3. 排序逻辑
      return a.name.localeCompare(b.name); // 字母顺序
    });

  //   const filteredRepos = allRepos;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>GitHub 仓库浏览器</h1>

      {/* TODO: 添加 Toolbar 组件 */}
      <Toolbar>
        <SearchBar searchTerm={searchTerm} />
        <FilterBar activeFilter={activeFilter} />
        <SortButton label={`排序: ${sortBy}`} />
      </Toolbar>

      {/* 显示结果数量 */}
      <div style={{ margin: "20px 0", color: "#666" }}>
        找到 {filteredRepos.length} 个仓库
      </div>

      {/* 仓库列表 */}
      <div>
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.id} {...repo} />
        ))}
      </div>

      {/* 如果没有结果，显示提示 */}
      {filteredRepos.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          没有找到匹配的仓库
        </div>
      )}
    </div>
  );
}
