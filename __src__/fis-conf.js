/**
 * @file 编译lib，在scripts的所有js合并 fis3 release lib
 * @author zhujianchen@baidu.com
 */
var config = {
    root: 'static/target', // 大工程的目录名
    name: 'lib' // 小工程的目录名
};

/****************环境变量*****************/
fis.set('project.files', [
    'lib/*.js'
]).set('name', config.name).set('local', '/' + config.name).set('urlPrefix', '/' + config.root + '/' + config.name);

fis.match('::package', {
    packager: fis.plugin('map', {
        useSourceMap: true, // 合并后开启 SourceMap 功能。
        'lib.js': [
            'lib/mod.js',
            'lib/vue.js',
            'lib/**.js'
        ]
    })
});

fis
    .media('lib')
    // 默认情况下不添加hash
    .match('**', {
        optimizer: fis.plugin('uglify-js'),
        deploy: [
            fis.plugin('skip-packed', {
                // 配置项
            }),
            fis.plugin('local-deliver', {
                to: '../target/lib'
            })
        ]
    })
    .match('/lib/mod.js', {
        packOrder: -101
    }).match('/lib/vue.js', {
    packOrder: -100
}).match('**.js.map', {
    domain: '${urlPrefix}'
});

fis.media('debug').match('::package', {
    packager: fis.plugin('map', {
        'useSourceMap': true, // 合并后开启 SourceMap 功能。
        'lib.debug.js': [// 顺序打包
            'lib/mod.js',
            'lib/vue.js',
            'lib/*.js'/*,
            '!lib/vue-element.js'*/
        ]
    })
}).match('**', {
    deploy: [
        fis.plugin('skip-packed', {
            // 配置项
        }),
        fis.plugin('local-deliver', {
            to: '../target/lib'
        })
    ]
}).match('/lib/mod.js', {
    packOrder: -101
}).match('/lib/vue.js', {
    packOrder: -100
}).match('**.js.map', {
    domain: '${urlPrefix}'
});
