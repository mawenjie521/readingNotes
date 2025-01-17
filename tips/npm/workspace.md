# yarn workspace 模式

> workspace 是 yarn 的一种包依赖安装模式

比如说我们有这样一种情况，在根目录 app 下有两个子目录， admin 和 server，但这两个目录都拥有自己的 package.json，这种情况下，我们需要到 admin 和 server 目录下分别去 yarn。

如果我们使用 workspace 的开发模式就只需要在 根目录下的 package.json 中增加一个字段：

```json
{
  "private": true,
  "workspaces": ["admin", "server"]
}
```

当我们这样配置的时候就只需要在根目录下 yarn，同时上面的 private: true 是必须的，不然不起作用。
