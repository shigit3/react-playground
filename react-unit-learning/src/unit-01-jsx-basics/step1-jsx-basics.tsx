// 练习 1：JSX 基础语法
// 任务：创建一个个人卡片，练习 className 和 style 的使用

export default function App() {
  return (
    <div>
      {/* 在这里写你的代码 */}
      {/* 提示：
        1. 创建一个 div，className="card"
        2. 添加 style={{ backgroundColor: '#f0f0f0', padding: '20px' }}
        3. 里面放一个 h1 标题（你的名字）
        4. 再放一个 p 段落（简单介绍自己）
      */}
      <div className="card" style={{
        backgroundColor: '#f0f0f0', padding: '20px'
      }}>
        <h1>山竹果</h1>
        <p>芒果死定</p>
      </div>
    </div>
  )
}
