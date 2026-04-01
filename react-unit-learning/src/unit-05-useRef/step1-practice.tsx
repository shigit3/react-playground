import { useRef } from "react";

/**
 * 练习：使用 useRef 操作 DOM
 *
 * 任务：
 * 1. 创建一个视频播放器，用 ref 控制播放/暂停
 * 2. 创建一个图片查看器，点击按钮滚动到指定图片
 * 3. 创建一个文本高亮功能，点击按钮选中文本
 *
 * 提示：
 * - 视频元素有 play() 和 pause() 方法
 * - 使用 scrollIntoView() 滚动到元素
 * - 使用 window.getSelection() 和 range.selectNodeContents() 选中文本
 */

export default function Step1Practice() {
  // TODO: 创建 refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLParagraphElement>(null);

  // TODO: 实现播放/暂停功能
  const handlePlayPause = () => {
    // 你的代码
    // paused属性 true表示暂停 false表示正在播放
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  // TODO: 实现滚动到指定图片
  // scrollIntoView() 默认顶部对齐
  const scrollToImage = (index: number) => {
    // 你的代码
    imageRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // TODO: 实现文本选中功能
  const selectText = () => {
    // 你的代码
    if (textRef.current) {
      // 1. 获取 Selection 对象（表示用户选择的文本范围）
      const selection = window.getSelection();

      // 2. 创建一个 Range 对象（表示文档中的一个区域）
      const range = document.createRange();

      // 3. 设置 range 选中整个段落元素的内容
      range.selectNodeContents(textRef.current);

      // 4. 清除之前的选择
      selection?.removeAllRanges();

      // 5. 添加新的选择范围
      selection?.addRange(range);
    }
  };

  return (
    <div>
      <h3>练习 1：视频播放器控制</h3>
      <div style={{ marginBottom: "20px" }}>
        <video
          ref={videoRef}
          width="400"
          style={{ display: "block", marginBottom: "10px" }}
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
        <button
          onClick={handlePlayPause}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          播放/暂停
        </button>
      </div>

      <h3>练习 2：图片滚动导航</h3>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => scrollToImage(num - 1)}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            跳转到图片 {num}
          </button>
        ))}
      </div>
      <div
        style={{
          height: "200px",
          overflow: "auto",
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        {[1, 2, 3].map((num, index) => (
          <div
            key={num}
            // 这里我对你的原始代码进行了修改
            // React 19 要求 ref 回调必须返回 void 或清理函数？这点对吗
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            style={{
              height: "180px",
              backgroundColor: `hsl(${num * 120}, 70%, 80%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            图片 {num}
          </div>
        ))}
      </div>

      <h3>练习 3：文本选中</h3>
      <p
        ref={textRef}
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        这是一段可以被选中的文本。点击下面的按钮会自动选中这段文字。
      </p>
      <button
        onClick={selectText}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        选中文本
      </button>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
        }}
      >
        <strong>💡 提示：</strong>
        <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
          <li>视频元素：videoRef.current?.play() 和 pause()</li>
          <li>
            滚动：element.scrollIntoView(&#123; behavior: 'smooth' &#125;)
          </li>
          <li>
            选中文本：使用 window.getSelection() 和 document.createRange()
          </li>
        </ul>
      </div>
    </div>
  );
}
