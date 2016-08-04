## npm install -g 依赖

- Fis3 使用全局安装

- 语言编译parser
    * fis-parser-babel-6.x  
        支持 es6、es7 或者 jsx 编译成 es5
    * fis-parser-node-sass  
        支持 sass/scss 编译成 css。
    * fis3-parser-vue-component  
        编译Vue Component
    * fis-parser-less-2.x
        支持 less 编译成 css
    * fis-parser-jade
        支持jade转义
    * fis3-parser-typescript  
        支持 typescript、es6 或者 jsx 编译成 js，速度相比 babel 略快，但是 es7 跟进较慢
- 打包插件
    * fis3-deploy-skip-packed   
        过滤打包过的文件，不release
    * fis3-postpackager-loader
        前端打包插件
    * fis3-preprocessor-js-require-css  
        支持 js 中直接 require css
    * fis3-hook-commonjs  
         fis3 已经默认不自带模块化开发支持，那么如果需要采用 commonjs 规范作为模块化开发，请使用此插件。
        请配合 [mod.js](https://github.com/fex-team/mod/blob/master/mod.js) 一起使用
    * fis3-hook-node_modules  
      fis3 对npm的node_modules模块的支持
    
    注：
    1. fis-optimizer-clean-css fis-optimizer-uglify-js
    fis3内置，不需要安装
    2. 语法编译插件可以自由选择，当你需要用哪个时，就安装对应的plugin，建议使用 babel，node-sass，vue-component，前三个，会让你的开发的事半功倍  
    _当你用到哪个plugin时，fis会匹配对应的plugin，所以就算有你没有安装的plugin，如果没有匹配到对应的规则，是不会报错的，比如你用typescript写了一个ts文件，但是你的项目里没有用到这个文件，即使你没有安装typescript的parser，也没关系_
    3. 为什么建议全局安装？   
       因为鉴于我们项目在`__src__`目录下会有很多个工程，每个工程会有一个`fis-conf.js`，fis3在去查找安装模块时，会首先找到`fis-conf.js`所在目录下的`node_modules`，如果没有，会去找全局安装的`node_modules`。
   > 你可能会问，那我可以放在我的大工程`fe`目录下吗？ 
   > 
   > 答案：可以！需要你在fis-conf.js的头部加一段代码即可。
   >
   > `fis.require.paths.splice(1, 0, '../../node_modules');`

## git

前端代码规范wiki
https://github.com/ecomfe/fecs/wiki/

[规范文档 How to fix](https://github.com/ecomfe/fecs/wiki/HowToFix)

[IDE集成支持](https://github.com/ecomfe/fecs/wiki/FAQ#%E6%9C%89%E6%B2%A1%E6%9C%89%E9%9B%86%E6%88%90%E5%88%B0%E7%BC%96%E8%BE%91%E5%99%A8%E6%88%96-ide-%E7%9A%84%E6%94%AF%E6%8C%81)


## 目录规范

    __src__目录里新建你需要的工程
    目录结构：
        components
            偏向功能的组件
        kit
            --directive 指令
            --filters 
        pages 静态页面
        services 请求服务端接口
        styles
            css 样式文件，可以是scss，less，css
            img
        views 按照页面区分，有几个页面就新建vue，偏向业务的组件
           
    target目录
    发布后的资源都放置在这里
    
## release 工程

在__src__目录执行命令：
```
 fis3 release -f ./{工程目录}/fis-conf.js
 发布命令
 fis3 inspect -f ./{工程目录}/fis-conf.js
 检测哪些文件应用的配置
```

## release lib

在__src__目录执行命令：
```
 fis3 release lib
 发布lib
```

## 开发环境

1. 浏览器自动刷新  
  
  在__src__目录执行命令：
  
   ```
   fis3 release dev -wL -f ./{工程目录}/fis-conf.js
   ```
   
2. 本地环境与测试环境代码静态资源*rewrite*映射
    
   访问个人`http://zjc.pharos.baidu.com/`，静态资源映射到本地，其他资源，主要是php接口直接使用个人测试环境的接口，*fiddler*的升级版  
   我这里使用的apache作为示例，若使用*nginx*，原理相当
    * 搭建apache环境 
    * 在pharos目录新建`.htaccess`文件，然后删掉下面子工程里的`.htacess`（这里htacess规则的权重是最高的）代码如下：
        ```
      Options All Indexes FollowSymLinks MultiViews
      RewriteEngine on
      RewriteCond %{REQUEST_URI} !^.*.js
      RewriteCond %{REQUEST_URI} !^.*.css
      RewriteCond %{REQUEST_URI} !^.*.html
      RewriteCond %{REQUEST_URI} !^.*.png
      RewriteCond %{REQUEST_URI} !^.*.jpg
      RewriteCond %{REQUEST_URI} !^.*.gif
      RewriteRule .* http://10.100.81.59/$0 [P]
      ```
      
    * 配置host 
      `127.0.0.1 zjc.pharos.baidu.com`
    
    * done，enjoy it

## 新建工程

**TODO** 使用命令直接生成一套目录规范：

```
 fis3 pharos <project name>
```

## 使用ES6
   
  支持es6语法，Babel 作为一个源到源的编译器不可能呈现所有 ES6 标准库中的新特性，例如 Map 和 Set 构造器和 Array 下的一些新方法，需要
```
  require('babel-polyfill')
```

#### 注意事项

- 在使用require一个资源时，使用相对路径

- 为什么不使用fis3自带的server？
    因为我在fis-conf.js里面覆写了local-deliver插件规则，所以你执行```fis3 release -f ./{目录名}/fis-conf.js```，是发布到父级目录的，因此需要你自己搭一个服务器，把你的根目录设成fe的父目录 [替代内置Server](http://fis.baidu.com/fis3/docs/beginning/debug.html#%E6%9B%BF%E4%BB%A3%E5%86%85%E7%BD%AEServer)


