/**
 * @file 工程化工具
 * @author zhujianchen@baidu.com
 */
var config = {
    root: 'static/target', // 大工程的目录名
    name: 'log' // 小工程的目录名
};

/****************环境变量*****************/
fis.set('project.files', [
    'inc/**'
])
    // 排除指定目录
    .set('project.ignore', [
        '.gitignore',
        '.git/**',
        'node_modules/**',
        '.svn/**',
        'package.json',
        'fis-conf.js'
    ]).set('project.fileType.text', 'vue,ts,tsx')
    // 把scss映射为css
    // addSameNameRequire处理同名依赖test.scss,test.less,test.css是一个文件
    .set('project.ext', {
        scss: 'css',
        less: 'css',
        css: 'css'
    }).set('name', config.name).set('local', '/' + config.name).set('urlPrefix', '/' + config.root + '/' + config.name)

    /*相对路径转换为绝对路径*/
    .set('framework', {});

// 测试环境屏蔽Hash
if (config.env === 'development') {
    fis.set('framework.useHash', false);
}
else {
    fis.set('framework.useHash', true);
}

fis.unhook('components');
fis.hook('node_modules');
fis.hook('commonjs', {
    mode: 'cmd',
    umd2commonjs: true,
    ignoreDependencies: []
});

/****************语言编译*****************/
fis.match('{*.js,*.vue:js}', {
    // 设置js文件为babel解析，支持es6的写法。
    parser: [
        fis.plugin('babel-6.x', {
            sourceMaps: true,
            compact: false,
            plugins: []
        })
    ]
}).match('*.ts', {
    parser: fis.plugin('typescript', {
        target: 2,
        sourceMap: true
    }),
    rExt: '.js'
}).match('*.vue:jade', {
    parser: fis.plugin('jade')
}).match('*.vue', {
    rExt: '.js',
    parser: fis.plugin('vue-component', {
        cssScopedFlag: 'vuec',
        cssScopedIdPrefix: 'vuec'
    })
}).match('{*.scss,*.vue:scss}', {
    rExt: '.css',
    parser: fis.plugin('node-sass', {
        // options...
        outputStyle: 'expanded',
        indentWidth: '4'
    })
}).match('{*.less,*.vue:less}', {
    parser: fis.plugin('less-2.x'),
    rExt: '.css'
}).match('::package', {
    spriter: fis.plugin('csssprites'),

    /*packager: fis.plugin('deps-pack', {
     useSourceMap: true, // 合并后开启 SourceMap 功能。
     'jobs/food.js': [
     // 将 main.js 加入队列
     'jobs/food.js',
     // main.js 的所有同步依赖加入队列
     'jobs/food.js:deps',
     // 将 main.js 所以异步依赖加入队列
     'jobs/food.js:asyncs'
     ],
     'jobs/index.js': [
     // 将 main.js 加入队列
     'jobs/index.js',
     // main.js 的所有同步依赖加入队列
     'jobs/index.js:deps',
     // 将 main.js 所以异步依赖加入队列
     'jobs/index.js:asyncs',
     ]
     }),*/
    postpackager: fis.plugin('loader', {
        allInOne: {
            includeAsyncs: true,
            js: function (file) {
                return 'static/' + file.filename + '.js';
            },
            css: function (file) {
                return 'static/' + file.filename + '.css';
            },
            sourceMap: true // 是否生成依赖map文件
        },
        resourcemapWhitespace: 4
    })
});

/*************************目录规范*****************************/

/*目录规范*/
fis.match('**', {
    isMod: true,
    useCache: false,
    deploy: [
        fis.plugin('skip-packed', {
            // 配置项
        }),
        fis.plugin('local-deliver', {
            to: '../target/' + config.name
        })
    ]
}).match('(**).{js,vue}', {
    isMod: true,
    moduleId: '$1',
    id: '$1',
    url: '${urlPrefix}$1.js',
    release: '$1.js',
    useSameNameRequire: true,
    useHash: true,
    preprocessor: [
        fis.plugin('js-require-css')
    ],
    optimizer: fis.plugin('uglify-js')
}).match('(**).{css,scss,less}', {
    isMod: true,
    moduleId: '$1.css',
    id: '$1.css',
    url: '${urlPrefix}$1.css',
    release: '$1.css',
    useSprite: true,
    useHash: true,
    optimizer: fis.plugin('clean-css', {
        // option
    })
}).match('**.{jpg,png,gif}', {
    url: '${urlPrefix}$0',
    useHash: true
}).match('*.png', {
    optimizer: fis.plugin('png-compressor')
}).match('**.{js,css}.map', {
    domain: '${urlPrefix}'
}).match('/jobs/**', {
    isMod: false
}).match('package.json', {
    release: false
});

/*开发环境*/
fis.media('debug').match('**', {
    useHash: false
}).match('(**).{js,vue}', {
    optimizer: null
});
