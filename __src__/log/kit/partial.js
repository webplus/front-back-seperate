/**
 * @file 获取url上的query
 * @author zhujianchen@baidu.com
 * @description url的query
 * @param {string} name 参数名字
 * @return {string} value
 */
let V = window.Vue;
V.partial('tbl', `<table class="index-tbl page-index-tbl">
                <thead>
                    <tr>
                        <th>组件ID</th>
                        <th>组件名</th>
                        <th>组件版本</th>
                        <th>申请日期</th>
                        <th>等级</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="indexTbody">
                    <tr v-for="v in lists">
                        <td class="{{v.value}}">{{v.value}}</td>
                        <td class="{{v.value}}">{{v.value}}</td>
                        <td class="{{v.value}}">{{v.value}}</td>
                        <td class="{{v.value}}">{{v.value}}</td>
                        <td class="{{v.value}}">{{v.value}}</td>
                        <td class="f_opt">
                            <div class="opt">
                                <a href="javascript:;" class="index-tbl-a" data-code="" data-name="">审核</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
                </table>`);
