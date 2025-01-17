# 11 个 JavaScript 技巧

原文地址：https://medium.com/@bretcameron/12-javascript-tricks-you-wont-find-in-most-tutorials-a9c9331f169d

这篇文章里时作者列出的关于 JavaScript 的 11 个小技巧，用于更快更好的 coding。

## 过滤唯一值

在之前的方案中，有使用 `indexOf` 的方案等等，在 ES6 之后，过滤唯一值有更简单的方案，那就是：

```js
const array = [1, 1, 2, 3, 5, 5, 1];
const uniqueArray = [...new Set(array)];

console.log(uniqueArray); // Result: [1, 2, 3, 5]
```

确实这种方案减轻了我们之前写一大串代码来过滤的方案，这很简单，局限性就是只支持原始类型，但是够用了。

## 短路写法

这种技巧就是使用 `&&` 和 `||` 来进行判断，或者是默认值赋值，这样其实我们能够少写很多的 `if else`，同时我也支持作者的想法，就是别写太多的三元运算符，特别是比较复杂的三元运算，阅读性极其的差，不方便维护。

以及作者介绍的一种新的语法，当然了要使用 babel 插件才可以，这个功能其实我很喜欢，但是一直没有标准化，很难受，有这种写法其实可以很大程度上避免上一周说的 `undefined` 的那个问题，只能说期待吧。

## 布尔值转换

其实很简单就是用 `!!` 来转换，这个想必很多人都知道，开发中的使用频率其实不高，但是还是不错的方法。

## 转换成字符串

这个简单了，刚学习 js 的小伙伴应该都会知道，加一个空字符串就能够转换了。

## 转换数字

这个在工作中的使用频率相对来说高很多，通常来说在通过 query 来获取参数的时候拿出来的都是字符串，但是我们需要的是数字，所以我们可以这样，就变成了数字。

```javascript
let page = +page;
```

## 快速计算 n 次方

从 ES7 开始我们就可以使用 `**` 快速的进行 n 次方。

```js
2 ** 3; // 8
```

## 浮点数转整数

我们可以使用位运算的方式来快速的完成浮点数转整数，也就是说我们可以这样：

```js
23.9 | 0; // 23
-23.9 | 0; // -23
```

## 自动 bind 在 class 里

写过 React 的同学们都应该知道，在 React 里有绑定 this 的问题，所以我们可以这样写，就可以不用去 `bind(this)` 了。

```js
import React, { Component } from React;
export default class App extends Compononent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  myMethod = () => {
    // This method is bound implicitly!
  }

  render() {
    return (
      <>
        <div>
          {this.myMethod()}
        </div>
      </>
    )
  }
};
```

## 快速的截断数组

通常我们都是使用 `splice` 或者 `slice` 来进行数组的截断，作者提供了另一种方式，但是我觉得还是使用 `splice`、`slice` 比较语义明确，我不太支持这么写。

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
array.length = 4;
console.log(array); // Result: [0, 1, 2, 3]
```

## 获取数组的最后几位

我们可以使用 `slice` 函数，传入负数值即可。

```js
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(array.slice(-1)); // Result: [9]
console.log(array.slice(-2)); // Result: [8, 9]
console.log(array.slice(-3)); // Result: [7, 8, 9]
```

## 格式化 JSON 代码

这也是我在工作中才用到的，之前都是直接 `console`，然后发现这样的写法其实对阅读很不友好，全部都在一行，于是我研究了一下发现 `console.log` 还有参数，于是我们这样写就能够很清晰的知道打印的对象啦。

```js
console.log(JSON.stringify({ alpha: 'A', beta: 'B' }, null, '\t'));
// Result:
// '{
//     "alpha": A,
//     "beta": B
// }'
```

## 总结

最后总结一下吧，作者提出的很多的方法都比较实用，但是在使用的过程中，我们也要考虑到阅读代码会不会带来困惑的问题，所以大家见仁见智吧。
