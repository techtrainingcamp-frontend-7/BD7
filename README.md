# ByteDance techtrainingcamp-frontend-7

## 技术栈

前后端放在一个仓库里面，使用 [lerna](https://github.com/lerna/lerna) 统一管理。你需要全局安装 lerna：

```bash
yarn global add lerna
```

```bash
# 自动安装根目录、前后端所有依赖
lerna bootstrap
```

### 前端

```bash
cd frontend
yarn start
```

存放于文件夹 [frontend](frontend)。

- React
- React Router
- Redux
- TS
- Storybook
- Less

### 后端

存放于文件夹 [backend](backend)。

- Vercel
- MySQL 云数据库
- [轻服务](https://qingfuwu.cn/dashboard)
- Express
- Sequelize

## 项目基础配置

### 推荐插件

在 [`.vscode/extensions.json`](.vscode/extensions.json) 中列出了推荐安装的插件，打开 VSCode 的时候会提示是否安装，最好全部安装一下。

### workspace 设置

在 [`.vscode/settings.json`](.vscode/settings.json) 中配置了项目的共享配置，这些配置在所有的协作者本地都是一样的，保证大家的环境一致性。

### 代码规范

统一使用 ESLint 进行代码规范和格式化，采用 [standardjs](https://standardjs.com/) 标准，如需增加规则，可修改配置文件 [.eslintrc.js](.eslintrc.js)。

采用 `lint-staged` 进行 commit 时的代码格式化，如果不合规范将无法 commit。当然在特殊情况下你可以用 `git commit -n` 来绕过这些检查，但是不建议。
