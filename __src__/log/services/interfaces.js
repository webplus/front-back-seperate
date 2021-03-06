/**
 * @file 所有后端接口url
 * @author zhujianchen
 * @description 接口url
 */
export default {
    // 测试接口
    dev: {
        component: '/api/logmanage/component/test',
        application: '/api/logmanage/component/application/test',
        componentFilter: '/api/logmanage/component/filter/test'
    },
    // 线上接口
    prod: {
        component: '/api/logmanage/component',
        application: '/api/logmanage/component/application',
        componentFilter: '/api/logmanage/component/filter'
    }
};
