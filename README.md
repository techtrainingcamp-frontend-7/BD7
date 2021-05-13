# ByteDance techtrainingcamp-frontend-7

![Build](https://github.com/techtrainingcamp-frontend-7/BD7/workflows/Build/badge.svg)

## 如何部署本项目

1. 克隆本项目，运行 `npm i`
2. 在运行项目之前，需要先配置 MySQL 云数据库（我们使用的是阿里云，但是理论上任何云服务都可以）、又拍云存储、阿里直播云。
   - 阿里直播云需要配置「推流域名」和「播流域名」，可以使用二级域名，按照官方文档配置好之后，需要禁用一下 URL 鉴权（我们项目里面没有细究这个鉴权方式，之后有空可以再写写加上这个鉴权）
3. 在 backend 文件夹下，新建文件 `.env`，包含如下内容：

    ```apache
    # JWT Secret，可设置随意
    ACCESS_TOKEN_SECRET=xxx

    # MySQL Host
    DATABASE_HOST=xxx.xxx.xxx.xxx
    # MySQL 数据库名
    DATABASE_NAME=xxx
    # MySQL 数据库用户名
    DATABASE_USER=xxx
    # MySql 数据库密码
    DATABASE_PASSWORD=xxx

    # 又拍云存储相关配置
    UPYUN_OPERATOR=xxx
    UPYUN_SECRET=xxx
    UPYUN_BUCKET=xxx
    UPYUN_DOMAINNAME=https://xxx

    # 阿里云直播相关配置
    ALIYUN_PUSH_URL=https://xxx
    ALIYUN_LIVE_URL=https://xxx
    ALIYUN_APPNAME=xxx
    ```

4. 第一次运行代码时，为了创建表，需要在 [`backend/src/database/index.ts`](backend/src/database/index.ts) 取消以下注释。创建完之后建议还原注释，这样避免每次修改后端代码重新运行都尝试创建一遍表（会拖慢开发启动时间）

    ```ts
    const init = async () => {
      // await sequelize.sync({ alter: isDev })
      // console.log('All models were synchronized successfully.')
    }
    ```

5. vercel 自动部署。本项目根目录下的 [`vercel.json`](vercel.json) 配置了 vercel 自动部署的相关配置。需要注意的是，vercel 不支持 socket.io，因此直播间的聊天功能无法正常使用。
   1. 按照 [Vercel Action](https://github.com/amondnet/vercel-action#vercel-action) 的说明配置一下 3 个 token: `VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID`，并加入到 GitHub Project Settings 里面的 Secrets 里面
   2. 在 vercel 中添加 secret

      ```bash
      # vercel 添加 secret 示例
      # 需要把 vercel.json 里面的 env 字段全部都 add 一遍
      # vercel 会自动把大写转换为小写，所以 vercel.json 里面配置的 secret 都是小写的
      vercel secrets add ACCESS_TOKEN_SECRET xxx
      ```

## 技术栈

前后端放在一个仓库里面，使用 [lerna](https://github.com/lerna/lerna) 统一管理。你需要全局安装 lerna：

```bash
npm i -g lerna
```

```bash
# 安装根目录依赖
npm i
# 自动前后端所有依赖
lerna bootstrap
# 同时 build 前后端
lerna run build
# 部署 vercel
vercel --prod
```

目前已经将 `lerna bootstrap` 加入了 `postinstall` 脚本中，会在 `npm i` 的时候自动运行。同时在 pull 的时候如果远程仓库的依赖发生改变会自动运行 `npm i`，参考脚本 [.scripts/update_dependencies.sh](./.scripts/update_dependencies.sh)。因此只需要第一次 clone 仓库的时候手动在根目录 `npm i`，一下，后续都是自动安装依赖的了。

### 前端

```bash
cd frontend
npm run start
```

存放于文件夹 [frontend](frontend)，自动部署网址位于 https://bd7.upupming.vercel.app/ 。

- React
- React Router
- Redux
- Rematch
- TS
- Storybook
- Less

后台管理路由：http://localhost:3000/admin/

### 后端

```bash
cd backend
npm run dev
```

存放于文件夹 [backend](backend)。

- Vercel
- MySQL 云数据库
- Express
- Sequelize

## 项目基础配置

### 推荐插件

在 [`.vscode/extensions.json`](.vscode/extensions.json) 中列出了推荐安装的插件，打开 VSCode 的时候会提示是否安装，最好全部安装一下。

### workspace 设置

在 [`.vscode/settings.json`](.vscode/settings.json) 中配置了项目的共享配置，这些配置在所有的协作者本地都是一样的，保证大家的环境一致性。

### 代码规范

统一使用 ESLint 进行代码规范和格式化，采用 [standardjs](https://standardjs.com/) 标准，并集成了 `eslint-plugin-prettier`。如需增加规则，可修改配置文件 [.eslintrc.js](.eslintrc.js)。

采用 `lint-staged` 进行 commit 时的代码格式化，如果不合规范将无法 commit。当然在特殊情况下你可以用 `git commit -n` 来绕过这些检查，但是不建议。
