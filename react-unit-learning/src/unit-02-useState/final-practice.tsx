// 单元 2 - 最终练习：购物车应用
// 综合运用：useState、函数式更新、对象/数组状态

import { useState } from "react";

/**
 * 🎯 最终练习：购物车应用
 *
 * 功能要求：
 * 1. 显示商品列表（名称、价格、库存）
 * 2. 添加商品到购物车
 * 3. 修改购物车中商品的数量
 * 4. 从购物车中删除商品
 * 5. 计算购物车总价
 * 6. 显示购物车商品数量
 * 7. 清空购物车
 *
 * 技术要点：
 * - 使用 useState 管理购物车状态
 * - 使用函数式更新
 * - 数组和对象的不可变更新
 */

// 商品类型定义
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

// 购物车项类型定义
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// 模拟商品数据
const PRODUCTS: Product[] = [
  { id: 1, name: "MacBook Pro", price: 12999, stock: 5 },
  { id: 2, name: "iPhone 15", price: 5999, stock: 10 },
  { id: 3, name: "AirPods Pro", price: 1999, stock: 15 },
  { id: 4, name: "iPad Air", price: 4799, stock: 8 },
  { id: 5, name: "Apple Watch", price: 2999, stock: 12 },
];

function ShoppingCart() {
  // TODO: 定义购物车状态
  // 提示：const [cart, setCart] = useState<CartItem[]>([]);

  // TODO: 实现功能函数
  // - addToCart(product: Product)
  // - updateQuantity(id: number, quantity: number)
  // - removeFromCart(id: number)
  // - clearCart()

  // TODO: 计算总价和总数量

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2>🛒 购物车应用</h2>

      <div style={{ display: "flex", gap: "40px", marginTop: "20px" }}>
        {/* 左侧：商品列表 */}
        <div style={{ flex: 1 }}>
          <h3>商品列表</h3>
          {/* TODO: 渲染商品列表 */}
        </div>

        {/* 右侧：购物车 */}
        <div style={{ flex: 1 }}>
          <h3>购物车</h3>
          {/* TODO: 渲染购物车内容 */}
        </div>
      </div>
    </div>
  );
}

export default function FinalPractice() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>最终练习：购物车应用</h1>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#fff3cd",
          borderRadius: "8px",
        }}
      >
        <h3>🎯 功能要求</h3>
        <ol>
          <li>
            商品列表：
            <ul>
              <li>显示所有商品（名称、价格、库存）</li>
              <li>每个商品有"加入购物车"按钮</li>
              <li>如果商品已在购物车，显示"已在购物车"</li>
              <li>如果库存为0，按钮禁用</li>
            </ul>
          </li>
          <li>
            购物车：
            <ul>
              <li>显示已添加的商品（名称、单价、数量、小计）</li>
              <li>可以增加/减少数量（+ - 按钮）</li>
              <li>数量不能超过库存</li>
              <li>数量减到0时自动删除</li>
              <li>有删除按钮</li>
            </ul>
          </li>
          <li>
            统计信息：
            <ul>
              <li>显示购物车总价</li>
              <li>显示购物车商品总数量</li>
            </ul>
          </li>
          <li>有"清空购物车"按钮</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#e7f3ff",
          borderRadius: "8px",
        }}
      >
        <h3>💡 思路提示</h3>
        <ul>
          <li>
            <strong>状态设计：</strong>
            购物车是一个数组，每个元素包含商品信息和数量
          </li>
          <li>
            <strong>添加商品：</strong>
            先检查是否已存在，不存在则添加到数组末尾
          </li>
          <li>
            <strong>修改数量：</strong>用 map 遍历数组，找到对应商品更新数量
          </li>
          <li>
            <strong>删除商品：</strong>用 filter 过滤掉指定商品
          </li>
          <li>
            <strong>计算总价：</strong>用 reduce 累加每个商品的小计
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#ffe6e6",
          borderRadius: "8px",
        }}
      >
        <h3>⚠️ 重要提醒</h3>
        <ul>
          <li>
            必须使用函数式更新：<code>setCart(prev =&gt; ...)</code>
          </li>
          <li>
            不能直接修改数组：<code>cart.push()</code> ❌
          </li>
          <li>
            不能直接修改对象：<code>item.quantity++</code> ❌
          </li>
          <li>
            要返回新数组：<code>[...prev, newItem]</code> ✅
          </li>
          <li>
            要返回新对象：<code>{`{ ...item, quantity: newQty }`}</code> ✅
          </li>
        </ul>
      </div>

      {/* 👇 在这里实现购物车 */}
      <div
        style={{
          marginTop: "40px",
          padding: "30px",
          border: "2px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <ShoppingCart />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>✅ 完成标准</h3>
        <ul>
          <li>✅ 能添加商品到购物车</li>
          <li>✅ 能修改购物车中商品的数量</li>
          <li>✅ 能删除商品和清空购物车</li>
          <li>✅ 正确计算总价和总数量</li>
          <li>✅ 处理边界情况（库存限制、数量为0等）</li>
        </ul>
        <p style={{ marginTop: "20px", color: "#666" }}>
          💡 遇到问题先自己思考，实在不会再问 AI
        </p>
      </div>
    </div>
  );
}
