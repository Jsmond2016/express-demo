# Node 学习

## Node 基础


## Koa 中间件

从 01——15 都是对应的学习代码

## Node 工程化目录

新建 src 等目录，结构如下:

```bash
src
├── api
│   ├── a.js
│   └── b.js
├── index.js
└── routes
    ├── aRoutes.js
    ├── bRoutes.js
    └── routes.js

```

- 依赖安装：

- 文件内容：

a.js

```js
module.exports = function (ctx) {
  ctx.body = {
    "message": "hello, world--a"
  }
}
```

b.js

```js
module.exports = function (ctx) {
  ctx.body = {
    "message": "hello, world--b"
  }
}
```

aRouter.js

```js
const Router = require('koa-router')

const a = require('../api/a')

const router = new Router()

router.get('/a', a)

module.exports = router
```

bRouter.js

```js
const Router = require('koa-router')

const b = require('../api/b')

const router = new Router()

router.get('/b', b)

module.exports = router
```


index.js

```js
const path = require('path')
const Koa = require('koa')
const helmet = require('koa-helmet')
const statics = require('koa-static')

const app = new koa()
const router = require('./routes/routes')

app
  .use(helmet())
  .use(statics(path.join(__dirname,'../static')))
  .use(router())

app.listen(3000)

// 验证 koa-static 中间件，使用 http://localhost:3000/pear.jpg 访问
```

运行测试：

```bash
node index.js
```


## Node 工程化搭建

有了上面的 src 等文件，现在搭配 webpack 的使用

- 安装 webpack

```bash
 yarn add webpack webpack-cli -D
```

- 安装其他依赖

```bash
yarn add clean-webpack-plugin webpack-node-externals @babel/core -D

yarn add @babel/node @babel/preset-env babel-loader cross-env nodemon -D
```


- 创建 webpack.config.js， 并配置

```js
const path = require('path')
const nodeExcternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackconfig = {
  mode: 'development',
  entry: {
    server: path.join(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, '/node_modules')]
      }
    ]
  },
  externals: [nodeExcternals()],
  plugins: [
    new CleanWebpackPlugin(),
  ],
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  }
}

module.exports = webpackconfig
```

- 配置 .babelrc 文件

```json
{
  "presets": [
    ["@babel/preset-env",  {
      "targets": {
        "node": "current"
      }
    }]
  ]
}
```


- 本地测试运行，webpack 是否打包成功

```bash
npx webpack webpack.config.js

# or

./node_modules/.bin/webpack webpack.config.js

```

- 测试 es6 语法，将 `require` 换成 `import`

更改文件 index.js

```js
// const path = require('path')
// const Koa = require('koa')
// const helmet = require('koa-helmet')
// const statics = require('koa-static')


import path from 'path'
import koa from 'koa'
import helmet from 'koa-helmet'
import statics from 'koa-helmet'

const app = new koa()
const router = require('./routes/routes')

app
  .use(helmet())
  .use(statics(path.join(__dirname,'../static')))
  .use(router())

app.listen(3000)

// 验证 koa-static 中间件，使用 http://localhost:3000/pear.jpg 访问
```

运行 测试

```bash
npx babel-node src/index.js

# or

./node_modules/.bin/babel-node src/index.js 
```

浏览器访问： `localhost:3000/a` 查看返回结果


- 使用 `nodemon` 开启监听

```bash
nodemon --exec babel-node src/index.js
```

浏览器访问： `localhost:3000/a` 查看返回结果

此时，更改 package.json 的 scripts 内容

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --exec babel-node src/index.js"
  },
```

此时，直接运行  `yarn start` 即可保持热更新和启动


## 工程化进阶

1.新增 [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)，检查 package.json 中是否有依赖可以升级。安装如下

```bash
npm i -g npm-check-updates
```

使用方式，`ncu --help`

常用命令：

```bash

# 检查是否有可以更新的依赖
ncu -u

# 删除 node_modules

rm -f node_modules

# install

npm install
```

更多使用方式，参考 [npm-check-updates](https://www.npmjs.com/package/npm-check-updates)


2. 使用 [koa-compose](https://www.npmjs.com/package/koa-compose) 整合中间件，安装和使用方式

```bash
npm i koa-compose
```

使用：

```js
// eg
compose([a, [b, c,] ...])

//use

import path from 'path'
import koa from 'koa'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import compose from 'koa-compose'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import router from './routes/routes'

const app = new koa()

const middleware = compose([
  koaBody(),
  statics(path.join(__dirname,'../static')),
  cors(),
  jsonutil({pretty: false, param: 'pretty'}),
  helmet(),
])

app.use(middleware)
app.use(router())


app.listen(3000)

// 验证 koa-static 中间件，使用 http://localhost:3000/pear.jpg 访问
```

## 工程化升级


区分不同环境的 webpack 配置

base 基础配置

dev 开发配置

使用 [webpack-merge](https://www.npmjs.com/package/webpack-merge) 合并  base 配置

代码为：

```js
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  stats: { children: false }
})


module.exports = webpackConfig
```

production 环境配置为：

使用 [terser-webpack-plugin](https://webpack.js.org/plugins/terser-webpack-plugin/#root) 压缩 js，我们使用它的默认配置

代码为：

```js
const webpackMerge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const terserWebpackPlugin = require('terser-webpack-plugin')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  stats: { children: false },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          ecma: undefined,
          parse: {},
          compress: {
            warnings: false,
            drop_console: false,
            dead_code: true,
            drop_debugger: true
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: {
            comments: false,
            beautify: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  },
})


module.exports = webpackConfig
```

配置 package.json 中的 scripts-build

- `cross-env` 能够保证跨平台下环境变量的正确设置

配置命令：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --exec babel-node src/index.js",
    "build": "cross-env NODE_ENV='prod' webpack --config config/webpack.config.prod.js"
  },
```

执行命令： `yarn build` 报错，发现是路径问题

在 config 目录下新建 `utils.js` 文件，如下：

```js
const path = require('path')

exports.resolve = function resolve(dir) {
  return path.join(__dirname, "..", dir )
}

exports.APP_PATH = exports.resolve('src')

exports.DIST_PATH = exports.resolve('dist')
```

更改 `config/webpack.config.base.js` 文件关于路径的配置

```js
entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
  },
```


dev 开发环境配置 和 clean 配置

需要安装 `rimraf`，类似 linux 命令 `rm`，安装 `yarn add -D rimraf`

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon --exec babel-node src/index.js",
    "build": "cross-env NODE_ENV='prod' webpack --config config/webpack.config.prod.js",
    "dev": "cross-env NODE_ENV=dev nodemon --exec babel-node --inspect ./src/index.js",
    "clean": "rimraf dist"
  },
```

相关代码优化


