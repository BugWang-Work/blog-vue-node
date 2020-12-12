# 用 GitHub Actions 部署 Vue 项目到 GitHub Pages

实现每次 Push 代码之后，自动构建测试并部署到 GitHub Pages 的分支上

## 配置 ACCESS_TOKEN

- 打开 https://github.com/settings/tokens ，点击右上方 Generate new token， 生成一个 token

  Note： 给 token 起一个名字，比如 build_deploy，然后把 repo 的候选框选中。最后点下面的绿色按钮，跳转页面后获得一个 key，这个 key 只会出现一次，先复制下来，一会要用。

  ![](./images/build_deploy.png)

- 打开项目中的 Settings，点击侧栏 Secrets，点击右上角 New secrets，输入名称 ACCESS_TOKEN，这个名字可以自定义，相当于定义了一个环境变量。然后把刚才复制的 token 粘贴到 value 里，保存。

  ![](./images/access_token.png)

## 创建 GitHub Workflows 配置文件

- 方法 1：在项目根目录下.github/ 文件夹下创建 workflows 文件夹，新建 YAML 文件如下，名字可以随意如：build_deploy.yml

- 方法 2：在项目中点击 actions 创建，参考：
  [GitHub Actions 入门教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

```yml
# 参考： https://github.com/marketplace/actions/deploy-to-github-pages

name: Build and Deploy Vue3 Project

# 触发条件
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    # 运行环境
    runs-on: ubuntu-latest

    steps:
      # 使用官方checkout下载代码
      - name: Checkout
        uses: actions/checkout@v2.3.1
        with:
          persist-credentials: false

      - name: Install and Build
        run: |
          yarn
          yarn build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@3.7.1
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: dist
          CLEAN: true
```

## 访问地址： https://bugwang-work.github.io/blog-vue-node/

## 空白页面问题

>资源路径错误

配置 vite.config, 增加 base 配置

```ts
export default {
  // 如果发布到gh-pages，目录为项目名称
  base: "/blog-vue-node",
};
```

>和 GitHub Pages 用的 Jekyll 冲突

这个是因为 Vue 打包后的 JS 和 CSS 文件被放在 _assets 文件夹中，这个文件夹是下划线开头的，和 GitHub Pages 用的 Jekyll 冲突，[Bypassing Jekyll on GitHub Pages - The GitHub Blog](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/) 。

>现在可以通过在页面存储库根目录中创建一个命名文件并将其推送到GitHub，从而完全绕过GitHub Pages上的Jekyll处理.nojekyll。仅当您的站点使用以下划线开头的文件或目录时才需要这样做，因为Jekyll认为这些是特殊资源，并且不会将其复制到最终站点

__解决方法__： 在项目 public 文件夹中添加一个文件，名字是 .nojekyll，这样在生成 dist 的时候，这个文件就会同时被部署到 GitHub Pages 中，以解决这个问题。

## 参考资料

https://docs.github.com/en/free-pro-team@latest/actions/guides/caching-dependencies-to-speed-up-workflows

https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html
