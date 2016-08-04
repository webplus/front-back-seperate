/**
 * @file
 * @author zhujianchen@baidu.com
 */
import store from '../vuex/store';
import * as actions from '../vuex/actions';
import TopNav from '../topnav.vue';
import MainSubNav from '../mainsubnav.vue';
import Sidebar from '../sidebar.vue';
import Menu from '../menu.vue';
import PhiSelecter from '../../components/phiselecter/index.vue';
import '../../kit/filters/trim';
import Dialog from '../../components/dialog/dialog.vue';
import DialogPlugin from '../../components/dialog/dialog-plugin.js';
import getUrlParams from '../../kit/getUrlParams';
import '../../kit/partial';
import Proms from 'bluebird';

import WgtList from './wgt-reg/list.vue';
import WgtEdit from './wgt-reg/edit.vue';
import WgtApprove from './wgt-reg/approve.vue';
import WgtMyApprove from './wgt-reg/myapprove.vue';

import PgList from './pg-reg/list.vue';
import PgEdit from './pg-reg/edit.vue';
import PgApprove from './pg-reg/approve.vue';

import MdList from './md-reg/list.vue';
import MdEdit from './md-reg/edit.vue';
import MdApprove from './md-reg/approve.vue';

require('../../styles/css/log.scss');

window.Vue.config.debug = true;
window.Vue.config.devtools = true;
window.Vue.use(window.VueResource);
window.Vue.use(window.VueRouter);
window.Vue.use(DialogPlugin);
window._u = window._.noConflict();
window._l = window._;

window.Vue.mixin({
    ready: function () {
        let myOption = this.$options.myOption;
        if (myOption) {

        }
    },
    methods: {
        mixx() {

        }
    }
});

let router;
/*定义*/
let App = Vue.extend({
    myOption: 'hello',
    components: {
        TopNav,
        MainSubNav,
        Dialog,
        Sidebar,
        Menu
    },
    events: {
        'file:dialog:show'({data}) {
            this.showFileDialog = true;
            let flag = data.flag;
            let txt = data.txt;
            this.FileaddContent = flag === 0
                ? '<div class="alert_content"><b class="icon_false"></b><span>' + txt + '</span></div>'
                : '<div class="alert_content"><b class="icon_checked"></b><span>' + txt + '</span></div>';
        }
    },
    props: {
        name: String
    },
    store,
    vuex: {
        actions
    },
    data() {
        return {
            rootPath: '',
            topnavMenu: [],
            loginName: '-',
            showFileDialog: false,
            FileaddContent: '',
            /*当前sidebar选中了哪一个*/
            currentSidebar: this.$route.path.replace(/^\//, '')
        };
    },
    computed: {},
    watch: {},
    created() {
    },
    beforeCompile() {
    },
    compiled() {
    },
    ready() {
        this.$http.get('/ch/manager/ch_manager/get_user_data').then(response => {
            if (response.ok) {
                let data = response.json();
                if (!data.errno) {
                    this.loginName = data.login_name;
                    this.rootPath = data.root_path;
                }
            }
        }, error => {
            return;
        });
    },
    methods: {
        init() {
        }
    }
});

/**路由选项*/
router = new window.VueRouter({
    linkActiveClass: 'on'
});

router.on('/', {component: WgtList}).map({
    '/wgt-list': {
        component: WgtList
    },
    '/wgt-edit': {
        component: WgtEdit
    },
    '/wgt-approve': {
        component: function (resolve) {
            resolve(WgtApprove);
        }
    },
    '/wgt-myapprove': {
        component: WgtMyApprove
    },
    '/pg-list': {
        component: PgList
    },
    '/pg-edit': {
        component: PgEdit
    },
    '/pg-approve': {
        component: function (resolve) {
            resolve(PgApprove);
        }
    },
    '/md-list': {
        component: MdList
    },
    '/md-edit': {
        component: MdEdit
    },
    '/md-approve': {
        component: function (resolve) {
            resolve(MdApprove);
        }
    }
});

/*到这里才new了App实例*/
router.start(App, '#app');
router.app.init();

new Proms(function () {
    console.log('bluebird');
});
function task(arg, callback) { // 模拟异步任务
    Thenjs.nextTick(function () {
        callback(null, arg);
    });
}
let ThenJS = window.Thenjs;
ThenJS(function (cont) {
    task(10, cont);
}, true)
    .then(function (cont, arg) {
        console.log(arg);
        cont(new Error('error!'), 123);
    })
    .fin(function (cont, error, result) {
        console.log(error, result);
        cont();
    })
    .each([0, 1, 2], function (cont, value) {
        task(value * 2, cont); // 并行执行队列任务，把队列 list 中的每一个值输入到 task 中运行
    })
    .then(function (cont, result) {
        console.log(result);
        cont();
    })
    .series([ // 串行执行队列任务
        function (cont) {
            task(88, cont);
        }, // 队列第一个是异步任务
        function (cont) {
            cont(null, 99);
        } // 第二个是同步任务
    ])
    .then(function (cont, result) {
        console.log(result);
        cont(new Error('error!!'));
    })
    .fail(function (cont, error) { // 通常应该在链的最后放置一个 `fail` 方法收集异常
        console.log(error);
        console.log('DEMO END!');
    });

let cobu = window.co.wrap(function*(bu) {
    return `Hello ${bu}`;
});

console.log(cobu('bbb').then(value => {
    console.log(value);
}));
console.log(Reflect.has(Object, 'assign'));

function add(...values) {
    let sum = 0;

    for (var val of values) {
        sum += val;
    }

    return sum;
}

add(2, 5, 3); // 10
console.log(1, ...[2, 3, 4], 5);

function checkout ({ state }) {
    const savedCartItems = [...state.cart.added]
}
checkout({state:{
    cart:{
        added:[
            {name:1},
            {name:2}
            ]
    }
}})