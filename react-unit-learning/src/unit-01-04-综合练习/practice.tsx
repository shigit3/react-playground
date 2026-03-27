// 综合练习：实时天气仪表盘
// 在这里开始你的实现

import { useEffect, useState } from "react";
import WeatherInfo from "./components/WeatherInfo";
// 可选：引入 Card 组件展示 children 用法
// import Card from "./components/Card";

export interface City {
  id: string;
  cityName: string;
}

export default function WeatherDashboard() {
  const [cityInput, setCityInput] = useState("");
  const [cityList, setCityList] = useState<City[]>([]);
  const CITY_LIST = "cityList";

  function handleCityInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCityInput(e.target.value);
  }

  // 可选：用表单提交，按回车也能添加城市
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cityInput.trim()) {
      handleInsertCity();
    }
  }

  function handleInsertCity() {
    setCityList((prev) => [
      ...prev,
      { id: Date.now().toString(), cityName: cityInput },
    ]);
    // 添加后输入框清空
    setCityInput("");
  }

  function handleDelete(id: string) {
    setCityList((prev) => prev.filter((item) => item.id !== id));
  }

  // ❌ 原来的写法：用 beforeunload 事件，但有闭包陷阱问题
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.setItem(CITY_LIST, JSON.stringify(cityList));
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [cityList]);

  // ✅ 改进：每次 cityList 变化就保存，更可靠
  useEffect(() => {
    localStorage.setItem(CITY_LIST, JSON.stringify(cityList));
  }, [cityList]);

  // ❌ 原来的读取：没有判空，如果 localStorage 为空会报错
  // useEffect(() => {
  //   const item = JSON.parse(localStorage.getItem(CITY_LIST)!);
  //   setCityList([...item]);
  // }, []);

  // ✅ 改进：判空处理
  useEffect(() => {
    const saved = localStorage.getItem(CITY_LIST);
    if (saved) {
      setCityList(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>天气仪表盘</h1>

      {/* 可选：用 Card 组件包裹，展示 children 用法 */}
      {/* <Card title="城市管理"> */}
      <div>
        <div>城市管理</div>
        {/* 用 form 包裹，支持回车提交 */}
        <form onSubmit={handleSubmit}>
          <input
            style={{ marginRight: "10px" }}
            placeholder="请输入..."
            value={cityInput}
            onChange={handleCityInputChange}
          />
          <button type="submit">添加</button>
        </form>
        <div>
          {cityList.length > 0 ? (
            cityList.map((item, index) => (
              <div key={item.id} style={{ fontFamily: "ui-monospace" }}>
                {index + 1}. {item.cityName}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(item.id)}
                >
                  删除
                </button>
              </div>
            ))
          ) : (
            <div>暂无城市...</div>
          )}
        </div>
      </div>
      {/* </Card> */}

      <div style={{ marginTop: "10px" }}>天气信息</div>
      <WeatherInfo cityList={cityList} />
    </div>
  );
}
