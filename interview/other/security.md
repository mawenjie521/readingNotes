# 前端安全

> 提到安全性，大家多半想到的都是后端去做相应的设计，没错，后端的防御非常重要，但是前端的安全也不可忽视，现在前端的攻击方式也是五花八门，但是最基础的也就是那几种，比如说 XSS、CSRF 这些，下面我们主要探讨这两种。

## XSS

XSS 叫做跨站脚本注入攻击，其实应该叫 CSS 的，因为第一个单词是 Cross，但是呢，为了不和 CSS 样式文件的名字冲突，也就叫了一个这个名字。
这个攻击手段利用的就是你站内的正常途径来注入他的脚本来达到攻击的目的，比较常见的就是博客，评论之类的地方，这时候我们接收到的数据就不是普通的数据，而是一段代码。
同时，对于 XSS 来说，有两种常见的形式。

- 通过链接的形式，构造一个恶意的 url，里面有一段发送用户 cookies 的代码，通过邮件或者其他途径发送给别人，当有人点击了这个链接之后就会把自己的 cookies 信息发送过去。

- 还有一个形式，比如说我们在写博客的时候，在文章里面嵌入了一段代码，这时候当有用户点开了我这篇博客就会将自己的信息泄露。

---

那么防御的方法有什么呢？

1. 将重要的 cookie 标记为 http only.
2. 对数据进行 Html Encode 处理.
3. 过滤或移除特殊的 Html 标签或者 js 事件.

## CSRF

CSRF 也叫做跨站请求伪造，通俗一点来说就是攻击者盗用了你的信息，以你的名义发送请求。可以发消息，卖商品，转账什么的。下面是一个大概的流程：

1. 用户 C 打开浏览器，访问受信任网站 A，输入用户名和密码请求登录网站 A；
2. 在用户信息通过验证后，网站 A 产生 Cookie 信息并返回给浏览器，此时用户登录网站 A 成功，可以正常发送请求到网站 A；
3. 用户未退出网站 A 之前，在同一浏览器中，打开一个 TAB 页访问网站 B；
4. 网站 B 接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点 A；
5. 浏览器在接收到这些攻击性代码后，根据网站 B 的请求，在用户不知情的情况下携带 Cookie 信息，向网站 A 发出请求。网站 A 并不知道该请求其实是由 B 发起的，所以会根据用户 C 的 Cookie 信息以 C 的权限处理该请求，导致来自网站 B 的恶意代码被执行。

也就是说这种攻击方式，用户要满足两个要求，第一个就是用户 登录了 A 网站，第二个就是在没有关闭 A 网站的情况下，又打开了 B 网站。那么我们要怎么去防御这种攻击呢？

1.  可以在 http 中验证 referer 这个字段来确定发起请求的地址是什么，但是这种方式也不是完全的能禁止攻击，在我所知道的就能够通过伪造 referer 来欺骗服务器，在最近的项目中也用到了这个。
2.  第二种方式则是用令牌的方式来进行防御，服务端可以核实这个令牌来考虑响不响应这个请求。