# 如何将莎夜健康状态界面导入到酒馆中

## 步骤 1: 确保已构建前端界面

首先，确保你已经构建了前端界面：

```bash
pnpm build
```

或者使用监听模式（开发时推荐）：

```bash
pnpm watch
```

构建后的文件会在 `dist/莎夜/index.html`

## 步骤 2: 启动本地服务器

你需要启动一个本地 HTTP 服务器来提供 `dist` 文件夹。有几种方式：

### 方式 1: 使用 VS Code Live Server 扩展
1. 安装 VS Code 的 "Live Server" 扩展
2. 右键点击 `dist/莎夜/index.html`，选择 "Open with Live Server"
3. 记下服务器地址（通常是 `http://localhost:5500`）

### 方式 2: 使用 Python 简单服务器
```bash
cd dist
python -m http.server 5500
```

### 方式 3: 使用 Node.js http-server
```bash
npx http-server dist -p 5500
```

## 步骤 3: 配置酒馆助手

1. 打开酒馆助手设置
2. 找到 "实时修改" 功能
3. 导入 `界面-莎夜.json` 配置文件
4. **重要**: 根据你的实际服务器地址修改配置文件中的 URL：
   - 如果使用 `localhost:5500`，保持默认即可
   - 如果使用其他端口，将 `http://localhost:5500` 改为你的实际地址

## 步骤 4: 启用配置

1. 确保配置文件中的 `"disabled": false`
2. 在酒馆中发送任意消息，界面应该会自动加载

## 配置说明

配置文件中的关键字段：
- `findRegex`: `".*"` - 匹配所有消息
- `replaceString`: 替换为加载界面的代码
- `placement`: `[1, 2]` - 在用户消息和 AI 回复中都应用
- `markdownOnly`: `true` - 只在 markdown 模式下生效

## 故障排除

如果界面没有显示：

1. **检查服务器是否运行**: 在浏览器中访问 `http://localhost:5500/dist/莎夜/index.html`，应该能看到界面
2. **检查控制台错误**: 打开浏览器开发者工具（F12），查看 Console 是否有错误
3. **检查正则配置**: 确保 `findRegex` 能匹配你的消息
4. **检查文件路径**: 确保 `dist/莎夜/index.html` 文件存在且可访问

