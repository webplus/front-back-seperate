/**
 * @file 弹窗插件方式注册，支持多个实例
 * @author zhujianchen
 * @description 多个实例意味着可以动态创建多个alert component，不用在html里硬编码写<alert></alert>
 */
function install(Vue) {

    let AlertConstructor = Vue.extend(require('./alert.vue'));
    let alertInstance = null;

    Object.defineProperty(Vue.prototype, '$alert', {

        get: function () {

            return (opt) => {
                if (alertInstance) {
                    return alertInstance;
                }
                opt.data = opt.data || {};
                opt.data.alertTransition = 'alert-fadeIn';
                opt.data.isPlugin = true;
                alertInstance = new AlertConstructor({
                    el: document.createElement('div'),
                    data() {
                        return opt.data;
                    },
                    propsData: opt.props
                });
                alertInstance.$appendTo(document.body);
                return alertInstance;
            };
        }

    });



    Vue.transition('alert-fadeIn', {
        afterEnter(el) {},
        afterLeave(el) {
            if (alertInstance) {
                el.remove();
                alertInstance.$destroy();
                alertInstance = null;
            }

        }
    });
}

if (window.Vue) {
    window.Vue.use(install);
}

module.exports = install;
