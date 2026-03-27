# 综合练习：实时天气仪表盘

## 📋 需求描述

创建一个实时天气仪表盘应用，用户可以添加多个城市，查看实时天气信息，并进行数据管理。

## 🎯 功能要求

### 1. 城市管理(做完了)

- 添加城市（输入城市名称）
- 删除城市
- 城市列表展示

### 2. 天气信息展示(做完了)

- 显示每个城市的天气信息（温度、天气状况、湿度、风速）
- 支持摄氏度/华氏度切换
- 显示最后更新时间

### 3. 数据筛选和排序(做完了)

- 按温度排序（升序/降序）
- 按城市名称筛选（搜索）
- 按天气状况筛选（晴天/雨天/多云等）

### 4. 自动刷新(做完了)

- 每30秒自动刷新所有城市的天气数据
- 显示倒计时
- 支持手动刷新
- 可以暂停/恢复自动刷新

### 5. 数据持久化(做完了)

- 城市列表保存到 localStorage
- 页面刷新后恢复数据

## 🔧 技术要求

必须使用以下知识点：

**单元1 - JSX和组件基础**

- 组件拆分和组合
- Props 传递
- 列表渲染（map + key）
- 条件渲染
- children 使用

**单元2 - useState**

- 基本状态管理
- 对象/数组状态更新（不可变）
- 函数式更新

**单元3 - 事件和表单**

- 表单输入处理
- 事件处理
- 受控组件
- 表单提交

**单元4 - useEffect**

- 数据获取
- 定时器（自动刷新）
- localStorage 读写
- 清理函数

## 🌐 API 说明

使用 Open-Meteo 免费天气 API（无需 API key）

**步骤1：获取城市坐标**

```
https://geocoding-api.open-meteo.com/v1/search?name={城市名}&count=1&language=zh&format=json
```

返回数据包含：latitude（纬度）、longitude（经度）、name（城市名）

**步骤2：获取天气数据**

```
https://api.open-meteo.com/v1/forecast?latitude={纬度}&longitude={经度}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto
```

返回数据包含：

- current.temperature_2m - 温度（摄氏度）
- current.relative_humidity_2m - 湿度（%）
- current.wind_speed_10m - 风速（km/h）
- current.weather_code - 天气代码

**天气代码映射：**

- 0: 晴天
- 1-3: 多云
- 45,48: 雾
- 51-67: 雨
- 71-77: 雪
- 80-99: 雷暴

**注意：** 完全免费，无并发限制，数据准确。

## 💡 实现提示

- 组件结构自己设计
- 状态管理自己规划
- 样式自己发挥（可以用 CSS 或 Tailwind）
- 错误处理自己考虑

## ✅ 完成标准

- 所有功能正常运行
- 代码结构清晰
- 没有明显的 bug
- 用户体验流畅

开始吧！
