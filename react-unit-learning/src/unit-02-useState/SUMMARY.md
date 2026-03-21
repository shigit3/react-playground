# 单元 2 学习总结

## 🎯 学习目标

掌握 useState 状态管理，让组件"动起来"，理解函数式更新和不可变更新原则

## ✅ 已掌握的知识点

### 1. useState 基础用法

```tsx
const [count, setCount] = useState(0);

// 更新状态
setCount(count + 1);

// 状态可以是任何类型
const [text, setText] = useState("");
const [isOpen, setIsOpen] = useState(false);
const [user, setUser] = useState({ name: "张三" });
const [items, setItems] = useState([1, 2, 3]);
```

**核心规则：**

- useState 返回数组：`[当前值, 更新函数]`
- 不能直接修改状态：`count = count + 1` ❌
- 必须用 setState：`setCount(count + 1)` ✅
- 状态更新触发重新渲染

### 2. 函数式更新（重要！）

```tsx
// ❌ 错误：连续更新会有问题
setCount(count + 1);
setCount(count + 1); // 只会 +1

// ✅ 正确：使用函数式更新
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // 会 +2
```

**何时必须使用函数式更新：**

- 新状态依赖旧状态时
- 连续多次更新时
- 定时器、事件监听等异步场景中

**闭包陷阱示例：**

```tsx
// ❌ 错误：定时器中的闭包陷阱
setInterval(() => {
  setCount(count + 1); // count 永远是初始值
}, 1000);

// ✅ 正确：使用函数式更新
setInterval(() => {
  setCount((prev) => prev + 1); // 总是最新值
}, 1000);
```

### 3. 状态更新的异步性

```tsx
const handleClick = () => {
  console.log("更新前:", count);
  setCount(count + 1);
  console.log("更新后:", count); // ⚠️ 这里还是旧值！
};
```

- 状态更新是异步的，不能立即读取新值
- React 会批量处理多次更新（性能优化）

### 4. 对象状态的不可变更新

```tsx
const [user, setUser] = useState({ name: "张三", age: 25 });

// ❌ 错误：直接修改对象
user.name = "李四";
setUser(user); // 引用没变，React 检测不到

// ✅ 正确：创建新对象
setUser({ ...user, name: "李四" });

// ✅ 使用函数式更新更安全
setUser((prev) => ({ ...prev, age: prev.age + 1 }));
```

**嵌套对象更新：**

```tsx
const [user, setUser] = useState({
  name: "王五",
  address: { city: "北京", street: "长安街" },
});

// 需要逐层展开
setUser((prev) => ({
  ...prev,
  address: {
    ...prev.address,
    city: "上海",
  },
}));
```

### 5. 数组状态的不可变更新

```tsx
const [items, setItems] = useState([1, 2, 3]);

// ✅ 添加：使用展开运算符
setItems([...items, 4]); // 末尾添加
setItems([0, ...items]); // 开头添加

// ✅ 删除：使用 filter
setItems(items.filter((item) => item.id !== id));

// ✅ 修改：使用 map
setItems(
  items.map(
    (item) =>
      item.id === id
        ? { ...item, done: true } // 修改匹配的项
        : item, // 保持其他项不变
  ),
);

// ❌ 错误：使用会修改原数组的方法
items.push(4); // ❌ push 会修改原数组
setItems(items); // ❌ 引用没变

items.sort(); // ❌ sort 会修改原数组
setItems(items); // ❌ 引用没变

// ✅ 正确：先复制再操作
setItems([...items].sort());
setItems([...items].reverse());
```

### 6. 数组中对象的更新（嵌套更新）

```tsx
const [cart, setCart] = useState([{ id: 1, name: "商品A", quantity: 1 }]);

// ✅ 既要新数组，也要新对象
setCart((prev) =>
  prev.map((item) =>
    item.id === 1
      ? { ...item, quantity: item.quantity + 1 } // 新对象
      : item,
  ),
);

// ❌ 错误：直接修改数组中的对象
cart[0].quantity++;
setCart(cart);
```

## 🆚 与 Vue 的对比

| 功能     | Vue 3                         | React                                   |
| -------- | ----------------------------- | --------------------------------------- |
| 状态定义 | `const count = ref(0)`        | `const [count, setCount] = useState(0)` |
| 状态更新 | `count.value++`               | `setCount(count + 1)`                   |
| 对象修改 | `user.value.name = '李四'` ✅ | `user.name = '李四'` ❌                 |
| 数组修改 | `arr.value.push(4)` ✅        | `arr.push(4)` ❌                        |
| 更新原则 | 可以直接修改（响应式）        | 必须不可变更新                          |

**核心区别：**

- Vue：响应式系统自动追踪变化，可以直接修改
- React：通过引用比较检测变化，必须创建新引用

## 💡 重要概念

### 不可变更新原则

React 通过**浅比较引用**来判断状态是否变化：

```tsx
// React 内部的判断逻辑（简化版）
if (oldState === newState) {
  // 引用相同，不重新渲染
} else {
  // 引用不同，重新渲染
}
```

所以必须创建新的对象/数组，改变引用。

### 函数式更新的本质

```tsx
// 普通更新：基于闭包中的值
setCount(count + 1); // count 是闭包中捕获的值

// 函数式更新：基于最新的状态
setCount((prev) => prev + 1); // prev 是 React 传入的最新值
```

## 🎓 完成的练习

### 渐进式练习

1. ✅ step1-basic-useState - useState 基础用法
   - 计数器、开关、输入框
   - 练习：点赞器

2. ✅ step2-functional-update - 函数式更新和异步性
   - 连续更新问题
   - 闭包陷阱
   - 定时器场景
   - 练习：连击计数器

3. ✅ step3-object-array-state - 对象和数组状态
   - 对象的不可变更新
   - 嵌套对象更新
   - 数组的增删改
   - 练习：购物车（简化版）

### 最终练习

✅ final-practice - 购物车应用

**实现的功能：**

- 商品列表展示（名称、价格、库存）
- 添加商品到购物车
- 修改购物车商品数量（+/-）
- 删除商品和清空购物车
- 计算总价和总数量
- 边界处理（库存限制、数量为 0 自动删除）

**使用的技术点：**

- useState 管理购物车状态
- 函数式更新避免闭包陷阱
- 数组和对象的不可变更新
- 条件渲染（按钮状态）
- 数组方法（map、filter、find、some、reduce）

## 📝 学习心得

### 掌握得好的地方

- 理解了不可变更新的原理和重要性
- 能正确使用函数式更新避免闭包陷阱
- 熟练使用数组方法进行不可变更新
- 能处理边界情况和用户体验细节

### 需要注意的点

1. **永远用 prev，不用外层 state**

   ```tsx
   // ❌ 错误
   setCart(prev => {
     const item = cart.find(...)  // 用了外层的 cart
   });

   // ✅ 正确
   setCart(prev => {
     const item = prev.find(...)  // 用参数 prev
   });
   ```

2. **嵌套越深，展开越多**
   - 1 层：`{ ...obj, key: value }`
   - 2 层：`{ ...obj, nested: { ...obj.nested, key: value } }`
   - 数组中的对象：`arr.map(item => item.id === id ? { ...item, key: value } : item)`

3. **不能用会修改原数组的方法**
   - ❌ `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`
   - ✅ `concat`、`slice`、`filter`、`map`、`[...arr]`

## ⚠️ 常见错误总结

### 1. 直接修改状态

```tsx
// ❌ 错误
user.name = "李四";
arr.push(4);

// ✅ 正确
setUser({ ...user, name: "李四" });
setArr([...arr, 4]);
```

### 2. 不用函数式更新

```tsx
// ❌ 错误：定时器中
setInterval(() => {
  setCount(count + 1);
}, 1000);

// ✅ 正确
setInterval(() => {
  setCount((prev) => prev + 1);
}, 1000);
```

### 3. 在 setState 回调中用外层 state

```tsx
// ❌ 错误
setCart(prev => {
  const item = cart.find(...)  // 闭包陷阱
});

// ✅ 正确
setCart(prev => {
  const item = prev.find(...)
});
```

### 4. 修改数组中的对象忘记创建新对象

```tsx
// ❌ 错误
setCart((prev) =>
  prev.map((item) => {
    if (item.id === id) {
      item.quantity++; // 直接修改
      return item;
    }
    return item;
  }),
);

// ✅ 正确
setCart((prev) =>
  prev.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
  ),
);
```

## 🚀 下一步

准备学习单元 3：useEffect 副作用处理，学习如何处理数据获取、订阅、定时器等副作用！

---

**完成日期：** 2026-03-21  
**学习方式：** 渐进式学习（边学边练）  
**掌握程度：** 90%  
**核心收获：** 理解了 React 的不可变更新原则，掌握了函数式更新避免闭包陷阱
