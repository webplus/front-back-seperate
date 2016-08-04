/**
 * @file trim
 * @author zhujianchen@baidu.com
 * @description
 */
window.Vue.filter('trim', {
    read(value) {
        if (value) {
            return value.replace(/(^\s*)|(\s*$)/g, '');
        }

        return value;
    },
    write(value) {
        if (value) {
            return value.replace(/(^\s*)|(\s*$)/g, '');
        }

        return value;
    }
});
