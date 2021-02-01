# ByteDance 7 前端代码

## 前置知识

- React
  - 建议看一下 React 的官方文档，不必看得非常详细，但是一定要把 [Main Concept](https://reactjs.org/docs/hello-world.html) 看完，这里面的一些诸如生命周期、state 和 props 的概念都是非常重要的，对你后续理解代码必不可缺。
  - 可以看一下 [hooks](https://reactjs.org/docs/hooks-intro.html)，现在 function component + hooks 的写法比较流行，比 class 的写法要简洁很多，主要看一下 `useState` 和 `useEffect` 即可，其他的用的不多。
- React Router
  - 这个不怎么需要看，主要是知道怎么配置[路由表](src/routes.ts)，以及一个组件要访问 `history` 对象（用来切换路由、获取当前路由等）时，加一个 `withRouter` 并在 props 类型上加一个 `RouteComponentProps` 就可以了。
- Redux
  - 这个也不怎么需要看，主要了解一下 effects 和 reducers 的概念，一个是异步请求，一个是同步 commit 修改 state。
  - redux 的写法和模板有很多种，我们这里选择了一种简洁一点的方法。
  - 更多参考例子可以看：https://github.com/rematch/rematch/tree/next/examples 。
- TS
  - TS 主要功能就是类型提示，可以看一下 [type-challenges](https://github.com/type-challenges/type-challenges)，做一些练习，熟悉了就可以。不需要掌握特别深，不懂的可以随时搜索。
- Storybook
  - 这个几乎不需要看文档（搭建脚手架的时候才需要看），直接看现有的 stories 的 export 格式就行了，主要是提供一个集中展示的位置，把大家开发的 components 放在一起（components 和 containers 的区别，主要就是不涉及业务逻辑的组件库和业务组件的区别）
  - 所有 `*.stories.tsx` 文件会被自动识别为一个 story 文件，在 storybook 中加以渲染
- Less
  - 用到的时候现查文档就行，主要是把 CSS 的写法精简了许多

## 组件（story）开发

```bash
npm run storybook
```

如果要开发组件，请放置在 [src/components](./src/components) 目录下，并且写好 story 方便预览。

## 项目开发

```bash
npm run start
```

## 路由配置

所有路由配置都存放在 [src/routes.ts](src/routes.ts) 中。

Demo 页面：

- 路由：http://localhost:3000/demo
- 代码：[src/containers/Demo](src/containers/Demo)
