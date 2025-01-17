# Flow

> Flow 的官网地址：https://flow.org/

## 为什么 Vue 要使用 Flow

大家都知道 JavaScript 是一门非常灵活的语言，但就是因为太过于灵活，导致我们会写出一些令人啼笑皆非的代码。而类型检查能够帮助我们规避很多的错误，这也是一种趋势，比如说 TypeScript 也是一种拥有静态类型检查能力的语言。

Vue 在 2.0 的时候就加入了 Flow 的静态类型检测，并且 Babel 和 ESLint 也有对应的 Flow 支持。

## Flow 的使用

```bash
# 安装 Flow
$ yarn add flow
```

### Flow 的配置文件

我们可以使用 `flow init` 来初始化配置文件，然后我们可以针对自己的项目情况来初始化项目。

## 如何使用？

flow 支持以下两种类型检查的方式：

1. 通过注释：我们可以通过事先写好注释，把类型写好，Flow 就能够根据注释来进行检测。
2. 通过代码判断：通过变量的使用上下文来判断变量的类型。

不过，其实我不推荐通过代码判断的方式来进行类型检测，毕竟使用 Flow 就是为了做类型检查的，而通过上下文的方式来做难免会造成疏漏。

```js
/*@flow*/
function split(str: string): string {
  return str.split('');
}
```

这样就写好了。当我们函数的输入和输出不是 string 类型的时候就会报错。

至于更加详细的注释内容请大家自行到 flow 的官网查看。
