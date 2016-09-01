/**
 * @file 拦截器
 * @author zhujianchen
 * @description 处理response，得到json数据
 */
window.Vue.http.interceptors.push((request, next) => {
    next(response => {
        if (request.dataType === 'json') {
            response.json();
        }
    });
});
