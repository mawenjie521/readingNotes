# Timing Attack

> 这是在工作中一位同事在使用 eslint-security 的时候发现的一个攻击点，中文翻译叫时序攻击，感觉很新奇，所以记录下来。

## 前言

在一次常规的撸代码的下午，突然 eslint 报错了，what? 经过我多年的撸代码经历，已经很少能让他警告了，这次突然给我报个警告，于是打开控制台一看，`detect-possible-timing-attacks`，一脸懵逼，这是啥？

于是我又跑到 [**eslint-plugin-security**](https://github.com/nodesecurity/eslint-plugin-security) 仓库溜达了一圈，发现这个警告的源头，它指向了一篇[博客](https://snyk.io/blog/node-js-timing-attack-ccc-ctf/),更详细的信息博客里有提到，不过是英文的。

## 怎么触发这个警告？

当你使用这几个运算符的时候，就有可能触发。

这几个运算符就是 `==`, `!=`, `!==` 和 `===`。

```js
var keywords = '((' + [
    'password',
    'secret',
    'api',
    'apiKey',
    'token',
    'auth',
    'pass',
    'hash'
].join(')|(') + '))';
```

看源代码我们就会知道，当你使用上面的几个运算符加上如上的关键字，就会触发这个警告，比如说：

```js
if (inputValue === password) {
    return '登陆成功';
}
```

这样就触发了这个警告，是不是有点懵，难道不是这么写么？好吧，我原来也是这么想的，但是看了博客介绍发现确实不安全，我们继续往下看。

## 啥叫时序攻击

OK，我们先看百度咋说的: 在密码学中,时序攻击是一种侧信道攻击,攻击者试图通过分析加密算法的时间执行来推导出密码。每一个逻辑运算在计算机需要时间来执行,根据输入不同,精确测量执行时间,根据执行时间反推出密码。

简而言之，就是攻击者会利用它猜测的密码来试探真实的密码，怎么试探呢？根据你响应的时间，我们都知道，字符串的匹配是需要时间的，如果你第一位都匹配不上，那么他响应的时间就会比第一位密码匹配正确的响应时间快。

可能还是有人不太明白，这里我们举个可能不是很恰当的例子：

```js
// 比如说我们的真实密码是 1234
// 为了方便，假设我们比较一个字符的时间为 1s
0000 -> 1234  // 耗时 1s，因为第一位密码错误，只比较了第一位
1111 -> 1234  // 耗时 2s，因为第一位密码是正确的，它比较了两位
2222 -> 1234  // 耗时 1s
// ...
// 可以看出，1111 响应时间有差异，说明第一位密码是 1，通过这种方法，我们可以去猜测到正确的密码
```

好了看完例子，我想大家应该对这种攻击方法有了大概的认识了。

## 如何防御

讲了这么多关于攻击的，那么我们如何去防御呢？

- __将密码比较时间统一：__ 比如说将密码进行异或，这样无论密码是否正确，它都会将密码全部比较之后，再返回，就没有时间差了。
- __限制密码尝试次数：__ 我们通过上面也知道要得到正确的密码会尝试很多次，我们只要将密码尝试次数进行限制就可以了。

## 总结

好了，Timing attack 就讲到这里了，在我们工作中要时时刻刻都要想到安全问题，这不仅是保护公司财产、用户隐私，还关系到自己的小钱钱，哈哈。

> 如果各位看官看的还行，可以到 [GitHub](https://github.com/balancelove/readingNotes) 里给我一颗小小的 star 支持一下，谢谢。