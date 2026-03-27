import { useEffect, useState } from "react";
import type { City } from "../practice";
import dayjs from "dayjs";
import { getCityWeather, weatherOptions } from "../weatherApi";

export default function WeatherInfo({ cityList }: { cityList: City[] }) {
  const [weatherList, setWeatherList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // false 是 摄氏度 true 是 华氏度
  const [temp, setTemp] = useState(false);
  const [error, setError] = useState("");
  const [lastTime, setLastTime] = useState("");
  const [searchKey, setSearchKey] = useState("");
  // 升序asc 降序desc
  const [sortBy, setSortBy] = useState("asc");
  const [selected, setSelected] = useState("");
  // 用来刷新的一个 id
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  // 倒计时数
  const [time, setTime] = useState(30);
  // 默认就是开启倒计时
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    setWeatherList([...cityList]);
    const controller = new AbortController();
    async function fetchCityWeather() {
      if (cityList.length === 0) return;
      setLoading(true);
      setError("");
      try {
        const fetchList = cityList.map((item) =>
          getCityWeather(item.cityName, controller.signal),
        );
        const responses = await Promise.all(fetchList);
        console.log(responses);
        // const datas = await Promise.all(responses.map((res) => res.json()));
        // const weatherData = datas.map((item) => item.current_condition[0]);
        // 其实如果请求有问题就会进入catch 不会到这里
        // 但是我还是想判断一下 数组长度是不是一致
        // 确保能正确添加
        // 因为 datas 并没有 city 所以 只能按顺序 一一对应
        if (cityList.length === responses.length) {
          setWeatherList((prev) =>
            prev.map((item, index) => ({
              ...item,
              ...responses[index],
            })),
          );
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("请求取消");
        } else {
          console.log("请求出错");
          setError("请求出错");
        }
      } finally {
        setLastTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
        setLoading(false);
      }
    }
    fetchCityWeather();
    return () => controller.abort();
  }, [cityList, refreshTrigger]);

  function handleTempChange() {
    setTemp((prev) => !prev);
  }

  function handleSearchKeyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchKey(e.target.value);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSortBy(e.target.value);
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelected(e.target.value);
  }

  // 先写倒计时
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setRefreshTrigger((prev) => prev + 1);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  function handleRunChange() {
    setIsRunning((prev) => !prev);
  }

  function handleRefresh() {
    setRefreshTrigger((prev) => prev + 1);
    setTime(30);
  }

  // ❌ 原来的搜索：精确匹配，必须输入完整城市名
  // const fliterList = (
  //   searchKey === ""
  //     ? weatherList
  //     : weatherList.filter((item) => item.cityName === searchKey)
  // )

  // ✅ 改进：模糊搜索，支持部分匹配
  const fliterList = (
    searchKey === ""
      ? weatherList
      : weatherList.filter((item) =>
          item.cityName.toLowerCase().includes(searchKey.toLowerCase()),
        )
  )
    // ❌ 原来：item.lang_zh?.[0].value 如果 lang_zh[0] 不存在会报错
    // .filter((item) =>
    //   selected === "" ? true : item.lang_zh?.[0].value === selected,
    // )
    // ✅ 改进：加上可选链
    .filter((item) =>
      selected === "" ? true : item.lang_zh?.[0]?.value === selected,
    )
    // ❌ 原来：temp_C 是字符串，字符串相减会变成 NaN
    // .sort((a, b) =>
    //   sortBy === "asc" ? a.temp_C - b.temp_C : b.temp_C - a.temp_C,
    // );
    // ✅ 改进：转成数字再排序
    .sort((a, b) =>
      sortBy === "asc"
        ? Number(a.temp_C) - Number(b.temp_C)
        : Number(b.temp_C) - Number(a.temp_C),
    );

  return (
    <div>
      <div style={{ fontFamily: "ui-monospace" }}>
        {cityList.length > 0 && (
          <div>最后更新时间（不管成功失败都有反正）：{lastTime}</div>
        )}
        <button onClick={handleTempChange}>温度显示切换</button>
        <div>
          {/* 筛选 */}
          <div>
            <input
              placeholder="请输入搜索..."
              value={searchKey}
              onChange={handleSearchKeyChange}
            />
          </div>
          <div>
            <span>排序</span>
            <label>
              <input
                type="radio"
                name="sort"
                value="asc"
                checked={sortBy === "asc"}
                onChange={handleSortChange}
              />
              升序
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="desc"
                checked={sortBy !== "asc"}
                onChange={handleSortChange}
              />
              降序
            </label>
          </div>
          <select value={selected} onChange={handleSelect}>
            {weatherOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          {/* 刷新 倒计时 */}
          <div
            style={{
              fontFamily: "emoji",
              fontWeight: "bold",
              fontSize: "18px",
              color: "yellowgreen",
            }}
          >
            还剩下{time}秒自动刷新
          </div>
          <button
            style={{
              margin: "0px 10px 0px 0px",
            }}
            onClick={handleRunChange}
          >
            {isRunning ? "暂停" : "恢复"}
          </button>
          <button onClick={handleRefresh}>手动刷新</button>
        </div>

        {cityList.length > 0 ? (
          !loading ? (
            error ? (
              <div>{error}</div>
            ) : fliterList.length > 0 ? (
              fliterList.map((item, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: "1px solid gray",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    {index + 1}. {item.cityName}
                  </div>
                  <div>
                    {!temp ? "摄氏度" : "华氏度"}温度：
                    {!temp ? item.temp_C : item.temp_F}
                  </div>
                  <div>天气状况：{item.lang_zh[0].value}</div>
                  <div>湿度：{item.humidity}</div>
                  <div>风速：{item.windspeedKmph}</div>
                </div>
              ))
            ) : (
              <div>没有这个城市啊或者没有这种天气的城市</div>
            )
          ) : (
            <div>加载中...</div>
          )
        ) : (
          <div>没有城市哪来的天气信息？</div>
        )}
      </div>
    </div>
  );
}
