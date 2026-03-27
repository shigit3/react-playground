// 天气 API 工具函数
// 把 Open-Meteo 的数据转换成 wttr.in 的格式

// 天气代码映射
const weatherCodeMap: Record<number, string> = {
  0: "晴天",
  1: "晴转多云",
  2: "多云",
  3: "阴天",
  45: "雾",
  48: "雾凇",
  51: "小雨",
  53: "中雨",
  55: "大雨",
  61: "小雨",
  63: "中雨",
  65: "大雨",
  71: "小雪",
  73: "中雪",
  75: "大雪",
  80: "阵雨",
  81: "阵雨",
  82: "暴雨",
  95: "雷暴",
  96: "雷暴",
  99: "雷暴",
};

// 天气选项数组（给选择器用）
export const weatherOptions = [
  { label: "未选择", value: "" },
  { label: "晴天", value: "晴天" },
  { label: "晴转多云", value: "晴转多云" },
  { label: "多云", value: "多云" },
  { label: "阴天", value: "阴天" },
  { label: "雾", value: "雾" },
  { label: "雾凇", value: "雾凇" },
  { label: "小雨", value: "小雨" },
  { label: "中雨", value: "中雨" },
  { label: "大雨", value: "大雨" },
  { label: "小雪", value: "小雪" },
  { label: "中雪", value: "中雪" },
  { label: "大雪", value: "大雪" },
  { label: "阵雨", value: "阵雨" },
  { label: "暴雨", value: "暴雨" },
  { label: "雷暴", value: "雷暴" },
];

// 获取天气描述
function getWeatherDesc(code: number): string {
  return weatherCodeMap[code] || "未知";
}

// 摄氏度转华氏度
function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

// 获取城市天气（返回 wttr.in 格式）
export async function getCityWeather(cityName: string, signal?: AbortSignal) {
  try {
    // 1. 获取城市坐标
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        cityName,
      )}&count=1&language=zh&format=json`,
      { signal },
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("城市不存在");
    }

    const { latitude, longitude } = geoData.results[0];

    // 2. 获取天气数据
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
      { signal },
    );
    const weatherData = await weatherRes.json();

    const tempC = Math.round(weatherData.current.temperature_2m);
    const weatherDesc = getWeatherDesc(weatherData.current.weather_code);

    // 3. 转换成 wttr.in 的格式
    return {
      temp_C: tempC.toString(),
      temp_F: celsiusToFahrenheit(tempC).toString(),
      humidity: weatherData.current.relative_humidity_2m.toString(),
      windspeedKmph: Math.round(weatherData.current.wind_speed_10m).toString(),
      lang_zh: [{ value: weatherDesc }],
    };
  } catch (error) {
    throw error;
  }
}
