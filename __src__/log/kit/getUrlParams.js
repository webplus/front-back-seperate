/**
 * @file 获取url上的query
 * @author zhujianchen@baidu.com
 * @description url的query
 * @param {string} name 参数名字
 * @return {string} value
 */
export default function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    else {
        return '';
    }
}
