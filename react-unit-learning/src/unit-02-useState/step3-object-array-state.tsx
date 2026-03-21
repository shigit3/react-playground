// 单元 2 - Step 3: 对象和数组状态的更新
// 学习目标：掌握不可变更新的方式，避免直接修改状态

import { useState } from "react";

/**
 * 示例 1：对象状态的错误和正确更新方式
 *
 * ⚠️ React 要求不可变更新：不能直接修改对象，必须创建新对象
 */
function UserProfile() {
  const [user, setUser] = useState({
    name: "张三",
    age: 25,
    email: "zhangsan@example.com",
  });

  // ❌ 错误方式：直接修改对象
  const updateNameBad = () => {
    user.name = "李四"; // ❌ 直接修改，React 检测不到变化
    setUser(user); // ❌ 传入的还是同一个对象引用
    // 结果：界面不会更新
  };

  // ✅ 正确方式 1：展开运算符创建新对象
  const updateNameGood = () => {
    setUser({
      ...user, // 复制所有属性
      name: "李四", // 覆盖 name 属性
    });
  };

  // ✅ 正确方式 2：使用函数式更新
  const updateAge = () => {
    setUser((prev) => ({
      ...prev,
      age: prev.age + 1,
    }));
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>用户信息</h3>
      <div style={{ marginBottom: "10px" }}>
        <p>姓名: {user.name}</p>
        <p>年龄: {user.age}</p>
        <p>邮箱: {user.email}</p>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={updateNameBad}>❌ 错误修改姓名</button>
        <button onClick={updateNameGood}>✅ 正确修改姓名</button>
        <button onClick={updateAge}>年龄 +1</button>
      </div>
    </div>
  );
}

/**
 * 示例 2：嵌套对象的更新
 *
 * 嵌套对象需要逐层展开
 */
function NestedObject() {
  const [user, setUser] = useState({
    name: "王五",
    address: {
      city: "北京",
      street: "长安街",
    },
  });

  // ✅ 更新嵌套对象：需要展开每一层
  const updateCity = () => {
    setUser((prev) => ({
      ...prev, // 展开第一层
      address: {
        ...prev.address, // 展开第二层
        city: "上海", // 修改目标属性
      },
    }));
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>嵌套对象更新</h3>
      <p>姓名: {user.name}</p>
      <p>城市: {user.address.city}</p>
      <p>街道: {user.address.street}</p>
      <button onClick={updateCity}>搬到上海</button>
    </div>
  );
}

/**
 * 示例 3：数组状态的更新
 *
 * 数组也需要不可变更新
 */
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "学习 React", done: false },
    { id: 2, text: "写代码", done: false },
  ]);

  // ✅ 添加：使用展开运算符或 concat
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: `新任务 ${todos.length + 1}`,
      done: false,
    };
    setTodos([...todos, newTodo]); // 或 setTodos(todos.concat(newTodo))
  };

  // ✅ 删除：使用 filter
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // ✅ 修改：使用 map
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(
        (todo) =>
          todo.id === id
            ? { ...todo, done: !todo.done } // 修改匹配的项
            : todo, // 保持其他项不变
      ),
    );
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>待办事项</h3>
      <button onClick={addTodo} style={{ marginBottom: "10px" }}>
        添加任务
      </button>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                marginLeft: "10px",
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px" }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 示例 4：数组常用操作总结
 */
function ArrayOperations() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  // 添加到末尾
  const addToEnd = () => setItems([...items, items.length + 1]);

  // 添加到开头
  const addToStart = () => setItems([0, ...items]);

  // 删除第一个
  const removeFirst = () => setItems(items.slice(1));

  // 删除最后一个
  const removeLast = () => setItems(items.slice(0, -1));

  // 删除指定索引
  const removeAtIndex = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // 修改指定索引
  const updateAtIndex = (index: number) => {
    setItems(items.map((item, i) => (i === index ? item * 2 : item)));
  };

  // 排序（注意：sort 会修改原数组，需要先复制）
  const sortItems = () => {
    setItems([...items].sort((a, b) => a - b));
  };

  // 反转
  const reverseItems = () => {
    setItems([...items].reverse());
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}
    >
      <h3>数组操作</h3>
      <p>数组: [{items.join(", ")}]</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        <button onClick={addToEnd}>末尾添加</button>
        <button onClick={addToStart}>开头添加</button>
        <button onClick={removeFirst}>删除第一个</button>
        <button onClick={removeLast}>删除最后一个</button>
        <button onClick={() => removeAtIndex(2)}>删除索引 2</button>
        <button onClick={() => updateAtIndex(0)}>索引 0 翻倍</button>
        <button onClick={sortItems}>排序</button>
        <button onClick={reverseItems}>反转</button>
      </div>
    </div>
  );
}

/**
 * 任务：购物车
 */
function Cart() {
  // interface Product {
  //   id: number;
  //   name: string;
  //   price: number;
  //   quantity: number;
  // }

  const [productList, setProductList] = useState([
    { id: 1, name: "无线耳机", price: 299, quantity: 1 },
    { id: 2, name: "机械键盘", price: 459, quantity: 2 },
    { id: 3, name: "鼠标垫", price: 39, quantity: 1 },
    { id: 4, name: "显示器支架", price: 158, quantity: 1 },
  ]);

  const insertProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "反正是新商品",
      price: Math.round(Math.random() * 10),
      quantity: Math.round(Math.random() * 10 + 1),
    };
    // ✅ 使用 prev 更安全
    setProductList((prev) => [...prev, newProduct]);
  };

  const plus = (id: number) => {
    // ✅ 使用 prev 更安全
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p)),
    );
  };

  const minus = (id: number) => {
    // ✅ 使用 prev 更安全
    setProductList((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 0) } : p,
      ),
    );
  };

  const del = (id: number) => {
    // ✅ 使用 prev 更安全
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const total = productList.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0,
  );

  return (
    <div>
      <div>
        <button onClick={insertProduct}>添加商品</button>
      </div>
      <div>
        {productList.map((p) => (
          <div
            style={{
              marginTop: "10px",
            }}
            key={p.id}
          >
            <span>{p.name}</span>
            <span
              style={{
                margin: "0px 20px",
              }}
            >
              价格：{p.price}
            </span>
            <span>数量：{p.quantity}</span>
            <button
              style={{ margin: "0px 20px" }}
              onClick={() => {
                plus(p.id);
              }}
            >
              数量+1
            </button>
            <button
              onClick={() => {
                minus(p.id);
              }}
            >
              数量-1
            </button>
            <button
              style={{ marginLeft: "20px", color: "red" }}
              onClick={() => {
                del(p.id);
              }}
            >
              删除
            </button>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "ui-monospace" }}>总价：{total}</div>
    </div>
  );
}

// 主组件
export default function Step3ObjectArrayState() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Step 3: 对象和数组状态的更新</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <UserProfile />
        <NestedObject />
        <TodoList />
        <ArrayOperations />
      </div>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>💡 关键知识点</h3>
        <ul>
          <li>
            <strong>不可变更新原则：</strong>
            不能直接修改对象/数组，必须创建新的
          </li>
          <li>
            <strong>对象更新：</strong>
            使用展开运算符 <code>{`{ ...obj, key: newValue }`}</code>
          </li>
          <li>
            <strong>数组添加：</strong>
            <code>[...arr, newItem]</code> 或 <code>arr.concat(newItem)</code>
          </li>
          <li>
            <strong>数组删除：</strong>
            <code>arr.filter(item =&gt; condition)</code>
          </li>
          <li>
            <strong>数组修改：</strong>
            <code>arr.map(item =&gt; condition ? newItem : item)</code>
          </li>
          <li>
            <strong>嵌套对象：</strong>
            需要逐层展开每一层
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
        <h3>⚠️ 常见错误</h3>
        <pre
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`// ❌ 错误：直接修改
const [user, setUser] = useState({ name: '张三' });
user.name = '李四';        // ❌ 直接修改
setUser(user);             // ❌ 引用没变，React 检测不到

// ❌ 错误：使用会修改原数组的方法
const [arr, setArr] = useState([1, 2, 3]);
arr.push(4);               // ❌ push 会修改原数组
setArr(arr);               // ❌ 引用没变

arr.sort();                // ❌ sort 会修改原数组
setArr(arr);               // ❌ 引用没变

// ✅ 正确：创建新对象/数组
setUser({ ...user, name: '李四' });           // ✅ 新对象
setArr([...arr, 4]);                          // ✅ 新数组
setArr([...arr].sort());                      // ✅ 先复制再排序`}
        </pre>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#e7f3ff",
          borderRadius: "8px",
        }}
      >
        <h3>🆚 与 Vue 的对比</h3>
        <pre
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`// Vue 3 - 可以直接修改（响应式系统会追踪）
const user = ref({ name: '张三' });
user.value.name = '李四';           // ✅ 可以直接修改

const arr = ref([1, 2, 3]);
arr.value.push(4);                  // ✅ 可以直接修改
arr.value.sort();                   // ✅ 可以直接修改

// React - 必须不可变更新
const [user, setUser] = useState({ name: '张三' });
setUser({ ...user, name: '李四' }); // ✅ 必须创建新对象

const [arr, setArr] = useState([1, 2, 3]);
setArr([...arr, 4]);                // ✅ 必须创建新数组
setArr([...arr].sort());            // ✅ 必须先复制`}
        </pre>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          background: "#fff3cd",
          borderRadius: "8px",
        }}
      >
        <h3>🎯 练习任务</h3>
        <p>实现一个"购物车"组件：</p>
        <ul>
          <li>显示商品列表（每个商品有：id、名称、价格、数量）</li>
          <li>点击"添加商品"按钮，添加一个新商品</li>
          <li>每个商品有"数量 +1"和"数量 -1"按钮</li>
          <li>每个商品有"删除"按钮</li>
          <li>显示总价（所有商品的 价格 × 数量 之和）</li>
        </ul>
        <p style={{ color: "#856404" }}>
          💡 提示：商品数据结构{" "}
          <code>{`{ id: number, name: string, price: number, quantity: number }`}</code>
        </p>
      </div>

      {/* 👇 在这里完成练习 */}
      <div style={{ marginTop: "20px" }}>
        <h3>你的练习：</h3>
        {/* TODO: 实现 ShoppingCart 组件 */}
        <Cart />
      </div>
    </div>
  );
}
