/**
 * @file trim
 * @author zhujianchen
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
