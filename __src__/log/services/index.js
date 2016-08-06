/**
 * @file 请求后端接口
 * @author zhujianchen@baidu.com
 * @description rpc接口获取数据
 */
import interfaces from 'interfaces';
import config from 'env';
let env = config.env;

export default {

    /**
     * 新增组件
     *
     * @param {string} nameSpace 命名空间
     * @return {Function} Promise
     */
    addNewComponent({
        nameSpace
    }) {
        return window.Vue.http.post(interfaces[env].component, {
            nameSpace,
        });
    },

    /**
     * 更新组件，审核组件保存
     *
     * @param {string} compId 组件ID
     * @param {...rest} args 组件信息
     * @return {Function} Promise
     */
    updateComponent(compId, ...args) {
        return window.Vue.http.post(interfaces[env].component + compId, args);
    },

    /**
     * 审核员操作通过或不通过时，调用接口保存审核结果
     *
     * @param {string} action 审核动作
     * @return {Function} Promise
     */
    setApprovalResult({action}) {
        return window.Vue.http.post(interfaces[env].component, {action});
    },

    /**
     * 获取具体的某一个组件
     *
     * @param {string} compId 组件ID
     * @return {Function} Promise
     */
    getComponentAllInfo(compId) {
        return window.Vue.http.get(`${interfaces[env].component}${compId}`);
    },

    /**
     * 组件列表
     *
     * @param {string} status 状态
     * @param {string} creator 创建者
     * @return {Function} Promise
     */
    getComponentList({status, creator}) {
        return window.Vue.http.get(interfaces[env].application, {status, creator});
    },

    /**
     * 筛选组件
     *
     * @param {Object} options 接口接收参数
     * @param {string} options.nameSpace 命名空间
     * @return {Function} Promise
     */
    filterComponentList(options) {
        return window.Vue.http.get(interfaces[env].component, options);
    },
    nameSpace: [
        'COMPONENTIZATION',  // 自动从组件化平台中抓取，不在注册平台新建组件时显示
        'NATIVE',
        'WAP',
        'PC'
    ],
    status: [
        {
            name: '无效',
            value: 'INVALID'
        },
        {
            name: '有效',
            value: 'INVALID'
        },
        {
            name: '已删除',
            value: 'DELETED'
        }
    ],
    operator: 'zhujianchen',
    rss: window.Vue.http.get('/')
};
