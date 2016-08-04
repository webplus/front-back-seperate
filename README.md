先说一下项目背景，应前端生态蓬勃发展的趋势，为了迎合趋势，我们也步入了前端大环境的大潮流中，拥抱前端工程化，拥抱ES6，ES7，拥抱Node服务端渲染。

一、现状：
	1. 前端采用挖坑的方式为后端填充数据
2.前端没有属于前端的模板
3.工作方式耦合严重
4.组件使用起来不够方便，复用性不高 
5.代码组织缺乏约束
6.部署发布重度依赖后端，每次上线需要后端去上线
7.前端代码和后端代码糅杂，页面结构不清晰，掺杂了大量的php模板，维护性差
		8.整体架构不清晰，css依赖，js依赖对页面不友好,
		9.Css模块粒度不够细，比如分页的样式需要引入整个table.css文件，包含多余的样式
		10.没有框架，使用jquery，大量DOM操作

二、要解决的问题（目标）：
	框架改造，统一代码格式规范，前端大趋势 Web Component，让developer从dom操作中解放出来，数据驱动视图更新，以数据为中心
	解耦，前端代码分离，使用对FE友好的方式管理前端代码
	页面采用前端模板
	前端工程化
	文件依赖对开发者友好，不需要再页面里填写link，script.src=xxxx.js大量标签

三、调研
	经过一个月的调研，主要包括Node，grunt，gulp，webpack，fis3等技术上的调研，以及尝试使用es6，es7去书写js
调研Node是为了尝试服务端渲染，这一块可以解决页面初始加载时，一些页面片段和js，css的提前准备，这一块也有缺点，增加了前端开发成本，开发代码时，需要熟悉Node开发模式，多书写Node代码，另外Node部署在服务器端，有一定风险，而且我们现在有了apache稳定的服务器环境，暂时不考虑Node，以后如果要加入Node，可以支持拓展
	针对打包工具，几种工具打包方式差不多，能解决文件依赖的关键问题即可，之后主要从Fis3与webpack中间去选择，因为webpack是现在流行的针对entry打包的工具，在处理单entry文件有很强的优势，可是处理多entry文件，需要手动改造webpack.conf.js，不够灵活；这方面fis3可以胜任我的打包任务，分析依赖，资源定位，语言编译，它是按照Html页面去分析依赖打包的，如果是后端模板，就没法打包了。
	期间，也尝试过fis3打包按照每个entry.js的方式去打包，但是有一个缺点，就是同一个文件不能打包到多个文件，也联系过作者，答复也是fis3是如此的，比如PageA.js依赖a.js，b.js，PageB.js依赖b.js，c.js，d.js，这样打包后的PageA.js和PageB.js只有a.js打包到PageA.js。
	Vue是流行的构建数据驱动的 web 界面的库Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件Vue.js 自身不是一个全能框架——它只聚焦于视图层。因此它非常容易学习，非常容易与其它库或已有项目整合。另一方面，在与相关工具和支持库一起使用时，Vue.js 也能完美地驱动复杂的单页应用。组件系统是用 Vue.js 构建大型应用的基础。另外，Vue.js 生态系统也提供了高级工具与多种支持库，它们和 Vue.js 一起构成了一个更加“框架”性的系统。
最终选择了Fis3+Vue，定义了一套适应了多工程多页面的大型工程的开发规范，支持书写es6，es7高级特性,；支持sass，less，coffee等语义糖，自动分析代码依赖，资源定位。

四、开发规范


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


