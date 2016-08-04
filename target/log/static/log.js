define('/views/vuex/logger', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.default = createLogger;
  /**
   * @file logger
   * @author zhujianchen@baidu.com
   * @param {Object} collapsed collspsed
   * @param {Object} transformer state
   * @param {Object} mutationTransformer mutation
   * @return {Object} 日志对象
   */
  function createLogger() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
      var _ref$collapsed = _ref.collapsed;
      var collapsed = _ref$collapsed === undefined ? true : _ref$collapsed;
      var _ref$transformer = _ref.transformer;
      var transformer = _ref$transformer === undefined ? function (state) {
          return state;
      } : _ref$transformer;
      var _ref$mutationTransfor = _ref.mutationTransformer;
      var mutationTransformer = _ref$mutationTransfor === undefined ? function (mut) {
          return mut;
      } : _ref$mutationTransfor;
  
      return {
          snapshot: true,
          onMutation: function onMutation(mutation, nextState, prevState) {
              if (typeof console === 'undefined') {
                  return;
              }
              var time = new Date();
              var formattedTime = ' @ ' + pad(time.getHours(), 2) + ':' + pad(time.getMinutes(), 2) + '\n                                     :' + pad(time.getSeconds(), 2) + '.' + pad(time.getMilliseconds(), 3);
              var formattedMutation = mutationTransformer(mutation);
              var message = 'mutation ' + mutation.type + formattedTime;
              var startMessage = collapsed ? console.groupCollapsed : console.group;
              // render
              try {
                  startMessage.call(console, message);
              } catch (e) {
                  console.log(message);
              }
              console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', prevState);
              console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
              console.log('%c next state', 'color: #4CAF50; font-weight: bold', nextState);
              try {
                  console.groupEnd();
              } catch (e) {
                  console.log('—— log end ——');
              }
          }
      };
  }
  
  function repeat(str, times) {
      return new Array(times + 1).join(str);
  }
  
  function pad(num, maxLength) {
      return repeat('0', maxLength - num.toString().length) + num;
  }

});

define('/views/vuex/middlewares', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _logger = require('/views/vuex/logger');
  
  var _logger2 = _interopRequireDefault(_logger);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mutationMiddleware = {
      onMutation: function onMutation(mutation, _ref) {
          var count = _ref.count;
  
          console.log('middlewares', count);
      }
  }; /**
      * @file
      * @author zhujianchen@baidu.com
      * @description
      */
  
  
  exports.default = 'development' !== 'production' ? [(0, _logger2.default)(), mutationMiddleware] : [mutationMiddleware];

});

define('/views/vuex/mutation-types', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @file
   * @author zhujianchen@baidu.com
   * @description
   */
  var INCREMENT = exports.INCREMENT = 'INCREMENT';
  var TOGGLESEARCH = exports.TOGGLESEARCH = 'TOGGLESEARCH';
  var MENUMUTATION = exports.MENUMUTATION = 'MENUMUTATION';

});

define('/views/vuex/store', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _mutations;
  
  var _middlewares = require('/views/vuex/middlewares');
  
  var _middlewares2 = _interopRequireDefault(_middlewares);
  
  var _mutationTypes = require('/views/vuex/mutation-types');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                     * @file
                                                                                                                                                                                                                     * @author zhujianchen@baidu.com
                                                                                                                                                                                                                     * @description
                                                                                                                                                                                                                     */
  
  
  var state = {
      count: 1,
      showSearch: true,
      menuFrom: 'parent'
  };
  
  var mutations = (_mutations = {}, _defineProperty(_mutations, _mutationTypes.INCREMENT, function (state) {
      state.count++;
  }), _defineProperty(_mutations, _mutationTypes.TOGGLESEARCH, function (state, bool) {
      state.showSearch = bool;
  }), _defineProperty(_mutations, _mutationTypes.MENUMUTATION, function (state, args) {
      window._.extend(state, args);
  }), _mutations);
  
  exports.default = new window.Vuex.Store({
      state: state,
      mutations: mutations,
      middlewares: _middlewares2.default
  });

});

define('/views/vuex/actions', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.menuAction = exports.toggleSearch = exports.increment = undefined;
  
  var _mutationTypes = require('/views/vuex/mutation-types');
  
  function makeAction(type) {
    return function (_ref) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
  
      var dispatch = _ref.dispatch;
      return dispatch.apply(undefined, [type].concat(args));
    };
  } /**
     * @file
     * @author zhujianchen@baidu.com
     * @description
     */
  
  
  var increment = exports.increment = makeAction(_mutationTypes.INCREMENT);
  var toggleSearch = exports.toggleSearch = makeAction(_mutationTypes.TOGGLESEARCH);
  var menuAction = exports.menuAction = makeAction(_mutationTypes.MENUMUTATION);

});

define('/views/topnav', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _actions = require('/views/vuex/actions');
  
  var actions = _interopRequireWildcard(_actions);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  exports.default = {
      name: 'topnav',
      vuex: {
          getters: {
              count: function count(state) {
                  return state.count;
              },
              from: function from(state) {
                  return state.menu_from;
              }
          },
          actions: actions
      },
      props: {
          loginname: {
              type: String
          },
          rootpath: {
              type: String
          },
  
          menuData: {
              type: Array,
              default: function _default() {
                  return [];
              }
          },
          subActive: {
              type: Boolean,
              default: false
          }
      },
      data: function data() {
          return {
              isSubActive: this.subActive
          };
      },
  
      computed: {
          module1: function module1() {
              /*set 方法设置了 function noop，所以this.module = xxx不起作用的*/
              return this;
          },
          isSubActive: function isSubActive() {
              return this.subActive;
          }
      },
      watch: {
          module: function module(val, oldVal) {},
          subActive: function subActive(val) {},
          menuData: function menuData(val) {}
      },
      ready: function ready() {
          this.$dispatch('topnav:ready', this);
      },
  
      methods: {}
  }; /*
      * @file 顶部导航组件
      * @author zhujianchen@baidu.com
      * */
  
  var _vueTemplateString = "<div class=\"topnav\" vuec1114=\"\">\n    <div class=\"topnav_cnt\">\n        <div class=\"topnav_logmsg topnav_logmsg_login\">\n            <div class=\"login\">您好，{{loginname}} <a href=\"{{rootpath}}logout\">注销</a></div>\n            <div class=\"unlogin\"><a href=\"#\">登录</a></div>\n        </div>\n        <div class=\"topnav_menu\">\n            <ul>\n                <li v-for=\"v in menuData\" :class=\"{'menu-item':1}\" data-id=\"{{v.m_name}}\"><a href=\"{{v.m_url}}\">{{v.m_name}}</a></li>\n            </ul>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/mainsubnav', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  /*导航*/
  exports.default = {
      name: 'mainsubnav',
      props: {
          cur: '',
          title: '',
          text: '',
          mainMenu: {
              type: Object,
              default: {}
          },
          subMenu: {
              type: Object,
              default: {}
          }
      },
      data: function data() {
          return {};
      },
  
      computed: {
          slider: function slider() {}
      },
      watch: {},
      events: {},
      ready: function ready() {},
  
      methods: {}
  };
  
  var _vueTemplateString = "<div id=\"mainsubnav\" vuec1113=\"\">\n    <div class=\"mainnav\">\n        <div class=\"mainnav_cnt\">\n            <div class=\"logo_dt\">\n                <a href=\"{{cur}}\" title=\"{{title}}\">{{text}}</a>\n            </div>\n            <ul class=\"mainnav_menu\">\n                <li v-for=\"v in mainMenu\"><a href=\"{{v.m_url}}\" class=\"\" :class=\"{'on':!!v.on}\">{{v.m_name}}</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"subnav\">\n        <div class=\"subnav_cnt\">\n            <ul v-for=\"v in subMenu\" id=\"subnav_menu{{$index}}\" class=\"subnav_menu\" :class=\"v['class']\" v-show=\"v.on\">\n                <li v-for=\"v1 in v\"><a href=\"{{v1.m_url}}\" :class=\"{on:!!v1.on}\">{{v1.m_name}}</a></li>\n            </ul>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/sidebar', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _actions = require('/views/vuex/actions');
  
  var actions = _interopRequireWildcard(_actions);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  exports.default = {
      name: 'sidebar',
      props: {
          sidebarShow: {
              type: Boolean,
              default: true
          },
          current: String
      },
      vuex: {
          getters: {
              searchShow1: function searchShow1(state) {
                  return state.showSearch;
              }
          },
          actions: actions
      },
      data: function data() {
          return {
              id: parseInt(Math.random() * 1000 + 1000),
              on: ''
          };
      },
  
      watch: {
          text: function text(val) {},
          current: function current(val) {
              if (val) {}
          }
      },
      events: {
          'search:reset': function searchReset() {
              this.text = '';
          }
      },
      ready: function ready() {
          var _this = this;
          this.$$el = $(this.$el);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          search: function search() {
              this.$dispatch('search:text', { vue: this, text: this.text });
          },
          show: function show() {
              this.sidebarShow = true;
          },
          clickItem: function clickItem(e) {
              this.$('.sub-ul a').removeClass('on');
              $(e.currentTarget).addClass('on');
          }
      }
  };
  
  var _vueTemplateString = "<ul class=\"menu-ul\" id=\"sidebar_{{id}}\" :style=\"sidebarStyle\" v-show=\"sidebarShow\" vuec1112=\"\">\n    <li>\n        <a href=\"javascript:;\">组件注册</a>\n        <ul class=\"sub-ul\">\n            <li>\n                <a href=\"javascript:;\" v-link=\"{ path: '/wgt-list' }\" data-path=\"wgt-list\" class=\"sub-a\" :class=\"\" @click=\"clickItem($event)\"><i class=\"icon-faq-list\"></i><span>审核组件列表</span></a>\n            </li>\n            <li>\n                <a href=\"javascript:;\" v-link=\"{ path: '/wgt-edit' }\" data-path=\"wgt-edit\" class=\"sub-a\" :class=\"[on1]\" @click=\"clickItem($event)\"><i class=\"icon-faq-list\"></i><span>新增组件</span></a>\n            </li>\n            <li>\n                <a href=\"javascript:;\" v-link=\"{ path: '/wgt-approve' }\" data-path=\"wgt-approve\" class=\"sub-a\"><i class=\"icon-faq-list\"></i><span>审核组件</span></a>\n            </li>\n            <li>\n                <a href=\"javascript:;\" v-link=\"{ path: '/wgt-myapprove' }\" data-path=\"wgt-myapprove\" class=\"sub-a\"><i class=\"icon-faq-list\"></i><span>我的申请</span></a>\n            </li>\n        </ul>\n    </li>\n    <li>\n        <a href=\"javascript:;\">页面注册</a>\n        <ul class=\"sub-ul\">\n            <li>\n                <a href=\"javascript:;\" class=\"sub-a\" v-link=\"{ path: '/pg-list' }\" data-path=\"pg-list\"><i class=\"icon-faq-list\"></i><span>页面审核列表</span></a>\n            </li>\n            <li>\n                <a href=\"javascript:;\" class=\"sub-a\" v-link=\"{ path: '/pg-edit' }\" data-path=\"pg-edit\"><i class=\"icon-faq-list\"></i><span>新增页面</span></a>\n            </li>\n            <li>\n                <a href=\"javascript:;\" class=\"sub-a\" v-link=\"{ path: '/pg-approve' }\" data-path=\"pg-approve\"><i class=\"icon-faq-list\"></i><span>审核页面</span></a>\n            </li>\n        </ul>\n    </li>\n    <li>\n        <a href=\"javascript:;\">页面埋点注册</a>\n        <ul class=\"sub-ul\">\n            <li>\n                <a href=\"javascript:;\" class=\"sub-a\" v-link=\"{ path: '/md-edit' }\" data-path=\"md-list\"><i class=\"icon-faq-list\"></i><span>新增埋点</span></a>\n            </li>\n            <li>\n                <a href=\"javascript:;\" class=\"sub-a\" v-link=\"{ path: '/md-approve' }\" data-path=\"md-approve\"><i class=\"icon-faq-list\"></i><span>审核埋点</span></a>\n            </li>\n            <li>\n                <a href=\"javascript:;\" class=\"sub-a\" v-link=\"{ path: '/md-list' }\" data-path=\"md-list\"><i class=\"icon-faq-list\"></i><span>埋点审核列表</span></a>\n            </li>\n        </ul>\n    </li>\n</ul>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/menu', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _actions = require('/views/vuex/actions');
  
  var actions = _interopRequireWildcard(_actions);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  exports.default = {
      name: 'menu',
      props: {
          menuShow: {
              type: Boolean,
              default: true
          }
      },
      vuex: {
          getters: {
              searchShow1: function searchShow1(state) {
                  return state.showSearch;
              }
          },
          actions: actions
      },
      data: function data() {
          return {
              id: parseInt(Math.random() * 1000 + 1000)
          };
      },
  
      watch: {},
      events: {},
      ready: function ready() {},
  
      methods: {}
  };
  
  var _vueTemplateString = "<div class=\"nav-head\" id=\"search_box_{{id}}\" :style=\"menuStyle\" v-show=\"menuShow\" vuec1111=\"\">\n    <div class=\"cnt\">\n        <div class=\"logo-dt\">\n            <h1 class=\"logo\"><a id=\"nav_href\" href=\"#\" title=\"百糯指标体系\"><img id=\"nav_home\" src=\"/static/target/log/styles/img/is-logo.png\" alt=\"百糯指标体系\" width=\"186\" height=\"47\">\n            </a></h1>\n        </div>\n        <div class=\"nav\" id=\"main-menu\">\n            <ul>\n                <li class=\"cur\">\n                    <a href=\"log.html\">日志埋点管理</a>\n                </li>\n                <li class=\"\">\n                    <a href=\"monitor.html\">日志埋点监控</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/components/utils/coerceBoolean', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  /**
   * @file 类型转换
   * @author zhujianchen@baidu.com
   * @description
   * @param {string} val 输入
   * @return {string} val
   */
  
  exports.default = function (val) {
      return typeof val !== 'string' ? val : val === 'true' ? true : val === 'false' ? false : val === 'null' ? false : val === 'undefined' ? false : val;
  };

});

define('/components/phiselecter/index', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _coerceBoolean = require('/components/utils/coerceBoolean');
  
  var _coerceBoolean2 = _interopRequireDefault(_coerceBoolean);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'phiselecter',
      props: {
          promun: {
              type: String,
              default: 10
          },
          labels: {
              type: Array,
              default: function _default() {
                  return [];
              }
          },
          headLabels1: {
              type: Array,
              default: function _default() {
                  var _this2 = this;
  
                  var _this = this;
                  setTimeout(function () {
                      _this2.headLabels1 = _this2.labels.slice(0, _this2.promun1);
                  });
              }
          },
          type: String,
          callback: {
              type: Function,
              default: function _default() {}
          }
      },
      data: function data() {
          return {
              sel_id: parseInt(Math.random() * 1000 + 1000),
              show_more: false,
              on_value: -1,
              bodyShow: false,
              bodyStyle: null,
              keyword: ''
          };
      },
  
      computed: {
          promun1: function promun1() {
              return Math.min(this.labels.length, this.promun);
          },
          headLabels: function headLabels() {
              return this.labels.slice(0, this.promun1);
          },
          bodyLabels: function bodyLabels() {
              return this.labels.slice(this.promun1);
          },
          show_more: function show_more() {
              if (this.promun1 >= this.labels.length) {
                  //无更多选项
                  return false;
              } else {
                  return true;
              }
          }
      },
      watch: {
          bodyShow: function bodyShow(val) {
              if (val) {
                  this.positionBody();
              }
          }
      },
      /*消息*/
      events: {},
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          clickLabel: function clickLabel(item, from) {
              var _this3 = this;
  
              if (!from) {
                  this.bodyShow = false;
              }
              _.each(this.labels, function (v, k) {
                  if (v.value == item.value) {
                      _this3.on_value = v.value;
                  }
              });
              this.$dispatch('click:label', { vue: this });
              this.callback && this.callback('click:label', this);
          },
          clickMore: function clickMore() {
              this.bodyShow = !this.bodyShow;
          },
          positionBody: function positionBody() {
              var width = this.$('.phis_btns').width();
              var width_txt = this.$('#btnmore_' + this.sel_id).width();
              var top = this.$('.phiselecter_head').outerHeight();
              this.bodyStyle = {
                  top: top + 'px',
                  right: width - width_txt + 'px'
              };
          },
          closeBody: function closeBody() {
              this.bodyShow = false;
          },
          searchLabel: function searchLabel(keyword) {}
      }
  }; /*单选selector*/
  
  var _vueTemplateString = "<div class=\"v-phiselecter\" vuec1110=\"\">\n    <div id=\"phiselecter_{{type}}\" class=\"phiselecter\">\n        <div class=\"phiselecter_head\" style=\"\">\n            <div class=\"phis_head\">\n                <label v-for=\"v in headLabels1\" :class=\"{on: v.value == on_value}\" title=\"{{v.name}}\" data-value=\"{{v.value}}\" data-index=\"{{$index}}\" data-isall=\"\" @click=\"clickLabel(v)\">{{v.name}}</label>\n            </div>\n            <div class=\"phis_btns\"><a href=\"#\" id=\"btnmore_{{sel_id}}\" v-if=\"show_more\" @click=\"clickMore\">更多</a>\n            </div>\n        </div>\n        <div class=\"phiselecter_body\" id=\"phibody_{{sel_id}}\" :style=\"bodyStyle\" v-show=\"bodyShow\">\n            <div class=\"phiselecter_bodybar\">\n                <div class=\"phiselecter_bsearch\">\n                    <input type=\"text\" id=\"search_id_{{sel_id}}\" class=\"sipt\" placeholder=\"搜索关键字\" @keyup.enter=\"searchLabel(keyword)\" v-model=\"keyword\">\n                </div>\n                <div class=\"phiselecter_bclose\">\n                    <a href=\"#\" title=\"关闭\" id=\"close_id_{{sel_id}}\" @click=\"closeBody\">关闭</a>\n                </div>\n            </div>\n            <div class=\"phiselecter_bodylist\">\n                <div>\n                    <label v-for=\"v in bodyLabels  | filterBy keyword in 'name'\" class=\"\" :class=\"{on: v.value == on_value}\" title=\"{{v.name}}\" data-value=\"{{v.value}}\" data-pindex=\"{{v.pindex}}\" data-index=\"{{v.$index}}\" @click=\"clickLabel(v,'more')\"><b class=\"icon-ios\"></b>{{v.name}}</label>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/kit/filters/trim', function(require, exports, module) {

  'use strict';
  
  /**
   * @file trim
   * @author zhujianchen@baidu.com
   * @description
   */
  window.Vue.filter('trim', {
      read: function read(value) {
          if (value) {
              return value.replace(/(^\s*)|(\s*$)/g, '');
          }
  
          return value;
      },
      write: function write(value) {
          if (value) {
              return value.replace(/(^\s*)|(\s*$)/g, '');
          }
  
          return value;
      }
  });

});

define('/components/dialog/dialog', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  //    复杂的弹层，支持内容是html文本
  exports.default = {
      name: 'dialog',
      props: {
          title: {
              type: String,
              default: '提示'
          },
          footerText: {
              type: String,
              default: '确认'
          },
          footerText1: {
              type: String,
              default: '取消'
          },
          showFooter: {
              type: Object,
              default: function _default() {
                  return {
                      showFooterConfirm: false,
                      showFooterCancel: false
                  };
              }
          },
          show: {
              type: Boolean,
              twoWay: true,
              default: false
          },
          content: {
              type: String,
              default: '<div></div>'
          },
          callback: {
              type: Function
          }
      },
      computed: {
          positionClass: function positionClass() {
              return this.position ? 'alert-' + this.position : '';
          }
      },
      data: function data() {
          return {
              dialog_id: parseInt(Math.random() * 1000 + 1000)
          };
      },
  
      watch: {
          show: function show(val, oldVal) {
              if (val) {
                  this.center();
              }
          }
      },
      events: {
          'open:dialog': function openDialog(data) {
              this.open(data);
          },
          'close:dialog': function closeDialog() {
              this.close();
          }
      },
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          setContent: function setContent(html) {
              this.content = html;
          },
          center: function center() {
              var height = $(window).height();
              var height_doc = $(document).height();
              var width = $(window).width();
              var left = (width - $("#phdialog_" + this.dialog_id).outerWidth()) / 2;
              left = left < 0 ? 0 : left;
              $("#phdialog_" + this.dialog_id).css({ left: left + "px" });
          },
          close: function close() {
              this.callback && this.callback('confirm', { vue: this, data: { type: 'cancel' } });
              this.show = false;
          },
          open: function open(opt) {
              this.$set('show', true);
              if (opt.title) {
                  this.$set('title', opt.title);
              }
              if (opt.content) {
                  this.$set('content', opt.content);
              }
              if (opt.showFooter) {
                  this.$set('showFooter', opt.showFooter);
              }
              if (opt.callback) {
                  this.callback = opt.callback;
              }
          },
          confirm: function confirm() {
              this.$dispatch('dialog:confirmed', this);
              this.callback && this.callback('confirm', { vue: this, data: { type: 'confirm' } });
          }
      }
  };
  
  var _vueTemplateString = "<div class=\"v-dialog\" id=\"v_dialog_{{dialog_id}}\" v-show=\"show\" :transition=\"dialogTransition\">\n    <div id=\"phdialog_{{dialog_id}}\" class=\"phdialog bft v-phdialog\" :style=\"dialogStyle\">\n        <div class=\"handler_phdialog\"></div>\n        <div class=\"title_phdialog \">{{title}}</div>\n        <a href=\"#\" class=\"close_phdialog\" @click.prevent=\"show=false\">X</a>\n        <div class=\"cnt_phdialog\">\n            {{{content}}}\n        </div>\n        <div class=\"cnt_footer\" v-if=\"showFooter\">\n            <button class=\"confirm\" @click=\"confirm\" v-if=\"showFooter.showFooterConfirm\">{{footerText}}</button>\n            <button class=\"cancel\" @click=\"close\" v-if=\"showFooter.showFooterCancel\">{{footerText1}}</button>\n        </div>\n    </div>\n    <div class=\"phdialog_mask\" id=\"phdialog_{{dialog_id}}_mask\"></div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/components/dialog/dialog-plugin', function(require, exports, module) {

  'use strict';
  
  /**
   * @file 弹窗插件方式注册，支持多个实例
   * @author zhujianchen@baidu.com
   * @description 多个实例意味着可以动态创建多个dialog component，不用在html里硬编码写<dialog></dialog>
   * @param {Object} Vue
   */
  function install(Vue) {
  
      var DialogConstructor = Vue.extend(require('/components/dialog/dialog'));
      var dialogInstance = null;
  
      Object.defineProperty(Vue.prototype, '$dialog', {
          get: function get() {
              return function (opt) {
                  if (dialogInstance) {
                      return dialogInstance;
                  }
                  opt.data = opt.data || {};
                  opt.data.dialogTransition = 'dialog-fadeIn';
                  opt.data.isPlugin = true;
                  dialogInstance = new DialogConstructor({
                      el: document.createElement('div'),
                      data: function data() {
                          return opt.data;
                      },
  
                      propsData: opt.props
                  });
                  dialogInstance.$appendTo(document.body);
                  return dialogInstance;
              };
          }
      });
  
      Vue.transition('dialog-fadeIn', {
          afterEnter: function afterEnter(el) {
              console.log(el.__v_trans);
          },
          leave: function leave(el, done) {
              done();
          },
          afterLeave: function afterLeave(el) {
              if (dialogInstance) {
                  el.remove();
                  dialogInstance.$destroy();
                  dialogInstance = null;
              }
          }
      });
  
      Vue.transition('dialog-fadeInJs', {
          css: false,
          enter: function enter(el, done) {
              // 元素已被插入 DOM
              // 在动画结束后调用 done
              $(el).css('opacity', 0).animate({
                  opacity: 1
              }, 1000, done);
          },
          enterCancelled: function enterCancelled(el) {
              $(el).stop();
          },
          leave: function leave(el, done) {
              // 与 enter 相同
  
              /* 不执行done的话，
              等待过渡结束（监听 transitionend 事件）；
               从 DOM 中删除元素并删除 v-leave 类名；
               调用 afterLeave 钩子。
               这几步都不会执行了*/
              $(el).animate({
                  opacity: 0
              }, 1000, done);
          },
          leaveCancelled: function leaveCancelled(el) {
              $(el).stop();
          }
      });
  }
  
  if (window.Vue) {
      window.Vue.use(install);
  }
  
  module.exports = install;

});

define('/kit/getUrlParams', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  exports.default = function (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
          return decodeURI(r[2]);
      } else {
          return '';
      }
  };

});

define('/kit/partial', function(require, exports, module) {

  'use strict';
  
  /**
   * @file 获取url上的query
   * @author zhujianchen@baidu.com
   * @description url的query
   * @param {string} name 参数名字
   * @return {string} value
   */
  var V = window.Vue;
  V.partial('tbl', '<table class="index-tbl page-index-tbl">\n                <thead>\n                    <tr>\n                        <th>组件ID</th>\n                        <th>组件名</th>\n                        <th>组件版本</th>\n                        <th>申请日期</th>\n                        <th>等级</th>\n                        <th>操作</th>\n                    </tr>\n                </thead>\n                <tbody id="indexTbody">\n                    <tr v-for="v in lists">\n                        <td class="{{v.value}}">{{v.value}}</td>\n                        <td class="{{v.value}}">{{v.value}}</td>\n                        <td class="{{v.value}}">{{v.value}}</td>\n                        <td class="{{v.value}}">{{v.value}}</td>\n                        <td class="{{v.value}}">{{v.value}}</td>\n                        <td class="f_opt">\n                            <div class="opt">\n                                <a href="javascript:;" class="index-tbl-a" data-code="" data-name="">审核</a>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n                </table>');

});

define('/node_modules/process/browser', function(require, exports, module) {

  var process = require('/node_modules/process/browser');
  'use strict';
  
  // shim for using process in browser
  
  var process = module.exports = {};
  
  // cached from whatever global is present so that test runners that stub it
  // don't break things.  But we need to wrap it in a try catch in case it is
  // wrapped in strict mode code which doesn't define any globals.  It's inside a
  // function because try/catches deoptimize in certain engines.
  
  var cachedSetTimeout;
  var cachedClearTimeout;
  
  (function () {
      try {
          cachedSetTimeout = setTimeout;
      } catch (e) {
          cachedSetTimeout = function cachedSetTimeout() {
              throw new Error('setTimeout is not defined');
          };
      }
      try {
          cachedClearTimeout = clearTimeout;
      } catch (e) {
          cachedClearTimeout = function cachedClearTimeout() {
              throw new Error('clearTimeout is not defined');
          };
      }
  })();
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  
  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }
  
  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = cachedSetTimeout.call(null, cleanUpNextTick);
      draining = true;
  
      var len = queue.length;
      while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      cachedClearTimeout.call(null, timeout);
  }
  
  process.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          cachedSetTimeout.call(null, drainQueue, 0);
      }
  };
  
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = ''; // empty string to avoid regexp issues
  process.versions = {};
  
  function noop() {}
  
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  
  process.binding = function (name) {
      throw new Error('process.binding is not supported');
  };
  
  process.cwd = function () {
      return '/';
  };
  process.chdir = function (dir) {
      throw new Error('process.chdir is not supported');
  };
  process.umask = function () {
      return 0;
  };

});

define('/node_modules/bluebird/js/browser/bluebird', function(require, exports, module) {

  var process = require('/node_modules/process/browser');
  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  "use strict";
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
  
  /* @preserve
   * The MIT License (MIT)
   * 
   * Copyright (c) 2013-2015 Petka Antonov
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   * 
   */
  /**
   * bluebird build version 3.4.1
   * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
  */
  !function (e) {
      if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = e();else if ("function" == typeof define && define.amd) define([], e);else {
          var f;"undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Promise = e();
      }
  }(function () {
      var define, module, exports;return function e(t, n, r) {
          function s(o, u) {
              if (!n[o]) {
                  if (!t[o]) {
                      var a = typeof _dereq_ == "function" && _dereq_;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
                  }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
                      var n = t[o][1][e];return s(n ? n : e);
                  }, l, l.exports, e, t, n, r);
              }return n[o].exports;
          }var i = typeof _dereq_ == "function" && _dereq_;for (var o = 0; o < r.length; o++) {
              s(r[o]);
          }return s;
      }({ 1: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise) {
                  var SomePromiseArray = Promise._SomePromiseArray;
                  function any(promises) {
                      var ret = new SomePromiseArray(promises);
                      var promise = ret.promise();
                      ret.setHowMany(1);
                      ret.setUnwrap();
                      ret.init();
                      return promise;
                  }
  
                  Promise.any = function (promises) {
                      return any(promises);
                  };
  
                  Promise.prototype.any = function () {
                      return any(this);
                  };
              };
          }, {}], 2: [function (_dereq_, module, exports) {
              "use strict";
  
              var firstLineError;
              try {
                  throw new Error();
              } catch (e) {
                  firstLineError = e;
              }
              var schedule = _dereq_("./schedule");
              var Queue = _dereq_("./queue");
              var util = _dereq_("./util");
  
              function Async() {
                  this._customScheduler = false;
                  this._isTickUsed = false;
                  this._lateQueue = new Queue(16);
                  this._normalQueue = new Queue(16);
                  this._haveDrainedQueues = false;
                  this._trampolineEnabled = true;
                  var self = this;
                  this.drainQueues = function () {
                      self._drainQueues();
                  };
                  this._schedule = schedule;
              }
  
              Async.prototype.setScheduler = function (fn) {
                  var prev = this._schedule;
                  this._schedule = fn;
                  this._customScheduler = true;
                  return prev;
              };
  
              Async.prototype.hasCustomScheduler = function () {
                  return this._customScheduler;
              };
  
              Async.prototype.enableTrampoline = function () {
                  this._trampolineEnabled = true;
              };
  
              Async.prototype.disableTrampolineIfNecessary = function () {
                  if (util.hasDevTools) {
                      this._trampolineEnabled = false;
                  }
              };
  
              Async.prototype.haveItemsQueued = function () {
                  return this._isTickUsed || this._haveDrainedQueues;
              };
  
              Async.prototype.fatalError = function (e, isNode) {
                  if (isNode) {
                      process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) + "\n");
                      process.exit(2);
                  } else {
                      this.throwLater(e);
                  }
              };
  
              Async.prototype.throwLater = function (fn, arg) {
                  if (arguments.length === 1) {
                      arg = fn;
                      fn = function fn() {
                          throw arg;
                      };
                  }
                  if (typeof setTimeout !== "undefined") {
                      setTimeout(function () {
                          fn(arg);
                      }, 0);
                  } else try {
                      this._schedule(function () {
                          fn(arg);
                      });
                  } catch (e) {
                      throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                  }
              };
  
              function AsyncInvokeLater(fn, receiver, arg) {
                  this._lateQueue.push(fn, receiver, arg);
                  this._queueTick();
              }
  
              function AsyncInvoke(fn, receiver, arg) {
                  this._normalQueue.push(fn, receiver, arg);
                  this._queueTick();
              }
  
              function AsyncSettlePromises(promise) {
                  this._normalQueue._pushOne(promise);
                  this._queueTick();
              }
  
              if (!util.hasDevTools) {
                  Async.prototype.invokeLater = AsyncInvokeLater;
                  Async.prototype.invoke = AsyncInvoke;
                  Async.prototype.settlePromises = AsyncSettlePromises;
              } else {
                  Async.prototype.invokeLater = function (fn, receiver, arg) {
                      if (this._trampolineEnabled) {
                          AsyncInvokeLater.call(this, fn, receiver, arg);
                      } else {
                          this._schedule(function () {
                              setTimeout(function () {
                                  fn.call(receiver, arg);
                              }, 100);
                          });
                      }
                  };
  
                  Async.prototype.invoke = function (fn, receiver, arg) {
                      if (this._trampolineEnabled) {
                          AsyncInvoke.call(this, fn, receiver, arg);
                      } else {
                          this._schedule(function () {
                              fn.call(receiver, arg);
                          });
                      }
                  };
  
                  Async.prototype.settlePromises = function (promise) {
                      if (this._trampolineEnabled) {
                          AsyncSettlePromises.call(this, promise);
                      } else {
                          this._schedule(function () {
                              promise._settlePromises();
                          });
                      }
                  };
              }
  
              Async.prototype.invokeFirst = function (fn, receiver, arg) {
                  this._normalQueue.unshift(fn, receiver, arg);
                  this._queueTick();
              };
  
              Async.prototype._drainQueue = function (queue) {
                  while (queue.length() > 0) {
                      var fn = queue.shift();
                      if (typeof fn !== "function") {
                          fn._settlePromises();
                          continue;
                      }
                      var receiver = queue.shift();
                      var arg = queue.shift();
                      fn.call(receiver, arg);
                  }
              };
  
              Async.prototype._drainQueues = function () {
                  this._drainQueue(this._normalQueue);
                  this._reset();
                  this._haveDrainedQueues = true;
                  this._drainQueue(this._lateQueue);
              };
  
              Async.prototype._queueTick = function () {
                  if (!this._isTickUsed) {
                      this._isTickUsed = true;
                      this._schedule(this.drainQueues);
                  }
              };
  
              Async.prototype._reset = function () {
                  this._isTickUsed = false;
              };
  
              module.exports = Async;
              module.exports.firstLineError = firstLineError;
          }, { "./queue": 26, "./schedule": 29, "./util": 36 }], 3: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL, tryConvertToPromise, debug) {
                  var calledBind = false;
                  var rejectThis = function rejectThis(_, e) {
                      this._reject(e);
                  };
  
                  var targetRejected = function targetRejected(e, context) {
                      context.promiseRejectionQueued = true;
                      context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
                  };
  
                  var bindingResolved = function bindingResolved(thisArg, context) {
                      if ((this._bitField & 50397184) === 0) {
                          this._resolveCallback(context.target);
                      }
                  };
  
                  var bindingRejected = function bindingRejected(e, context) {
                      if (!context.promiseRejectionQueued) this._reject(e);
                  };
  
                  Promise.prototype.bind = function (thisArg) {
                      if (!calledBind) {
                          calledBind = true;
                          Promise.prototype._propagateFrom = debug.propagateFromFunction();
                          Promise.prototype._boundValue = debug.boundValueFunction();
                      }
                      var maybePromise = tryConvertToPromise(thisArg);
                      var ret = new Promise(INTERNAL);
                      ret._propagateFrom(this, 1);
                      var target = this._target();
                      ret._setBoundTo(maybePromise);
                      if (maybePromise instanceof Promise) {
                          var context = {
                              promiseRejectionQueued: false,
                              promise: ret,
                              target: target,
                              bindingPromise: maybePromise
                          };
                          target._then(INTERNAL, targetRejected, undefined, ret, context);
                          maybePromise._then(bindingResolved, bindingRejected, undefined, ret, context);
                          ret._setOnCancel(maybePromise);
                      } else {
                          ret._resolveCallback(target);
                      }
                      return ret;
                  };
  
                  Promise.prototype._setBoundTo = function (obj) {
                      if (obj !== undefined) {
                          this._bitField = this._bitField | 2097152;
                          this._boundTo = obj;
                      } else {
                          this._bitField = this._bitField & ~2097152;
                      }
                  };
  
                  Promise.prototype._isBound = function () {
                      return (this._bitField & 2097152) === 2097152;
                  };
  
                  Promise.bind = function (thisArg, value) {
                      return Promise.resolve(value).bind(thisArg);
                  };
              };
          }, {}], 4: [function (_dereq_, module, exports) {
              "use strict";
  
              var old;
              if (typeof Promise !== "undefined") old = Promise;
              function noConflict() {
                  try {
                      if (Promise === bluebird) Promise = old;
                  } catch (e) {}
                  return bluebird;
              }
              var bluebird = _dereq_("./promise")();
              bluebird.noConflict = noConflict;
              module.exports = bluebird;
          }, { "./promise": 22 }], 5: [function (_dereq_, module, exports) {
              "use strict";
  
              var cr = Object.create;
              if (cr) {
                  var callerCache = cr(null);
                  var getterCache = cr(null);
                  callerCache[" size"] = getterCache[" size"] = 0;
              }
  
              module.exports = function (Promise) {
                  var util = _dereq_("./util");
                  var canEvaluate = util.canEvaluate;
                  var isIdentifier = util.isIdentifier;
  
                  var getMethodCaller;
                  var getGetter;
                  if (!true) {
                      var makeMethodCaller = function makeMethodCaller(methodName) {
                          return new Function("ensureMethod", "                                    \n\
          return function(obj) {                                               \n\
              'use strict'                                                     \n\
              var len = this.length;                                           \n\
              ensureMethod(obj, 'methodName');                                 \n\
              switch(len) {                                                    \n\
                  case 1: return obj.methodName(this[0]);                      \n\
                  case 2: return obj.methodName(this[0], this[1]);             \n\
                  case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                  case 0: return obj.methodName();                             \n\
                  default:                                                     \n\
                      return obj.methodName.apply(obj, this);                  \n\
              }                                                                \n\
          };                                                                   \n\
          ".replace(/methodName/g, methodName))(ensureMethod);
                      };
  
                      var makeGetter = function makeGetter(propertyName) {
                          return new Function("obj", "                                             \n\
          'use strict';                                                        \n\
          return obj.propertyName;                                             \n\
          ".replace("propertyName", propertyName));
                      };
  
                      var getCompiled = function getCompiled(name, compiler, cache) {
                          var ret = cache[name];
                          if (typeof ret !== "function") {
                              if (!isIdentifier(name)) {
                                  return null;
                              }
                              ret = compiler(name);
                              cache[name] = ret;
                              cache[" size"]++;
                              if (cache[" size"] > 512) {
                                  var keys = Object.keys(cache);
                                  for (var i = 0; i < 256; ++i) {
                                      delete cache[keys[i]];
                                  }cache[" size"] = keys.length - 256;
                              }
                          }
                          return ret;
                      };
  
                      getMethodCaller = function getMethodCaller(name) {
                          return getCompiled(name, makeMethodCaller, callerCache);
                      };
  
                      getGetter = function getGetter(name) {
                          return getCompiled(name, makeGetter, getterCache);
                      };
                  }
  
                  function ensureMethod(obj, methodName) {
                      var fn;
                      if (obj != null) fn = obj[methodName];
                      if (typeof fn !== "function") {
                          var message = "Object " + util.classString(obj) + " has no method '" + util.toString(methodName) + "'";
                          throw new Promise.TypeError(message);
                      }
                      return fn;
                  }
  
                  function caller(obj) {
                      var methodName = this.pop();
                      var fn = ensureMethod(obj, methodName);
                      return fn.apply(obj, this);
                  }
                  Promise.prototype.call = function (methodName) {
                      var args = [].slice.call(arguments, 1);;
                      if (!true) {
                          if (canEvaluate) {
                              var maybeCaller = getMethodCaller(methodName);
                              if (maybeCaller !== null) {
                                  return this._then(maybeCaller, undefined, undefined, args, undefined);
                              }
                          }
                      }
                      args.push(methodName);
                      return this._then(caller, undefined, undefined, args, undefined);
                  };
  
                  function namedGetter(obj) {
                      return obj[this];
                  }
                  function indexedGetter(obj) {
                      var index = +this;
                      if (index < 0) index = Math.max(0, index + obj.length);
                      return obj[index];
                  }
                  Promise.prototype.get = function (propertyName) {
                      var isIndex = typeof propertyName === "number";
                      var getter;
                      if (!isIndex) {
                          if (canEvaluate) {
                              var maybeGetter = getGetter(propertyName);
                              getter = maybeGetter !== null ? maybeGetter : namedGetter;
                          } else {
                              getter = namedGetter;
                          }
                      } else {
                          getter = indexedGetter;
                      }
                      return this._then(getter, undefined, undefined, propertyName, undefined);
                  };
              };
          }, { "./util": 36 }], 6: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, PromiseArray, apiRejection, debug) {
                  var util = _dereq_("./util");
                  var tryCatch = util.tryCatch;
                  var errorObj = util.errorObj;
                  var async = Promise._async;
  
                  Promise.prototype["break"] = Promise.prototype.cancel = function () {
                      if (!debug.cancellation()) return this._warn("cancellation is disabled");
  
                      var promise = this;
                      var child = promise;
                      while (promise.isCancellable()) {
                          if (!promise._cancelBy(child)) {
                              if (child._isFollowing()) {
                                  child._followee().cancel();
                              } else {
                                  child._cancelBranched();
                              }
                              break;
                          }
  
                          var parent = promise._cancellationParent;
                          if (parent == null || !parent.isCancellable()) {
                              if (promise._isFollowing()) {
                                  promise._followee().cancel();
                              } else {
                                  promise._cancelBranched();
                              }
                              break;
                          } else {
                              if (promise._isFollowing()) promise._followee().cancel();
                              child = promise;
                              promise = parent;
                          }
                      }
                  };
  
                  Promise.prototype._branchHasCancelled = function () {
                      this._branchesRemainingToCancel--;
                  };
  
                  Promise.prototype._enoughBranchesHaveCancelled = function () {
                      return this._branchesRemainingToCancel === undefined || this._branchesRemainingToCancel <= 0;
                  };
  
                  Promise.prototype._cancelBy = function (canceller) {
                      if (canceller === this) {
                          this._branchesRemainingToCancel = 0;
                          this._invokeOnCancel();
                          return true;
                      } else {
                          this._branchHasCancelled();
                          if (this._enoughBranchesHaveCancelled()) {
                              this._invokeOnCancel();
                              return true;
                          }
                      }
                      return false;
                  };
  
                  Promise.prototype._cancelBranched = function () {
                      if (this._enoughBranchesHaveCancelled()) {
                          this._cancel();
                      }
                  };
  
                  Promise.prototype._cancel = function () {
                      if (!this.isCancellable()) return;
  
                      this._setCancelled();
                      async.invoke(this._cancelPromises, this, undefined);
                  };
  
                  Promise.prototype._cancelPromises = function () {
                      if (this._length() > 0) this._settlePromises();
                  };
  
                  Promise.prototype._unsetOnCancel = function () {
                      this._onCancelField = undefined;
                  };
  
                  Promise.prototype.isCancellable = function () {
                      return this.isPending() && !this.isCancelled();
                  };
  
                  Promise.prototype._doInvokeOnCancel = function (onCancelCallback, internalOnly) {
                      if (util.isArray(onCancelCallback)) {
                          for (var i = 0; i < onCancelCallback.length; ++i) {
                              this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
                          }
                      } else if (onCancelCallback !== undefined) {
                          if (typeof onCancelCallback === "function") {
                              if (!internalOnly) {
                                  var e = tryCatch(onCancelCallback).call(this._boundValue());
                                  if (e === errorObj) {
                                      this._attachExtraTrace(e.e);
                                      async.throwLater(e.e);
                                  }
                              }
                          } else {
                              onCancelCallback._resultCancelled(this);
                          }
                      }
                  };
  
                  Promise.prototype._invokeOnCancel = function () {
                      var onCancelCallback = this._onCancel();
                      this._unsetOnCancel();
                      async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
                  };
  
                  Promise.prototype._invokeInternalOnCancel = function () {
                      if (this.isCancellable()) {
                          this._doInvokeOnCancel(this._onCancel(), true);
                          this._unsetOnCancel();
                      }
                  };
  
                  Promise.prototype._resultCancelled = function () {
                      this.cancel();
                  };
              };
          }, { "./util": 36 }], 7: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (NEXT_FILTER) {
                  var util = _dereq_("./util");
                  var getKeys = _dereq_("./es5").keys;
                  var tryCatch = util.tryCatch;
                  var errorObj = util.errorObj;
  
                  function catchFilter(instances, cb, promise) {
                      return function (e) {
                          var boundTo = promise._boundValue();
                          predicateLoop: for (var i = 0; i < instances.length; ++i) {
                              var item = instances[i];
  
                              if (item === Error || item != null && item.prototype instanceof Error) {
                                  if (e instanceof item) {
                                      return tryCatch(cb).call(boundTo, e);
                                  }
                              } else if (typeof item === "function") {
                                  var matchesPredicate = tryCatch(item).call(boundTo, e);
                                  if (matchesPredicate === errorObj) {
                                      return matchesPredicate;
                                  } else if (matchesPredicate) {
                                      return tryCatch(cb).call(boundTo, e);
                                  }
                              } else if (util.isObject(e)) {
                                  var keys = getKeys(item);
                                  for (var j = 0; j < keys.length; ++j) {
                                      var key = keys[j];
                                      if (item[key] != e[key]) {
                                          continue predicateLoop;
                                      }
                                  }
                                  return tryCatch(cb).call(boundTo, e);
                              }
                          }
                          return NEXT_FILTER;
                      };
                  }
  
                  return catchFilter;
              };
          }, { "./es5": 13, "./util": 36 }], 8: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise) {
                  var longStackTraces = false;
                  var contextStack = [];
  
                  Promise.prototype._promiseCreated = function () {};
                  Promise.prototype._pushContext = function () {};
                  Promise.prototype._popContext = function () {
                      return null;
                  };
                  Promise._peekContext = Promise.prototype._peekContext = function () {};
  
                  function Context() {
                      this._trace = new Context.CapturedTrace(peekContext());
                  }
                  Context.prototype._pushContext = function () {
                      if (this._trace !== undefined) {
                          this._trace._promiseCreated = null;
                          contextStack.push(this._trace);
                      }
                  };
  
                  Context.prototype._popContext = function () {
                      if (this._trace !== undefined) {
                          var trace = contextStack.pop();
                          var ret = trace._promiseCreated;
                          trace._promiseCreated = null;
                          return ret;
                      }
                      return null;
                  };
  
                  function createContext() {
                      if (longStackTraces) return new Context();
                  }
  
                  function peekContext() {
                      var lastIndex = contextStack.length - 1;
                      if (lastIndex >= 0) {
                          return contextStack[lastIndex];
                      }
                      return undefined;
                  }
                  Context.CapturedTrace = null;
                  Context.create = createContext;
                  Context.deactivateLongStackTraces = function () {};
                  Context.activateLongStackTraces = function () {
                      var Promise_pushContext = Promise.prototype._pushContext;
                      var Promise_popContext = Promise.prototype._popContext;
                      var Promise_PeekContext = Promise._peekContext;
                      var Promise_peekContext = Promise.prototype._peekContext;
                      var Promise_promiseCreated = Promise.prototype._promiseCreated;
                      Context.deactivateLongStackTraces = function () {
                          Promise.prototype._pushContext = Promise_pushContext;
                          Promise.prototype._popContext = Promise_popContext;
                          Promise._peekContext = Promise_PeekContext;
                          Promise.prototype._peekContext = Promise_peekContext;
                          Promise.prototype._promiseCreated = Promise_promiseCreated;
                          longStackTraces = false;
                      };
                      longStackTraces = true;
                      Promise.prototype._pushContext = Context.prototype._pushContext;
                      Promise.prototype._popContext = Context.prototype._popContext;
                      Promise._peekContext = Promise.prototype._peekContext = peekContext;
                      Promise.prototype._promiseCreated = function () {
                          var ctx = this._peekContext();
                          if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
                      };
                  };
                  return Context;
              };
          }, {}], 9: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, Context) {
                  var getDomain = Promise._getDomain;
                  var async = Promise._async;
                  var Warning = _dereq_("./errors").Warning;
                  var util = _dereq_("./util");
                  var canAttachTrace = util.canAttachTrace;
                  var unhandledRejectionHandled;
                  var possiblyUnhandledRejection;
                  var bluebirdFramePattern = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
                  var stackFramePattern = null;
                  var formatStack = null;
                  var indentStackFrames = false;
                  var printWarning;
                  var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 && (true || util.env("BLUEBIRD_DEBUG") || util.env("NODE_ENV") === "development"));
  
                  var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 && (debugging || util.env("BLUEBIRD_WARNINGS")));
  
                  var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 && (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));
  
                  var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 && (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
  
                  Promise.prototype.suppressUnhandledRejections = function () {
                      var target = this._target();
                      target._bitField = target._bitField & ~1048576 | 524288;
                  };
  
                  Promise.prototype._ensurePossibleRejectionHandled = function () {
                      if ((this._bitField & 524288) !== 0) return;
                      this._setRejectionIsUnhandled();
                      async.invokeLater(this._notifyUnhandledRejection, this, undefined);
                  };
  
                  Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
                      fireRejectionEvent("rejectionHandled", unhandledRejectionHandled, undefined, this);
                  };
  
                  Promise.prototype._setReturnedNonUndefined = function () {
                      this._bitField = this._bitField | 268435456;
                  };
  
                  Promise.prototype._returnedNonUndefined = function () {
                      return (this._bitField & 268435456) !== 0;
                  };
  
                  Promise.prototype._notifyUnhandledRejection = function () {
                      if (this._isRejectionUnhandled()) {
                          var reason = this._settledValue();
                          this._setUnhandledRejectionIsNotified();
                          fireRejectionEvent("unhandledRejection", possiblyUnhandledRejection, reason, this);
                      }
                  };
  
                  Promise.prototype._setUnhandledRejectionIsNotified = function () {
                      this._bitField = this._bitField | 262144;
                  };
  
                  Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
                      this._bitField = this._bitField & ~262144;
                  };
  
                  Promise.prototype._isUnhandledRejectionNotified = function () {
                      return (this._bitField & 262144) > 0;
                  };
  
                  Promise.prototype._setRejectionIsUnhandled = function () {
                      this._bitField = this._bitField | 1048576;
                  };
  
                  Promise.prototype._unsetRejectionIsUnhandled = function () {
                      this._bitField = this._bitField & ~1048576;
                      if (this._isUnhandledRejectionNotified()) {
                          this._unsetUnhandledRejectionIsNotified();
                          this._notifyUnhandledRejectionIsHandled();
                      }
                  };
  
                  Promise.prototype._isRejectionUnhandled = function () {
                      return (this._bitField & 1048576) > 0;
                  };
  
                  Promise.prototype._warn = function (message, shouldUseOwnTrace, promise) {
                      return warn(message, shouldUseOwnTrace, promise || this);
                  };
  
                  Promise.onPossiblyUnhandledRejection = function (fn) {
                      var domain = getDomain();
                      possiblyUnhandledRejection = typeof fn === "function" ? domain === null ? fn : domain.bind(fn) : undefined;
                  };
  
                  Promise.onUnhandledRejectionHandled = function (fn) {
                      var domain = getDomain();
                      unhandledRejectionHandled = typeof fn === "function" ? domain === null ? fn : domain.bind(fn) : undefined;
                  };
  
                  var disableLongStackTraces = function disableLongStackTraces() {};
                  Promise.longStackTraces = function () {
                      if (async.haveItemsQueued() && !config.longStackTraces) {
                          throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                      }
                      if (!config.longStackTraces && longStackTracesIsSupported()) {
                          var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
                          var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
                          config.longStackTraces = true;
                          disableLongStackTraces = function disableLongStackTraces() {
                              if (async.haveItemsQueued() && !config.longStackTraces) {
                                  throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                              }
                              Promise.prototype._captureStackTrace = Promise_captureStackTrace;
                              Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
                              Context.deactivateLongStackTraces();
                              async.enableTrampoline();
                              config.longStackTraces = false;
                          };
                          Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
                          Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
                          Context.activateLongStackTraces();
                          async.disableTrampolineIfNecessary();
                      }
                  };
  
                  Promise.hasLongStackTraces = function () {
                      return config.longStackTraces && longStackTracesIsSupported();
                  };
  
                  var fireDomEvent = function () {
                      try {
                          var event = document.createEvent("CustomEvent");
                          event.initCustomEvent("testingtheevent", false, true, {});
                          util.global.dispatchEvent(event);
                          return function (name, event) {
                              var domEvent = document.createEvent("CustomEvent");
                              domEvent.initCustomEvent(name.toLowerCase(), false, true, event);
                              return !util.global.dispatchEvent(domEvent);
                          };
                      } catch (e) {}
                      return function () {
                          return false;
                      };
                  }();
  
                  var fireGlobalEvent = function () {
                      if (util.isNode) {
                          return function () {
                              return process.emit.apply(process, arguments);
                          };
                      } else {
                          if (!util.global) {
                              return function () {
                                  return false;
                              };
                          }
                          return function (name) {
                              var methodName = "on" + name.toLowerCase();
                              var method = util.global[methodName];
                              if (!method) return false;
                              method.apply(util.global, [].slice.call(arguments, 1));
                              return true;
                          };
                      }
                  }();
  
                  function generatePromiseLifecycleEventObject(name, promise) {
                      return { promise: promise };
                  }
  
                  var eventToObjectGenerator = {
                      promiseCreated: generatePromiseLifecycleEventObject,
                      promiseFulfilled: generatePromiseLifecycleEventObject,
                      promiseRejected: generatePromiseLifecycleEventObject,
                      promiseResolved: generatePromiseLifecycleEventObject,
                      promiseCancelled: generatePromiseLifecycleEventObject,
                      promiseChained: function promiseChained(name, promise, child) {
                          return { promise: promise, child: child };
                      },
                      warning: function warning(name, _warning) {
                          return { warning: _warning };
                      },
                      unhandledRejection: function unhandledRejection(name, reason, promise) {
                          return { reason: reason, promise: promise };
                      },
                      rejectionHandled: generatePromiseLifecycleEventObject
                  };
  
                  var activeFireEvent = function activeFireEvent(name) {
                      var globalEventFired = false;
                      try {
                          globalEventFired = fireGlobalEvent.apply(null, arguments);
                      } catch (e) {
                          async.throwLater(e);
                          globalEventFired = true;
                      }
  
                      var domEventFired = false;
                      try {
                          domEventFired = fireDomEvent(name, eventToObjectGenerator[name].apply(null, arguments));
                      } catch (e) {
                          async.throwLater(e);
                          domEventFired = true;
                      }
  
                      return domEventFired || globalEventFired;
                  };
  
                  Promise.config = function (opts) {
                      opts = Object(opts);
                      if ("longStackTraces" in opts) {
                          if (opts.longStackTraces) {
                              Promise.longStackTraces();
                          } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
                              disableLongStackTraces();
                          }
                      }
                      if ("warnings" in opts) {
                          var warningsOption = opts.warnings;
                          config.warnings = !!warningsOption;
                          wForgottenReturn = config.warnings;
  
                          if (util.isObject(warningsOption)) {
                              if ("wForgottenReturn" in warningsOption) {
                                  wForgottenReturn = !!warningsOption.wForgottenReturn;
                              }
                          }
                      }
                      if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
                          if (async.haveItemsQueued()) {
                              throw new Error("cannot enable cancellation after promises are in use");
                          }
                          Promise.prototype._clearCancellationData = cancellationClearCancellationData;
                          Promise.prototype._propagateFrom = cancellationPropagateFrom;
                          Promise.prototype._onCancel = cancellationOnCancel;
                          Promise.prototype._setOnCancel = cancellationSetOnCancel;
                          Promise.prototype._attachCancellationCallback = cancellationAttachCancellationCallback;
                          Promise.prototype._execute = cancellationExecute;
                          _propagateFromFunction = cancellationPropagateFrom;
                          config.cancellation = true;
                      }
                      if ("monitoring" in opts) {
                          if (opts.monitoring && !config.monitoring) {
                              config.monitoring = true;
                              Promise.prototype._fireEvent = activeFireEvent;
                          } else if (!opts.monitoring && config.monitoring) {
                              config.monitoring = false;
                              Promise.prototype._fireEvent = defaultFireEvent;
                          }
                      }
                  };
  
                  function defaultFireEvent() {
                      return false;
                  }
  
                  Promise.prototype._fireEvent = defaultFireEvent;
                  Promise.prototype._execute = function (executor, resolve, reject) {
                      try {
                          executor(resolve, reject);
                      } catch (e) {
                          return e;
                      }
                  };
                  Promise.prototype._onCancel = function () {};
                  Promise.prototype._setOnCancel = function (handler) {
                      ;
                  };
                  Promise.prototype._attachCancellationCallback = function (onCancel) {
                      ;
                  };
                  Promise.prototype._captureStackTrace = function () {};
                  Promise.prototype._attachExtraTrace = function () {};
                  Promise.prototype._clearCancellationData = function () {};
                  Promise.prototype._propagateFrom = function (parent, flags) {
                      ;
                      ;
                  };
  
                  function cancellationExecute(executor, resolve, reject) {
                      var promise = this;
                      try {
                          executor(resolve, reject, function (onCancel) {
                              if (typeof onCancel !== "function") {
                                  throw new TypeError("onCancel must be a function, got: " + util.toString(onCancel));
                              }
                              promise._attachCancellationCallback(onCancel);
                          });
                      } catch (e) {
                          return e;
                      }
                  }
  
                  function cancellationAttachCancellationCallback(onCancel) {
                      if (!this.isCancellable()) return this;
  
                      var previousOnCancel = this._onCancel();
                      if (previousOnCancel !== undefined) {
                          if (util.isArray(previousOnCancel)) {
                              previousOnCancel.push(onCancel);
                          } else {
                              this._setOnCancel([previousOnCancel, onCancel]);
                          }
                      } else {
                          this._setOnCancel(onCancel);
                      }
                  }
  
                  function cancellationOnCancel() {
                      return this._onCancelField;
                  }
  
                  function cancellationSetOnCancel(onCancel) {
                      this._onCancelField = onCancel;
                  }
  
                  function cancellationClearCancellationData() {
                      this._cancellationParent = undefined;
                      this._onCancelField = undefined;
                  }
  
                  function cancellationPropagateFrom(parent, flags) {
                      if ((flags & 1) !== 0) {
                          this._cancellationParent = parent;
                          var branchesRemainingToCancel = parent._branchesRemainingToCancel;
                          if (branchesRemainingToCancel === undefined) {
                              branchesRemainingToCancel = 0;
                          }
                          parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
                      }
                      if ((flags & 2) !== 0 && parent._isBound()) {
                          this._setBoundTo(parent._boundTo);
                      }
                  }
  
                  function bindingPropagateFrom(parent, flags) {
                      if ((flags & 2) !== 0 && parent._isBound()) {
                          this._setBoundTo(parent._boundTo);
                      }
                  }
                  var _propagateFromFunction = bindingPropagateFrom;
  
                  function _boundValueFunction() {
                      var ret = this._boundTo;
                      if (ret !== undefined) {
                          if (ret instanceof Promise) {
                              if (ret.isFulfilled()) {
                                  return ret.value();
                              } else {
                                  return undefined;
                              }
                          }
                      }
                      return ret;
                  }
  
                  function longStackTracesCaptureStackTrace() {
                      this._trace = new CapturedTrace(this._peekContext());
                  }
  
                  function longStackTracesAttachExtraTrace(error, ignoreSelf) {
                      if (canAttachTrace(error)) {
                          var trace = this._trace;
                          if (trace !== undefined) {
                              if (ignoreSelf) trace = trace._parent;
                          }
                          if (trace !== undefined) {
                              trace.attachExtraTrace(error);
                          } else if (!error.__stackCleaned__) {
                              var parsed = parseStackAndMessage(error);
                              util.notEnumerableProp(error, "stack", parsed.message + "\n" + parsed.stack.join("\n"));
                              util.notEnumerableProp(error, "__stackCleaned__", true);
                          }
                      }
                  }
  
                  function checkForgottenReturns(returnValue, promiseCreated, name, promise, parent) {
                      if (returnValue === undefined && promiseCreated !== null && wForgottenReturn) {
                          if (parent !== undefined && parent._returnedNonUndefined()) return;
                          if ((promise._bitField & 65535) === 0) return;
  
                          if (name) name = name + " ";
                          var msg = "a promise was created in a " + name + "handler but was not returned from it";
                          promise._warn(msg, true, promiseCreated);
                      }
                  }
  
                  function deprecated(name, replacement) {
                      var message = name + " is deprecated and will be removed in a future version.";
                      if (replacement) message += " Use " + replacement + " instead.";
                      return warn(message);
                  }
  
                  function warn(message, shouldUseOwnTrace, promise) {
                      if (!config.warnings) return;
                      var warning = new Warning(message);
                      var ctx;
                      if (shouldUseOwnTrace) {
                          promise._attachExtraTrace(warning);
                      } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
                          ctx.attachExtraTrace(warning);
                      } else {
                          var parsed = parseStackAndMessage(warning);
                          warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
                      }
  
                      if (!activeFireEvent("warning", warning)) {
                          formatAndLogError(warning, "", true);
                      }
                  }
  
                  function reconstructStack(message, stacks) {
                      for (var i = 0; i < stacks.length - 1; ++i) {
                          stacks[i].push("From previous event:");
                          stacks[i] = stacks[i].join("\n");
                      }
                      if (i < stacks.length) {
                          stacks[i] = stacks[i].join("\n");
                      }
                      return message + "\n" + stacks.join("\n");
                  }
  
                  function removeDuplicateOrEmptyJumps(stacks) {
                      for (var i = 0; i < stacks.length; ++i) {
                          if (stacks[i].length === 0 || i + 1 < stacks.length && stacks[i][0] === stacks[i + 1][0]) {
                              stacks.splice(i, 1);
                              i--;
                          }
                      }
                  }
  
                  function removeCommonRoots(stacks) {
                      var current = stacks[0];
                      for (var i = 1; i < stacks.length; ++i) {
                          var prev = stacks[i];
                          var currentLastIndex = current.length - 1;
                          var currentLastLine = current[currentLastIndex];
                          var commonRootMeetPoint = -1;
  
                          for (var j = prev.length - 1; j >= 0; --j) {
                              if (prev[j] === currentLastLine) {
                                  commonRootMeetPoint = j;
                                  break;
                              }
                          }
  
                          for (var j = commonRootMeetPoint; j >= 0; --j) {
                              var line = prev[j];
                              if (current[currentLastIndex] === line) {
                                  current.pop();
                                  currentLastIndex--;
                              } else {
                                  break;
                              }
                          }
                          current = prev;
                      }
                  }
  
                  function cleanStack(stack) {
                      var ret = [];
                      for (var i = 0; i < stack.length; ++i) {
                          var line = stack[i];
                          var isTraceLine = "    (No stack trace)" === line || stackFramePattern.test(line);
                          var isInternalFrame = isTraceLine && shouldIgnore(line);
                          if (isTraceLine && !isInternalFrame) {
                              if (indentStackFrames && line.charAt(0) !== " ") {
                                  line = "    " + line;
                              }
                              ret.push(line);
                          }
                      }
                      return ret;
                  }
  
                  function stackFramesAsArray(error) {
                      var stack = error.stack.replace(/\s+$/g, "").split("\n");
                      for (var i = 0; i < stack.length; ++i) {
                          var line = stack[i];
                          if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
                              break;
                          }
                      }
                      if (i > 0) {
                          stack = stack.slice(i);
                      }
                      return stack;
                  }
  
                  function parseStackAndMessage(error) {
                      var stack = error.stack;
                      var message = error.toString();
                      stack = typeof stack === "string" && stack.length > 0 ? stackFramesAsArray(error) : ["    (No stack trace)"];
                      return {
                          message: message,
                          stack: cleanStack(stack)
                      };
                  }
  
                  function formatAndLogError(error, title, isSoft) {
                      if (typeof console !== "undefined") {
                          var message;
                          if (util.isObject(error)) {
                              var stack = error.stack;
                              message = title + formatStack(stack, error);
                          } else {
                              message = title + String(error);
                          }
                          if (typeof printWarning === "function") {
                              printWarning(message, isSoft);
                          } else if (typeof console.log === "function" || _typeof(console.log) === "object") {
                              console.log(message);
                          }
                      }
                  }
  
                  function fireRejectionEvent(name, localHandler, reason, promise) {
                      var localEventFired = false;
                      try {
                          if (typeof localHandler === "function") {
                              localEventFired = true;
                              if (name === "rejectionHandled") {
                                  localHandler(promise);
                              } else {
                                  localHandler(reason, promise);
                              }
                          }
                      } catch (e) {
                          async.throwLater(e);
                      }
  
                      if (name === "unhandledRejection") {
                          if (!activeFireEvent(name, reason, promise) && !localEventFired) {
                              formatAndLogError(reason, "Unhandled rejection ");
                          }
                      } else {
                          activeFireEvent(name, promise);
                      }
                  }
  
                  function formatNonError(obj) {
                      var str;
                      if (typeof obj === "function") {
                          str = "[function " + (obj.name || "anonymous") + "]";
                      } else {
                          str = obj && typeof obj.toString === "function" ? obj.toString() : util.toString(obj);
                          var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
                          if (ruselessToString.test(str)) {
                              try {
                                  var newStr = JSON.stringify(obj);
                                  str = newStr;
                              } catch (e) {}
                          }
                          if (str.length === 0) {
                              str = "(empty array)";
                          }
                      }
                      return "(<" + snip(str) + ">, no stack trace)";
                  }
  
                  function snip(str) {
                      var maxChars = 41;
                      if (str.length < maxChars) {
                          return str;
                      }
                      return str.substr(0, maxChars - 3) + "...";
                  }
  
                  function longStackTracesIsSupported() {
                      return typeof captureStackTrace === "function";
                  }
  
                  var shouldIgnore = function shouldIgnore() {
                      return false;
                  };
                  var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
                  function parseLineInfo(line) {
                      var matches = line.match(parseLineInfoRegex);
                      if (matches) {
                          return {
                              fileName: matches[1],
                              line: parseInt(matches[2], 10)
                          };
                      }
                  }
  
                  function setBounds(firstLineError, lastLineError) {
                      if (!longStackTracesIsSupported()) return;
                      var firstStackLines = firstLineError.stack.split("\n");
                      var lastStackLines = lastLineError.stack.split("\n");
                      var firstIndex = -1;
                      var lastIndex = -1;
                      var firstFileName;
                      var lastFileName;
                      for (var i = 0; i < firstStackLines.length; ++i) {
                          var result = parseLineInfo(firstStackLines[i]);
                          if (result) {
                              firstFileName = result.fileName;
                              firstIndex = result.line;
                              break;
                          }
                      }
                      for (var i = 0; i < lastStackLines.length; ++i) {
                          var result = parseLineInfo(lastStackLines[i]);
                          if (result) {
                              lastFileName = result.fileName;
                              lastIndex = result.line;
                              break;
                          }
                      }
                      if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName || firstFileName !== lastFileName || firstIndex >= lastIndex) {
                          return;
                      }
  
                      shouldIgnore = function shouldIgnore(line) {
                          if (bluebirdFramePattern.test(line)) return true;
                          var info = parseLineInfo(line);
                          if (info) {
                              if (info.fileName === firstFileName && firstIndex <= info.line && info.line <= lastIndex) {
                                  return true;
                              }
                          }
                          return false;
                      };
                  }
  
                  function CapturedTrace(parent) {
                      this._parent = parent;
                      this._promisesCreated = 0;
                      var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
                      captureStackTrace(this, CapturedTrace);
                      if (length > 32) this.uncycle();
                  }
                  util.inherits(CapturedTrace, Error);
                  Context.CapturedTrace = CapturedTrace;
  
                  CapturedTrace.prototype.uncycle = function () {
                      var length = this._length;
                      if (length < 2) return;
                      var nodes = [];
                      var stackToIndex = {};
  
                      for (var i = 0, node = this; node !== undefined; ++i) {
                          nodes.push(node);
                          node = node._parent;
                      }
                      length = this._length = i;
                      for (var i = length - 1; i >= 0; --i) {
                          var stack = nodes[i].stack;
                          if (stackToIndex[stack] === undefined) {
                              stackToIndex[stack] = i;
                          }
                      }
                      for (var i = 0; i < length; ++i) {
                          var currentStack = nodes[i].stack;
                          var index = stackToIndex[currentStack];
                          if (index !== undefined && index !== i) {
                              if (index > 0) {
                                  nodes[index - 1]._parent = undefined;
                                  nodes[index - 1]._length = 1;
                              }
                              nodes[i]._parent = undefined;
                              nodes[i]._length = 1;
                              var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;
  
                              if (index < length - 1) {
                                  cycleEdgeNode._parent = nodes[index + 1];
                                  cycleEdgeNode._parent.uncycle();
                                  cycleEdgeNode._length = cycleEdgeNode._parent._length + 1;
                              } else {
                                  cycleEdgeNode._parent = undefined;
                                  cycleEdgeNode._length = 1;
                              }
                              var currentChildLength = cycleEdgeNode._length + 1;
                              for (var j = i - 2; j >= 0; --j) {
                                  nodes[j]._length = currentChildLength;
                                  currentChildLength++;
                              }
                              return;
                          }
                      }
                  };
  
                  CapturedTrace.prototype.attachExtraTrace = function (error) {
                      if (error.__stackCleaned__) return;
                      this.uncycle();
                      var parsed = parseStackAndMessage(error);
                      var message = parsed.message;
                      var stacks = [parsed.stack];
  
                      var trace = this;
                      while (trace !== undefined) {
                          stacks.push(cleanStack(trace.stack.split("\n")));
                          trace = trace._parent;
                      }
                      removeCommonRoots(stacks);
                      removeDuplicateOrEmptyJumps(stacks);
                      util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
                      util.notEnumerableProp(error, "__stackCleaned__", true);
                  };
  
                  var captureStackTrace = function stackDetection() {
                      var v8stackFramePattern = /^\s*at\s*/;
                      var v8stackFormatter = function v8stackFormatter(stack, error) {
                          if (typeof stack === "string") return stack;
  
                          if (error.name !== undefined && error.message !== undefined) {
                              return error.toString();
                          }
                          return formatNonError(error);
                      };
  
                      if (typeof Error.stackTraceLimit === "number" && typeof Error.captureStackTrace === "function") {
                          Error.stackTraceLimit += 6;
                          stackFramePattern = v8stackFramePattern;
                          formatStack = v8stackFormatter;
                          var captureStackTrace = Error.captureStackTrace;
  
                          shouldIgnore = function shouldIgnore(line) {
                              return bluebirdFramePattern.test(line);
                          };
                          return function (receiver, ignoreUntil) {
                              Error.stackTraceLimit += 6;
                              captureStackTrace(receiver, ignoreUntil);
                              Error.stackTraceLimit -= 6;
                          };
                      }
                      var err = new Error();
  
                      if (typeof err.stack === "string" && err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
                          stackFramePattern = /@/;
                          formatStack = v8stackFormatter;
                          indentStackFrames = true;
                          return function captureStackTrace(o) {
                              o.stack = new Error().stack;
                          };
                      }
  
                      var hasStackAfterThrow;
                      try {
                          throw new Error();
                      } catch (e) {
                          hasStackAfterThrow = "stack" in e;
                      }
                      if (!("stack" in err) && hasStackAfterThrow && typeof Error.stackTraceLimit === "number") {
                          stackFramePattern = v8stackFramePattern;
                          formatStack = v8stackFormatter;
                          return function captureStackTrace(o) {
                              Error.stackTraceLimit += 6;
                              try {
                                  throw new Error();
                              } catch (e) {
                                  o.stack = e.stack;
                              }
                              Error.stackTraceLimit -= 6;
                          };
                      }
  
                      formatStack = function formatStack(stack, error) {
                          if (typeof stack === "string") return stack;
  
                          if (((typeof error === "undefined" ? "undefined" : _typeof(error)) === "object" || typeof error === "function") && error.name !== undefined && error.message !== undefined) {
                              return error.toString();
                          }
                          return formatNonError(error);
                      };
  
                      return null;
                  }([]);
  
                  if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
                      printWarning = function printWarning(message) {
                          console.warn(message);
                      };
                      if (util.isNode && process.stderr.isTTY) {
                          printWarning = function printWarning(message, isSoft) {
                              var color = isSoft ? "\u001b[33m" : "\u001b[31m";
                              console.warn(color + message + "\u001b[0m\n");
                          };
                      } else if (!util.isNode && typeof new Error().stack === "string") {
                          printWarning = function printWarning(message, isSoft) {
                              console.warn("%c" + message, isSoft ? "color: darkorange" : "color: red");
                          };
                      }
                  }
  
                  var config = {
                      warnings: warnings,
                      longStackTraces: false,
                      cancellation: false,
                      monitoring: false
                  };
  
                  if (longStackTraces) Promise.longStackTraces();
  
                  return {
                      longStackTraces: function longStackTraces() {
                          return config.longStackTraces;
                      },
                      warnings: function warnings() {
                          return config.warnings;
                      },
                      cancellation: function cancellation() {
                          return config.cancellation;
                      },
                      monitoring: function monitoring() {
                          return config.monitoring;
                      },
                      propagateFromFunction: function propagateFromFunction() {
                          return _propagateFromFunction;
                      },
                      boundValueFunction: function boundValueFunction() {
                          return _boundValueFunction;
                      },
                      checkForgottenReturns: checkForgottenReturns,
                      setBounds: setBounds,
                      warn: warn,
                      deprecated: deprecated,
                      CapturedTrace: CapturedTrace,
                      fireDomEvent: fireDomEvent,
                      fireGlobalEvent: fireGlobalEvent
                  };
              };
          }, { "./errors": 12, "./util": 36 }], 10: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise) {
                  function returner() {
                      return this.value;
                  }
                  function thrower() {
                      throw this.reason;
                  }
  
                  Promise.prototype["return"] = Promise.prototype.thenReturn = function (value) {
                      if (value instanceof Promise) value.suppressUnhandledRejections();
                      return this._then(returner, undefined, undefined, { value: value }, undefined);
                  };
  
                  Promise.prototype["throw"] = Promise.prototype.thenThrow = function (reason) {
                      return this._then(thrower, undefined, undefined, { reason: reason }, undefined);
                  };
  
                  Promise.prototype.catchThrow = function (reason) {
                      if (arguments.length <= 1) {
                          return this._then(undefined, thrower, undefined, { reason: reason }, undefined);
                      } else {
                          var _reason = arguments[1];
                          var handler = function handler() {
                              throw _reason;
                          };
                          return this.caught(reason, handler);
                      }
                  };
  
                  Promise.prototype.catchReturn = function (value) {
                      if (arguments.length <= 1) {
                          if (value instanceof Promise) value.suppressUnhandledRejections();
                          return this._then(undefined, returner, undefined, { value: value }, undefined);
                      } else {
                          var _value = arguments[1];
                          if (_value instanceof Promise) _value.suppressUnhandledRejections();
                          var handler = function handler() {
                              return _value;
                          };
                          return this.caught(value, handler);
                      }
                  };
              };
          }, {}], 11: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL) {
                  var PromiseReduce = Promise.reduce;
                  var PromiseAll = Promise.all;
  
                  function promiseAllThis() {
                      return PromiseAll(this);
                  }
  
                  function PromiseMapSeries(promises, fn) {
                      return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
                  }
  
                  Promise.prototype.each = function (fn) {
                      return this.mapSeries(fn)._then(promiseAllThis, undefined, undefined, this, undefined);
                  };
  
                  Promise.prototype.mapSeries = function (fn) {
                      return PromiseReduce(this, fn, INTERNAL, INTERNAL);
                  };
  
                  Promise.each = function (promises, fn) {
                      return PromiseMapSeries(promises, fn)._then(promiseAllThis, undefined, undefined, promises, undefined);
                  };
  
                  Promise.mapSeries = PromiseMapSeries;
              };
          }, {}], 12: [function (_dereq_, module, exports) {
              "use strict";
  
              var es5 = _dereq_("./es5");
              var Objectfreeze = es5.freeze;
              var util = _dereq_("./util");
              var inherits = util.inherits;
              var notEnumerableProp = util.notEnumerableProp;
  
              function subError(nameProperty, defaultMessage) {
                  function SubError(message) {
                      if (!(this instanceof SubError)) return new SubError(message);
                      notEnumerableProp(this, "message", typeof message === "string" ? message : defaultMessage);
                      notEnumerableProp(this, "name", nameProperty);
                      if (Error.captureStackTrace) {
                          Error.captureStackTrace(this, this.constructor);
                      } else {
                          Error.call(this);
                      }
                  }
                  inherits(SubError, Error);
                  return SubError;
              }
  
              var _TypeError, _RangeError;
              var Warning = subError("Warning", "warning");
              var CancellationError = subError("CancellationError", "cancellation error");
              var TimeoutError = subError("TimeoutError", "timeout error");
              var AggregateError = subError("AggregateError", "aggregate error");
              try {
                  _TypeError = TypeError;
                  _RangeError = RangeError;
              } catch (e) {
                  _TypeError = subError("TypeError", "type error");
                  _RangeError = subError("RangeError", "range error");
              }
  
              var methods = ("join pop push shift unshift slice filter forEach some " + "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");
  
              for (var i = 0; i < methods.length; ++i) {
                  if (typeof Array.prototype[methods[i]] === "function") {
                      AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
                  }
              }
  
              es5.defineProperty(AggregateError.prototype, "length", {
                  value: 0,
                  configurable: false,
                  writable: true,
                  enumerable: true
              });
              AggregateError.prototype["isOperational"] = true;
              var level = 0;
              AggregateError.prototype.toString = function () {
                  var indent = Array(level * 4 + 1).join(" ");
                  var ret = "\n" + indent + "AggregateError of:" + "\n";
                  level++;
                  indent = Array(level * 4 + 1).join(" ");
                  for (var i = 0; i < this.length; ++i) {
                      var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
                      var lines = str.split("\n");
                      for (var j = 0; j < lines.length; ++j) {
                          lines[j] = indent + lines[j];
                      }
                      str = lines.join("\n");
                      ret += str + "\n";
                  }
                  level--;
                  return ret;
              };
  
              function OperationalError(message) {
                  if (!(this instanceof OperationalError)) return new OperationalError(message);
                  notEnumerableProp(this, "name", "OperationalError");
                  notEnumerableProp(this, "message", message);
                  this.cause = message;
                  this["isOperational"] = true;
  
                  if (message instanceof Error) {
                      notEnumerableProp(this, "message", message.message);
                      notEnumerableProp(this, "stack", message.stack);
                  } else if (Error.captureStackTrace) {
                      Error.captureStackTrace(this, this.constructor);
                  }
              }
              inherits(OperationalError, Error);
  
              var errorTypes = Error["__BluebirdErrorTypes__"];
              if (!errorTypes) {
                  errorTypes = Objectfreeze({
                      CancellationError: CancellationError,
                      TimeoutError: TimeoutError,
                      OperationalError: OperationalError,
                      RejectionError: OperationalError,
                      AggregateError: AggregateError
                  });
                  es5.defineProperty(Error, "__BluebirdErrorTypes__", {
                      value: errorTypes,
                      writable: false,
                      enumerable: false,
                      configurable: false
                  });
              }
  
              module.exports = {
                  Error: Error,
                  TypeError: _TypeError,
                  RangeError: _RangeError,
                  CancellationError: errorTypes.CancellationError,
                  OperationalError: errorTypes.OperationalError,
                  TimeoutError: errorTypes.TimeoutError,
                  AggregateError: errorTypes.AggregateError,
                  Warning: Warning
              };
          }, { "./es5": 13, "./util": 36 }], 13: [function (_dereq_, module, exports) {
              var isES5 = function () {
                  "use strict";
  
                  return this === undefined;
              }();
  
              if (isES5) {
                  module.exports = {
                      freeze: Object.freeze,
                      defineProperty: Object.defineProperty,
                      getDescriptor: Object.getOwnPropertyDescriptor,
                      keys: Object.keys,
                      names: Object.getOwnPropertyNames,
                      getPrototypeOf: Object.getPrototypeOf,
                      isArray: Array.isArray,
                      isES5: isES5,
                      propertyIsWritable: function propertyIsWritable(obj, prop) {
                          var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
                          return !!(!descriptor || descriptor.writable || descriptor.set);
                      }
                  };
              } else {
                  var has = {}.hasOwnProperty;
                  var str = {}.toString;
                  var proto = {}.constructor.prototype;
  
                  var ObjectKeys = function ObjectKeys(o) {
                      var ret = [];
                      for (var key in o) {
                          if (has.call(o, key)) {
                              ret.push(key);
                          }
                      }
                      return ret;
                  };
  
                  var ObjectGetDescriptor = function ObjectGetDescriptor(o, key) {
                      return { value: o[key] };
                  };
  
                  var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
                      o[key] = desc.value;
                      return o;
                  };
  
                  var ObjectFreeze = function ObjectFreeze(obj) {
                      return obj;
                  };
  
                  var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
                      try {
                          return Object(obj).constructor.prototype;
                      } catch (e) {
                          return proto;
                      }
                  };
  
                  var ArrayIsArray = function ArrayIsArray(obj) {
                      try {
                          return str.call(obj) === "[object Array]";
                      } catch (e) {
                          return false;
                      }
                  };
  
                  module.exports = {
                      isArray: ArrayIsArray,
                      keys: ObjectKeys,
                      names: ObjectKeys,
                      defineProperty: ObjectDefineProperty,
                      getDescriptor: ObjectGetDescriptor,
                      freeze: ObjectFreeze,
                      getPrototypeOf: ObjectGetPrototypeOf,
                      isES5: isES5,
                      propertyIsWritable: function propertyIsWritable() {
                          return true;
                      }
                  };
              }
          }, {}], 14: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL) {
                  var PromiseMap = Promise.map;
  
                  Promise.prototype.filter = function (fn, options) {
                      return PromiseMap(this, fn, options, INTERNAL);
                  };
  
                  Promise.filter = function (promises, fn, options) {
                      return PromiseMap(promises, fn, options, INTERNAL);
                  };
              };
          }, {}], 15: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, tryConvertToPromise) {
                  var util = _dereq_("./util");
                  var CancellationError = Promise.CancellationError;
                  var errorObj = util.errorObj;
  
                  function PassThroughHandlerContext(promise, type, handler) {
                      this.promise = promise;
                      this.type = type;
                      this.handler = handler;
                      this.called = false;
                      this.cancelPromise = null;
                  }
  
                  PassThroughHandlerContext.prototype.isFinallyHandler = function () {
                      return this.type === 0;
                  };
  
                  function FinallyHandlerCancelReaction(finallyHandler) {
                      this.finallyHandler = finallyHandler;
                  }
  
                  FinallyHandlerCancelReaction.prototype._resultCancelled = function () {
                      checkCancel(this.finallyHandler);
                  };
  
                  function checkCancel(ctx, reason) {
                      if (ctx.cancelPromise != null) {
                          if (arguments.length > 1) {
                              ctx.cancelPromise._reject(reason);
                          } else {
                              ctx.cancelPromise._cancel();
                          }
                          ctx.cancelPromise = null;
                          return true;
                      }
                      return false;
                  }
  
                  function succeed() {
                      return finallyHandler.call(this, this.promise._target()._settledValue());
                  }
                  function fail(reason) {
                      if (checkCancel(this, reason)) return;
                      errorObj.e = reason;
                      return errorObj;
                  }
                  function finallyHandler(reasonOrValue) {
                      var promise = this.promise;
                      var handler = this.handler;
  
                      if (!this.called) {
                          this.called = true;
                          var ret = this.isFinallyHandler() ? handler.call(promise._boundValue()) : handler.call(promise._boundValue(), reasonOrValue);
                          if (ret !== undefined) {
                              promise._setReturnedNonUndefined();
                              var maybePromise = tryConvertToPromise(ret, promise);
                              if (maybePromise instanceof Promise) {
                                  if (this.cancelPromise != null) {
                                      if (maybePromise.isCancelled()) {
                                          var reason = new CancellationError("late cancellation observer");
                                          promise._attachExtraTrace(reason);
                                          errorObj.e = reason;
                                          return errorObj;
                                      } else if (maybePromise.isPending()) {
                                          maybePromise._attachCancellationCallback(new FinallyHandlerCancelReaction(this));
                                      }
                                  }
                                  return maybePromise._then(succeed, fail, undefined, this, undefined);
                              }
                          }
                      }
  
                      if (promise.isRejected()) {
                          checkCancel(this);
                          errorObj.e = reasonOrValue;
                          return errorObj;
                      } else {
                          checkCancel(this);
                          return reasonOrValue;
                      }
                  }
  
                  Promise.prototype._passThrough = function (handler, type, success, fail) {
                      if (typeof handler !== "function") return this.then();
                      return this._then(success, fail, undefined, new PassThroughHandlerContext(this, type, handler), undefined);
                  };
  
                  Promise.prototype.lastly = Promise.prototype["finally"] = function (handler) {
                      return this._passThrough(handler, 0, finallyHandler, finallyHandler);
                  };
  
                  Promise.prototype.tap = function (handler) {
                      return this._passThrough(handler, 1, finallyHandler);
                  };
  
                  return PassThroughHandlerContext;
              };
          }, { "./util": 36 }], 16: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug) {
                  var errors = _dereq_("./errors");
                  var TypeError = errors.TypeError;
                  var util = _dereq_("./util");
                  var errorObj = util.errorObj;
                  var tryCatch = util.tryCatch;
                  var yieldHandlers = [];
  
                  function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
                      for (var i = 0; i < yieldHandlers.length; ++i) {
                          traceParent._pushContext();
                          var result = tryCatch(yieldHandlers[i])(value);
                          traceParent._popContext();
                          if (result === errorObj) {
                              traceParent._pushContext();
                              var ret = Promise.reject(errorObj.e);
                              traceParent._popContext();
                              return ret;
                          }
                          var maybePromise = tryConvertToPromise(result, traceParent);
                          if (maybePromise instanceof Promise) return maybePromise;
                      }
                      return null;
                  }
  
                  function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
                      if (debug.cancellation()) {
                          var internal = new Promise(INTERNAL);
                          var _finallyPromise = this._finallyPromise = new Promise(INTERNAL);
                          this._promise = internal.lastly(function () {
                              return _finallyPromise;
                          });
                          internal._captureStackTrace();
                          internal._setOnCancel(this);
                      } else {
                          var promise = this._promise = new Promise(INTERNAL);
                          promise._captureStackTrace();
                      }
                      this._stack = stack;
                      this._generatorFunction = generatorFunction;
                      this._receiver = receiver;
                      this._generator = undefined;
                      this._yieldHandlers = typeof yieldHandler === "function" ? [yieldHandler].concat(yieldHandlers) : yieldHandlers;
                      this._yieldedPromise = null;
                      this._cancellationPhase = false;
                  }
                  util.inherits(PromiseSpawn, Proxyable);
  
                  PromiseSpawn.prototype._isResolved = function () {
                      return this._promise === null;
                  };
  
                  PromiseSpawn.prototype._cleanup = function () {
                      this._promise = this._generator = null;
                      if (debug.cancellation() && this._finallyPromise !== null) {
                          this._finallyPromise._fulfill();
                          this._finallyPromise = null;
                      }
                  };
  
                  PromiseSpawn.prototype._promiseCancelled = function () {
                      if (this._isResolved()) return;
                      var implementsReturn = typeof this._generator["return"] !== "undefined";
  
                      var result;
                      if (!implementsReturn) {
                          var reason = new Promise.CancellationError("generator .return() sentinel");
                          Promise.coroutine.returnSentinel = reason;
                          this._promise._attachExtraTrace(reason);
                          this._promise._pushContext();
                          result = tryCatch(this._generator["throw"]).call(this._generator, reason);
                          this._promise._popContext();
                      } else {
                          this._promise._pushContext();
                          result = tryCatch(this._generator["return"]).call(this._generator, undefined);
                          this._promise._popContext();
                      }
                      this._cancellationPhase = true;
                      this._yieldedPromise = null;
                      this._continue(result);
                  };
  
                  PromiseSpawn.prototype._promiseFulfilled = function (value) {
                      this._yieldedPromise = null;
                      this._promise._pushContext();
                      var result = tryCatch(this._generator.next).call(this._generator, value);
                      this._promise._popContext();
                      this._continue(result);
                  };
  
                  PromiseSpawn.prototype._promiseRejected = function (reason) {
                      this._yieldedPromise = null;
                      this._promise._attachExtraTrace(reason);
                      this._promise._pushContext();
                      var result = tryCatch(this._generator["throw"]).call(this._generator, reason);
                      this._promise._popContext();
                      this._continue(result);
                  };
  
                  PromiseSpawn.prototype._resultCancelled = function () {
                      if (this._yieldedPromise instanceof Promise) {
                          var promise = this._yieldedPromise;
                          this._yieldedPromise = null;
                          promise.cancel();
                      }
                  };
  
                  PromiseSpawn.prototype.promise = function () {
                      return this._promise;
                  };
  
                  PromiseSpawn.prototype._run = function () {
                      this._generator = this._generatorFunction.call(this._receiver);
                      this._receiver = this._generatorFunction = undefined;
                      this._promiseFulfilled(undefined);
                  };
  
                  PromiseSpawn.prototype._continue = function (result) {
                      var promise = this._promise;
                      if (result === errorObj) {
                          this._cleanup();
                          if (this._cancellationPhase) {
                              return promise.cancel();
                          } else {
                              return promise._rejectCallback(result.e, false);
                          }
                      }
  
                      var value = result.value;
                      if (result.done === true) {
                          this._cleanup();
                          if (this._cancellationPhase) {
                              return promise.cancel();
                          } else {
                              return promise._resolveCallback(value);
                          }
                      } else {
                          var maybePromise = tryConvertToPromise(value, this._promise);
                          if (!(maybePromise instanceof Promise)) {
                              maybePromise = promiseFromYieldHandler(maybePromise, this._yieldHandlers, this._promise);
                              if (maybePromise === null) {
                                  this._promiseRejected(new TypeError("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", value) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
                                  return;
                              }
                          }
                          maybePromise = maybePromise._target();
                          var bitField = maybePromise._bitField;
                          ;
                          if ((bitField & 50397184) === 0) {
                              this._yieldedPromise = maybePromise;
                              maybePromise._proxy(this, null);
                          } else if ((bitField & 33554432) !== 0) {
                              this._promiseFulfilled(maybePromise._value());
                          } else if ((bitField & 16777216) !== 0) {
                              this._promiseRejected(maybePromise._reason());
                          } else {
                              this._promiseCancelled();
                          }
                      }
                  };
  
                  Promise.coroutine = function (generatorFunction, options) {
                      if (typeof generatorFunction !== "function") {
                          throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                      }
                      var yieldHandler = Object(options).yieldHandler;
                      var PromiseSpawn$ = PromiseSpawn;
                      var stack = new Error().stack;
                      return function () {
                          var generator = generatorFunction.apply(this, arguments);
                          var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler, stack);
                          var ret = spawn.promise();
                          spawn._generator = generator;
                          spawn._promiseFulfilled(undefined);
                          return ret;
                      };
                  };
  
                  Promise.coroutine.addYieldHandler = function (fn) {
                      if (typeof fn !== "function") {
                          throw new TypeError("expecting a function but got " + util.classString(fn));
                      }
                      yieldHandlers.push(fn);
                  };
  
                  Promise.spawn = function (generatorFunction) {
                      debug.deprecated("Promise.spawn()", "Promise.coroutine()");
                      if (typeof generatorFunction !== "function") {
                          return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                      }
                      var spawn = new PromiseSpawn(generatorFunction, this);
                      var ret = spawn.promise();
                      spawn._run(Promise.spawn);
                      return ret;
                  };
              };
          }, { "./errors": 12, "./util": 36 }], 17: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, PromiseArray, tryConvertToPromise, INTERNAL) {
                  var util = _dereq_("./util");
                  var canEvaluate = util.canEvaluate;
                  var tryCatch = util.tryCatch;
                  var errorObj = util.errorObj;
                  var reject;
  
                  if (!true) {
                      if (canEvaluate) {
                          var thenCallback = function thenCallback(i) {
                              return new Function("value", "holder", "                             \n\
              'use strict';                                                    \n\
              holder.pIndex = value;                                           \n\
              holder.checkFulfillment(this);                                   \n\
              ".replace(/Index/g, i));
                          };
  
                          var promiseSetter = function promiseSetter(i) {
                              return new Function("promise", "holder", "                           \n\
              'use strict';                                                    \n\
              holder.pIndex = promise;                                         \n\
              ".replace(/Index/g, i));
                          };
  
                          var generateHolderClass = function generateHolderClass(total) {
                              var props = new Array(total);
                              for (var i = 0; i < props.length; ++i) {
                                  props[i] = "this.p" + (i + 1);
                              }
                              var assignment = props.join(" = ") + " = null;";
                              var cancellationCode = "var promise;\n" + props.map(function (prop) {
                                  return "                                                         \n\
                  promise = " + prop + ";                                      \n\
                  if (promise instanceof Promise) {                            \n\
                      promise.cancel();                                        \n\
                  }                                                            \n\
              ";
                              }).join("\n");
                              var passedArguments = props.join(", ");
                              var name = "Holder$" + total;
  
                              var code = "return function(tryCatch, errorObj, Promise) {           \n\
              'use strict';                                                    \n\
              function [TheName](fn) {                                         \n\
                  [TheProperties]                                              \n\
                  this.fn = fn;                                                \n\
                  this.now = 0;                                                \n\
              }                                                                \n\
              [TheName].prototype.checkFulfillment = function(promise) {       \n\
                  var now = ++this.now;                                        \n\
                  if (now === [TheTotal]) {                                    \n\
                      promise._pushContext();                                  \n\
                      var callback = this.fn;                                  \n\
                      var ret = tryCatch(callback)([ThePassedArguments]);      \n\
                      promise._popContext();                                   \n\
                      if (ret === errorObj) {                                  \n\
                          promise._rejectCallback(ret.e, false);               \n\
                      } else {                                                 \n\
                          promise._resolveCallback(ret);                       \n\
                      }                                                        \n\
                  }                                                            \n\
              };                                                               \n\
                                                                               \n\
              [TheName].prototype._resultCancelled = function() {              \n\
                  [CancellationCode]                                           \n\
              };                                                               \n\
                                                                               \n\
              return [TheName];                                                \n\
          }(tryCatch, errorObj, Promise);                                      \n\
          ";
  
                              code = code.replace(/\[TheName\]/g, name).replace(/\[TheTotal\]/g, total).replace(/\[ThePassedArguments\]/g, passedArguments).replace(/\[TheProperties\]/g, assignment).replace(/\[CancellationCode\]/g, cancellationCode);
  
                              return new Function("tryCatch", "errorObj", "Promise", code)(tryCatch, errorObj, Promise);
                          };
  
                          var holderClasses = [];
                          var thenCallbacks = [];
                          var promiseSetters = [];
  
                          for (var i = 0; i < 8; ++i) {
                              holderClasses.push(generateHolderClass(i + 1));
                              thenCallbacks.push(thenCallback(i + 1));
                              promiseSetters.push(promiseSetter(i + 1));
                          }
  
                          reject = function reject(reason) {
                              this._reject(reason);
                          };
                      }
                  }
  
                  Promise.join = function () {
                      var last = arguments.length - 1;
                      var fn;
                      if (last > 0 && typeof arguments[last] === "function") {
                          fn = arguments[last];
                          if (!true) {
                              if (last <= 8 && canEvaluate) {
                                  var ret = new Promise(INTERNAL);
                                  ret._captureStackTrace();
                                  var HolderClass = holderClasses[last - 1];
                                  var holder = new HolderClass(fn);
                                  var callbacks = thenCallbacks;
  
                                  for (var i = 0; i < last; ++i) {
                                      var maybePromise = tryConvertToPromise(arguments[i], ret);
                                      if (maybePromise instanceof Promise) {
                                          maybePromise = maybePromise._target();
                                          var bitField = maybePromise._bitField;
                                          ;
                                          if ((bitField & 50397184) === 0) {
                                              maybePromise._then(callbacks[i], reject, undefined, ret, holder);
                                              promiseSetters[i](maybePromise, holder);
                                          } else if ((bitField & 33554432) !== 0) {
                                              callbacks[i].call(ret, maybePromise._value(), holder);
                                          } else if ((bitField & 16777216) !== 0) {
                                              ret._reject(maybePromise._reason());
                                          } else {
                                              ret._cancel();
                                          }
                                      } else {
                                          callbacks[i].call(ret, maybePromise, holder);
                                      }
                                  }
                                  if (!ret._isFateSealed()) {
                                      ret._setAsyncGuaranteed();
                                      ret._setOnCancel(holder);
                                  }
                                  return ret;
                              }
                          }
                      }
                      var args = [].slice.call(arguments);;
                      if (fn) args.pop();
                      var ret = new PromiseArray(args).promise();
                      return fn !== undefined ? ret.spread(fn) : ret;
                  };
              };
          }, { "./util": 36 }], 18: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
                  var getDomain = Promise._getDomain;
                  var util = _dereq_("./util");
                  var tryCatch = util.tryCatch;
                  var errorObj = util.errorObj;
                  var EMPTY_ARRAY = [];
  
                  function MappingPromiseArray(promises, fn, limit, _filter) {
                      this.constructor$(promises);
                      this._promise._captureStackTrace();
                      var domain = getDomain();
                      this._callback = domain === null ? fn : domain.bind(fn);
                      this._preservedValues = _filter === INTERNAL ? new Array(this.length()) : null;
                      this._limit = limit;
                      this._inFlight = 0;
                      this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
                      this._init$(undefined, -2);
                  }
                  util.inherits(MappingPromiseArray, PromiseArray);
  
                  MappingPromiseArray.prototype._init = function () {};
  
                  MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
                      var values = this._values;
                      var length = this.length();
                      var preservedValues = this._preservedValues;
                      var limit = this._limit;
  
                      if (index < 0) {
                          index = index * -1 - 1;
                          values[index] = value;
                          if (limit >= 1) {
                              this._inFlight--;
                              this._drainQueue();
                              if (this._isResolved()) return true;
                          }
                      } else {
                          if (limit >= 1 && this._inFlight >= limit) {
                              values[index] = value;
                              this._queue.push(index);
                              return false;
                          }
                          if (preservedValues !== null) preservedValues[index] = value;
  
                          var promise = this._promise;
                          var callback = this._callback;
                          var receiver = promise._boundValue();
                          promise._pushContext();
                          var ret = tryCatch(callback).call(receiver, value, index, length);
                          var promiseCreated = promise._popContext();
                          debug.checkForgottenReturns(ret, promiseCreated, preservedValues !== null ? "Promise.filter" : "Promise.map", promise);
                          if (ret === errorObj) {
                              this._reject(ret.e);
                              return true;
                          }
  
                          var maybePromise = tryConvertToPromise(ret, this._promise);
                          if (maybePromise instanceof Promise) {
                              maybePromise = maybePromise._target();
                              var bitField = maybePromise._bitField;
                              ;
                              if ((bitField & 50397184) === 0) {
                                  if (limit >= 1) this._inFlight++;
                                  values[index] = maybePromise;
                                  maybePromise._proxy(this, (index + 1) * -1);
                                  return false;
                              } else if ((bitField & 33554432) !== 0) {
                                  ret = maybePromise._value();
                              } else if ((bitField & 16777216) !== 0) {
                                  this._reject(maybePromise._reason());
                                  return true;
                              } else {
                                  this._cancel();
                                  return true;
                              }
                          }
                          values[index] = ret;
                      }
                      var totalResolved = ++this._totalResolved;
                      if (totalResolved >= length) {
                          if (preservedValues !== null) {
                              this._filter(values, preservedValues);
                          } else {
                              this._resolve(values);
                          }
                          return true;
                      }
                      return false;
                  };
  
                  MappingPromiseArray.prototype._drainQueue = function () {
                      var queue = this._queue;
                      var limit = this._limit;
                      var values = this._values;
                      while (queue.length > 0 && this._inFlight < limit) {
                          if (this._isResolved()) return;
                          var index = queue.pop();
                          this._promiseFulfilled(values[index], index);
                      }
                  };
  
                  MappingPromiseArray.prototype._filter = function (booleans, values) {
                      var len = values.length;
                      var ret = new Array(len);
                      var j = 0;
                      for (var i = 0; i < len; ++i) {
                          if (booleans[i]) ret[j++] = values[i];
                      }
                      ret.length = j;
                      this._resolve(ret);
                  };
  
                  MappingPromiseArray.prototype.preservedValues = function () {
                      return this._preservedValues;
                  };
  
                  function map(promises, fn, options, _filter) {
                      if (typeof fn !== "function") {
                          return apiRejection("expecting a function but got " + util.classString(fn));
                      }
  
                      var limit = 0;
                      if (options !== undefined) {
                          if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object" && options !== null) {
                              if (typeof options.concurrency !== "number") {
                                  return Promise.reject(new TypeError("'concurrency' must be a number but it is " + util.classString(options.concurrency)));
                              }
                              limit = options.concurrency;
                          } else {
                              return Promise.reject(new TypeError("options argument must be an object but it is " + util.classString(options)));
                          }
                      }
                      limit = typeof limit === "number" && isFinite(limit) && limit >= 1 ? limit : 0;
                      return new MappingPromiseArray(promises, fn, limit, _filter).promise();
                  }
  
                  Promise.prototype.map = function (fn, options) {
                      return map(this, fn, options, null);
                  };
  
                  Promise.map = function (promises, fn, options, _filter) {
                      return map(promises, fn, options, _filter);
                  };
              };
          }, { "./util": 36 }], 19: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
                  var util = _dereq_("./util");
                  var tryCatch = util.tryCatch;
  
                  Promise.method = function (fn) {
                      if (typeof fn !== "function") {
                          throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
                      }
                      return function () {
                          var ret = new Promise(INTERNAL);
                          ret._captureStackTrace();
                          ret._pushContext();
                          var value = tryCatch(fn).apply(this, arguments);
                          var promiseCreated = ret._popContext();
                          debug.checkForgottenReturns(value, promiseCreated, "Promise.method", ret);
                          ret._resolveFromSyncValue(value);
                          return ret;
                      };
                  };
  
                  Promise.attempt = Promise["try"] = function (fn) {
                      if (typeof fn !== "function") {
                          return apiRejection("expecting a function but got " + util.classString(fn));
                      }
                      var ret = new Promise(INTERNAL);
                      ret._captureStackTrace();
                      ret._pushContext();
                      var value;
                      if (arguments.length > 1) {
                          debug.deprecated("calling Promise.try with more than 1 argument");
                          var arg = arguments[1];
                          var ctx = arguments[2];
                          value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg) : tryCatch(fn).call(ctx, arg);
                      } else {
                          value = tryCatch(fn)();
                      }
                      var promiseCreated = ret._popContext();
                      debug.checkForgottenReturns(value, promiseCreated, "Promise.try", ret);
                      ret._resolveFromSyncValue(value);
                      return ret;
                  };
  
                  Promise.prototype._resolveFromSyncValue = function (value) {
                      if (value === util.errorObj) {
                          this._rejectCallback(value.e, false);
                      } else {
                          this._resolveCallback(value, true);
                      }
                  };
              };
          }, { "./util": 36 }], 20: [function (_dereq_, module, exports) {
              "use strict";
  
              var util = _dereq_("./util");
              var maybeWrapAsError = util.maybeWrapAsError;
              var errors = _dereq_("./errors");
              var OperationalError = errors.OperationalError;
              var es5 = _dereq_("./es5");
  
              function isUntypedError(obj) {
                  return obj instanceof Error && es5.getPrototypeOf(obj) === Error.prototype;
              }
  
              var rErrorKey = /^(?:name|message|stack|cause)$/;
              function wrapAsOperationalError(obj) {
                  var ret;
                  if (isUntypedError(obj)) {
                      ret = new OperationalError(obj);
                      ret.name = obj.name;
                      ret.message = obj.message;
                      ret.stack = obj.stack;
                      var keys = es5.keys(obj);
                      for (var i = 0; i < keys.length; ++i) {
                          var key = keys[i];
                          if (!rErrorKey.test(key)) {
                              ret[key] = obj[key];
                          }
                      }
                      return ret;
                  }
                  util.markAsOriginatingFromRejection(obj);
                  return obj;
              }
  
              function nodebackForPromise(promise, multiArgs) {
                  return function (err, value) {
                      if (promise === null) return;
                      if (err) {
                          var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
                          promise._attachExtraTrace(wrapped);
                          promise._reject(wrapped);
                      } else if (!multiArgs) {
                          promise._fulfill(value);
                      } else {
                          var args = [].slice.call(arguments, 1);;
                          promise._fulfill(args);
                      }
                      promise = null;
                  };
              }
  
              module.exports = nodebackForPromise;
          }, { "./errors": 12, "./es5": 13, "./util": 36 }], 21: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise) {
                  var util = _dereq_("./util");
                  var async = Promise._async;
                  var tryCatch = util.tryCatch;
                  var errorObj = util.errorObj;
  
                  function spreadAdapter(val, nodeback) {
                      var promise = this;
                      if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
                      var ret = tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
                      if (ret === errorObj) {
                          async.throwLater(ret.e);
                      }
                  }
  
                  function successAdapter(val, nodeback) {
                      var promise = this;
                      var receiver = promise._boundValue();
                      var ret = val === undefined ? tryCatch(nodeback).call(receiver, null) : tryCatch(nodeback).call(receiver, null, val);
                      if (ret === errorObj) {
                          async.throwLater(ret.e);
                      }
                  }
                  function errorAdapter(reason, nodeback) {
                      var promise = this;
                      if (!reason) {
                          var newReason = new Error(reason + "");
                          newReason.cause = reason;
                          reason = newReason;
                      }
                      var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
                      if (ret === errorObj) {
                          async.throwLater(ret.e);
                      }
                  }
  
                  Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback, options) {
                      if (typeof nodeback == "function") {
                          var adapter = successAdapter;
                          if (options !== undefined && Object(options).spread) {
                              adapter = spreadAdapter;
                          }
                          this._then(adapter, errorAdapter, undefined, this, nodeback);
                      }
                      return this;
                  };
              };
          }, { "./util": 36 }], 22: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function () {
                  var makeSelfResolutionError = function makeSelfResolutionError() {
                      return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
                  };
                  var reflectHandler = function reflectHandler() {
                      return new Promise.PromiseInspection(this._target());
                  };
                  var apiRejection = function apiRejection(msg) {
                      return Promise.reject(new TypeError(msg));
                  };
                  function Proxyable() {}
                  var UNDEFINED_BINDING = {};
                  var util = _dereq_("./util");
  
                  var getDomain;
                  if (util.isNode) {
                      getDomain = function getDomain() {
                          var ret = process.domain;
                          if (ret === undefined) ret = null;
                          return ret;
                      };
                  } else {
                      getDomain = function getDomain() {
                          return null;
                      };
                  }
                  util.notEnumerableProp(Promise, "_getDomain", getDomain);
  
                  var es5 = _dereq_("./es5");
                  var Async = _dereq_("./async");
                  var async = new Async();
                  es5.defineProperty(Promise, "_async", { value: async });
                  var errors = _dereq_("./errors");
                  var TypeError = Promise.TypeError = errors.TypeError;
                  Promise.RangeError = errors.RangeError;
                  var CancellationError = Promise.CancellationError = errors.CancellationError;
                  Promise.TimeoutError = errors.TimeoutError;
                  Promise.OperationalError = errors.OperationalError;
                  Promise.RejectionError = errors.OperationalError;
                  Promise.AggregateError = errors.AggregateError;
                  var INTERNAL = function INTERNAL() {};
                  var APPLY = {};
                  var NEXT_FILTER = {};
                  var tryConvertToPromise = _dereq_("./thenables")(Promise, INTERNAL);
                  var PromiseArray = _dereq_("./promise_array")(Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable);
                  var Context = _dereq_("./context")(Promise);
                  /*jshint unused:false*/
                  var createContext = Context.create;
                  var debug = _dereq_("./debuggability")(Promise, Context);
                  var CapturedTrace = debug.CapturedTrace;
                  var PassThroughHandlerContext = _dereq_("./finally")(Promise, tryConvertToPromise);
                  var catchFilter = _dereq_("./catch_filter")(NEXT_FILTER);
                  var nodebackForPromise = _dereq_("./nodeback");
                  var errorObj = util.errorObj;
                  var tryCatch = util.tryCatch;
                  function check(self, executor) {
                      if (typeof executor !== "function") {
                          throw new TypeError("expecting a function but got " + util.classString(executor));
                      }
                      if (self.constructor !== Promise) {
                          throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                      }
                  }
  
                  function Promise(executor) {
                      this._bitField = 0;
                      this._fulfillmentHandler0 = undefined;
                      this._rejectionHandler0 = undefined;
                      this._promise0 = undefined;
                      this._receiver0 = undefined;
                      if (executor !== INTERNAL) {
                          check(this, executor);
                          this._resolveFromExecutor(executor);
                      }
                      this._promiseCreated();
                      this._fireEvent("promiseCreated", this);
                  }
  
                  Promise.prototype.toString = function () {
                      return "[object Promise]";
                  };
  
                  Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
                      var len = arguments.length;
                      if (len > 1) {
                          var catchInstances = new Array(len - 1),
                              j = 0,
                              i;
                          for (i = 0; i < len - 1; ++i) {
                              var item = arguments[i];
                              if (util.isObject(item)) {
                                  catchInstances[j++] = item;
                              } else {
                                  return apiRejection("expecting an object but got " + util.classString(item));
                              }
                          }
                          catchInstances.length = j;
                          fn = arguments[i];
                          return this.then(undefined, catchFilter(catchInstances, fn, this));
                      }
                      return this.then(undefined, fn);
                  };
  
                  Promise.prototype.reflect = function () {
                      return this._then(reflectHandler, reflectHandler, undefined, this, undefined);
                  };
  
                  Promise.prototype.then = function (didFulfill, didReject) {
                      if (debug.warnings() && arguments.length > 0 && typeof didFulfill !== "function" && typeof didReject !== "function") {
                          var msg = ".then() only accepts functions but was passed: " + util.classString(didFulfill);
                          if (arguments.length > 1) {
                              msg += ", " + util.classString(didReject);
                          }
                          this._warn(msg);
                      }
                      return this._then(didFulfill, didReject, undefined, undefined, undefined);
                  };
  
                  Promise.prototype.done = function (didFulfill, didReject) {
                      var promise = this._then(didFulfill, didReject, undefined, undefined, undefined);
                      promise._setIsFinal();
                  };
  
                  Promise.prototype.spread = function (fn) {
                      if (typeof fn !== "function") {
                          return apiRejection("expecting a function but got " + util.classString(fn));
                      }
                      return this.all()._then(fn, undefined, undefined, APPLY, undefined);
                  };
  
                  Promise.prototype.toJSON = function () {
                      var ret = {
                          isFulfilled: false,
                          isRejected: false,
                          fulfillmentValue: undefined,
                          rejectionReason: undefined
                      };
                      if (this.isFulfilled()) {
                          ret.fulfillmentValue = this.value();
                          ret.isFulfilled = true;
                      } else if (this.isRejected()) {
                          ret.rejectionReason = this.reason();
                          ret.isRejected = true;
                      }
                      return ret;
                  };
  
                  Promise.prototype.all = function () {
                      if (arguments.length > 0) {
                          this._warn(".all() was passed arguments but it does not take any");
                      }
                      return new PromiseArray(this).promise();
                  };
  
                  Promise.prototype.error = function (fn) {
                      return this.caught(util.originatesFromRejection, fn);
                  };
  
                  Promise.getNewLibraryCopy = module.exports;
  
                  Promise.is = function (val) {
                      return val instanceof Promise;
                  };
  
                  Promise.fromNode = Promise.fromCallback = function (fn) {
                      var ret = new Promise(INTERNAL);
                      ret._captureStackTrace();
                      var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : false;
                      var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
                      if (result === errorObj) {
                          ret._rejectCallback(result.e, true);
                      }
                      if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
                      return ret;
                  };
  
                  Promise.all = function (promises) {
                      return new PromiseArray(promises).promise();
                  };
  
                  Promise.cast = function (obj) {
                      var ret = tryConvertToPromise(obj);
                      if (!(ret instanceof Promise)) {
                          ret = new Promise(INTERNAL);
                          ret._captureStackTrace();
                          ret._setFulfilled();
                          ret._rejectionHandler0 = obj;
                      }
                      return ret;
                  };
  
                  Promise.resolve = Promise.fulfilled = Promise.cast;
  
                  Promise.reject = Promise.rejected = function (reason) {
                      var ret = new Promise(INTERNAL);
                      ret._captureStackTrace();
                      ret._rejectCallback(reason, true);
                      return ret;
                  };
  
                  Promise.setScheduler = function (fn) {
                      if (typeof fn !== "function") {
                          throw new TypeError("expecting a function but got " + util.classString(fn));
                      }
                      return async.setScheduler(fn);
                  };
  
                  Promise.prototype._then = function (didFulfill, didReject, _, receiver, internalData) {
                      var haveInternalData = internalData !== undefined;
                      var promise = haveInternalData ? internalData : new Promise(INTERNAL);
                      var target = this._target();
                      var bitField = target._bitField;
  
                      if (!haveInternalData) {
                          promise._propagateFrom(this, 3);
                          promise._captureStackTrace();
                          if (receiver === undefined && (this._bitField & 2097152) !== 0) {
                              if (!((bitField & 50397184) === 0)) {
                                  receiver = this._boundValue();
                              } else {
                                  receiver = target === this ? undefined : this._boundTo;
                              }
                          }
                          this._fireEvent("promiseChained", this, promise);
                      }
  
                      var domain = getDomain();
                      if (!((bitField & 50397184) === 0)) {
                          var handler,
                              value,
                              settler = target._settlePromiseCtx;
                          if ((bitField & 33554432) !== 0) {
                              value = target._rejectionHandler0;
                              handler = didFulfill;
                          } else if ((bitField & 16777216) !== 0) {
                              value = target._fulfillmentHandler0;
                              handler = didReject;
                              target._unsetRejectionIsUnhandled();
                          } else {
                              settler = target._settlePromiseLateCancellationObserver;
                              value = new CancellationError("late cancellation observer");
                              target._attachExtraTrace(value);
                              handler = didReject;
                          }
  
                          async.invoke(settler, target, {
                              handler: domain === null ? handler : typeof handler === "function" && domain.bind(handler),
                              promise: promise,
                              receiver: receiver,
                              value: value
                          });
                      } else {
                          target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
                      }
  
                      return promise;
                  };
  
                  Promise.prototype._length = function () {
                      return this._bitField & 65535;
                  };
  
                  Promise.prototype._isFateSealed = function () {
                      return (this._bitField & 117506048) !== 0;
                  };
  
                  Promise.prototype._isFollowing = function () {
                      return (this._bitField & 67108864) === 67108864;
                  };
  
                  Promise.prototype._setLength = function (len) {
                      this._bitField = this._bitField & -65536 | len & 65535;
                  };
  
                  Promise.prototype._setFulfilled = function () {
                      this._bitField = this._bitField | 33554432;
                      this._fireEvent("promiseFulfilled", this);
                  };
  
                  Promise.prototype._setRejected = function () {
                      this._bitField = this._bitField | 16777216;
                      this._fireEvent("promiseRejected", this);
                  };
  
                  Promise.prototype._setFollowing = function () {
                      this._bitField = this._bitField | 67108864;
                      this._fireEvent("promiseResolved", this);
                  };
  
                  Promise.prototype._setIsFinal = function () {
                      this._bitField = this._bitField | 4194304;
                  };
  
                  Promise.prototype._isFinal = function () {
                      return (this._bitField & 4194304) > 0;
                  };
  
                  Promise.prototype._unsetCancelled = function () {
                      this._bitField = this._bitField & ~65536;
                  };
  
                  Promise.prototype._setCancelled = function () {
                      this._bitField = this._bitField | 65536;
                      this._fireEvent("promiseCancelled", this);
                  };
  
                  Promise.prototype._setAsyncGuaranteed = function () {
                      if (async.hasCustomScheduler()) return;
                      this._bitField = this._bitField | 134217728;
                  };
  
                  Promise.prototype._receiverAt = function (index) {
                      var ret = index === 0 ? this._receiver0 : this[index * 4 - 4 + 3];
                      if (ret === UNDEFINED_BINDING) {
                          return undefined;
                      } else if (ret === undefined && this._isBound()) {
                          return this._boundValue();
                      }
                      return ret;
                  };
  
                  Promise.prototype._promiseAt = function (index) {
                      return this[index * 4 - 4 + 2];
                  };
  
                  Promise.prototype._fulfillmentHandlerAt = function (index) {
                      return this[index * 4 - 4 + 0];
                  };
  
                  Promise.prototype._rejectionHandlerAt = function (index) {
                      return this[index * 4 - 4 + 1];
                  };
  
                  Promise.prototype._boundValue = function () {};
  
                  Promise.prototype._migrateCallback0 = function (follower) {
                      var bitField = follower._bitField;
                      var fulfill = follower._fulfillmentHandler0;
                      var reject = follower._rejectionHandler0;
                      var promise = follower._promise0;
                      var receiver = follower._receiverAt(0);
                      if (receiver === undefined) receiver = UNDEFINED_BINDING;
                      this._addCallbacks(fulfill, reject, promise, receiver, null);
                  };
  
                  Promise.prototype._migrateCallbackAt = function (follower, index) {
                      var fulfill = follower._fulfillmentHandlerAt(index);
                      var reject = follower._rejectionHandlerAt(index);
                      var promise = follower._promiseAt(index);
                      var receiver = follower._receiverAt(index);
                      if (receiver === undefined) receiver = UNDEFINED_BINDING;
                      this._addCallbacks(fulfill, reject, promise, receiver, null);
                  };
  
                  Promise.prototype._addCallbacks = function (fulfill, reject, promise, receiver, domain) {
                      var index = this._length();
  
                      if (index >= 65535 - 4) {
                          index = 0;
                          this._setLength(0);
                      }
  
                      if (index === 0) {
                          this._promise0 = promise;
                          this._receiver0 = receiver;
                          if (typeof fulfill === "function") {
                              this._fulfillmentHandler0 = domain === null ? fulfill : domain.bind(fulfill);
                          }
                          if (typeof reject === "function") {
                              this._rejectionHandler0 = domain === null ? reject : domain.bind(reject);
                          }
                      } else {
                          var base = index * 4 - 4;
                          this[base + 2] = promise;
                          this[base + 3] = receiver;
                          if (typeof fulfill === "function") {
                              this[base + 0] = domain === null ? fulfill : domain.bind(fulfill);
                          }
                          if (typeof reject === "function") {
                              this[base + 1] = domain === null ? reject : domain.bind(reject);
                          }
                      }
                      this._setLength(index + 1);
                      return index;
                  };
  
                  Promise.prototype._proxy = function (proxyable, arg) {
                      this._addCallbacks(undefined, undefined, arg, proxyable, null);
                  };
  
                  Promise.prototype._resolveCallback = function (value, shouldBind) {
                      if ((this._bitField & 117506048) !== 0) return;
                      if (value === this) return this._rejectCallback(makeSelfResolutionError(), false);
                      var maybePromise = tryConvertToPromise(value, this);
                      if (!(maybePromise instanceof Promise)) return this._fulfill(value);
  
                      if (shouldBind) this._propagateFrom(maybePromise, 2);
  
                      var promise = maybePromise._target();
  
                      if (promise === this) {
                          this._reject(makeSelfResolutionError());
                          return;
                      }
  
                      var bitField = promise._bitField;
                      if ((bitField & 50397184) === 0) {
                          var len = this._length();
                          if (len > 0) promise._migrateCallback0(this);
                          for (var i = 1; i < len; ++i) {
                              promise._migrateCallbackAt(this, i);
                          }
                          this._setFollowing();
                          this._setLength(0);
                          this._setFollowee(promise);
                      } else if ((bitField & 33554432) !== 0) {
                          this._fulfill(promise._value());
                      } else if ((bitField & 16777216) !== 0) {
                          this._reject(promise._reason());
                      } else {
                          var reason = new CancellationError("late cancellation observer");
                          promise._attachExtraTrace(reason);
                          this._reject(reason);
                      }
                  };
  
                  Promise.prototype._rejectCallback = function (reason, synchronous, ignoreNonErrorWarnings) {
                      var trace = util.ensureErrorObject(reason);
                      var hasStack = trace === reason;
                      if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
                          var message = "a promise was rejected with a non-error: " + util.classString(reason);
                          this._warn(message, true);
                      }
                      this._attachExtraTrace(trace, synchronous ? hasStack : false);
                      this._reject(reason);
                  };
  
                  Promise.prototype._resolveFromExecutor = function (executor) {
                      var promise = this;
                      this._captureStackTrace();
                      this._pushContext();
                      var synchronous = true;
                      var r = this._execute(executor, function (value) {
                          promise._resolveCallback(value);
                      }, function (reason) {
                          promise._rejectCallback(reason, synchronous);
                      });
                      synchronous = false;
                      this._popContext();
  
                      if (r !== undefined) {
                          promise._rejectCallback(r, true);
                      }
                  };
  
                  Promise.prototype._settlePromiseFromHandler = function (handler, receiver, value, promise) {
                      var bitField = promise._bitField;
                      if ((bitField & 65536) !== 0) return;
                      promise._pushContext();
                      var x;
                      if (receiver === APPLY) {
                          if (!value || typeof value.length !== "number") {
                              x = errorObj;
                              x.e = new TypeError("cannot .spread() a non-array: " + util.classString(value));
                          } else {
                              x = tryCatch(handler).apply(this._boundValue(), value);
                          }
                      } else {
                          x = tryCatch(handler).call(receiver, value);
                      }
                      var promiseCreated = promise._popContext();
                      bitField = promise._bitField;
                      if ((bitField & 65536) !== 0) return;
  
                      if (x === NEXT_FILTER) {
                          promise._reject(value);
                      } else if (x === errorObj) {
                          promise._rejectCallback(x.e, false);
                      } else {
                          debug.checkForgottenReturns(x, promiseCreated, "", promise, this);
                          promise._resolveCallback(x);
                      }
                  };
  
                  Promise.prototype._target = function () {
                      var ret = this;
                      while (ret._isFollowing()) {
                          ret = ret._followee();
                      }return ret;
                  };
  
                  Promise.prototype._followee = function () {
                      return this._rejectionHandler0;
                  };
  
                  Promise.prototype._setFollowee = function (promise) {
                      this._rejectionHandler0 = promise;
                  };
  
                  Promise.prototype._settlePromise = function (promise, handler, receiver, value) {
                      var isPromise = promise instanceof Promise;
                      var bitField = this._bitField;
                      var asyncGuaranteed = (bitField & 134217728) !== 0;
                      if ((bitField & 65536) !== 0) {
                          if (isPromise) promise._invokeInternalOnCancel();
  
                          if (receiver instanceof PassThroughHandlerContext && receiver.isFinallyHandler()) {
                              receiver.cancelPromise = promise;
                              if (tryCatch(handler).call(receiver, value) === errorObj) {
                                  promise._reject(errorObj.e);
                              }
                          } else if (handler === reflectHandler) {
                              promise._fulfill(reflectHandler.call(receiver));
                          } else if (receiver instanceof Proxyable) {
                              receiver._promiseCancelled(promise);
                          } else if (isPromise || promise instanceof PromiseArray) {
                              promise._cancel();
                          } else {
                              receiver.cancel();
                          }
                      } else if (typeof handler === "function") {
                          if (!isPromise) {
                              handler.call(receiver, value, promise);
                          } else {
                              if (asyncGuaranteed) promise._setAsyncGuaranteed();
                              this._settlePromiseFromHandler(handler, receiver, value, promise);
                          }
                      } else if (receiver instanceof Proxyable) {
                          if (!receiver._isResolved()) {
                              if ((bitField & 33554432) !== 0) {
                                  receiver._promiseFulfilled(value, promise);
                              } else {
                                  receiver._promiseRejected(value, promise);
                              }
                          }
                      } else if (isPromise) {
                          if (asyncGuaranteed) promise._setAsyncGuaranteed();
                          if ((bitField & 33554432) !== 0) {
                              promise._fulfill(value);
                          } else {
                              promise._reject(value);
                          }
                      }
                  };
  
                  Promise.prototype._settlePromiseLateCancellationObserver = function (ctx) {
                      var handler = ctx.handler;
                      var promise = ctx.promise;
                      var receiver = ctx.receiver;
                      var value = ctx.value;
                      if (typeof handler === "function") {
                          if (!(promise instanceof Promise)) {
                              handler.call(receiver, value, promise);
                          } else {
                              this._settlePromiseFromHandler(handler, receiver, value, promise);
                          }
                      } else if (promise instanceof Promise) {
                          promise._reject(value);
                      }
                  };
  
                  Promise.prototype._settlePromiseCtx = function (ctx) {
                      this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
                  };
  
                  Promise.prototype._settlePromise0 = function (handler, value, bitField) {
                      var promise = this._promise0;
                      var receiver = this._receiverAt(0);
                      this._promise0 = undefined;
                      this._receiver0 = undefined;
                      this._settlePromise(promise, handler, receiver, value);
                  };
  
                  Promise.prototype._clearCallbackDataAtIndex = function (index) {
                      var base = index * 4 - 4;
                      this[base + 2] = this[base + 3] = this[base + 0] = this[base + 1] = undefined;
                  };
  
                  Promise.prototype._fulfill = function (value) {
                      var bitField = this._bitField;
                      if ((bitField & 117506048) >>> 16) return;
                      if (value === this) {
                          var err = makeSelfResolutionError();
                          this._attachExtraTrace(err);
                          return this._reject(err);
                      }
                      this._setFulfilled();
                      this._rejectionHandler0 = value;
  
                      if ((bitField & 65535) > 0) {
                          if ((bitField & 134217728) !== 0) {
                              this._settlePromises();
                          } else {
                              async.settlePromises(this);
                          }
                      }
                  };
  
                  Promise.prototype._reject = function (reason) {
                      var bitField = this._bitField;
                      if ((bitField & 117506048) >>> 16) return;
                      this._setRejected();
                      this._fulfillmentHandler0 = reason;
  
                      if (this._isFinal()) {
                          return async.fatalError(reason, util.isNode);
                      }
  
                      if ((bitField & 65535) > 0) {
                          async.settlePromises(this);
                      } else {
                          this._ensurePossibleRejectionHandled();
                      }
                  };
  
                  Promise.prototype._fulfillPromises = function (len, value) {
                      for (var i = 1; i < len; i++) {
                          var handler = this._fulfillmentHandlerAt(i);
                          var promise = this._promiseAt(i);
                          var receiver = this._receiverAt(i);
                          this._clearCallbackDataAtIndex(i);
                          this._settlePromise(promise, handler, receiver, value);
                      }
                  };
  
                  Promise.prototype._rejectPromises = function (len, reason) {
                      for (var i = 1; i < len; i++) {
                          var handler = this._rejectionHandlerAt(i);
                          var promise = this._promiseAt(i);
                          var receiver = this._receiverAt(i);
                          this._clearCallbackDataAtIndex(i);
                          this._settlePromise(promise, handler, receiver, reason);
                      }
                  };
  
                  Promise.prototype._settlePromises = function () {
                      var bitField = this._bitField;
                      var len = bitField & 65535;
  
                      if (len > 0) {
                          if ((bitField & 16842752) !== 0) {
                              var reason = this._fulfillmentHandler0;
                              this._settlePromise0(this._rejectionHandler0, reason, bitField);
                              this._rejectPromises(len, reason);
                          } else {
                              var value = this._rejectionHandler0;
                              this._settlePromise0(this._fulfillmentHandler0, value, bitField);
                              this._fulfillPromises(len, value);
                          }
                          this._setLength(0);
                      }
                      this._clearCancellationData();
                  };
  
                  Promise.prototype._settledValue = function () {
                      var bitField = this._bitField;
                      if ((bitField & 33554432) !== 0) {
                          return this._rejectionHandler0;
                      } else if ((bitField & 16777216) !== 0) {
                          return this._fulfillmentHandler0;
                      }
                  };
  
                  function deferResolve(v) {
                      this.promise._resolveCallback(v);
                  }
                  function deferReject(v) {
                      this.promise._rejectCallback(v, false);
                  }
  
                  Promise.defer = Promise.pending = function () {
                      debug.deprecated("Promise.defer", "new Promise");
                      var promise = new Promise(INTERNAL);
                      return {
                          promise: promise,
                          resolve: deferResolve,
                          reject: deferReject
                      };
                  };
  
                  util.notEnumerableProp(Promise, "_makeSelfResolutionError", makeSelfResolutionError);
  
                  _dereq_("./method")(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug);
                  _dereq_("./bind")(Promise, INTERNAL, tryConvertToPromise, debug);
                  _dereq_("./cancel")(Promise, PromiseArray, apiRejection, debug);
                  _dereq_("./direct_resolve")(Promise);
                  _dereq_("./synchronous_inspection")(Promise);
                  _dereq_("./join")(Promise, PromiseArray, tryConvertToPromise, INTERNAL, debug);
                  Promise.Promise = Promise;
                  Promise.version = "3.4.0";
                  _dereq_('./map.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
                  _dereq_('./call_get.js')(Promise);
                  _dereq_('./using.js')(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
                  _dereq_('./timers.js')(Promise, INTERNAL, debug);
                  _dereq_('./generators.js')(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
                  _dereq_('./nodeify.js')(Promise);
                  _dereq_('./promisify.js')(Promise, INTERNAL);
                  _dereq_('./props.js')(Promise, PromiseArray, tryConvertToPromise, apiRejection);
                  _dereq_('./race.js')(Promise, INTERNAL, tryConvertToPromise, apiRejection);
                  _dereq_('./reduce.js')(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
                  _dereq_('./settle.js')(Promise, PromiseArray, debug);
                  _dereq_('./some.js')(Promise, PromiseArray, apiRejection);
                  _dereq_('./filter.js')(Promise, INTERNAL);
                  _dereq_('./each.js')(Promise, INTERNAL);
                  _dereq_('./any.js')(Promise);
  
                  util.toFastProperties(Promise);
                  util.toFastProperties(Promise.prototype);
                  function fillTypes(value) {
                      var p = new Promise(INTERNAL);
                      p._fulfillmentHandler0 = value;
                      p._rejectionHandler0 = value;
                      p._promise0 = value;
                      p._receiver0 = value;
                  }
                  // Complete slack tracking, opt out of field-type tracking and          
                  // stabilize map                                                        
                  fillTypes({ a: 1 });
                  fillTypes({ b: 2 });
                  fillTypes({ c: 3 });
                  fillTypes(1);
                  fillTypes(function () {});
                  fillTypes(undefined);
                  fillTypes(false);
                  fillTypes(new Promise(INTERNAL));
                  debug.setBounds(Async.firstLineError, util.lastLineError);
                  return Promise;
              };
          }, { "./any.js": 1, "./async": 2, "./bind": 3, "./call_get.js": 5, "./cancel": 6, "./catch_filter": 7, "./context": 8, "./debuggability": 9, "./direct_resolve": 10, "./each.js": 11, "./errors": 12, "./es5": 13, "./filter.js": 14, "./finally": 15, "./generators.js": 16, "./join": 17, "./map.js": 18, "./method": 19, "./nodeback": 20, "./nodeify.js": 21, "./promise_array": 23, "./promisify.js": 24, "./props.js": 25, "./race.js": 27, "./reduce.js": 28, "./settle.js": 30, "./some.js": 31, "./synchronous_inspection": 32, "./thenables": 33, "./timers.js": 34, "./using.js": 35, "./util": 36 }], 23: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection, Proxyable) {
                  var util = _dereq_("./util");
                  var isArray = util.isArray;
  
                  function toResolutionValue(val) {
                      switch (val) {
                          case -2:
                              return [];
                          case -3:
                              return {};
                      }
                  }
  
                  function PromiseArray(values) {
                      var promise = this._promise = new Promise(INTERNAL);
                      if (values instanceof Promise) {
                          promise._propagateFrom(values, 3);
                      }
                      promise._setOnCancel(this);
                      this._values = values;
                      this._length = 0;
                      this._totalResolved = 0;
                      this._init(undefined, -2);
                  }
                  util.inherits(PromiseArray, Proxyable);
  
                  PromiseArray.prototype.length = function () {
                      return this._length;
                  };
  
                  PromiseArray.prototype.promise = function () {
                      return this._promise;
                  };
  
                  PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
                      var values = tryConvertToPromise(this._values, this._promise);
                      if (values instanceof Promise) {
                          values = values._target();
                          var bitField = values._bitField;
                          ;
                          this._values = values;
  
                          if ((bitField & 50397184) === 0) {
                              this._promise._setAsyncGuaranteed();
                              return values._then(init, this._reject, undefined, this, resolveValueIfEmpty);
                          } else if ((bitField & 33554432) !== 0) {
                              values = values._value();
                          } else if ((bitField & 16777216) !== 0) {
                              return this._reject(values._reason());
                          } else {
                              return this._cancel();
                          }
                      }
                      values = util.asArray(values);
                      if (values === null) {
                          var err = apiRejection("expecting an array or an iterable object but got " + util.classString(values)).reason();
                          this._promise._rejectCallback(err, false);
                          return;
                      }
  
                      if (values.length === 0) {
                          if (resolveValueIfEmpty === -5) {
                              this._resolveEmptyArray();
                          } else {
                              this._resolve(toResolutionValue(resolveValueIfEmpty));
                          }
                          return;
                      }
                      this._iterate(values);
                  };
  
                  PromiseArray.prototype._iterate = function (values) {
                      var len = this.getActualLength(values.length);
                      this._length = len;
                      this._values = this.shouldCopyValues() ? new Array(len) : this._values;
                      var result = this._promise;
                      var isResolved = false;
                      var bitField = null;
                      for (var i = 0; i < len; ++i) {
                          var maybePromise = tryConvertToPromise(values[i], result);
  
                          if (maybePromise instanceof Promise) {
                              maybePromise = maybePromise._target();
                              bitField = maybePromise._bitField;
                          } else {
                              bitField = null;
                          }
  
                          if (isResolved) {
                              if (bitField !== null) {
                                  maybePromise.suppressUnhandledRejections();
                              }
                          } else if (bitField !== null) {
                              if ((bitField & 50397184) === 0) {
                                  maybePromise._proxy(this, i);
                                  this._values[i] = maybePromise;
                              } else if ((bitField & 33554432) !== 0) {
                                  isResolved = this._promiseFulfilled(maybePromise._value(), i);
                              } else if ((bitField & 16777216) !== 0) {
                                  isResolved = this._promiseRejected(maybePromise._reason(), i);
                              } else {
                                  isResolved = this._promiseCancelled(i);
                              }
                          } else {
                              isResolved = this._promiseFulfilled(maybePromise, i);
                          }
                      }
                      if (!isResolved) result._setAsyncGuaranteed();
                  };
  
                  PromiseArray.prototype._isResolved = function () {
                      return this._values === null;
                  };
  
                  PromiseArray.prototype._resolve = function (value) {
                      this._values = null;
                      this._promise._fulfill(value);
                  };
  
                  PromiseArray.prototype._cancel = function () {
                      if (this._isResolved() || !this._promise.isCancellable()) return;
                      this._values = null;
                      this._promise._cancel();
                  };
  
                  PromiseArray.prototype._reject = function (reason) {
                      this._values = null;
                      this._promise._rejectCallback(reason, false);
                  };
  
                  PromiseArray.prototype._promiseFulfilled = function (value, index) {
                      this._values[index] = value;
                      var totalResolved = ++this._totalResolved;
                      if (totalResolved >= this._length) {
                          this._resolve(this._values);
                          return true;
                      }
                      return false;
                  };
  
                  PromiseArray.prototype._promiseCancelled = function () {
                      this._cancel();
                      return true;
                  };
  
                  PromiseArray.prototype._promiseRejected = function (reason) {
                      this._totalResolved++;
                      this._reject(reason);
                      return true;
                  };
  
                  PromiseArray.prototype._resultCancelled = function () {
                      if (this._isResolved()) return;
                      var values = this._values;
                      this._cancel();
                      if (values instanceof Promise) {
                          values.cancel();
                      } else {
                          for (var i = 0; i < values.length; ++i) {
                              if (values[i] instanceof Promise) {
                                  values[i].cancel();
                              }
                          }
                      }
                  };
  
                  PromiseArray.prototype.shouldCopyValues = function () {
                      return true;
                  };
  
                  PromiseArray.prototype.getActualLength = function (len) {
                      return len;
                  };
  
                  return PromiseArray;
              };
          }, { "./util": 36 }], 24: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL) {
                  var THIS = {};
                  var util = _dereq_("./util");
                  var nodebackForPromise = _dereq_("./nodeback");
                  var withAppended = util.withAppended;
                  var maybeWrapAsError = util.maybeWrapAsError;
                  var canEvaluate = util.canEvaluate;
                  var TypeError = _dereq_("./errors").TypeError;
                  var defaultSuffix = "Async";
                  var defaultPromisified = { __isPromisified__: true };
                  var noCopyProps = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"];
                  var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");
  
                  var defaultFilter = function defaultFilter(name) {
                      return util.isIdentifier(name) && name.charAt(0) !== "_" && name !== "constructor";
                  };
  
                  function propsFilter(key) {
                      return !noCopyPropsPattern.test(key);
                  }
  
                  function isPromisified(fn) {
                      try {
                          return fn.__isPromisified__ === true;
                      } catch (e) {
                          return false;
                      }
                  }
  
                  function hasPromisified(obj, key, suffix) {
                      var val = util.getDataPropertyOrDefault(obj, key + suffix, defaultPromisified);
                      return val ? isPromisified(val) : false;
                  }
                  function checkValid(ret, suffix, suffixRegexp) {
                      for (var i = 0; i < ret.length; i += 2) {
                          var key = ret[i];
                          if (suffixRegexp.test(key)) {
                              var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
                              for (var j = 0; j < ret.length; j += 2) {
                                  if (ret[j] === keyWithoutAsyncSuffix) {
                                      throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", suffix));
                                  }
                              }
                          }
                      }
                  }
  
                  function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
                      var keys = util.inheritedDataKeys(obj);
                      var ret = [];
                      for (var i = 0; i < keys.length; ++i) {
                          var key = keys[i];
                          var value = obj[key];
                          var passesDefaultFilter = filter === defaultFilter ? true : defaultFilter(key, value, obj);
                          if (typeof value === "function" && !isPromisified(value) && !hasPromisified(obj, key, suffix) && filter(key, value, obj, passesDefaultFilter)) {
                              ret.push(key, value);
                          }
                      }
                      checkValid(ret, suffix, suffixRegexp);
                      return ret;
                  }
  
                  var escapeIdentRegex = function escapeIdentRegex(str) {
                      return str.replace(/([$])/, "\\$");
                  };
  
                  var makeNodePromisifiedEval;
                  if (!true) {
                      var switchCaseArgumentOrder = function switchCaseArgumentOrder(likelyArgumentCount) {
                          var ret = [likelyArgumentCount];
                          var min = Math.max(0, likelyArgumentCount - 1 - 3);
                          for (var i = likelyArgumentCount - 1; i >= min; --i) {
                              ret.push(i);
                          }
                          for (var i = likelyArgumentCount + 1; i <= 3; ++i) {
                              ret.push(i);
                          }
                          return ret;
                      };
  
                      var argumentSequence = function argumentSequence(argumentCount) {
                          return util.filledRange(argumentCount, "_arg", "");
                      };
  
                      var parameterDeclaration = function parameterDeclaration(parameterCount) {
                          return util.filledRange(Math.max(parameterCount, 3), "_arg", "");
                      };
  
                      var parameterCount = function parameterCount(fn) {
                          if (typeof fn.length === "number") {
                              return Math.max(Math.min(fn.length, 1023 + 1), 0);
                          }
                          return 0;
                      };
  
                      makeNodePromisifiedEval = function makeNodePromisifiedEval(callback, receiver, originalName, fn, _, multiArgs) {
                          var newParameterCount = Math.max(0, parameterCount(fn) - 1);
                          var argumentOrder = switchCaseArgumentOrder(newParameterCount);
                          var shouldProxyThis = typeof callback === "string" || receiver === THIS;
  
                          function generateCallForArgumentCount(count) {
                              var args = argumentSequence(count).join(", ");
                              var comma = count > 0 ? ", " : "";
                              var ret;
                              if (shouldProxyThis) {
                                  ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
                              } else {
                                  ret = receiver === undefined ? "ret = callback({{args}}, nodeback); break;\n" : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
                              }
                              return ret.replace("{{args}}", args).replace(", ", comma);
                          }
  
                          function generateArgumentSwitchCase() {
                              var ret = "";
                              for (var i = 0; i < argumentOrder.length; ++i) {
                                  ret += "case " + argumentOrder[i] + ":" + generateCallForArgumentCount(argumentOrder[i]);
                              }
  
                              ret += "                                                             \n\
          default:                                                             \n\
              var args = new Array(len + 1);                                   \n\
              var i = 0;                                                       \n\
              for (var i = 0; i < len; ++i) {                                  \n\
                 args[i] = arguments[i];                                       \n\
              }                                                                \n\
              args[i] = nodeback;                                              \n\
              [CodeForCall]                                                    \n\
              break;                                                           \n\
          ".replace("[CodeForCall]", shouldProxyThis ? "ret = callback.apply(this, args);\n" : "ret = callback.apply(receiver, args);\n");
                              return ret;
                          }
  
                          var getFunctionCode = typeof callback === "string" ? "this != null ? this['" + callback + "'] : fn" : "fn";
                          var body = "'use strict';                                                \n\
          var ret = function (Parameters) {                                    \n\
              'use strict';                                                    \n\
              var len = arguments.length;                                      \n\
              var promise = new Promise(INTERNAL);                             \n\
              promise._captureStackTrace();                                    \n\
              var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
              var ret;                                                         \n\
              var callback = tryCatch([GetFunctionCode]);                      \n\
              switch(len) {                                                    \n\
                  [CodeForSwitchCase]                                          \n\
              }                                                                \n\
              if (ret === errorObj) {                                          \n\
                  promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
              }                                                                \n\
              if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
              return promise;                                                  \n\
          };                                                                   \n\
          notEnumerableProp(ret, '__isPromisified__', true);                   \n\
          return ret;                                                          \n\
      ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase()).replace("[GetFunctionCode]", getFunctionCode);
                          body = body.replace("Parameters", parameterDeclaration(newParameterCount));
                          return new Function("Promise", "fn", "receiver", "withAppended", "maybeWrapAsError", "nodebackForPromise", "tryCatch", "errorObj", "notEnumerableProp", "INTERNAL", body)(Promise, fn, receiver, withAppended, maybeWrapAsError, nodebackForPromise, util.tryCatch, util.errorObj, util.notEnumerableProp, INTERNAL);
                      };
                  }
  
                  function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
                      var defaultThis = function () {
                          return this;
                      }();
                      var method = callback;
                      if (typeof method === "string") {
                          callback = fn;
                      }
                      function promisified() {
                          var _receiver = receiver;
                          if (receiver === THIS) _receiver = this;
                          var promise = new Promise(INTERNAL);
                          promise._captureStackTrace();
                          var cb = typeof method === "string" && this !== defaultThis ? this[method] : callback;
                          var fn = nodebackForPromise(promise, multiArgs);
                          try {
                              cb.apply(_receiver, withAppended(arguments, fn));
                          } catch (e) {
                              promise._rejectCallback(maybeWrapAsError(e), true, true);
                          }
                          if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
                          return promise;
                      }
                      util.notEnumerableProp(promisified, "__isPromisified__", true);
                      return promisified;
                  }
  
                  var makeNodePromisified = canEvaluate ? makeNodePromisifiedEval : makeNodePromisifiedClosure;
  
                  function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
                      var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
                      var methods = promisifiableMethods(obj, suffix, suffixRegexp, filter);
  
                      for (var i = 0, len = methods.length; i < len; i += 2) {
                          var key = methods[i];
                          var fn = methods[i + 1];
                          var promisifiedKey = key + suffix;
                          if (promisifier === makeNodePromisified) {
                              obj[promisifiedKey] = makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                          } else {
                              var promisified = promisifier(fn, function () {
                                  return makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
                              });
                              util.notEnumerableProp(promisified, "__isPromisified__", true);
                              obj[promisifiedKey] = promisified;
                          }
                      }
                      util.toFastProperties(obj);
                      return obj;
                  }
  
                  function promisify(callback, receiver, multiArgs) {
                      return makeNodePromisified(callback, receiver, undefined, callback, null, multiArgs);
                  }
  
                  Promise.promisify = function (fn, options) {
                      if (typeof fn !== "function") {
                          throw new TypeError("expecting a function but got " + util.classString(fn));
                      }
                      if (isPromisified(fn)) {
                          return fn;
                      }
                      options = Object(options);
                      var receiver = options.context === undefined ? THIS : options.context;
                      var multiArgs = !!options.multiArgs;
                      var ret = promisify(fn, receiver, multiArgs);
                      util.copyDescriptors(fn, ret, propsFilter);
                      return ret;
                  };
  
                  Promise.promisifyAll = function (target, options) {
                      if (typeof target !== "function" && (typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object") {
                          throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                      }
                      options = Object(options);
                      var multiArgs = !!options.multiArgs;
                      var suffix = options.suffix;
                      if (typeof suffix !== "string") suffix = defaultSuffix;
                      var filter = options.filter;
                      if (typeof filter !== "function") filter = defaultFilter;
                      var promisifier = options.promisifier;
                      if (typeof promisifier !== "function") promisifier = makeNodePromisified;
  
                      if (!util.isIdentifier(suffix)) {
                          throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                      }
  
                      var keys = util.inheritedDataKeys(target);
                      for (var i = 0; i < keys.length; ++i) {
                          var value = target[keys[i]];
                          if (keys[i] !== "constructor" && util.isClass(value)) {
                              promisifyAll(value.prototype, suffix, filter, promisifier, multiArgs);
                              promisifyAll(value, suffix, filter, promisifier, multiArgs);
                          }
                      }
  
                      return promisifyAll(target, suffix, filter, promisifier, multiArgs);
                  };
              };
          }, { "./errors": 12, "./nodeback": 20, "./util": 36 }], 25: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, PromiseArray, tryConvertToPromise, apiRejection) {
                  var util = _dereq_("./util");
                  var isObject = util.isObject;
                  var es5 = _dereq_("./es5");
                  var Es6Map;
                  if (typeof Map === "function") Es6Map = Map;
  
                  var mapToEntries = function () {
                      var index = 0;
                      var size = 0;
  
                      function extractEntry(value, key) {
                          this[index] = value;
                          this[index + size] = key;
                          index++;
                      }
  
                      return function mapToEntries(map) {
                          size = map.size;
                          index = 0;
                          var ret = new Array(map.size * 2);
                          map.forEach(extractEntry, ret);
                          return ret;
                      };
                  }();
  
                  var entriesToMap = function entriesToMap(entries) {
                      var ret = new Es6Map();
                      var length = entries.length / 2 | 0;
                      for (var i = 0; i < length; ++i) {
                          var key = entries[length + i];
                          var value = entries[i];
                          ret.set(key, value);
                      }
                      return ret;
                  };
  
                  function PropertiesPromiseArray(obj) {
                      var isMap = false;
                      var entries;
                      if (Es6Map !== undefined && obj instanceof Es6Map) {
                          entries = mapToEntries(obj);
                          isMap = true;
                      } else {
                          var keys = es5.keys(obj);
                          var len = keys.length;
                          entries = new Array(len * 2);
                          for (var i = 0; i < len; ++i) {
                              var key = keys[i];
                              entries[i] = obj[key];
                              entries[i + len] = key;
                          }
                      }
                      this.constructor$(entries);
                      this._isMap = isMap;
                      this._init$(undefined, -3);
                  }
                  util.inherits(PropertiesPromiseArray, PromiseArray);
  
                  PropertiesPromiseArray.prototype._init = function () {};
  
                  PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
                      this._values[index] = value;
                      var totalResolved = ++this._totalResolved;
                      if (totalResolved >= this._length) {
                          var val;
                          if (this._isMap) {
                              val = entriesToMap(this._values);
                          } else {
                              val = {};
                              var keyOffset = this.length();
                              for (var i = 0, len = this.length(); i < len; ++i) {
                                  val[this._values[i + keyOffset]] = this._values[i];
                              }
                          }
                          this._resolve(val);
                          return true;
                      }
                      return false;
                  };
  
                  PropertiesPromiseArray.prototype.shouldCopyValues = function () {
                      return false;
                  };
  
                  PropertiesPromiseArray.prototype.getActualLength = function (len) {
                      return len >> 1;
                  };
  
                  function props(promises) {
                      var ret;
                      var castValue = tryConvertToPromise(promises);
  
                      if (!isObject(castValue)) {
                          return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
                      } else if (castValue instanceof Promise) {
                          ret = castValue._then(Promise.props, undefined, undefined, undefined, undefined);
                      } else {
                          ret = new PropertiesPromiseArray(castValue).promise();
                      }
  
                      if (castValue instanceof Promise) {
                          ret._propagateFrom(castValue, 2);
                      }
                      return ret;
                  }
  
                  Promise.prototype.props = function () {
                      return props(this);
                  };
  
                  Promise.props = function (promises) {
                      return props(promises);
                  };
              };
          }, { "./es5": 13, "./util": 36 }], 26: [function (_dereq_, module, exports) {
              "use strict";
  
              function arrayMove(src, srcIndex, dst, dstIndex, len) {
                  for (var j = 0; j < len; ++j) {
                      dst[j + dstIndex] = src[j + srcIndex];
                      src[j + srcIndex] = void 0;
                  }
              }
  
              function Queue(capacity) {
                  this._capacity = capacity;
                  this._length = 0;
                  this._front = 0;
              }
  
              Queue.prototype._willBeOverCapacity = function (size) {
                  return this._capacity < size;
              };
  
              Queue.prototype._pushOne = function (arg) {
                  var length = this.length();
                  this._checkCapacity(length + 1);
                  var i = this._front + length & this._capacity - 1;
                  this[i] = arg;
                  this._length = length + 1;
              };
  
              Queue.prototype._unshiftOne = function (value) {
                  var capacity = this._capacity;
                  this._checkCapacity(this.length() + 1);
                  var front = this._front;
                  var i = (front - 1 & capacity - 1 ^ capacity) - capacity;
                  this[i] = value;
                  this._front = i;
                  this._length = this.length() + 1;
              };
  
              Queue.prototype.unshift = function (fn, receiver, arg) {
                  this._unshiftOne(arg);
                  this._unshiftOne(receiver);
                  this._unshiftOne(fn);
              };
  
              Queue.prototype.push = function (fn, receiver, arg) {
                  var length = this.length() + 3;
                  if (this._willBeOverCapacity(length)) {
                      this._pushOne(fn);
                      this._pushOne(receiver);
                      this._pushOne(arg);
                      return;
                  }
                  var j = this._front + length - 3;
                  this._checkCapacity(length);
                  var wrapMask = this._capacity - 1;
                  this[j + 0 & wrapMask] = fn;
                  this[j + 1 & wrapMask] = receiver;
                  this[j + 2 & wrapMask] = arg;
                  this._length = length;
              };
  
              Queue.prototype.shift = function () {
                  var front = this._front,
                      ret = this[front];
  
                  this[front] = undefined;
                  this._front = front + 1 & this._capacity - 1;
                  this._length--;
                  return ret;
              };
  
              Queue.prototype.length = function () {
                  return this._length;
              };
  
              Queue.prototype._checkCapacity = function (size) {
                  if (this._capacity < size) {
                      this._resizeTo(this._capacity << 1);
                  }
              };
  
              Queue.prototype._resizeTo = function (capacity) {
                  var oldCapacity = this._capacity;
                  this._capacity = capacity;
                  var front = this._front;
                  var length = this._length;
                  var moveItemsCount = front + length & oldCapacity - 1;
                  arrayMove(this, 0, this, oldCapacity, moveItemsCount);
              };
  
              module.exports = Queue;
          }, {}], 27: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL, tryConvertToPromise, apiRejection) {
                  var util = _dereq_("./util");
  
                  var raceLater = function raceLater(promise) {
                      return promise.then(function (array) {
                          return race(array, promise);
                      });
                  };
  
                  function race(promises, parent) {
                      var maybePromise = tryConvertToPromise(promises);
  
                      if (maybePromise instanceof Promise) {
                          return raceLater(maybePromise);
                      } else {
                          promises = util.asArray(promises);
                          if (promises === null) return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
                      }
  
                      var ret = new Promise(INTERNAL);
                      if (parent !== undefined) {
                          ret._propagateFrom(parent, 3);
                      }
                      var fulfill = ret._fulfill;
                      var reject = ret._reject;
                      for (var i = 0, len = promises.length; i < len; ++i) {
                          var val = promises[i];
  
                          if (val === undefined && !(i in promises)) {
                              continue;
                          }
  
                          Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
                      }
                      return ret;
                  }
  
                  Promise.race = function (promises) {
                      return race(promises, undefined);
                  };
  
                  Promise.prototype.race = function () {
                      return race(this, undefined);
                  };
              };
          }, { "./util": 36 }], 28: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug) {
                  var getDomain = Promise._getDomain;
                  var util = _dereq_("./util");
                  var tryCatch = util.tryCatch;
  
                  function ReductionPromiseArray(promises, fn, initialValue, _each) {
                      this.constructor$(promises);
                      var domain = getDomain();
                      this._fn = domain === null ? fn : domain.bind(fn);
                      if (initialValue !== undefined) {
                          initialValue = Promise.resolve(initialValue);
                          initialValue._attachCancellationCallback(this);
                      }
                      this._initialValue = initialValue;
                      this._currentCancellable = null;
                      this._eachValues = _each === INTERNAL ? [] : undefined;
                      this._promise._captureStackTrace();
                      this._init$(undefined, -5);
                  }
                  util.inherits(ReductionPromiseArray, PromiseArray);
  
                  ReductionPromiseArray.prototype._gotAccum = function (accum) {
                      if (this._eachValues !== undefined && accum !== INTERNAL) {
                          this._eachValues.push(accum);
                      }
                  };
  
                  ReductionPromiseArray.prototype._eachComplete = function (value) {
                      this._eachValues.push(value);
                      return this._eachValues;
                  };
  
                  ReductionPromiseArray.prototype._init = function () {};
  
                  ReductionPromiseArray.prototype._resolveEmptyArray = function () {
                      this._resolve(this._eachValues !== undefined ? this._eachValues : this._initialValue);
                  };
  
                  ReductionPromiseArray.prototype.shouldCopyValues = function () {
                      return false;
                  };
  
                  ReductionPromiseArray.prototype._resolve = function (value) {
                      this._promise._resolveCallback(value);
                      this._values = null;
                  };
  
                  ReductionPromiseArray.prototype._resultCancelled = function (sender) {
                      if (sender === this._initialValue) return this._cancel();
                      if (this._isResolved()) return;
                      this._resultCancelled$();
                      if (this._currentCancellable instanceof Promise) {
                          this._currentCancellable.cancel();
                      }
                      if (this._initialValue instanceof Promise) {
                          this._initialValue.cancel();
                      }
                  };
  
                  ReductionPromiseArray.prototype._iterate = function (values) {
                      this._values = values;
                      var value;
                      var i;
                      var length = values.length;
                      if (this._initialValue !== undefined) {
                          value = this._initialValue;
                          i = 0;
                      } else {
                          value = Promise.resolve(values[0]);
                          i = 1;
                      }
  
                      this._currentCancellable = value;
  
                      if (!value.isRejected()) {
                          for (; i < length; ++i) {
                              var ctx = {
                                  accum: null,
                                  value: values[i],
                                  index: i,
                                  length: length,
                                  array: this
                              };
                              value = value._then(gotAccum, undefined, undefined, ctx, undefined);
                          }
                      }
  
                      if (this._eachValues !== undefined) {
                          value = value._then(this._eachComplete, undefined, undefined, this, undefined);
                      }
                      value._then(completed, completed, undefined, value, this);
                  };
  
                  Promise.prototype.reduce = function (fn, initialValue) {
                      return reduce(this, fn, initialValue, null);
                  };
  
                  Promise.reduce = function (promises, fn, initialValue, _each) {
                      return reduce(promises, fn, initialValue, _each);
                  };
  
                  function completed(valueOrReason, array) {
                      if (this.isFulfilled()) {
                          array._resolve(valueOrReason);
                      } else {
                          array._reject(valueOrReason);
                      }
                  }
  
                  function reduce(promises, fn, initialValue, _each) {
                      if (typeof fn !== "function") {
                          return apiRejection("expecting a function but got " + util.classString(fn));
                      }
                      var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
                      return array.promise();
                  }
  
                  function gotAccum(accum) {
                      this.accum = accum;
                      this.array._gotAccum(accum);
                      var value = tryConvertToPromise(this.value, this.array._promise);
                      if (value instanceof Promise) {
                          this.array._currentCancellable = value;
                          return value._then(gotValue, undefined, undefined, this, undefined);
                      } else {
                          return gotValue.call(this, value);
                      }
                  }
  
                  function gotValue(value) {
                      var array = this.array;
                      var promise = array._promise;
                      var fn = tryCatch(array._fn);
                      promise._pushContext();
                      var ret;
                      if (array._eachValues !== undefined) {
                          ret = fn.call(promise._boundValue(), value, this.index, this.length);
                      } else {
                          ret = fn.call(promise._boundValue(), this.accum, value, this.index, this.length);
                      }
                      if (ret instanceof Promise) {
                          array._currentCancellable = ret;
                      }
                      var promiseCreated = promise._popContext();
                      debug.checkForgottenReturns(ret, promiseCreated, array._eachValues !== undefined ? "Promise.each" : "Promise.reduce", promise);
                      return ret;
                  }
              };
          }, { "./util": 36 }], 29: [function (_dereq_, module, exports) {
              "use strict";
  
              var util = _dereq_("./util");
              var schedule;
              var noAsyncScheduler = function noAsyncScheduler() {
                  throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
              };
              var NativePromise = util.getNativePromise();
              if (util.isNode && typeof MutationObserver === "undefined") {
                  var GlobalSetImmediate = global.setImmediate;
                  var ProcessNextTick = process.nextTick;
                  schedule = util.isRecentNode ? function (fn) {
                      GlobalSetImmediate.call(global, fn);
                  } : function (fn) {
                      ProcessNextTick.call(process, fn);
                  };
              } else if (typeof NativePromise === "function") {
                  var nativePromise = NativePromise.resolve();
                  schedule = function schedule(fn) {
                      nativePromise.then(fn);
                  };
              } else if (typeof MutationObserver !== "undefined" && !(typeof window !== "undefined" && window.navigator && window.navigator.standalone)) {
                  schedule = function () {
                      var div = document.createElement("div");
                      var opts = { attributes: true };
                      var toggleScheduled = false;
                      var div2 = document.createElement("div");
                      var o2 = new MutationObserver(function () {
                          div.classList.toggle("foo");
                          toggleScheduled = false;
                      });
                      o2.observe(div2, opts);
  
                      var scheduleToggle = function scheduleToggle() {
                          if (toggleScheduled) return;
                          toggleScheduled = true;
                          div2.classList.toggle("foo");
                      };
  
                      return function schedule(fn) {
                          var o = new MutationObserver(function () {
                              o.disconnect();
                              fn();
                          });
                          o.observe(div, opts);
                          scheduleToggle();
                      };
                  }();
              } else if (typeof setImmediate !== "undefined") {
                  schedule = function schedule(fn) {
                      setImmediate(fn);
                  };
              } else if (typeof setTimeout !== "undefined") {
                  schedule = function schedule(fn) {
                      setTimeout(fn, 0);
                  };
              } else {
                  schedule = noAsyncScheduler;
              }
              module.exports = schedule;
          }, { "./util": 36 }], 30: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, PromiseArray, debug) {
                  var PromiseInspection = Promise.PromiseInspection;
                  var util = _dereq_("./util");
  
                  function SettledPromiseArray(values) {
                      this.constructor$(values);
                  }
                  util.inherits(SettledPromiseArray, PromiseArray);
  
                  SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
                      this._values[index] = inspection;
                      var totalResolved = ++this._totalResolved;
                      if (totalResolved >= this._length) {
                          this._resolve(this._values);
                          return true;
                      }
                      return false;
                  };
  
                  SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
                      var ret = new PromiseInspection();
                      ret._bitField = 33554432;
                      ret._settledValueField = value;
                      return this._promiseResolved(index, ret);
                  };
                  SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
                      var ret = new PromiseInspection();
                      ret._bitField = 16777216;
                      ret._settledValueField = reason;
                      return this._promiseResolved(index, ret);
                  };
  
                  Promise.settle = function (promises) {
                      debug.deprecated(".settle()", ".reflect()");
                      return new SettledPromiseArray(promises).promise();
                  };
  
                  Promise.prototype.settle = function () {
                      return Promise.settle(this);
                  };
              };
          }, { "./util": 36 }], 31: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, PromiseArray, apiRejection) {
                  var util = _dereq_("./util");
                  var RangeError = _dereq_("./errors").RangeError;
                  var AggregateError = _dereq_("./errors").AggregateError;
                  var isArray = util.isArray;
                  var CANCELLATION = {};
  
                  function SomePromiseArray(values) {
                      this.constructor$(values);
                      this._howMany = 0;
                      this._unwrap = false;
                      this._initialized = false;
                  }
                  util.inherits(SomePromiseArray, PromiseArray);
  
                  SomePromiseArray.prototype._init = function () {
                      if (!this._initialized) {
                          return;
                      }
                      if (this._howMany === 0) {
                          this._resolve([]);
                          return;
                      }
                      this._init$(undefined, -5);
                      var isArrayResolved = isArray(this._values);
                      if (!this._isResolved() && isArrayResolved && this._howMany > this._canPossiblyFulfill()) {
                          this._reject(this._getRangeError(this.length()));
                      }
                  };
  
                  SomePromiseArray.prototype.init = function () {
                      this._initialized = true;
                      this._init();
                  };
  
                  SomePromiseArray.prototype.setUnwrap = function () {
                      this._unwrap = true;
                  };
  
                  SomePromiseArray.prototype.howMany = function () {
                      return this._howMany;
                  };
  
                  SomePromiseArray.prototype.setHowMany = function (count) {
                      this._howMany = count;
                  };
  
                  SomePromiseArray.prototype._promiseFulfilled = function (value) {
                      this._addFulfilled(value);
                      if (this._fulfilled() === this.howMany()) {
                          this._values.length = this.howMany();
                          if (this.howMany() === 1 && this._unwrap) {
                              this._resolve(this._values[0]);
                          } else {
                              this._resolve(this._values);
                          }
                          return true;
                      }
                      return false;
                  };
                  SomePromiseArray.prototype._promiseRejected = function (reason) {
                      this._addRejected(reason);
                      return this._checkOutcome();
                  };
  
                  SomePromiseArray.prototype._promiseCancelled = function () {
                      if (this._values instanceof Promise || this._values == null) {
                          return this._cancel();
                      }
                      this._addRejected(CANCELLATION);
                      return this._checkOutcome();
                  };
  
                  SomePromiseArray.prototype._checkOutcome = function () {
                      if (this.howMany() > this._canPossiblyFulfill()) {
                          var e = new AggregateError();
                          for (var i = this.length(); i < this._values.length; ++i) {
                              if (this._values[i] !== CANCELLATION) {
                                  e.push(this._values[i]);
                              }
                          }
                          if (e.length > 0) {
                              this._reject(e);
                          } else {
                              this._cancel();
                          }
                          return true;
                      }
                      return false;
                  };
  
                  SomePromiseArray.prototype._fulfilled = function () {
                      return this._totalResolved;
                  };
  
                  SomePromiseArray.prototype._rejected = function () {
                      return this._values.length - this.length();
                  };
  
                  SomePromiseArray.prototype._addRejected = function (reason) {
                      this._values.push(reason);
                  };
  
                  SomePromiseArray.prototype._addFulfilled = function (value) {
                      this._values[this._totalResolved++] = value;
                  };
  
                  SomePromiseArray.prototype._canPossiblyFulfill = function () {
                      return this.length() - this._rejected();
                  };
  
                  SomePromiseArray.prototype._getRangeError = function (count) {
                      var message = "Input array must contain at least " + this._howMany + " items but contains only " + count + " items";
                      return new RangeError(message);
                  };
  
                  SomePromiseArray.prototype._resolveEmptyArray = function () {
                      this._reject(this._getRangeError(0));
                  };
  
                  function some(promises, howMany) {
                      if ((howMany | 0) !== howMany || howMany < 0) {
                          return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
                      }
                      var ret = new SomePromiseArray(promises);
                      var promise = ret.promise();
                      ret.setHowMany(howMany);
                      ret.init();
                      return promise;
                  }
  
                  Promise.some = function (promises, howMany) {
                      return some(promises, howMany);
                  };
  
                  Promise.prototype.some = function (howMany) {
                      return some(this, howMany);
                  };
  
                  Promise._SomePromiseArray = SomePromiseArray;
              };
          }, { "./errors": 12, "./util": 36 }], 32: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise) {
                  function PromiseInspection(promise) {
                      if (promise !== undefined) {
                          promise = promise._target();
                          this._bitField = promise._bitField;
                          this._settledValueField = promise._isFateSealed() ? promise._settledValue() : undefined;
                      } else {
                          this._bitField = 0;
                          this._settledValueField = undefined;
                      }
                  }
  
                  PromiseInspection.prototype._settledValue = function () {
                      return this._settledValueField;
                  };
  
                  var value = PromiseInspection.prototype.value = function () {
                      if (!this.isFulfilled()) {
                          throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                      }
                      return this._settledValue();
                  };
  
                  var reason = PromiseInspection.prototype.error = PromiseInspection.prototype.reason = function () {
                      if (!this.isRejected()) {
                          throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                      }
                      return this._settledValue();
                  };
  
                  var isFulfilled = PromiseInspection.prototype.isFulfilled = function () {
                      return (this._bitField & 33554432) !== 0;
                  };
  
                  var isRejected = PromiseInspection.prototype.isRejected = function () {
                      return (this._bitField & 16777216) !== 0;
                  };
  
                  var isPending = PromiseInspection.prototype.isPending = function () {
                      return (this._bitField & 50397184) === 0;
                  };
  
                  var isResolved = PromiseInspection.prototype.isResolved = function () {
                      return (this._bitField & 50331648) !== 0;
                  };
  
                  PromiseInspection.prototype.isCancelled = Promise.prototype._isCancelled = function () {
                      return (this._bitField & 65536) === 65536;
                  };
  
                  Promise.prototype.isCancelled = function () {
                      return this._target()._isCancelled();
                  };
  
                  Promise.prototype.isPending = function () {
                      return isPending.call(this._target());
                  };
  
                  Promise.prototype.isRejected = function () {
                      return isRejected.call(this._target());
                  };
  
                  Promise.prototype.isFulfilled = function () {
                      return isFulfilled.call(this._target());
                  };
  
                  Promise.prototype.isResolved = function () {
                      return isResolved.call(this._target());
                  };
  
                  Promise.prototype.value = function () {
                      return value.call(this._target());
                  };
  
                  Promise.prototype.reason = function () {
                      var target = this._target();
                      target._unsetRejectionIsUnhandled();
                      return reason.call(target);
                  };
  
                  Promise.prototype._value = function () {
                      return this._settledValue();
                  };
  
                  Promise.prototype._reason = function () {
                      this._unsetRejectionIsUnhandled();
                      return this._settledValue();
                  };
  
                  Promise.PromiseInspection = PromiseInspection;
              };
          }, {}], 33: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL) {
                  var util = _dereq_("./util");
                  var errorObj = util.errorObj;
                  var isObject = util.isObject;
  
                  function tryConvertToPromise(obj, context) {
                      if (isObject(obj)) {
                          if (obj instanceof Promise) return obj;
                          var then = getThen(obj);
                          if (then === errorObj) {
                              if (context) context._pushContext();
                              var ret = Promise.reject(then.e);
                              if (context) context._popContext();
                              return ret;
                          } else if (typeof then === "function") {
                              if (isAnyBluebirdPromise(obj)) {
                                  var ret = new Promise(INTERNAL);
                                  obj._then(ret._fulfill, ret._reject, undefined, ret, null);
                                  return ret;
                              }
                              return doThenable(obj, then, context);
                          }
                      }
                      return obj;
                  }
  
                  function doGetThen(obj) {
                      return obj.then;
                  }
  
                  function getThen(obj) {
                      try {
                          return doGetThen(obj);
                      } catch (e) {
                          errorObj.e = e;
                          return errorObj;
                      }
                  }
  
                  var hasProp = {}.hasOwnProperty;
                  function isAnyBluebirdPromise(obj) {
                      try {
                          return hasProp.call(obj, "_promise0");
                      } catch (e) {
                          return false;
                      }
                  }
  
                  function doThenable(x, then, context) {
                      var promise = new Promise(INTERNAL);
                      var ret = promise;
                      if (context) context._pushContext();
                      promise._captureStackTrace();
                      if (context) context._popContext();
                      var synchronous = true;
                      var result = util.tryCatch(then).call(x, resolve, reject);
                      synchronous = false;
  
                      if (promise && result === errorObj) {
                          promise._rejectCallback(result.e, true, true);
                          promise = null;
                      }
  
                      function resolve(value) {
                          if (!promise) return;
                          promise._resolveCallback(value);
                          promise = null;
                      }
  
                      function reject(reason) {
                          if (!promise) return;
                          promise._rejectCallback(reason, synchronous, true);
                          promise = null;
                      }
                      return ret;
                  }
  
                  return tryConvertToPromise;
              };
          }, { "./util": 36 }], 34: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, INTERNAL, debug) {
                  var util = _dereq_("./util");
                  var TimeoutError = Promise.TimeoutError;
  
                  function HandleWrapper(handle) {
                      this.handle = handle;
                  }
  
                  HandleWrapper.prototype._resultCancelled = function () {
                      clearTimeout(this.handle);
                  };
  
                  var afterValue = function afterValue(value) {
                      return delay(+this).thenReturn(value);
                  };
                  var delay = Promise.delay = function (ms, value) {
                      var ret;
                      var handle;
                      if (value !== undefined) {
                          ret = Promise.resolve(value)._then(afterValue, null, null, ms, undefined);
                          if (debug.cancellation() && value instanceof Promise) {
                              ret._setOnCancel(value);
                          }
                      } else {
                          ret = new Promise(INTERNAL);
                          handle = setTimeout(function () {
                              ret._fulfill();
                          }, +ms);
                          if (debug.cancellation()) {
                              ret._setOnCancel(new HandleWrapper(handle));
                          }
                      }
                      ret._setAsyncGuaranteed();
                      return ret;
                  };
  
                  Promise.prototype.delay = function (ms) {
                      return delay(ms, this);
                  };
  
                  var afterTimeout = function afterTimeout(promise, message, parent) {
                      var err;
                      if (typeof message !== "string") {
                          if (message instanceof Error) {
                              err = message;
                          } else {
                              err = new TimeoutError("operation timed out");
                          }
                      } else {
                          err = new TimeoutError(message);
                      }
                      util.markAsOriginatingFromRejection(err);
                      promise._attachExtraTrace(err);
                      promise._reject(err);
  
                      if (parent != null) {
                          parent.cancel();
                      }
                  };
  
                  function successClear(value) {
                      clearTimeout(this.handle);
                      return value;
                  }
  
                  function failureClear(reason) {
                      clearTimeout(this.handle);
                      throw reason;
                  }
  
                  Promise.prototype.timeout = function (ms, message) {
                      ms = +ms;
                      var ret, parent;
  
                      var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
                          if (ret.isPending()) {
                              afterTimeout(ret, message, parent);
                          }
                      }, ms));
  
                      if (debug.cancellation()) {
                          parent = this.then();
                          ret = parent._then(successClear, failureClear, undefined, handleWrapper, undefined);
                          ret._setOnCancel(handleWrapper);
                      } else {
                          ret = this._then(successClear, failureClear, undefined, handleWrapper, undefined);
                      }
  
                      return ret;
                  };
              };
          }, { "./util": 36 }], 35: [function (_dereq_, module, exports) {
              "use strict";
  
              module.exports = function (Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug) {
                  var util = _dereq_("./util");
                  var TypeError = _dereq_("./errors").TypeError;
                  var inherits = _dereq_("./util").inherits;
                  var errorObj = util.errorObj;
                  var tryCatch = util.tryCatch;
                  var NULL = {};
  
                  function thrower(e) {
                      setTimeout(function () {
                          throw e;
                      }, 0);
                  }
  
                  function castPreservingDisposable(thenable) {
                      var maybePromise = tryConvertToPromise(thenable);
                      if (maybePromise !== thenable && typeof thenable._isDisposable === "function" && typeof thenable._getDisposer === "function" && thenable._isDisposable()) {
                          maybePromise._setDisposable(thenable._getDisposer());
                      }
                      return maybePromise;
                  }
                  function dispose(resources, inspection) {
                      var i = 0;
                      var len = resources.length;
                      var ret = new Promise(INTERNAL);
                      function iterator() {
                          if (i >= len) return ret._fulfill();
                          var maybePromise = castPreservingDisposable(resources[i++]);
                          if (maybePromise instanceof Promise && maybePromise._isDisposable()) {
                              try {
                                  maybePromise = tryConvertToPromise(maybePromise._getDisposer().tryDispose(inspection), resources.promise);
                              } catch (e) {
                                  return thrower(e);
                              }
                              if (maybePromise instanceof Promise) {
                                  return maybePromise._then(iterator, thrower, null, null, null);
                              }
                          }
                          iterator();
                      }
                      iterator();
                      return ret;
                  }
  
                  function Disposer(data, promise, context) {
                      this._data = data;
                      this._promise = promise;
                      this._context = context;
                  }
  
                  Disposer.prototype.data = function () {
                      return this._data;
                  };
  
                  Disposer.prototype.promise = function () {
                      return this._promise;
                  };
  
                  Disposer.prototype.resource = function () {
                      if (this.promise().isFulfilled()) {
                          return this.promise().value();
                      }
                      return NULL;
                  };
  
                  Disposer.prototype.tryDispose = function (inspection) {
                      var resource = this.resource();
                      var context = this._context;
                      if (context !== undefined) context._pushContext();
                      var ret = resource !== NULL ? this.doDispose(resource, inspection) : null;
                      if (context !== undefined) context._popContext();
                      this._promise._unsetDisposable();
                      this._data = null;
                      return ret;
                  };
  
                  Disposer.isDisposer = function (d) {
                      return d != null && typeof d.resource === "function" && typeof d.tryDispose === "function";
                  };
  
                  function FunctionDisposer(fn, promise, context) {
                      this.constructor$(fn, promise, context);
                  }
                  inherits(FunctionDisposer, Disposer);
  
                  FunctionDisposer.prototype.doDispose = function (resource, inspection) {
                      var fn = this.data();
                      return fn.call(resource, resource, inspection);
                  };
  
                  function maybeUnwrapDisposer(value) {
                      if (Disposer.isDisposer(value)) {
                          this.resources[this.index]._setDisposable(value);
                          return value.promise();
                      }
                      return value;
                  }
  
                  function ResourceList(length) {
                      this.length = length;
                      this.promise = null;
                      this[length - 1] = null;
                  }
  
                  ResourceList.prototype._resultCancelled = function () {
                      var len = this.length;
                      for (var i = 0; i < len; ++i) {
                          var item = this[i];
                          if (item instanceof Promise) {
                              item.cancel();
                          }
                      }
                  };
  
                  Promise.using = function () {
                      var len = arguments.length;
                      if (len < 2) return apiRejection("you must pass at least 2 arguments to Promise.using");
                      var fn = arguments[len - 1];
                      if (typeof fn !== "function") {
                          return apiRejection("expecting a function but got " + util.classString(fn));
                      }
                      var input;
                      var spreadArgs = true;
                      if (len === 2 && Array.isArray(arguments[0])) {
                          input = arguments[0];
                          len = input.length;
                          spreadArgs = false;
                      } else {
                          input = arguments;
                          len--;
                      }
                      var resources = new ResourceList(len);
                      for (var i = 0; i < len; ++i) {
                          var resource = input[i];
                          if (Disposer.isDisposer(resource)) {
                              var disposer = resource;
                              resource = resource.promise();
                              resource._setDisposable(disposer);
                          } else {
                              var maybePromise = tryConvertToPromise(resource);
                              if (maybePromise instanceof Promise) {
                                  resource = maybePromise._then(maybeUnwrapDisposer, null, null, {
                                      resources: resources,
                                      index: i
                                  }, undefined);
                              }
                          }
                          resources[i] = resource;
                      }
  
                      var reflectedResources = new Array(resources.length);
                      for (var i = 0; i < reflectedResources.length; ++i) {
                          reflectedResources[i] = Promise.resolve(resources[i]).reflect();
                      }
  
                      var resultPromise = Promise.all(reflectedResources).then(function (inspections) {
                          for (var i = 0; i < inspections.length; ++i) {
                              var inspection = inspections[i];
                              if (inspection.isRejected()) {
                                  errorObj.e = inspection.error();
                                  return errorObj;
                              } else if (!inspection.isFulfilled()) {
                                  resultPromise.cancel();
                                  return;
                              }
                              inspections[i] = inspection.value();
                          }
                          promise._pushContext();
  
                          fn = tryCatch(fn);
                          var ret = spreadArgs ? fn.apply(undefined, inspections) : fn(inspections);
                          var promiseCreated = promise._popContext();
                          debug.checkForgottenReturns(ret, promiseCreated, "Promise.using", promise);
                          return ret;
                      });
  
                      var promise = resultPromise.lastly(function () {
                          var inspection = new Promise.PromiseInspection(resultPromise);
                          return dispose(resources, inspection);
                      });
                      resources.promise = promise;
                      promise._setOnCancel(resources);
                      return promise;
                  };
  
                  Promise.prototype._setDisposable = function (disposer) {
                      this._bitField = this._bitField | 131072;
                      this._disposer = disposer;
                  };
  
                  Promise.prototype._isDisposable = function () {
                      return (this._bitField & 131072) > 0;
                  };
  
                  Promise.prototype._getDisposer = function () {
                      return this._disposer;
                  };
  
                  Promise.prototype._unsetDisposable = function () {
                      this._bitField = this._bitField & ~131072;
                      this._disposer = undefined;
                  };
  
                  Promise.prototype.disposer = function (fn) {
                      if (typeof fn === "function") {
                          return new FunctionDisposer(fn, this, createContext());
                      }
                      throw new TypeError();
                  };
              };
          }, { "./errors": 12, "./util": 36 }], 36: [function (_dereq_, module, exports) {
              "use strict";
  
              var es5 = _dereq_("./es5");
              var canEvaluate = typeof navigator == "undefined";
  
              var errorObj = { e: {} };
              var tryCatchTarget;
              var globalObject = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this !== undefined ? this : null;
  
              function tryCatcher() {
                  try {
                      var target = tryCatchTarget;
                      tryCatchTarget = null;
                      return target.apply(this, arguments);
                  } catch (e) {
                      errorObj.e = e;
                      return errorObj;
                  }
              }
              function tryCatch(fn) {
                  tryCatchTarget = fn;
                  return tryCatcher;
              }
  
              var inherits = function inherits(Child, Parent) {
                  var hasProp = {}.hasOwnProperty;
  
                  function T() {
                      this.constructor = Child;
                      this.constructor$ = Parent;
                      for (var propertyName in Parent.prototype) {
                          if (hasProp.call(Parent.prototype, propertyName) && propertyName.charAt(propertyName.length - 1) !== "$") {
                              this[propertyName + "$"] = Parent.prototype[propertyName];
                          }
                      }
                  }
                  T.prototype = Parent.prototype;
                  Child.prototype = new T();
                  return Child.prototype;
              };
  
              function isPrimitive(val) {
                  return val == null || val === true || val === false || typeof val === "string" || typeof val === "number";
              }
  
              function isObject(value) {
                  return typeof value === "function" || (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null;
              }
  
              function maybeWrapAsError(maybeError) {
                  if (!isPrimitive(maybeError)) return maybeError;
  
                  return new Error(safeToString(maybeError));
              }
  
              function withAppended(target, appendee) {
                  var len = target.length;
                  var ret = new Array(len + 1);
                  var i;
                  for (i = 0; i < len; ++i) {
                      ret[i] = target[i];
                  }
                  ret[i] = appendee;
                  return ret;
              }
  
              function getDataPropertyOrDefault(obj, key, defaultValue) {
                  if (es5.isES5) {
                      var desc = Object.getOwnPropertyDescriptor(obj, key);
  
                      if (desc != null) {
                          return desc.get == null && desc.set == null ? desc.value : defaultValue;
                      }
                  } else {
                      return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
                  }
              }
  
              function notEnumerableProp(obj, name, value) {
                  if (isPrimitive(obj)) return obj;
                  var descriptor = {
                      value: value,
                      configurable: true,
                      enumerable: false,
                      writable: true
                  };
                  es5.defineProperty(obj, name, descriptor);
                  return obj;
              }
  
              function thrower(r) {
                  throw r;
              }
  
              var inheritedDataKeys = function () {
                  var excludedPrototypes = [Array.prototype, Object.prototype, Function.prototype];
  
                  var isExcludedProto = function isExcludedProto(val) {
                      for (var i = 0; i < excludedPrototypes.length; ++i) {
                          if (excludedPrototypes[i] === val) {
                              return true;
                          }
                      }
                      return false;
                  };
  
                  if (es5.isES5) {
                      var getKeys = Object.getOwnPropertyNames;
                      return function (obj) {
                          var ret = [];
                          var visitedKeys = Object.create(null);
                          while (obj != null && !isExcludedProto(obj)) {
                              var keys;
                              try {
                                  keys = getKeys(obj);
                              } catch (e) {
                                  return ret;
                              }
                              for (var i = 0; i < keys.length; ++i) {
                                  var key = keys[i];
                                  if (visitedKeys[key]) continue;
                                  visitedKeys[key] = true;
                                  var desc = Object.getOwnPropertyDescriptor(obj, key);
                                  if (desc != null && desc.get == null && desc.set == null) {
                                      ret.push(key);
                                  }
                              }
                              obj = es5.getPrototypeOf(obj);
                          }
                          return ret;
                      };
                  } else {
                      var hasProp = {}.hasOwnProperty;
                      return function (obj) {
                          if (isExcludedProto(obj)) return [];
                          var ret = [];
  
                          /*jshint forin:false */
                          enumeration: for (var key in obj) {
                              if (hasProp.call(obj, key)) {
                                  ret.push(key);
                              } else {
                                  for (var i = 0; i < excludedPrototypes.length; ++i) {
                                      if (hasProp.call(excludedPrototypes[i], key)) {
                                          continue enumeration;
                                      }
                                  }
                                  ret.push(key);
                              }
                          }
                          return ret;
                      };
                  }
              }();
  
              var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
              function isClass(fn) {
                  try {
                      if (typeof fn === "function") {
                          var keys = es5.names(fn.prototype);
  
                          var hasMethods = es5.isES5 && keys.length > 1;
                          var hasMethodsOtherThanConstructor = keys.length > 0 && !(keys.length === 1 && keys[0] === "constructor");
                          var hasThisAssignmentAndStaticMethods = thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;
  
                          if (hasMethods || hasMethodsOtherThanConstructor || hasThisAssignmentAndStaticMethods) {
                              return true;
                          }
                      }
                      return false;
                  } catch (e) {
                      return false;
                  }
              }
  
              function toFastProperties(obj) {
                  /*jshint -W027,-W055,-W031*/
                  function FakeConstructor() {}
                  FakeConstructor.prototype = obj;
                  var l = 8;
                  while (l--) {
                      new FakeConstructor();
                  }return obj;
                  eval(obj);
              }
  
              var rident = /^[a-z$_][a-z$_0-9]*$/i;
              function isIdentifier(str) {
                  return rident.test(str);
              }
  
              function filledRange(count, prefix, suffix) {
                  var ret = new Array(count);
                  for (var i = 0; i < count; ++i) {
                      ret[i] = prefix + i + suffix;
                  }
                  return ret;
              }
  
              function safeToString(obj) {
                  try {
                      return obj + "";
                  } catch (e) {
                      return "[no string representation]";
                  }
              }
  
              function isError(obj) {
                  return obj !== null && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && typeof obj.message === "string" && typeof obj.name === "string";
              }
  
              function markAsOriginatingFromRejection(e) {
                  try {
                      notEnumerableProp(e, "isOperational", true);
                  } catch (ignore) {}
              }
  
              function originatesFromRejection(e) {
                  if (e == null) return false;
                  return e instanceof Error["__BluebirdErrorTypes__"].OperationalError || e["isOperational"] === true;
              }
  
              function canAttachTrace(obj) {
                  return isError(obj) && es5.propertyIsWritable(obj, "stack");
              }
  
              var ensureErrorObject = function () {
                  if (!("stack" in new Error())) {
                      return function (value) {
                          if (canAttachTrace(value)) return value;
                          try {
                              throw new Error(safeToString(value));
                          } catch (err) {
                              return err;
                          }
                      };
                  } else {
                      return function (value) {
                          if (canAttachTrace(value)) return value;
                          return new Error(safeToString(value));
                      };
                  }
              }();
  
              function classString(obj) {
                  return {}.toString.call(obj);
              }
  
              function copyDescriptors(from, to, filter) {
                  var keys = es5.names(from);
                  for (var i = 0; i < keys.length; ++i) {
                      var key = keys[i];
                      if (filter(key)) {
                          try {
                              es5.defineProperty(to, key, es5.getDescriptor(from, key));
                          } catch (ignore) {}
                      }
                  }
              }
  
              var asArray = function asArray(v) {
                  if (es5.isArray(v)) {
                      return v;
                  }
                  return null;
              };
  
              if (typeof Symbol !== "undefined" && Symbol.iterator) {
                  var ArrayFrom = typeof Array.from === "function" ? function (v) {
                      return Array.from(v);
                  } : function (v) {
                      var ret = [];
                      var it = v[Symbol.iterator]();
                      var itResult;
                      while (!(itResult = it.next()).done) {
                          ret.push(itResult.value);
                      }
                      return ret;
                  };
  
                  asArray = function asArray(v) {
                      if (es5.isArray(v)) {
                          return v;
                      } else if (v != null && typeof v[Symbol.iterator] === "function") {
                          return ArrayFrom(v);
                      }
                      return null;
                  };
              }
  
              var isNode = "undefined" !== "undefined" && classString(process).toLowerCase() === "[object process]";
  
              function env(key, def) {
                  return isNode ? process.env[key] : def;
              }
  
              function getNativePromise() {
                  if (typeof Promise === "function") {
                      try {
                          var promise = new Promise(function () {});
                          if ({}.toString.call(promise) === "[object Promise]") {
                              return Promise;
                          }
                      } catch (e) {}
                  }
              }
  
              var ret = {
                  isClass: isClass,
                  isIdentifier: isIdentifier,
                  inheritedDataKeys: inheritedDataKeys,
                  getDataPropertyOrDefault: getDataPropertyOrDefault,
                  thrower: thrower,
                  isArray: es5.isArray,
                  asArray: asArray,
                  notEnumerableProp: notEnumerableProp,
                  isPrimitive: isPrimitive,
                  isObject: isObject,
                  isError: isError,
                  canEvaluate: canEvaluate,
                  errorObj: errorObj,
                  tryCatch: tryCatch,
                  inherits: inherits,
                  withAppended: withAppended,
                  maybeWrapAsError: maybeWrapAsError,
                  toFastProperties: toFastProperties,
                  filledRange: filledRange,
                  toString: safeToString,
                  canAttachTrace: canAttachTrace,
                  ensureErrorObject: ensureErrorObject,
                  originatesFromRejection: originatesFromRejection,
                  markAsOriginatingFromRejection: markAsOriginatingFromRejection,
                  classString: classString,
                  copyDescriptors: copyDescriptors,
                  hasDevTools: typeof chrome !== "undefined" && chrome && typeof chrome.loadTimes === "function",
                  isNode: isNode,
                  env: env,
                  global: globalObject,
                  getNativePromise: getNativePromise
              };
              ret.isRecentNode = ret.isNode && function () {
                  var version = process.versions.node.split(".").map(Number);
                  return version[0] === 0 && version[1] > 10 || version[0] > 0;
              }();
  
              if (ret.isNode) ret.toFastProperties(process);
  
              try {
                  throw new Error();
              } catch (e) {
                  ret.lastLineError = e;
              }
              module.exports = ret;
          }, { "./es5": 13 }] }, {}, [4])(4);
  });;if (typeof window !== 'undefined' && window !== null) {
      window.P = window.Promise;
  } else if (typeof self !== 'undefined' && self !== null) {
      self.P = self.Promise;
  }

});

define('/views/search-box', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _actions = require('/views/vuex/actions');
  
  var actions = _interopRequireWildcard(_actions);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  exports.default = {
      name: 'search-box',
      props: {
          hint: String,
          placeholder: '',
          label: '',
          text: {
              type: String,
              default: ''
          },
          searchShow: {
              type: Boolean,
              default: true
          }
      },
      vuex: {
          getters: {
              searchShow1: function searchShow1(state) {
                  return state.showSearch;
              }
          },
          actions: actions
      },
      data: function data() {
          return {
              id: parseInt(Math.random() * 1000 + 1000)
          };
      },
  
      watch: {
          text: function text(val) {
              console.log(val);
          }
      },
      events: {
          'search:reset': function searchReset() {
              this.text = '';
          }
      },
      ready: function ready() {
          this.mixx();
      },
  
      methods: {
          search: function search() {
              this.$dispatch('search:text', { vue: this, text: this.text });
          },
          show: function show() {
              this.showSearch = true;
          }
      }
  };
  
  var _vueTemplateString = "<div class=\"search\" id=\"search_box_{{id}}\" :style=\"searchStyle\" v-show=\"searchShow\" vuec1098=\"\">\n    <span class=\"search-text\">{{label}}：</span>\n    <input type=\"text\" class=\"search-input\" placeholder=\"{{placeholder}}\" autocomplete=\"off\" v-model=\"text|trim\" @keyup.enter=\"search\">\n    <a href=\"javascript:;\" class=\"icon-search\" title=\"{{hint}}\" @click=\"search\"></a>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/components/page/page', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  var zPagenav = {
  
      default: {
          page: 1,
          pageSize: 10,
          total: 0,
          prevHtml: '«',
          nextHtml: '»',
          prevSrHtml: 'Previous',
          nextSrHtml: 'Next',
          dotsHtml: '...',
          eventName: 'page-change',
          template: '<nav class="zpagenav" >' + '<span class="pagination page-link m-r-1">total:{{total}}</span>' + '<ul class="pagination">' + '<li track-by="$index" v-for="unit in units" class="page-item {{unit.class}}" :disabled="unit.disabled">' + '<a @click.prevent="setPage(unit.page)" class="page-link" :href="setUrl(unit)" aria-label="{{unit.ariaLabel}}">' + '<span v-if="unit.isPager" aria-hidden="true">{{{unit.html}}}</span>' + '<span v-else>{{{unit.html}}}</span>' + '<span v-if="unit.isPager" class="sr-only">{{{unit.srHtml}}}</span>' + '</a>' + '</li>' + '</ul>' + '</nav>'
      }
  
  };
  exports.default = {
      name: 'page',
      props: {
          page: Number,
          total: Number,
          pageSize: Number,
          maxLink: Number,
          eventName: String,
          pageHandler: Function,
          createUrl: Function
      },
      methods: {
          setPage: function setPage(page) {
              if (page === this.page) {
                  return false;
              }
              if (this.pageHandler) {
                  this.pageHandler(page);
              } else if (this.$dispatch) {
                  this.$dispatch(this.eventName || zPagenav.default.eventName, page);
              }
          },
          setUrl: function setUrl(unit) {
              return url = this.createUrl ? this.createUrl(unit) : unit.page > 1 ? '#page=' + unit.page : '';
          }
      },
      computed: {
          units: function units() {
              var option = zPagenav.default;
              var th = this;
              var page = th.page || option.page;
              var pageSize = th.pageSize || option.pageSize;
              var total = th.total || option.total;
              var maxLink = th.maxLink > 5 ? th.maxLink : 5;
  
              var linksCount = Math.ceil(total / pageSize);
  
              if (page > linksCount) page = linksCount + 0;
  
              var hasPrev = page > 1;
              var hasNext = page < linksCount;
              var realMaxLink = maxLink > linksCount ? linksCount : maxLink;
              var len1 = void 0,
                  len2 = void 0,
                  len3 = void 0,
                  shouldInsertDots12 = void 0,
                  shouldInsertDots23 = void 0;
              var len2Start = void 0,
                  len3Start = void 0;
  
              var units = [];
              var arr = computeLens();
  
              units.push({
                  'class': hasPrev ? '' : 'disabled',
                  'page': hasPrev ? page - 1 : page,
                  'isPager': true,
                  'isPrev': true,
                  'isNext': false,
                  'html': option.prevHtml,
                  'srHtml': option.prevSrHtml,
                  'ariaLabel': option.prevSrHtml
              });
  
              var dotUnit = {
                  'class': 'disabled',
                  'page': page,
                  'isPager': false,
                  'isPrev': false,
                  'isNext': true,
                  'html': option.dotsHtml
              };
  
              for (var i = 0, len = arr.length; i < len; i++) {
                  pushUnit(arr[i]);
              }
  
              units.push({
                  'class': hasNext ? '' : 'disabled',
                  'page': hasNext ? page + 1 : page,
                  'isPager': true,
                  'isPrev': false,
                  'isNext': true,
                  'html': option.nextHtml,
                  'srHtml': option.nextSrHtml,
                  'ariaLabel': option.nextSrHtml
              });
  
              function pushUnit(i) {
                  if (typeof i === 'number') {
                      units.push({
                          'page': i,
                          'isPrev': false,
                          'isPager': false,
                          'disabled': false,
                          'class': i === page ? 'active' : '',
                          'isNext': false,
                          'html': i
                      });
                  } else {
                      units.push(dotUnit);
                  }
              }
  
              function computeLens() {
                  var a4 = Math.floor((realMaxLink - 2) / 2);
                  var a5 = realMaxLink - 3 - a4;
                  var s2 = page - a4;
                  var s3 = page + a5;
                  if (s2 < 2) {
                      s2 = 2;
                  } else if (s3 > linksCount) {
                      s2 = linksCount - (realMaxLink - 2);
                  }
                  var arr = [1];
                  if (s2 > 2) {
                      arr.push('dot');
                  }
                  var it = void 0;
                  for (var _i = 0, _len = realMaxLink - 2 < 1 ? realMaxLink - 1 : realMaxLink - 2; _i < _len; _i++) {
                      it = _i + s2;
                      arr.push(it);
                  }
                  if (it < linksCount - 1) {
                      arr.push('dot');
                  }
                  if (it < linksCount) {
                      arr.push(linksCount);
                  }
                  return arr;
              }
  
              return units;
              //end unit
          }
      }
  };
  
  var _vueTemplateString = "<nav class=\"zpagenav\" vuec1097=\"\">\n    <span class=\"pagination page-link m-r-1\">total:{{total}}</span>\n    <ul class=\"pagination\">\n        <li @click=\"setPage(unit.page)\" track-by=\"$index\" v-for=\"unit in units\" class=\"page-item {{unit.class}}\" :disabled=\"unit.disabled\">\n            <a class=\"page-link\" href=\"#p={{unit.page}}\" aria-label=\"{{unit.ariaLabel}}\">\n                <span v-if=\"unit.isPager\" aria-hidden=\"true\">{{{unit.html}}}</span>\n                <span v-else=\"\">{{{unit.html}}}</span>\n                <span v-if=\"unit.isPager\" class=\"sr-only\">{{{unit.srHtml}}}</span>\n            </a>\n        </li>\n    </ul>\n</nav>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/services/interfaces', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  /**
   * @file 所有后端接口url
   * @author zhujianchen@baidu.com
   * @description 接口url
   */
  exports.default = {
      // 测试接口
      dev: {
          component: '/api/logmanage/component',
          application: '/api/logmanage/component/application',
          componentFilter: '/api/logmanage/component/filter'
      },
      // 线上接口
      prod: {
          component: '/api/logmanage/component',
          application: '/api/logmanage/component/application',
          componentFilter: '/api/logmanage/component/filter'
      }
  };

});

define('/env', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @file 环境配置
   * @author zhujianchen@baidu.com
   * @description 配置
   */
  exports.default = {
    env: 'dev'
  };

});

define('/services/index', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _interfaces = require('/services/interfaces');
  
  var _interfaces2 = _interopRequireDefault(_interfaces);
  
  var _env = require('/env');
  
  var _env2 = _interopRequireDefault(_env);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * @file 请求后端接口
   * @author zhujianchen@baidu.com
   * @description rpc接口获取数据
   */
  
  var env = _env2.default.env;
  
  exports.default = {
  
      /**
       * 新增组件
       *
       * @param {string} nameSpace 命名空间
       * @param {string} componentStrId 组件ID
       * @param {string} name 组件名
       * @param {string} creator 创建者
       * @param {string} tier2Manager 负责经理
       * @param {string} description 描述
       * @return {Function} Promise
       */
  
      addNewComponent: function addNewComponent(_ref) {
          var nameSpace = _ref.nameSpace;
          var componentStrId = _ref.componentStrId;
          var name = _ref.name;
          var creator = _ref.creator;
          var notificationMails = _ref.notificationMails;
          var tier2Manager = _ref.tier2Manager;
          var description = _ref.description;
  
          return window.Vue.http.post(_interfaces2.default[env].component, {
              nameSpace: nameSpace,
              componentStrId: componentStrId,
              name: name,
              creator: creator,
              notificationMails: notificationMails,
              tier2Manager: tier2Manager,
              description: description
          });
      },
  
  
      /**
       * 更新组件，审核组件保存
       *
       * @param {string} compId 组件ID
       * @param {...rest} args 组件信息
       * @return {Function} Promise
       */
      updateComponent: function updateComponent(compId) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
          }
  
          return window.Vue.http.post(_interfaces2.default[env].component + compId, args);
      },
  
  
      /**
       * 审核员操作通过或不通过时，调用接口保存审核结果
       *
       * @param {string} action 审核动作
       * @param {string} operator 操作人员
       * @param {string} actionComment 审核意见
       * @param {string} componentId 组件ID
       * @return {Function} Promise
       */
      setApprovalResult: function setApprovalResult(_ref2) {
          var action = _ref2.action;
          var operator = _ref2.operator;
          var actionComment = _ref2.actionComment;
          var componentId = _ref2.componentId;
  
          return window.Vue.http.post(_interfaces2.default[env].component, { action: action, operator: operator, actionComment: actionComment, componentId: componentId });
      },
  
  
      /**
       * 获取具体的某一个组件
       *
       * @param {string} compId 组件ID
       * @return {Function} Promise
       */
      getComponentAllInfo: function getComponentAllInfo(compId) {
          return window.Vue.http.get('' + _interfaces2.default[env].component + compId);
      },
  
  
      /**
       * 组件列表
       *
       * @param {string} status 状态
       * @param {string} creator 创建者
       * @return {Function} Promise
       */
      getComponentList: function getComponentList(_ref3) {
          var status = _ref3.status;
          var creator = _ref3.creator;
  
          return window.Vue.http.get(_interfaces2.default[env].application, { status: status, creator: creator });
      },
  
  
      /**
       * 筛选组件
       *
       * @param {Object} options 接口接收参数
       * @param {string} options.nameSpace 命名空间
       * @param {string} options.tier2Manager 负责经理
       * @return {Function} Promise
       */
      filterComponentList: function filterComponentList(options) {
          return window.Vue.http.get(_interfaces2.default[env].component, options);
      },
  
      nameSpace: ['COMPONENTIZATION', // 自动从组件化平台中抓取，不在注册平台新建组件时显示
      'NATIVE', 'WAP', 'PC'],
      status: [{
          name: '无效',
          value: 'INVALID'
      }, {
          name: '有效',
          value: 'INVALID'
      }, {
          name: '已删除',
          value: 'DELETED'
      }],
      operator: 'zhujianchen',
      rss: window.Vue.http.get('/')
  };

});

define('/views/log/wgt-reg/list', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _searchBox = require('/views/search-box');
  
  var _searchBox2 = _interopRequireDefault(_searchBox);
  
  var _page = require('/components/page/page');
  
  var _page2 = _interopRequireDefault(_page);
  
  var _index = require('/services/index');
  
  var _index2 = _interopRequireDefault(_index);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'list',
      components: {
          SearchBox: _searchBox2.default,
          Page: _page2.default
      },
      props: {},
      data: function data() {
          return {
              searchKeyword: '',
              page: 1, //page
              pageSize: 10, //pageSize,  default is 10
              total: 509, //total item count
              maxLink: 5, //how many links to show, must not less than 5,  default is 5
              // page change event name, default is 'page-change',
              // optional
              // for different pagenav, should use different name
              eventName: 'custom',
              lists: []
          };
      },
  
      computed: {
          msg: function msg() {}
      },
      watch: {},
      events: {
          custom: function custom(page) {
              this.page = page;
              console.log(page);
          }
      },
      compiled: function compiled() {},
      ready: function ready() {
          var _this = this;
  
          this.$$el = $(this.$el);
          setTimeout(function () {
              _this.lists = [{ value: 1 }, { value: 2 }];
          }, 1000);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          renderTbl: function renderTbl() {
              _index2.default.getComponentList({ status: status, creator: creator }).then(function (data) {}).catch(function (error) {});
          },
          search: function search(opt) {
              var value = opt.text;
              this.pageIndex = 1;
              this.pageRange = undefined;
              this.loadTbl();
          },
          pageHandler: function pageHandler(page) {
              //here you can do custom state update
              this.page = page;
          },
          changHash: function changHash(unit) {}
      }
  };
  
  var _vueTemplateString = "<div id=\"list\" vuec1108=\"\">\n    <div class=\"pub-box-t\">\n        <h2><span>组件列表</span></h2>\n        <div class=\"filter-list\">\n            <div class=\"filter-elem\" data-value=\"creator\">\n                <span class=\"filter-text\">负责经理：</span>\n                <input type=\"text\" class=\"moni-ipt\" id=\"tier2Manager\">\n            </div>\n            <div class=\"filter-elem\" data-value=\"nameSpace\">\n                <span class=\"filter-text\">命名空间：</span>\n                <span class=\"selectbox\">\n                    <select class=\"moni-selt\" id=\"nameSpace\">\n                        <option value=\"\">全部</option>\n                        <option v-for=\"v in nameSpace\" value=\"{{v}}\">{{v}}</option>\n                    </select>\n                    <i class=\"triangle\"></i>\n                </span>\n            </div>\n            <search-box label=\"关键字\" placeholder=\"\" hint=\"搜索\" @search:text=\"search\" :text.sync=\"searchKeyword\"></search-box>\n        </div>\n    </div>\n    <div class=\"pub-box-c\">\n        <partial name=\"tbl\"></partial>\n        <div class=\"page-w\">\n            <!--Page-->\n            <page :page=\"page\" :page-size=\"pageSize\" :total=\"total\" :max-link=\"maxLink\" :page-handler=\"pageHandler\" :create-url=\"changHash\"></page>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/input-sug', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _actions = require('/views/vuex/actions');
  
  var actions = _interopRequireWildcard(_actions);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  exports.default = {
      name: 'input-sug',
      props: {
          inputId: {
              type: String,
              default: function _default() {
                  return 'input-sug-' + this.id;
              }
          },
          sugData: {
              type: Array,
              default: function _default() {
                  return [];
              }
          },
          /*suggest点击后显示什么值，是name还是value，或者任意其他*/
          sugText: {
              type: String,
              default: 'name'
          },
          inputValue: {
              type: String,
              default: '',
              twoWay: true
          }
      },
      vuex: {
          getters: {
              showSug1: function showSug1(state) {
                  return state.showSug1;
              }
          },
          actions: actions
      },
      computed: {
          inputValue: function inputValue() {
              return this.text;
          }
      },
      data: function data() {
          return {
              id: parseInt(Math.random() * 1000 + 1000),
              sugStyle: {},
              text: '',
              showSug: false
          };
      },
  
      watch: {
          text: function text(val) {
              if (this.$('.sug').find('li').length > 1) {
                  this.show();
                  this.positionSug();
              }
          }
      },
      events: {
          'search:reset': function searchReset() {
              this.text = '';
          }
      },
      ready: function ready() {
          var _this = this;
  
          this.$$el = $(this.$el);
          this.mixx();
          $(document).on('click', function (e) {
              if (_this.$el && !$.contains(_this.$el, e.target)) {
                  _this.showSug = false;
              }
          });
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
  
          /*定位suggest*/
          positionSug: function positionSug() {
              var width = this.$('.input-text').outerWidth();
              this.sugStyle = {};
          },
          search: function search() {
              this.$dispatch('sugguest:text', { vue: this, text: this.text });
          },
          show: function show() {
              this.showSug = true;
          },
          hide: function hide() {
              this.showSug = false;
          },
  
          /*点击了suggest*/
          sugguestClicked: function sugguestClicked(v) {
              this.text = v[this.sugText];
              this.hide();
          }
      }
  }; /*带有suggest的输入框*/
  
  var _vueTemplateString = "<div vuec1096=\"\" id=\"{{inputId}}\">\n    <input type=\"text\" id=\"ipt_{{id}}\" class=\"input-text\" value=\"\" v-model=\"text | trim\" @focus.stop=\"showSug = true\">\n    <ul class=\"sug\" :style=\"sugStyle\" v-show=\"showSug\">\n        <li v-for=\"v in sugData | filterBy text in 'name' 'value'\">\n            <a href=\"#\" @click.stop.prevent=\"sugguestClicked(v)\" class=\"can_select class_one\" data-value=\"{{v.value}}\" data-name=\"{{v.name}}\">{{v.name}}</a>\n        </li>\n    </ul>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/components/calendar/calendar', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
  
  /**
   * @file 日历
   * @author zhujianchen@baidu.com
   * @description 先把pharos用的组件改成vue组件格式，以后再改吧
   */
  exports.default = {
      name: 'calendar',
      props: {
          callback: {
              type: Function,
              default: function _default() {}
          },
          range_select: {
              type: Array,
              default: function _default() {
                  return [];
              }
          },
          default_selected: {
              type: Array,
              default: function _default() {
                  return [];
              }
          },
          short_cut: {
              type: Array,
              default: function _default() {
                  return [];
              }
          },
          input_height: {
              type: String,
              default: 25
          },
          input_width: {
              type: Number,
              default: 100
          }
      },
      computed: {
          /*样式定位*/
  
          positionClass: function positionClass() {
              return this.position ? 'calendar-' + this.position : '';
          },
          calendarId: function calendarId() {
              return 'calendar-' + this.calendar_id;
          },
          cfg: function cfg() {
              return {
                  input_height: this.input_height,
                  input_width: this.input_width,
                  ready_only: false,
                  short_cut: this.short_cut,
                  range_select: this.range_select,
                  default_selected: this.default_selected,
                  autosubmit: this.autosubmit || true,
                  type: this.type || 'single',
                  sheet: this.sheet || 1,
                  zIndex: this.zIndex || 999,
                  skin_name: this.skin_name || 'noborder',
                  ent: {
                      context: this,
                      sure: function sure(data) {
                          this.callback('sure', { vue: this, data: data });
                      },
                      selected: function selected(data) {
                          this.callback('selected', { vue: this, data: data });
                      }
                  }
              };
          }
      },
      data: function data() {
          return {
              /*内部变量*/
              calendar_id: parseInt(Math.random() * 1000 + 1000),
              scatter_init: false,
              tretdata: []
          };
      },
  
      watch: {
          show: function show(val, oldVal) {
              if (val) {
                  this.position();
              }
          }
      },
      events: {
          'open:calendar': function openCalendar() {},
          'close:calendar': function closeCalendar() {}
      },
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
          this.init(this.cfg);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          position: function position() {},
          init: function init(config) {
              var tdy = this.getDateFormat(new Date());
              if (config.range_select.length == 0) {
                  config.range_select = ['', tdy];
              }
  
              if (config.default_selected == 0) {
                  config.default_selected = [tdy, tdy];
              }
              this.config = {
                  container: '' + this.calendarId,
                  ready_only: false, //input是否可以手动输入 false：不可以，true:可以
                  short_cut: [], //快捷方式//{name:"7天",value:7,on;true},{name:"14天",value:14},{name:"30天",value:30}
                  autosubmit: false, //是否自动返回选择结束 false:按确定返回，true:选择完成直接返回
                  type: "single", //single:单日，double:区间
                  style: "", //散点选择 “”：不是，scatter：“散点选择”
                  pivot: "", //原点
                  sheet: 2, //月份个数
                  range_select: ["", ""], //可选择范围，空为无限制，数组0：开始点，数组1：结束点
                  default_selected: ["", ""], //默认已选择范围，空为无指定，数组0：开始点，数组1：结束点
                  zIndex: 999,
                  docclose: true, //点击窗口其他地方关闭
                  usagecol: "1111111", //
                  input_width: "", //显示框的宽
                  input_height: "", //显示框的高
                  date_split: "~", //时间分隔符
                  skin_name: "",
                  select_rangday: null, // [3,10] 区间范围时，选择范围，单位：天,以原点为中心
                  disabled_day: [],
                  body_click: false,
                  no_head: false, //没有选择头
                  applist_id: "", //列表添加到的容器ID
                  compare: {
                      open: false,
                      type: "double", //single:单点，double:区间
                      deploy: false //true:展开，false:不展开
                  },
                  ent: {
                      context: this,
                      selected: null, //选择事件,自动提交，不需要点确定按钮
                      clickday: null, //日历天点击事件
                      sure: function sure() {}, //确定按钮事件
                      init: null, //日历控件初始化事件
                      show: null, //日历列表显示事件
                      shortcut: null //快捷方式事件
                  }
              };
              this.extend(config);
              this.container = this.config.container;
              this.ready_only = this.config.ready_only;
              this.shortcut = this.config.short_cut;
              this.selected_index = -1; //用于监听区间选择
              this.autosubmit = this.config.autosubmit;
              this.type = this.config.type; //double
              this.stype = this.config.stype;
              this.pivot = this.getPivotDate(this.config.pivot);
              this.sheet = this.config.sheet;
              this.range_select = this.getDateRangeArray(this.config.range_select);
              this.range_select_init = this.getDateRangeArray(this.config.range_select);
              this.default_selected = this.getDateRangeArray(this.config.default_selected, true);
              this.range_selected = this.default_selected; //当前已选择的范围
              this.zIndex = this.config.zIndex;
              this.docclose = this.config.docclose;
              this.usagecol = this.config.usagecol;
              this.input_width = this.config.input_width;
              this.input_height = this.config.input_height;
              this.date_split = this.config.date_split;
              this.select_rangday = this.config.select_rangday;
              this.disabled_day = this.config.disabled_day;
              this.body_click = this.config.body_click;
              this.compare = this.config.compare;
              this.skin_name = this.config.skin_name;
              this.no_head = this.config.no_head;
              this.ent = this.config.ent;
  
              if (this.no_head) {
                  this.list(this.container);
              } else {
                  this.compare.open ? this.showCompareHeader() : this.showHeader();
              }
  
              var _this = this;
              window.setTimeout(function () {
                  _this.setContainerWidth();
              }, 20);
  
              this.setRetdata();
  
              //初始化事件
              if (this.ent && this.ent.init && typeof this.ent.init == "function") {
                  this.ent.init.call(this.ent.context, this.retdata);
              }
          },
          extend: function extend(config) {
              for (var key in config) {
                  this.config[key] = config[key];
              }
          },
          getDateFormat: function getDateFormat(date) {
              var _fillDigit = void 0;
              _fillDigit = function _fillDigit(str, digit) {
                  var cnt;
                  if (typeof str !== 'string') {
                      str = str.toString();
                  }
                  if (digit < str.length) {
                      return str;
                  }
                  cnt = digit - str.length;
                  while (cnt--) {
                      str = '0' + str;
                  }
                  return str;
              };
              return _fillDigit(date.getFullYear(), 4) + '-' + _fillDigit(date.getMonth() + 1, 2) + '-' + _fillDigit(date.getDate(), 2);
          },
          setContainerWidth: function setContainerWidth() {
              var _this2 = this;
  
              var width = $("#" + this.container + "_calendar .list").width();
              if (width == 0) {
                  var _ret = function () {
                      var _this = _this2;
                      window.setTimeout(function () {
                          _this.setContainerWidth();
                      }, 20);
                      return {
                          v: void 0
                      };
                  }();
  
                  if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
              }
  
              width = Math.max(255, width); //用于btn
              var cwidth = (width + 10) * this.sheet;
              $("#" + this.container + "_calendar").css({ width: cwidth + "px" });
              $("#" + this.container + "_calendar div[data-calendar=list]").css({ width: cwidth + 10 + "px" });
              $("#" + this.container + "_calendar div[data-calendar=foot]").css({ display: this.autosubmit == true ? "none" : "" });
          },
          getDateStr: function getDateStr(date) {
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              month = month < 10 ? "0" + month : month; //个位补零
              var date1 = date.getDate();
              date1 = date1 < 10 ? "0" + date1 : date1; //个位补零
              return year + "-" + month + "-" + date1;
          },
          getDate: function getDate(date_str) {
              //字符类型输为日期类型
              var date_element = date_str.split("-");
              return new Date(date_element[0], date_element[1] - 1, date_element[2]);
          },
          getPivotDate: function getPivotDate(datestr) {
              return datestr ? new Date(this.getDate(datestr)) : new Date();
          },
          getDateRangeArray: function getDateRangeArray(datestr_array, dflag) {
              var retdate = [];
              for (var i = 0, ilength = datestr_array.length; i < ilength; i++) {
                  var idata = datestr_array[i];
                  if (idata == "") {
                      retdate.push(dflag ? new Date() : idata); //默认时间为今天
                  } else {
                      retdate.push(new Date(this.getDate(idata)));
                  }
              }
              return retdate;
          },
          showHeader: function showHeader() {
              var start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
              var end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
              //当type=double时，如果start=end，就只显示一个日期 modified by zjc 20150427
              var val = this.type == "single" ? start ? start : "" : start && end ? start + this.date_split + end : '';
              var data_value = this.range_selected[0] + "|" + this.range_selected[1];
              var input_width = this.input_width ? this.input_width + "px" : "";
              var input_height = this.input_height > 0 ? this.input_height : "";
              var skin_name = this.skin_name ? "_" + this.skin_name : "";
  
              var template = '<div data-calendar="head" class="calendar_head' + skin_name + '"><input type="text" data-calendar="headinput"  data-val="0" readonly class="calendar_date calendar_date_{type}" style="width:{input_width};height:{input_height}px" value="{val}" data-value="{data_value}"/>{shortcut}</div>';
              var shortcut = this.getShortcut("");
              shortcut = shortcut ? shortcut : "";
              template = template.replace(/\{type\}/g, this.type).replace(/\{input_height\}/g, input_height).replace(/\{input_width\}/g, input_width).replace(/\{val\}/g, val).replace(/\{data_value\}/g, data_value).replace(/\{shortcut\}/g, shortcut);
  
              $("#" + this.container).html(template);
              this.headerEvent();
          },
          showCompareHeader: function showCompareHeader() {
              var start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
              var end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
              var val = this.compare.type == "single" ? start ? start : "" : start && end ? start + this.date_split + end : "";
              this.type = this.compare.type; //用于选择
              var data_value = this.range_selected[0] + "|" + this.range_selected[1];
              var input_width = this.input_width ? this.input_width + "px" : "";
              var schide = ""; //快捷方式隐藏
              var hide = ""; //对比隐藏
              var checked = ""; //对比勾选
              var skin_name = this.skin_name ? "_" + this.skin_name : "";
              var template = '<div data-calendar="head" class="calendar_head' + skin_name + '"><input type="text" data-calendar="headinput"  data-val="0" readonly class="calendar_date calendar_date_{type}" style="width:{input_width}px" value="{val}" data-value="{data_value}"/><label class="btn_calendarcompare"><input type="checkbox"  {checked} data-calendar="btncompare"/> 对比</label> <input data-calelement="compare" type="text" data-calendar="headinput"  data-val="0" readonly class="calendar_date calendar_date_{type} {hide}" style="width:{input_width}px" value="{val}" data-value="{data_value}"/>{shortcut}</div>';
              if (this.compare.deploy == false) {
                  hide = "hide";
                  checked = "";
              } else {
                  schide = "hide";
                  checked = "checked";
              }
              this.isCompare = checked == "checked";
              var shortcut = this.getShortcut(schide);
              shortcut = shortcut ? shortcut : "";
              template = template.replace(/\{type\}/g, this.type).replace(/\{input_width\}/g, input_width).replace(/\{val\}/g, val).replace(/\{data_value\}/g, data_value).replace(/\{checked\}/g, checked).replace(/\{hide\}/g, hide).replace(/\{shortcut\}/g, shortcut);
              $("#" + this.container).html(template);
              this.headerEvent();
          },
          headerEvent: function headerEvent() {
              this.list();
              var _this = this;
              $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").on("click", function (e) {
                  e.stopPropagation();
                  _this.range_select = _this.range_select_init;
                  //关闭列表
                  if (!$("#" + _this.container + "_calendar" + "").is(":hidden")) {
                      $("#" + _this.container + "_calendar" + "").hide();
                      return;
                  }
                  var pos = $(this).offset(); //当前元素信息集合
                  var height = $(this).outerHeight() + 1; //对话框高度
                  var width = $(this).outerWidth(); //对话框宽度
                  var lleft = pos.left - $("#" + _this.container + "_calendar" + "").outerWidth() + width; //左边距
                  var rleft = pos.left;
                  var dwidth = $(document).width() / 2;
                  var left = pos.left < dwidth ? rleft : lleft;
                  var top = pos.top + height;
                  var h = $("#" + _this.container + "_calendar" + "").outerHeight();
                  if (top + h + height > $(window).height() + $(window).scrollTop()) {
                      top = pos.top - h;
                  }
                  $("#" + _this.container + "_calendar" + "").css({ top: top + "px", left: left + "px" });
                  _this.selected_index = -1; //重新初始化区间点击
                  $(this).attr("data-thisinput", "this_input");
                  var val = $(this).attr("data-value").split("|");
                  var start = val[0] ? new Date(val[0]) : "";
                  var end = val[1] ? new Date(val[1]) : "";
                  _this.range_selected = [start, end];
                  _this.listDate();
                  _this.show();
              });
          },
          getShortcut: function getShortcut(schide) {
              var short_cut = '';
              var shortcut_count = 0;
              for (var i = 0, ilength = this.shortcut.length; i < ilength; i++) {
                  var idata = this.shortcut[i];
                  var on = idata.on ? "shortcut_on" : "";
                  if (on) {
                      shortcut_count++;
                  }
                  short_cut += '<a href="#" class="shortcut ' + schide + ' ' + on + '" data-calendar="shortcut" data-value="' + idata.value + '">' + idata.name + '</a>';
              }
              this.is_shortcut = shortcut_count > 0 ? true : false;
              return short_cut;
          },
          list: function list(apid) {
              //显示日期控件
              var readonly = this.ready_only ? "readonly" : "";
              var zIndex = this.zIndex;
              var skin_name = this.skin_name ? "_" + this.skin_name : "";
              var listHTML = '<div class="calendar' + skin_name + '" data-calendar="body" id="' + this.container + '_calendar" style="display:none;z-index:' + zIndex + '">' + '<div class="head">' + '<div class="prev"><a href="#" data-calendar="btn_prevyear" class="btn_prevyear">&lt;&lt;</a> <a href="#" data-calendar="btn_prevmonth" class="btn_prevmonth">&lt;</a></div>' + '<div class="next"><a href="#" data-calendar="btn_nextmonth" class="btn_nextmonth">&gt;</a> <a href="#" data-calendar="btn_nextyear" class="btn_nextyear">&gt;&gt;</a></div>' + '</div>' + '<div class="main" data-calendar="list">' + '</div>' + '<div class="foot" data-calendar="foot">' + '<div><input type="text" class="text" ' + readonly + ' data-calendar="start"/></div>' + '<div data-calendar="double" class="date_split">' + this.date_split + '</div>' + '<div data-calendar="double"><input type="text" class="text" ' + readonly + ' data-calendar="end"/></div>' + '<div class="calendarbtn"><input type="button" value="确定" data-calendar="btn_submit"  class="calendarbtn"/></div>' + '</div>' + '</div>';
              if (apid) {
                  $("#" + apid).html(listHTML);
                  $("#" + this.container + '_calendar').show();
                  if (this.stype) {
                      //隐藏ipt
                      $("#" + this.container + "_calendar .foot input[data-calendar=start]").hide();
                  }
              } else {
                  $("body").append(listHTML);
              }
              this.listDate();
  
              //隐藏多余的input
              if (this.type == "single") {
                  $("#" + this.container + "_calendar .foot div[data-calendar=double]").css({ display: "none" });
              }
              var _this = this;
              //下一个月
              $("#" + this.container + "_calendar" + " a[data-calendar=btn_nextmonth]").on("click", function (e) {
                  e.preventDefault();
                  _this.listDate(true, _this.getViewDate(_this.sheet));
              });
              //上一个月
              $("#" + this.container + "_calendar" + " a[data-calendar=btn_prevmonth]").on("click", function (e) {
                  e.preventDefault();
                  _this.listDate(true, _this.getViewDate(-_this.sheet));
              });
              //上一年
              $("#" + this.container + "_calendar" + " a[data-calendar=btn_prevyear]").on("click", function (e) {
                  e.preventDefault();
                  _this.listDate(true, _this.getViewDate(-12));
              });
              //下一年
              $("#" + this.container + "_calendar" + " a[data-calendar=btn_nextyear]").on("click", function (e) {
                  e.preventDefault();
                  _this.listDate(true, _this.getViewDate(12));
              });
  
              //确定
              $("#" + this.container + "_calendar" + " input[data-calendar=btn_submit]").on("click", function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (_this.range_selected[0] && _this.range_selected[1]) {
                      if (_this.isValidDate()) {
                          if (_this.ent && _this.ent.sure && typeof _this.ent.sure == "function") {
                              _this.setRetdata();
                              _this.close();
                              //alert("this.tretdata = " + _this.tretdata);
                              if (_this.no_head) {
                                  var tdata = [];
                                  //alert("_this.tretdata.length = " + _this.tretdata.length);
                                  for (var i = 0, ilength = _this.tretdata.length; i < ilength; i++) {
                                      var idata = _this.tretdata[i];
                                      tdata.push(_this.getDateStr(idata));
                                  }
                                  //alert(tdata);
                                  _this.ent.sure.call(_this.ent.context, tdata);
                              } else {
                                  _this.ent.sure.call(_this.ent.context, _this.retdata);
                              }
                          }
                      }
                  }
              });
  
              //阻止冒泡，配合页面点击关闭窗口
              $("#" + this.container + "_calendar").on("click", function (e) {
                  e.stopPropagation();
              });
              //点击页面其他地方关闭窗口
              $(document).bind("click", function () {
                  if (_this.docclose) {
                      _this.close(true);
                  }
              });
  
              //快捷方式
              $("#" + this.container + " a[data-calendar=shortcut]").on("click", function (e) {
                  e.preventDefault();
                  $("#" + _this.container + " a[data-calendar=shortcut]").removeClass("shortcut_on");
                  $(this).addClass("shortcut_on");
                  var val = parseInt($(this).attr("data-value"), 10);
                  _this.range_selected[0] = new Date(_this.pivot.getFullYear(), _this.pivot.getMonth(), _this.pivot.getDate() - val + 1);
                  //修复开始时间
                  _this.range_selected[0] = _this.amendStartDate(_this.range_selected[0]);
                  _this.range_selected[1] = _this.pivot;
                  var input = $("#" + _this.container + " div[data-calendar=head] input[data-calendar=headinput]").eq(0);
                  input.val(_this.getDateStr(_this.range_selected[0]) + _this.date_split + _this.getDateStr(_this.range_selected[1]));
                  input.attr("data-value", _this.range_selected[0] + "|" + _this.range_selected[1]);
                  _this.close();
                  //快捷方式事件
                  if (_this.ent && _this.ent.shortcut && typeof _this.ent.shortcut == "function") {
                      _this.is_shortcut = true;
                      _this.setRetdata();
                      _this.ent.shortcut.call(_this.ent.context, _this.retdata);
                  }
              });
  
              //时间对比
              $("#" + this.container + " input[data-calendar=btncompare]").on("click", function () {
                  var checked = $(this).attr("checked");
                  if (checked == "checked") {
                      $("#" + _this.container + " input[data-calelement=compare],#" + _this.container + " span[data-calelement=compare]").removeClass("hide");
                      $("#" + _this.container + " a[data-calendar=shortcut]").addClass("hide");
                      _this.setCompareInputValue();
                  } else {
                      $("#" + _this.container + " input[data-calelement=compare],#" + _this.container + " span[data-calelement=compare]").addClass("hide");
                      $("#" + _this.container + " a[data-calendar=shortcut]").removeClass("hide");
                  }
                  if (_this.ent && _this.ent.compare && typeof _this.ent.compare == "function") {
                      _this.ent.compare.call(_this.ent.context, _this.retdata, checked == "checked");
                  }
                  _this.isCompare = checked == "checked";
                  _this.close();
              });
          },
          setCompareInputValue: function setCompareInputValue() {
              var msec = this.getDate(this.retdata[0][1]) - this.getDate(this.retdata[0][0]);
              var diff = parseInt(msec / 1000 / 60 / 60 / 24);
              var end = new Date(this.getDate(this.retdata[0][0]));
              end.setDate(end.getDate() - 1);
              var start = new Date(end);
              start.setDate(start.getDate() - diff);
              this.retdata[1] = [this.getDateStr(start), this.getDateStr(end)];
              this.range_selected = [start, end];
              $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").eq(1).attr("data-value", this.range_selected[0] + "|" + this.range_selected[1]);
              $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").eq(1).val(this.retdata[1][0] + this.date_split + this.retdata[1][1]);
          },
          getViewDate: function getViewDate(months) {
              var val = $("#" + this.container + "_calendar" + " .day a").eq(20).attr("data-value");
              var view_sdate = new Date(val);
              view_sdate.setMonth(view_sdate.getMonth() + months);
              return view_sdate;
          },
          setHeadInputValue: function setHeadInputValue() {
              var start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
              var end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
              var input = $("#" + this.container + " input[data-thisinput=this_input]");
              switch (this.type) {
                  case "single":
                      input.val(start);
                      input.attr("data-value", this.range_selected[0] + "|" + this.range_selected[1]);
                      //this.tretdata = [this.range_selected[0],this.range_selected[1]];
                      break;
                  case "double":
                      var split = start && end ? this.date_split : "";
                      if (split) {
                          input.val(start + split + end);
                          input.attr("data-value", this.range_selected[0] + "|" + this.range_selected[1]);
                          //this.tretdata = [this.range_selected[0],this.range_selected[1]];
                      }
                      break;
              }
          },
          amendStartDate: function amendStartDate(sdate) {
              //用于点快捷方式，确认开始时间
              var sdate_init = this.range_select_init[0];
              if (sdate_init) {
                  //let sdate_date = this.getDate(sdate);
                  if (sdate < sdate_init) {
                      sdate = sdate_init;
                  }
                  //sdate = this.getDateStr(sdate);
              }
              return sdate;
          },
          isValidDate: function isValidDate() {
              var flag = true;
              var start = $("#" + this.container + "_calendar" + " input").eq(0).val();
              var end = $("#" + this.container + "_calendar" + " input").eq(1).val();
              if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(start) && /^\d{4}-\d{1,2}-\d{1,2}$/.test(end)) {
                  var date_start = this.getDate(start);
                  var date_end = this.getDate(end);
                  if (this.type == "single") {
                      date_end = date_start;
                  }
                  $("#" + this.container + "_calendar" + " input").eq(0).val(this.getDateStr(date_start));
                  $("#" + this.container + "_calendar" + " input").eq(1).val(this.getDateStr(date_end));
                  if (date_start > date_end) {
                      alert("开始时间大于结束时间");
                      return false;
                  }
                  if (this.range_select[0] && date_start < this.range_select[0]) {
                      alert("时间范围不正确，请在【" + this.getDateStr(this.range_select[0]) + this.date_split + (this.range_select[1] ? this.getDateStr(this.range_select[1]) : "") + "】之间选择");
                      return false;
                  }
                  if (this.range_select[1] && date_end > this.range_select[1]) {
                      alert("时间范围不正确，请在【" + (this.range_select[0] ? this.getDateStr(this.range_select[0]) : "") + this.date_split + this.getDateStr(this.range_select[1]) + "】之间选择");
                      return false;
                  }
                  this.range_selected[0] = date_start;
                  this.range_selected[1] = date_end;
                  this.setSelectedValue();
              } else {
                  alert("手动输入日期格式不正确，请按以下格式输入\"YYYY-MM-DD\"");
                  return false;
              }
              return flag;
          },
          setSelectedValue: function setSelectedValue() {
              //设置日历input框的值
              var start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
              var end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
              $("#" + this.container + "_calendar" + " input").eq(0).val(start);
              var endDom = $("#" + this.container + "_calendar" + " input").eq(1);
              endDom.val(end);
          },
          listDate: function listDate(flag, pdate) {
              //显示日期列表
              var retHTML = "";
              var list_date = this.range_selected[0] ? new Date(this.range_selected[0]) : new Date();
              list_date = flag ? pdate : list_date;
  
              //alert("list_date.getMonth() = " + list_date.getMonth());
              //alert("this.range_select_init[0].getMonth() = " + this.range_select_init[1].getMonth());
  
              //修复最大显示月份不能选择，则不显示。
              var lmonth = list_date.getMonth();
              //if(this.type=="single" &&!flag && this.sheet>1 && this.range_select_init[1] && (lmonth+this.sheet > this.range_select_init[1].getMonth()) && this.isSameMonth(this.range_selected[0],list_date)){
              if (this.stype == "scatter" && this.tretdata.length == 0 && !this.scatter_init) {
                  list_date.setMonth(lmonth - this.sheet + 1);
                  this.scatter_init = true;
              }
  
              for (var i = 0, ilength = this.sheet; i < ilength; i++) {
                  var year = list_date.getFullYear();
                  var month = list_date.getMonth();
                  retHTML += '<div class="list">' + '<div class="yearmonth">' + year + '年' + (month + 1) + '月</div>' + '<div>' + '<ul class="week"><li><a href="#">日</a></li><li><a href="#">一</a></li><li><a href="#">二</a></li><li><a href="#">三</a></li><li><a href="#">四</a></li><li><a href="#">五</a></li><li><a href="#">六</a></li></ul>' + '</div>' + '<div class="day">' + '<ul>';
                  var max_day = this.getMonthMaxDate(list_date);
                  var start_index = this.getWeekdayIndex(list_date);
                  var lihide = "";
                  for (var j = 0, jlength = 42; j < jlength; j++) {
                      var day = j - start_index + 1;
                      if (day > max_day) {
                          lihide = "hide";
                      }
                      if (j < start_index || day > max_day) {
                          day = "";
                      }
  
                      var this_date = day ? new Date(year, month, day) : "";
                      retHTML += '<li class="' + lihide + '"><a href="#" data-value="' + this_date + '" class="">' + day + '</a></li>';
                  }
                  retHTML += '</ul>' + '</div>' + '</div>';
                  list_date.setDate(1); //修复跨二月bug
                  list_date.setMonth(list_date.getMonth() + 1);
              }
              $("#" + this.container + "_calendar" + " div[data-calendar=list]").html(retHTML);
              this.setListDateState();
              this.setBeginningAndEnding();
  
              var _this = this;
              $("#" + this.container + "_calendar" + " div[data-calendar=list] a").on("click", function (e) {
                  e.preventDefault();
                  var val = $(this).attr("data-value");
                  var disabled = $(this).hasClass("disabled");
                  if (disabled || !val) {
                      return;
                  }
                  var date1 = new Date(val);
  
                  if (_this.stype) {
                      //散点选择日期
                      _this.type = _this.stype;
                  }
                  switch (_this.type) {
                      case "single":
                          $("#" + _this.container + "_calendar" + " div[data-calendar=list] a").removeClass("on").removeClass("selected").removeClass("beginning").removeClass("ending");
                          $("#" + _this.container + "_calendar" + " div[data-calendar=list] li").removeClass("beginning").removeClass("ending");
                          _this.range_selected = [date1, date1];
                          break;
                      case "double":
                          _this.selected_index++;
                          if (_this.selected_index % 2 == 0) {
                              //三个重选择
                              _this.range_selected = [date1];
                              $("#" + _this.container + "_calendar" + " div[data-calendar=list] a").removeClass("on").removeClass("selected").removeClass("beginning").removeClass("ending");
                              $("#" + _this.container + "_calendar" + " div[data-calendar=list] li").removeClass("beginning").removeClass("ending");
                              if (_this.select_rangday) {
                                  _this.setSelectedRangDay(date1);
                              }
                          } else {
                              if (_this.range_selected[0] > date1) {
                                  _this.range_selected.unshift(date1);
                              } else {
                                  _this.range_selected.push(date1);
                              }
                              if (_this.select_rangday) {
                                  _this.range_select = _this.range_select_init; //选择完成后，恢复始限定范围
                                  $("#" + _this.container + "_calendar" + " div[data-calendar=list] a").removeClass("disabled");
                              }
                              _this.setListDateState();
                              _this.setBeginningAndEnding();
                          }
                          break;
                      case "scatter":
                          if ($(this).hasClass("on")) {
                              $(this).removeClass("on").removeClass("selected");
                              _this.setTRetdata(date1, "remove");
                          } else {
                              $(this).addClass("on");
                              _this.setTRetdata(date1, "add");
                          }
                          return;
                          break;
                  }
                  $(this).addClass("on");
                  _this.setSelectedValue();
                  //日期点击事件
                  if (_this.ent && _this.ent.clickday && typeof _this.ent.clickday == "function" && _this.range_selected[0] && _this.range_selected[1]) {
                      if (_this.isValidDate()) {
                          _this.setRetdata();
                          _this.ent.clickday.call(_this.ent.context, _this.retdata);
                      }
                  }
                  if (_this.autosubmit && _this.range_selected[0] && _this.range_selected[1]) {
                      //自动提交，不用点确定
                      _this.setRetdata();
                      _this.close();
                      if (_this.ent && _this.ent.selected && typeof _this.ent.selected == "function") {
                          _this.ent.selected.call(_this.ent.context, _this.retdata);
                      }
                  }
              });
              //填写列表中input value
              $("#" + this.container + "_calendar .foot input[data-calendar=start]").val(this.getDateStr(this.range_selected[0]));
              $("#" + this.container + "_calendar .foot input[data-calendar=end]").val(this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "");
          },
          setTRetdata: function setTRetdata(date, opt) {
              //设置散点时间返回值
              var date1 = new Date(date); //字符换成日期
              switch (opt) {
                  case "add":
                      this.tretdata.push(date1);
                      break;
                  case "remove":
                      for (var i = 0, ilength = this.tretdata.length; i < ilength; i++) {
                          var idata = this.tretdata[i];
                          if (this.isSameDay(idata, date1)) {
                              //同一天
                              this.tretdata.splice(i, 1);
                              break;
                          }
                      }
                      break;
              }
          },
          setSelectedRangDay: function setSelectedRangDay(date) {
              var start_date = new Date(date);
              if (typeof this.select_rangday[0] == "number" && this.select_rangday[0] >= 0) {
                  start_date.setDate(start_date.getDate() - this.select_rangday[0]);
                  start_date = this.range_select[0] > start_date ? this.range_select[0] : start_date;
              } else {
                  start_date = this.range_select[0];
              }
              var end_date = new Date(date);
              if (typeof this.select_rangday[1] == "number" && this.select_rangday[1] >= 0) {
                  end_date.setDate(end_date.getDate() + this.select_rangday[1]);
                  end_date = this.range_select[1] < end_date ? this.range_select[1] : end_date;
              } else {
                  end_date = this.range_select[1];
              }
  
              $("#" + this.container + "_calendar" + " div[data-calendar=list] a").removeClass("disabled");
              $("#" + this.container + "_calendar" + " div[data-calendar=list] a").each(function (i) {
                  var val = $(this).attr("data-value");
                  if (!val) {
                      return;
                  }
                  var date1 = new Date(val);
  
                  if (end_date && date1 > end_date || start_date && date1 < start_date) {
                      $(this).addClass("disabled");
                  }
              });
              start_date = start_date ? start_date : this.range_select[0];
              end_date = end_date ? end_date : this.range_select[1];
              this.range_select = [start_date, end_date];
          },
          setListDateState: function setListDateState() {
              var _this = this;
              $("#" + this.container + "_calendar" + " div[data-calendar=list] a").each(function (i) {
                  var val = $(this).attr("data-value");
                  var date = val ? new Date(val) : "";
                  //隐藏空A
                  if (!val) {
                      $(this).addClass("hide");
                      return;
                  }
                  //设置选中
                  if (_this.isSelected(date)) {
                      $(this).addClass("selected");
                  }
                  //设置点击选中
                  if (_this.isOn(date)) {
                      $(this).addClass("on");
                  }
                  //设置不可选
                  if (_this.isDisabled(date, i)) {
                      $(this).addClass("disabled");
                  }
                  //设置今天
                  if (date && _this.isToday(date)) {
                      $(this).addClass("today");
                  }
  
                  //设置散点选中
                  if (_this.isSDSelected(date)) {
                      $(this).addClass("selected").addClass("on");
                  }
              });
          },
          setBeginningAndEnding: function setBeginningAndEnding() {
              if (this.type == "single") {
                  return;
              } //单选不进行起点终点设置
              var _this = this;
              if (!_this.range_selected[0] || !_this.range_selected[1]) {
                  return;
              }
              $("#" + this.container + "_calendar" + " div[data-calendar=list] a").each(function () {
                  var val = $(this).attr("data-value");
                  if (!val) {
                      return;
                  }
                  var cname = "";
                  if (_this.isSameDay(_this.range_selected[0], new Date(val))) {
                      cname = "beginning";
                  }
                  if (_this.isSameDay(_this.range_selected[1], new Date(val))) {
                      cname = _this.isSameDay(_this.range_selected[0], _this.range_selected[1]) ? "beginendsame" : "ending";
                  }
                  if (cname) {
                      $(this).addClass(cname);
                      $(this).parent().addClass(cname);
                      if (cname == "beginendsame") {
                          //选择同一天
                          $(this).addClass("ending");
                          $(this).parent().removeClass();
                      }
                  }
              });
          },
          close: function close(unreset) {
              //关闭窗口{reset_date:true,exe_selectedent:false}
              if (this.no_head) {
                  //console.log("close")
                  //$("#"+this.container).hide();
              } else {
                  $("#" + this.container + "_calendar").hide();
              }
          },
          setRetdata: function setRetdata() {
              this.retdata = [];
              var _this = this;
              this.setHeadInputValue();
              $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").each(function (i) {
                  var val = $(this).attr("data-value");
                  if (!val) {
                      return;
                  }
                  var start = val.split("|")[0],
                      end = val.split("|")[1];
                  _this.retdata.push([_this.getDateStr(new Date(start)), _this.getDateStr(new Date(end))]);
              });
              if (!this.is_shortcut) {
                  $("#" + this.container + " a[data-calendar=shortcut]").removeClass("shortcut_on"); //删除快捷方式选中
              }
              this.is_shortcut = false;
          },
          show: function show() {
              //显示窗口
              if (this.body_click) {
                  //用于收起列表
                  $("body").click();
              }
              if (this.no_head) {
                  //$("#"+this.container).show();
                  //console.log("show");
              } else {
                  $("#" + this.container + "_calendar" + "").show();
              }
  
              //初始化事件
              if (this.ent && this.ent.show && typeof this.ent.show == "function") {
                  this.ent.show.call(this.ent.context, this.retdata);
              }
          },
          isSameDay: function isSameDay(date1, date2) {
              return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
          },
          isSameMonth: function isSameMonth(date1, date2) {
              return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth();
          },
          isSDSelected: function isSDSelected(date) {
              //散点选中
              //date = new Date(date);
              var flag = false;
              for (var i = 0, ilength = this.tretdata.length; i < ilength; i++) {
                  var idata = this.tretdata[i];
                  if (this.isSameDay(idata, date)) {
                      //同一天
                      flag = true;
                      break;
                  }
              }
              return flag;
          },
          isSelected: function isSelected(date) {
              //设置已选择
              var flag = false;
              if (this.range_selected[0] && this.range_selected[1] && this.range_selected[0] <= date && this.range_selected[1] >= date) {
                  flag = true;
              } else if (this.range_selected[0] && date && this.range_selected[0].getTime() == date.getTime()) {
                  flag = true;
              }
              return flag;
          },
          isOn: function isOn(date) {
              //设置已选择
              var flag = false;
              if (this.range_selected[0] && date && this.range_selected[0].getTime() == date.getTime()) {
                  flag = true;
              }
              return flag;
          },
          isDisabled: function isDisabled(date, col) {
              //设置不可选
              var flag = false;
              col = col % 7;
              if (this.range_select[0] && this.range_select[0].getTime() > date.getTime() || this.range_select[1] && this.range_select[1].getTime() < date.getTime()) {
                  flag = true;
              }
              for (var i = 0, ilength = this.disabled_day.length; i < ilength; i++) {
                  //指定不可选择日期
                  var idata = this.disabled_day[i];
                  if (idata && this.isSameDay(this.getDate(idata), date)) {
                      flag = true;
                  }
              }
              flag = this.usagecol.charAt(col) == "0" ? true : flag;
              return flag;
          },
          isToday: function isToday(date) {
              //判断是否为今天
              var today = new Date();
              return this.isSameDay(today, date);
          },
          getWeekdayIndex: function getWeekdayIndex(date) {
              //获取月头一天为星期几
              var retdate = new Date(date.getFullYear(), date.getMonth(), 1);
              return retdate.getDay();
          },
          getMonthMaxDate: function getMonthMaxDate(date) {
              //获取月的最大天数
              var date_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
              var year = date.getFullYear();
              date_month[1] = 0 == year % 4 && (year % 100 != 0 || year % 400 == 0) ? 29 : date_month[1]; //润年
              return date_month[date.getMonth()];
          },
          remove: function remove() {
              $("#" + this.container).html("");
              $("#" + this.container + "_calendar").remove();
          }
      }
  };
  
  var _vueTemplateString = "<div class=\"v-calendar\" id=\"{{calendarId}}\">\n    <slot></slot>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/wgt-reg/edit', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _searchBox = require('/views/search-box');
  
  var _searchBox2 = _interopRequireDefault(_searchBox);
  
  var _inputSug = require('/views/input-sug');
  
  var _inputSug2 = _interopRequireDefault(_inputSug);
  
  var _calendar = require('/components/calendar/calendar');
  
  var _calendar2 = _interopRequireDefault(_calendar);
  
  var _index = require('/services/index');
  
  var _index2 = _interopRequireDefault(_index);
  
  var _getUrlParams = require('/kit/getUrlParams');
  
  var _getUrlParams2 = _interopRequireDefault(_getUrlParams);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'edit',
      components: {
          SearchBox: _searchBox2.default,
          InputSug: _inputSug2.default,
          Calendar: _calendar2.default
      },
      props: {},
      data: function data() {
          return {
              managers: [{ name: 'zjc', value: '1' }, { name: 'lhc', value: '2' }],
              name: '',
              nameSpace: '',
              tier2Manager: '',
              description: '',
              notificationMails: ''
          };
      },
  
      computed: {
          msg: function msg() {}
      },
      watch: {},
      events: {},
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
          this.compId = this.getCompId('compId');
          this.init1 = this.init().next();
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          init: regeneratorRuntime.mark(function init() {
              return regeneratorRuntime.wrap(function init$(_context) {
                  while (1) {
                      switch (_context.prev = _context.next) {
                          case 0:
                              _context.next = 2;
                              return this.getComp();
  
                          case 2:
                              this.compInfo = _context.sent;
  
                              this.loadInfo(compInfo);
  
                          case 4:
                          case 'end':
                              return _context.stop();
                      }
                  }
              }, init, this);
          }),
          getCompId: function getCompId(key) {
              return this.$route.query[key] || '';
          },
          getComp: function getComp() {
              var _this = this;
  
              var compId = this.getCompId('compId') ? this.getCompId('compId') : '';
              if (compId) {
                  _index2.default.getComponentAllInfo(compId).then(function (response) {
                      if (response.ok) {
                          _this.init1.next(response.json());
                      }
                  }).catch(function (error) {});
              }
          },
  
          /*加载初始信息，用于编辑*/
          loadInfo: function loadInfo(info) {
              window._u.extend(this, info);
          },
          save: function save() {
              var onlineDate = this.$refs.onlineDate.retdata[0][0];
              var name = this.name;
              var nameSpace = this.nameSpace;
              var notificationMails = this.notificationMails;
              var tier2Manager = this.tier2Manager;
              var description = this.description;
              if (!this.check()) {
                  return;
              }
              if (this.compId) {
                  _index2.default.updateComponent(this.compId, { name: name, nameSpace: nameSpace, notificationMails: notificationMails, tier2Manager: tier2Manager, description: description });
              } else {
                  _index2.default.addNewComponent({ name: name, nameSpace: nameSpace, notificationMails: notificationMails, tier2Manager: tier2Manager, description: description });
              }
          },
          check: function check() {
              return true;
          }
      }
  };
  
  var _vueTemplateString = "<div id=\"edit\" vuec1107=\"\">\n    <div class=\"pub-box-t\">\n        <h2><span>组件编辑</span></h2>\n    </div>\n    <div class=\"pub-box-c\">\n        <div class=\"moni-box moni-box-conf\">\n            <div class=\"moni-basic\">\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\">命名空间：</label>\n                    <div class=\"moni-elem-r moni-elem-rb\">\n                        <span class=\"selectbox\">\n                            <select id=\"f_namespace\" v-model=\"nameSpace\">\n                                <option value=\"\">请选择</option>\n                                <option value=\"{{v}}\" v-for=\"v in nameSpace\">{{v}}</option>\n                            </select>\n                            <i class=\"triangle\"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>组件名：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"f_name\" v-model=\"name\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label class=\"moni-label\" for=\"\"><em class=\"required\">*</em>上线日期：</label>\n                    <div class=\"moni-elem-r\">\n                        <div id=\"date_sel\">\n                            <calendar v-ref:online-date=\"\"></calendar>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>详细描述：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea verify\" id=\"f_description\" v-model=\"description\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"owner_manager\" class=\"moni-label\"><em class=\"required\">*</em>负责经理：</label>\n                    <div class=\"moni-elem-r\">\n                        <input-sug input-id=\"f_tier2_manager\" :sug-data=\"managers\" :input-value.sync=\"tier2Manager\"></input-sug>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>报警通知邮件列表：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"f_notification_mails\" class=\"input-text verify\" value=\"\" v-model=\"notificationMails\"></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"moni-submit\">\n            <a href=\"javascript:;\" class=\"btn-blue-m\" @click=\"save\"><span>保 存</span></a>\n            <a href=\"javascript:;\" class=\"btn-gray-m\"><span>取 消</span></a>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/wgt-reg/approve', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _inputSug = require('/views/input-sug');
  
  var _inputSug2 = _interopRequireDefault(_inputSug);
  
  var _calendar = require('/components/calendar/calendar');
  
  var _calendar2 = _interopRequireDefault(_calendar);
  
  var _index = require('/services/index');
  
  var _index2 = _interopRequireDefault(_index);
  
  var _getUrlParams = require('/kit/getUrlParams');
  
  var _getUrlParams2 = _interopRequireDefault(_getUrlParams);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }
  
  exports.default = {
      name: 'approve',
      components: {
          InputSug: _inputSug2.default,
          Calendar: _calendar2.default
      },
      props: {},
      data: function data() {
          return {
              managers: [{ name: 'zjc', value: '1' }, { name: 'lhc', value: '2' }],
              name: '',
              nameSpace: '',
              tier2Manager: '',
              description: '',
              notificationMails: '',
              actionComment: ''
          };
      },
  
      computed: {
          msg: function msg() {}
      },
      watch: {},
      events: {},
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
          this.compId = this.getCompId('compId');
          this.init1 = this.init().next();
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          getCompId: function getCompId(key) {
              return this.$route.query[key] || '';
          },
          init: regeneratorRuntime.mark(function init() {
              return regeneratorRuntime.wrap(function init$(_context) {
                  while (1) {
                      switch (_context.prev = _context.next) {
                          case 0:
                              _context.next = 2;
                              return this.getComp();
  
                          case 2:
                              this.compInfo = _context.sent;
  
                              this.loadInfo(compInfo);
  
                          case 4:
                          case 'end':
                              return _context.stop();
                      }
                  }
              }, init, this);
          }),
          initCo: function initCo() {
              return window.co(regeneratorRuntime.mark(function _callee() {
                  var result;
                  return regeneratorRuntime.wrap(function _callee$(_context2) {
                      while (1) {
                          switch (_context2.prev = _context2.next) {
                              case 0:
                                  _context2.next = 2;
                                  return this.getComp();
  
                              case 2:
                                  result = _context2.sent;
                                  return _context2.abrupt('return', result);
  
                              case 4:
                              case 'end':
                                  return _context2.stop();
                          }
                      }
                  }, _callee, this);
              }));
          },
          initAsync: function initAsync() {
              var _this = this;
  
              return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context3) {
                      while (1) {
                          switch (_context3.prev = _context3.next) {
                              case 0:
                              case 'end':
                                  return _context3.stop();
                          }
                      }
                  }, _callee2, _this);
              }))();
          },
  
          initA: regeneratorRuntime.mark(function initA() {
              return regeneratorRuntime.wrap(function initA$(_context4) {
                  while (1) {
                      switch (_context4.prev = _context4.next) {
                          case 0:
                          case 'end':
                              return _context4.stop();
                      }
                  }
              }, initA, this);
          }),
          getComp: function getComp() {
              var _this2 = this;
  
              var compId = this.getCompId('compId') ? this.getCompId('compId') : '';
              if (compId) {
                  _index2.default.getComponentAllInfo(compId).then(function (response) {
                      if (response.ok) {
                          _this2.init1.next(response.json());
                      }
                  }).catch(function (error) {});
              }
          },
          loadInfo: function loadInfo(info) {
              window._u.extend(this, info);
          },
          save: function save(action) {
              var onlineDate = this.$refs.onlineDate.retdata[0][0];
              var name = this.name;
              var nameSpace = this.nameSpace;
              var notificationMails = this.notificationMails;
              var tier2Manager = this.tier2Manager;
              var description = this.description;
              var actionComment = this.actionComment;
              if (!this.check()) {
                  return;
              }
              if (this.compId) {
                  _index2.default.setApprovalResult({
                      componentId: compId,
                      actionComment: actionComment,
                      oprator: oprator,
                      action: action
                  });
              } else {
                  _index2.default.addNewComponent({ name: name, nameSpace: nameSpace, notificationMails: notificationMails, tier2Manager: tier2Manager, description: description });
              }
          },
          check: function check() {
              if (!this.compId) {
                  return false;
              }
              return true;
          }
      }
  };
  
  var _vueTemplateString = "<div vuec1106=\"\">\n\n    <div class=\"pub-box-t\">\n        <h2><span>组件审核</span></h2>\n    </div>\n    <div class=\"pub-box-c\">\n        <div class=\"moni-box moni-box-conf\">\n            <div class=\"moni-basic\">\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\">命名空间：</label>\n                    <div class=\"moni-elem-r moni-elem-rb\">\n                        <span class=\"selectbox\">\n                            <select id=\"f_namespace\" v-model=\"nameSpace\">\n                                <option value=\"\">请选择</option>\n                                <option value=\"{{v}}\" v-for=\"v in nameSpace\">{{v}}</option>\n                            </select>\n                            <i class=\"triangle\"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>组件名：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"f_name\" v-model=\"name\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label class=\"moni-label\" for=\"\"><em class=\"required\">*</em>上线日期：</label>\n                    <div class=\"moni-elem-r\">\n                        <div id=\"date_sel\">\n                            <calendar v-ref:online-date=\"\"></calendar>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>详细描述：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea verify\" id=\"f_description\" v-model=\"description\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"owner_manager\" class=\"moni-label\"><em class=\"required\">*</em>负责经理：</label>\n                    <div class=\"moni-elem-r\">\n                        <input-sug input-id=\"f_tier2_manager\" :sug-data=\"managers\" :input-value.sync=\"tier2Manager\"></input-sug>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>报警通知邮件列表：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"f_notification_mails\" class=\"input-text verify\" value=\"\" v-model=\"notificationMails\"></div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>审核意见：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea verify\" id=\"f_action_comment\" v-model=\"actionComment\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"moni-submit\">\n            <a href=\"javascript:;\" class=\"btn-blue-m\" @click=\"save('APPROVE')\"><span>通 过</span></a>\n            <a href=\"javascript:;\" class=\"btn-gray-m\" @cancel=\"save('REJECT')\"><span>不通过</span></a>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/wgt-reg/myapprove', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _searchBox = require('/views/search-box');
  
  var _searchBox2 = _interopRequireDefault(_searchBox);
  
  var _page = require('/components/page/page');
  
  var _page2 = _interopRequireDefault(_page);
  
  var _index = require('/services/index');
  
  var _index2 = _interopRequireDefault(_index);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'list',
      components: {
          SearchBox: _searchBox2.default,
          Page: _page2.default
      },
      props: {},
      data: function data() {
          return {
              searchKeyword: '',
              page: 1, //page
              pageSize: 10, //pageSize,  default is 10
              total: 509, //total item count
              maxLink: 5, //how many links to show, must not less than 5,  default is 5
              // page change event name, default is 'page-change',
              // optional
              // for different pagenav, should use different name
              eventName: 'custom'
          };
      },
  
      computed: {
          msg: function msg() {}
      },
      watch: {},
      events: {
          custom: function custom(page) {
              this.page = page;
              console.log(page);
          }
      },
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          renderTbl: function renderTbl() {
              _index2.default.getComponentList({ status: status, creator: creator }).then(function (data) {}).catch(function (error) {});
          },
          search: function search(opt) {
              var value = opt.text;
              this.pageIndex = 1;
              this.pageRange = undefined;
              this.loadTbl();
          },
          pageHandler: function pageHandler(page) {
              //here you can do custom state update
              this.page = page;
          },
          changHash: function changHash(unit) {}
      }
  };
  
  var _vueTemplateString = "<div id=\"list\" vuec1105=\"\">\n    <div class=\"pub-box-t\">\n        <h2><span>我的申请</span></h2>\n        <div class=\"filter-list\">\n            <div class=\"filter-elem\" data-value=\"valid\">\n                <span class=\"filter-text\">状态：</span>\n                <span class=\"selectbox\">\n                    <select class=\"moni-selt\" id=\"valid\">\n                        <option value=\"\">全部</option>\n                        <option v-for=\"v in status\" value=\"{{v}}\">{{v}}</option>\n                    </select>\n                    <i class=\"triangle\"></i>\n                </span>\n            </div>\n            <search-box label=\"关键字\" placeholder=\"\" hint=\"搜索\" @search:text=\"search\" :text.sync=\"searchKeyword\"></search-box>\n        </div>\n    </div>\n    <div class=\"pub-box-c\">\n        <table class=\"index-tbl page-index-tbl\">\n            <colgroup>\n                <col class=\"col10\">\n                <col class=\"col10\">\n                <col class=\"col6\">\n                <col class=\"\">\n                <col class=\"col8\">\n                <col class=\"\">\n            </colgroup>\n            <thead>\n                <tr>\n                    <th>组件ID</th>\n                    <th>组件名</th>\n                    <th>组件版本</th>\n                    <th>申请日期</th>\n                    <th>等级</th>\n                    <th>操作</th>\n                </tr>\n            </thead>\n            <tbody id=\"indexTbody\">\n                <tr>\n                    <td class=\"f_code\">10001001</td>\n                    <td>运营流水</td>\n                    <td class=\"f_name\"><a href=\"/is/index_list/detail?id=1333\">测试已经事项</a></td>\n                    <td class=\"psr\">\n                        <div class=\"psrr\">\n                            <pre class=\"pre\" title=\"测试已经事项\">测试已经事项</pre>\n                        </div>\n                    </td>\n                    <td class=\"f_platform\">\n                        <div class=\"f_platform_cnt\"><a href=\"http://ph.baidu.com/dt\" target=\"_blank\">灯塔</a></div>\n                    </td>\n                    <td class=\"f_opt\">\n                        <div class=\"opt opt-bug\"><a href=\"javascript:;\" class=\"index-tbl-a index-bug\" data-code=\"10001001\" data-name=\"测试已经事项\">报错</a></div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div class=\"page-w\">\n            <!--Page-->\n            <page :page=\"page\" ,=\"\" :page-size=\"pageSize\" :total=\"total\" :max-link=\"maxLink\" :page-handler=\"pageHandler\" :create-url=\"changHash\"></page>\n        </div>\n\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/pg-reg/list', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _searchBox = require('/views/search-box');
  
  var _searchBox2 = _interopRequireDefault(_searchBox);
  
  var _page = require('/components/page/page');
  
  var _page2 = _interopRequireDefault(_page);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'list',
      components: {
          SearchBox: _searchBox2.default,
          Page: _page2.default
      },
      props: {},
      data: function data() {
          return {
              searchKeyword: '',
              page: 1, //page
              pageSize: 10, //pageSize,  default is 10
              total: 509, //total item count
              maxLink: 5, //how many links to show, must not less than 5,  default is 5
              // page change event name, default is 'page-change',
              // optional
              // for different pagenav, should use different name
              eventName: 'custom'
          };
      },
  
      computed: {
          slider: function slider() {}
      },
      watch: {},
      events: {
          custom: function custom(page) {
              this.page = page;
              console.log(page);
          }
      },
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          search: function search(opt) {
              var value = opt.text;
              this.pageIndex = 1;
              this.pageRange = undefined;
              this.loadTbl();
          },
          pageHandler: function pageHandler(page) {
              //here you can do custom state update
              this.page = page;
          },
          changHash: function changHash(unit) {}
      }
  };
  
  var _vueTemplateString = "<div id=\"list\" vuec1104=\"\">\n    <div class=\"pub-box-t\">\n        <h2><span>页面审核</span></h2>\n        <div class=\"filter-list\">\n            <search-box label=\"关键字\" placeholder=\"创建人/指标名称\" hint=\"搜索\" @search:text=\"search\" :text.sync=\"searchKeyword\"></search-box>\n        </div>\n    </div>\n    <div class=\"pub-box-c\">\n        <table class=\"index-tbl page-index-tbl\">\n            <colgroup>\n                <col class=\"col10\">\n                <col class=\"col10\">\n                <col class=\"col6\">\n                <col class=\"\">\n                <col class=\"col8\">\n                <col class=\"\">\n            </colgroup>\n            <thead>\n                <tr>\n                    <th>组件ID</th>\n                    <th>组件名</th>\n                    <th>组件版本</th>\n                    <th>申请日期</th>\n                    <th>等级</th>\n                    <th>操作</th>\n                </tr>\n            </thead>\n            <tbody id=\"indexTbody\">\n                <tr>\n                    <td class=\"f_code\">10001001</td>\n                    <td>运营流水</td>\n                    <td class=\"f_name\"><a href=\"/is/index_list/detail?id=1333\">测试已经事项</a></td>\n                    <td class=\"psr\">\n                        <div class=\"psrr\">\n                            <pre class=\"pre\" title=\"测试已经事项\">测试已经事项</pre>\n                        </div>\n                    </td>\n                    <td class=\"f_platform\">\n                        <div class=\"f_platform_cnt\"><a href=\"http://ph.baidu.com/dt\" target=\"_blank\">灯塔</a></div>\n                    </td>\n                    <td class=\"f_opt\">\n                        <div class=\"opt opt-bug\"><a href=\"javascript:;\" class=\"index-tbl-a index-bug\" data-code=\"10001001\" data-name=\"测试已经事项\">报错</a></div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div class=\"page-w\">\n            <!--Page-->\n            <page :page=\"page\" :page-size=\"pageSize\" :total=\"total\" :max-link=\"maxLink\" :page-handler=\"pageHandler\" :create-url=\"changHash\"></page>\n        </div>\n\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/file-add', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _actions = require('/views/vuex/actions');
  
  var actions = _interopRequireWildcard(_actions);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  exports.default = {
      name: 'file-add',
      props: {
          inputId: {
              type: String,
              default: function _default() {
                  return 'file-add-' + this.id;
              }
          }
      },
      vuex: {
          getters: {
              showSug1: function showSug1(state) {
                  return state.showSug1;
              }
          },
          actions: actions
      },
      data: function data() {
          return {
              id: parseInt(Math.random() * 1000 + 1000)
          };
      },
  
      watch: {
          text: function text(val) {}
      },
      events: {},
      ready: function ready() {
          this.$$el = $(this.$el);
          this.mixx();
          this.init();
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
  
          init: function init() {
              this.names(); //设置上传文件时的提示box里面的内容
              this.bindEvents();
          },
          names: function names() {
              this.$tipsBox = '<div class="fesc_line_botcont">';
              this.$uploading = '<span class="uploading">正在上传...</span>';
              this.$file_name = '<span class="file_name">{file_name}</span>';
              this.$transfering = '<span class="transfering">正在导入...</span>';
              this.$trans_suc = '<span class="trans_suc">导入审核中</span>';
              this.$trans_fail = '<span class="trans_fail">导入失败</span>';
              this.$trans_cancel = '<span class="trans_cancel">尚未导入</span>';
              this.$trans = '<span class="trans"><a href="#" class="trans_btn">导入数据</a></span>';
  
              //classname
              this.append_div = $('#botcont_box');
              this.$tipsBox_class = '.fesc_line_botcont';
              this.$uploading_class = '.uploading';
              this.$file_name_class = '.file_name';
              this.$transfering_class = '.transfering';
              this.$trans_suc_class = '.trans_suc';
              this.$trans_fail_class = '.trans_fail';
              this.$trans_cancel_class = '.trans_cancel';
              this.$trans_class = '.trans';
          },
          bindEvents: function bindEvents() {
              var _this2 = this;
  
              var _this = this;
              this.fileChange = false;
              //浏览文件后，文件名会随之改变
              $('#file_input_true').on('change', function () {
                  $('#file_input').val($(this).val());
                  $('#file_input_ipt').val($(this).val());
              });
              //点击文件输入框，算作一次重新提交
              $('#file_input_true').on('click', function () {
                  _this2.fileChange = true;
              });
              //提交
              $('#task_add').on('submit', function () {
                  _this2.uploadingShow();
                  _this2.fileChange = false;
                  //除了尚未导入的块保留，其他移走
                  $(_this2.$trans_suc_class).parent().remove();
                  $(_this2.$trans_fail_class).parent().remove();
              });
              //上传结果
              $("#iframe_upload_box").on("load", function () {
                  //removeloading;//移走正在上传
                  _this2.removeUploading();
                  uploadResult();
              });
              //导入数据按钮
              $('#botcont_box').find('.trans_btn').on('click', function () {
                  $(this).preventDefault();
                  var filename = $(this).parent().parent().find(_this.$file_name_class).html();
                  _this.importData(filename, $(this).parent().parent());
              });
          },
          //上传
          uploadResult: function uploadResult() {
              var iwindow = document.getElementById("iframe_upload_box");
              var data = JSON.parse(iwindow.contentWindow.document.getElementsByTagName('body')[0].innerHTML);
              var filename = data.file;
              if (!data.code) {
                  _this.filenameShow(filename);
                  _this.transWinPop('上传成功，是否导入数据？', filename);
              } else {
                  //上传失败
                  _this.alertWinPop('上传失败，请重新上传！', 0);
              }
          },
  
          transWinPop: function transWinPop(txt, filename) {
              //弹出窗口
              var _this = this;
              var $first_tips_box = this.append_div.find(this.$tipsBox_class).eq(0);
              this.$dialog({
                  props: {
                      content: '<div class="alert_content"><b class="icon_checked"></b><span>\' + ' + txt + ' + \'</span></div>',
                      title: '上传提示',
                      showFooter: {
                          showFooterConfirm: true,
                          showFooterCancel: true
                      },
                      callback: function callback(_ref) {
                          var data = _ref.data;
  
                          if (data.type == 'confirm') {
                              _this.importData(filename, $first_tips_box);
                          }
                          _this.dialog_alert.hide();
                          _this.transCancel($first_tips_box);
                      }
                  }
              }).show = true;
          },
          //导入数据
          importData: function importData(file_name, selector) {
              var _this = this;
              var url = '/ch/manager/ch_manager/do_import';
              if (PHPCONF.page != 'NA') {
                  url = '/ch/manager/ch_manager_pcwap/do_import/' + PHPCONF.page.toLowerCase();
              }
              var param = {
                  file: file_name
              };
              url += $.param(param);
              //效果展示
              _this.removeTransCancel(selector);
              _this.removeTransFail(selector);
              _this.transferingShow(selector);
  
              $.ajax({
                  type: 'GET',
                  url: url,
                  data: {},
                  dataType: 'json',
                  success: function success(data) {
                      _this.removeTransfering(selector);
                      if (!data.code) {
                          //导入成功
                          _this.alertWinPop('导入操作已进入审核阶段', 1);
                          _this.transSuc(selector);
                      } else {
                          //导入失败
                          _this.transFail(selector);
                          _this.alertWinPop(data.msg, 0);
                      }
                  },
                  error: function error() {
                      //removeloading
                      _this.removeTransfering(selector);
                      _this.transFail(selector);
                  }
              });
          },
          //各个tips的显示与消失;
          uploadingShow: function uploadingShow() {
              //正在上传...
              this.append_div.prepend(this.$tipsBox + this.$uploading + '</div>');
          },
          removeUploading: function removeUploading() {
              this.append_div.find(this.$tipsBox_class).eq(0).find(this.$uploading_class).remove();
          },
          filenameShow: function filenameShow(file_name) {
              this.append_div.find(this.$tipsBox_class).eq(0).prepend(this.$file_name.replace(/{file_name}/g, file_name));
          },
          transferingShow: function transferingShow(selector) {
              selector.append(this.$transfering);
          },
          removeTransfering: function removeTransfering(selector) {
              selector.find(this.$transfering_class).remove();
          },
          transSucShow: function transSucShow(selector) {
              selector.append(this.$trans_suc);
          },
          transFailShow: function transFailShow(selector) {
              selector.append(this.$trans_fail);
          },
          removeTransFail: function removeTransFail(selector) {
              selector.find(this.$trans_fail_class).remove();
          },
          transCancelShow: function transCancelShow(selector) {
              selector.append(this.$trans_cancel);
          },
          removeTransCancel: function removeTransCancel(selector) {
              selector.find(this.$trans_cancel_class).remove();
          },
          transShow: function transShow(selector) {},
          removeTrans: function removeTrans(selector) {
              selector.find(this.$trans_class).remove();
          },
          //导入数据成功，显示
          transSuc: function transSuc(selector) {
              this.removeTrans(selector);
              this.removeTransfering(selector);
              this.removeTransCancel(selector);
              this.transSucShow(selector);
          },
          //取消导入数据，显示
          transCancel: function transCancel(selector) {
              this.transCancelShow(selector);
              this.transShow(selector);
          },
          //导入数据失败，显示
          transFail: function transFail(selector) {
              this.removeTransCancel(selector);
              if (selector.find(this.$trans_class).length != 0) {
                  selector.find(this.$trans_class).remove();
              }
              this.transFailShow(selector);
          },
          alertWinPop: function alertWinPop(txt, flag) {
              //弹窗
              this.$dispatch('file:dialog:show', { vue: this, data: { flag: flag, txt: txt } });
          }
      }
  }; /*带有suggest的输入框*/
  
  var _vueTemplateString = "<div vuec1094=\"\" id=\"{{fileId}}\">\n    <div class=\"batch-add\">\n        <form id=\"task_add\" target=\"iframe_upload_box\" method=\"post\" action=\"/ch/manager/ch_manager/do_upload\" enctype=\"multipart/form-data\">\n            <div class=\"fesc_line\">\n                <div class=\"input_sec\">\n                    <div class=\"file_upload_box\">\n                        <input type=\"text\" value=\"\" class=\"file_ubox_input\" id=\"file_input\" placeholder=\"请选择文件\">\n                        <input type=\"button\" value=\"浏览\" class=\"file_ubox_btn\" id=\"file_find\">\n                        <input type=\"file\" class=\"file_ubox_true\" id=\"file_input_true\" name=\"userfile\">\n                        <button type=\"submit\" class=\"btn btn_blue\" id=\"file_upload\">上传</button>\n                        <input type=\"hidden\" id=\"file_input_ipt\" value=\"\">\n                    </div>\n                </div>\n            </div>\n        </form>\n\n        <div class=\"fesc_line_botcont_box\" id=\"botcont_box\">\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/pg-reg/edit', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _searchBox = require('/views/search-box');
  
  var _searchBox2 = _interopRequireDefault(_searchBox);
  
  var _inputSug = require('/views/input-sug');
  
  var _inputSug2 = _interopRequireDefault(_inputSug);
  
  var _dialog = require('/components/dialog/dialog');
  
  var _dialog2 = _interopRequireDefault(_dialog);
  
  var _fileAdd = require('/views/log/file-add');
  
  var _fileAdd2 = _interopRequireDefault(_fileAdd);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'edit',
      components: {
          SearchBox: _searchBox2.default,
          InputSug: _inputSug2.default,
          FileAdd: _fileAdd2.default,
          Dialog: _dialog2.default
      },
      props: {},
      data: function data() {
          return {
              msg: 'hello vue',
              managers: [{ name: 'zjc', value: '1' }, { name: 'lhc', value: '2' }],
              showFileDialog: false
          };
      },
  
      computed: {
          slider: function slider() {}
      },
      watch: {},
      events: {},
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
          var ifr = '<iframe id="iframe_upload_box" width="0" height="0" style="display: none" name="iframe_upload_box" src="">\n                    <html>\n                        <head></head>\n                        <body></body>\n                    </html>\n                </iframe>';
          this.$('.batch_add').append(ifr);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          }
      }
  };
  
  var _vueTemplateString = "<div id=\"edit\" vuec1103=\"\">\n    <div class=\"pub-box-t\">\n        <h2><span>页面编辑</span></h2>\n    </div>\n    <div class=\"pub-box-c\">\n        <div class=\"moni-box moni-box-conf\">\n            <div class=\"moni-basic\">\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\">日志归属：</label>\n                    <div class=\"moni-elem-r moni-elem-rb\">\n                        <span class=\"selectbox\">\n                            <select id=\"\"><option value=\"1\">运营流水</option><option value=\"2\">优惠金额</option><option value=\"3\">用户</option><option value=\"4\">销量</option><option value=\"5\">退款</option><option value=\"6\">渗透率</option><option value=\"7\">门店数</option><option value=\"8\">库存</option><option value=\"9\">价格</option><option value=\"10\">业绩流水</option><option value=\"11\">毛利率</option><option value=\"12\">团单</option><option value=\"13\">ROI</option></select>\n                            <i class=\"triangle\"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>页面埋点：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>页面名称：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\">组件（业务线）归属：</label>\n                    <div class=\"moni-elem-r moni-elem-rb\">\n                        <span class=\"selectbox\">\n                            <select id=\"\">\n                                <option value=\"1\">运营流水</option><option value=\"2\">优惠金额</option><option value=\"3\">用户</option><option value=\"4\">销量</option><option value=\"5\">退款</option><option value=\"6\">渗透率</option><option value=\"7\">门店数</option><option value=\"8\">库存</option><option value=\"9\">价格</option><option value=\"10\">业绩流水</option><option value=\"11\">毛利率</option><option value=\"12\">团单</option><option value=\"13\">ROI</option></select>\n                            <i class=\"triangle\"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label class=\"moni-label\" for=\"\"><em class=\"required\">*</em>上线日期：</label>\n                    <div class=\"moni-elem-r\">\n                        <div id=\"date_sel\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                    </div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>页面描述：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea verify\" id=\"\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n                <div class=\"moni-elem moni-elem-upld\">\n                    <label for=\"owner_manager\" class=\"moni-label\"><em class=\"required\">*</em>页面截图：</label>\n                    <div class=\"moni-elem-r\">\n                        <file-add></file-add>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>负责经理：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>RD Owner：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>所属业务线：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"moni-submit\">\n            <a href=\"javascript:;\" class=\"btn-blue-m\"><span>保 存</span></a>\n            <a href=\"javascript:;\" class=\"btn-gray-m\"><span>取 消</span></a>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/pg-reg/approve', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.default = {
      name: 'approve',
      props: {},
      data: function data() {
          return {
              msg: 'hello vue'
          };
      },
  
      computed: {
          slider: function slider() {}
      },
      watch: {},
      events: {},
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      components: {},
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          }
      }
  };
  
  var _vueTemplateString = "<div vuec1102=\"\">\n\n    <div class=\"pub-box-t\">\n        <h2><span>页面审核</span></h2>\n    </div>\n    <div class=\"pub-box-c\">\n        <div class=\"moni-box moni-box-conf\">\n            <div class=\"moni-basic\">\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\">组件ID：</label>\n                    <div class=\"moni-elem-r moni-elem-rb\">\n                        <span class=\"selectbox\">\n                            <select id=\"\"><option value=\"1\">运营流水</option><option value=\"2\">优惠金额</option><option value=\"3\">用户</option><option value=\"4\">销量</option><option value=\"5\">退款</option><option value=\"6\">渗透率</option><option value=\"7\">门店数</option><option value=\"8\">库存</option><option value=\"9\">价格</option><option value=\"10\">业绩流水</option><option value=\"11\">毛利率</option><option value=\"12\">团单</option><option value=\"13\">ROI</option></select>\n                            <i class=\"triangle\"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>组件版本：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label class=\"moni-label\" for=\"\"><em class=\"required\">*</em>上线日期：</label>\n                    <div class=\"moni-elem-r\"><div id=\"date_sel\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div></div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>发版说明：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea verify\" id=\"\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>负责经理：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>RD Owner：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>所属业务线：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>审核意见：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea\" id=\"\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"moni-submit\">\n            <a href=\"javascript:;\" class=\"btn-blue-m\"><span>保 存</span></a>\n            <a href=\"javascript:;\" class=\"btn-gray-m\"><span>取 消</span></a>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/md-reg/list', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _searchBox = require('/views/search-box');
  
  var _searchBox2 = _interopRequireDefault(_searchBox);
  
  var _page = require('/components/page/page');
  
  var _page2 = _interopRequireDefault(_page);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'list',
      components: {
          SearchBox: _searchBox2.default,
          Page: _page2.default
      },
      props: {},
      data: function data() {
          return {
              searchKeyword: '',
              page: 1, //page
              pageSize: 10, //pageSize,  default is 10
              total: 509, //total item count
              maxLink: 5, //how many links to show, must not less than 5,  default is 5
              // page change event name, default is 'page-change',
              // optional
              // for different pagenav, should use different name
              eventName: 'custom'
          };
      },
  
      computed: {
          slider: function slider() {}
      },
      watch: {},
      events: {
          custom: function custom(page) {
              this.page = page;
              console.log(page);
          }
      },
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          search: function search(opt) {
              var value = opt.text;
              this.pageIndex = 1;
              this.pageRange = undefined;
              this.loadTbl();
          },
          pageHandler: function pageHandler(page) {
              //here you can do custom state update
              this.page = page;
          },
          changHash: function changHash(unit) {}
      }
  };
  
  var _vueTemplateString = "<div id=\"list\" vuec1101=\"\">\n    <div class=\"pub-box-t\">\n        <h2><span>埋点审核列表</span></h2>\n        <div class=\"filter-list\">\n            <search-box label=\"关键字\" placeholder=\"创建人/指标名称\" hint=\"搜索\" @search:text=\"search\" :text.sync=\"searchKeyword\"></search-box>\n        </div>\n    </div>\n    <div class=\"pub-box-c\">\n        <table class=\"index-tbl page-index-tbl\">\n            <colgroup>\n                <col class=\"col10\">\n                <col class=\"col10\">\n                <col class=\"col6\">\n                <col class=\"\">\n                <col class=\"col8\">\n                <col class=\"\">\n            </colgroup>\n            <thead>\n                <tr>\n                    <th>组件ID</th>\n                    <th>组件名</th>\n                    <th>组件版本</th>\n                    <th>申请日期</th>\n                    <th>等级</th>\n                    <th>操作</th>\n                </tr>\n            </thead>\n            <tbody id=\"indexTbody\">\n                <tr>\n                    <td class=\"f_code\">10001001</td>\n                    <td>运营流水</td>\n                    <td class=\"f_name\"><a href=\"/is/index_list/detail?id=1333\">测试已经事项</a></td>\n                    <td class=\"psr\">\n                        <div class=\"psrr\">\n                            <pre class=\"pre\" title=\"测试已经事项\">测试已经事项</pre>\n                        </div>\n                    </td>\n                    <td class=\"f_platform\">\n                        <div class=\"f_platform_cnt\"><a href=\"http://ph.baidu.com/dt\" target=\"_blank\">灯塔</a></div>\n                    </td>\n                    <td class=\"f_opt\">\n                        <div class=\"opt opt-bug\"><a href=\"javascript:;\" class=\"index-tbl-a index-bug\" data-code=\"10001001\" data-name=\"测试已经事项\">报错</a></div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n\n        <div class=\"page-w\">\n            <!--Page-->\n            <page :page=\"page\" :page-size=\"pageSize\" :total=\"total\" :max-link=\"maxLink\" :page-handler=\"pageHandler\" :create-url=\"changHash\"></page>\n        </div>\n\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/md-reg/edit', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _searchBox = require('/views/search-box');
  
  var _searchBox2 = _interopRequireDefault(_searchBox);
  
  var _inputSug = require('/views/input-sug');
  
  var _inputSug2 = _interopRequireDefault(_inputSug);
  
  var _dialog = require('/components/dialog/dialog');
  
  var _dialog2 = _interopRequireDefault(_dialog);
  
  var _fileAdd = require('/views/log/file-add');
  
  var _fileAdd2 = _interopRequireDefault(_fileAdd);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
      name: 'edit',
      components: {
          SearchBox: _searchBox2.default,
          InputSug: _inputSug2.default,
          Dialog: _dialog2.default,
          FileAdd: _fileAdd2.default
      },
      props: {},
      data: function data() {
          return {
              msg: 'hello vue',
              managers: [{ name: 'zjc', value: '1' }, { name: 'lhc', value: '2' }]
          };
      },
  
      computed: {
          slider: function slider() {}
      },
      watch: {},
      events: {},
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
  
          /*添加埋点*/
          addMd: function addMd() {
              var l = this.$('[data-elems=mdv]').length;
              var id = l;
              var tpl = '<div class="moni-elem-md" data-elems="md"><input type="text" id="mdv' + id + '" data-elems="mdv"\nclass="input-text verify"\nvalue=""\nplaceholder="key=value格式"></div>';
              this.$('[data-elems=md]').last().after(tpl);
          },
          save: function save() {},
          cancel: function cancel() {}
      }
  };
  
  var _vueTemplateString = "<div id=\"edit\" vuec1100=\"\">\n    <div class=\"pub-box-t\">\n        <h2><span>新增埋点</span></h2>\n    </div>\n    <div class=\"pub-box-c\">\n        <div class=\"moni-box moni-box-conf\">\n            <div class=\"moni-basic\">\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\">日志归属：</label>\n                    <div class=\"moni-elem-r moni-elem-rb\">\n                        <span class=\"selectbox\">\n                            <select id=\"\"><option value=\"1\">运营流水</option><option value=\"2\">优惠金额</option><option value=\"3\">用户</option><option value=\"4\">销量</option><option value=\"5\">退款</option><option value=\"6\">渗透率</option><option value=\"7\">门店数</option><option value=\"8\">库存</option><option value=\"9\">价格</option><option value=\"10\">业绩流水</option><option value=\"11\">毛利率</option><option value=\"12\">团单</option><option value=\"13\">ROI</option></select>\n                            <i class=\"triangle\"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>埋点值：</label>\n                    <div class=\"moni-elem-r\">\n                        <div class=\"moni-elem-md\" data-elems=\"md\">\n                            <input type=\"text\" id=\"mdv\" data-elems=\"mdv\" class=\"input-text verify\" value=\"\" placeholder=\"key=value\">\n\n                        </div>\n                        <div class=\"md-val\">\n                            <a href=\"javascript:;\" class=\"md-val-add\" @click.prevent=\"addMd\"><i></i>添加埋点</a>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label class=\"moni-label\" for=\"\"><em class=\"required\">*</em>上线日期：</label>\n                    <div class=\"moni-elem-r\">\n                        <div id=\"date_sel\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                    </div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>埋点描述：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea verify\" id=\"\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n                <div class=\"moni-elem moni-elem-upld\">\n                    <label for=\"owner_manager\" class=\"moni-label\"><em class=\"required\">*</em>埋点截图：</label>\n                    <div class=\"moni-elem-r\">\n                        <file-add></file-add>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"owner_manager\" class=\"moni-label\"><em class=\"required\">*</em>负责经理：</label>\n                    <div class=\"moni-elem-r\">\n                        <input-sug input-id=\"owner_manager\" :sug-data=\"managers\"></input-sug>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>RD Owner：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>所属业务线：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n\n            </div>\n        </div>\n        <div class=\"moni-submit\">\n            <a href=\"javascript:;\" class=\"btn-blue-m\" @click=\"save\"><span>保 存</span></a>\n            <a href=\"javascript:;\" class=\"btn-gray-m\" @click=\"cancel\"><span>取 消</span></a>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/md-reg/approve', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  exports.default = {
      name: 'approve',
      props: {},
      data: function data() {
          return {
              msg: 'hello vue'
          };
      },
  
      computed: {
          slider: function slider() {}
      },
      watch: {},
      events: {},
      compiled: function compiled() {},
      ready: function ready() {
          this.$$el = $(this.$el);
      },
  
      components: {},
      methods: {
          $: function $(selector) {
              return this.$$el.find(selector);
          },
          cancel: function cancel() {},
          save: function save() {}
      }
  };
  
  var _vueTemplateString = "<div vuec1099=\"\">\n\n    <div class=\"pub-box-t\">\n        <h2><span>埋点审核</span></h2>\n    </div>\n    <div class=\"pub-box-c\">\n        <div class=\"moni-box moni-box-conf\">\n            <div class=\"moni-basic\">\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\">组件ID：</label>\n                    <div class=\"moni-elem-r moni-elem-rb\">\n                        <span class=\"selectbox\">\n                            <select id=\"\"><option value=\"1\">运营流水</option><option value=\"2\">优惠金额</option><option value=\"3\">用户</option><option value=\"4\">销量</option><option value=\"5\">退款</option><option value=\"6\">渗透率</option><option value=\"7\">门店数</option><option value=\"8\">库存</option><option value=\"9\">价格</option><option value=\"10\">业绩流水</option><option value=\"11\">毛利率</option><option value=\"12\">团单</option><option value=\"13\">ROI</option></select>\n                            <i class=\"triangle\"></i>\n                        </span>\n                    </div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>组件版本：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label class=\"moni-label\" for=\"\"><em class=\"required\">*</em>上线日期：</label>\n                    <div class=\"moni-elem-r\"><div id=\"date_sel\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div></div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>发版说明：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea verify\" id=\"\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>负责经理：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>RD Owner：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>所属业务线：</label>\n                    <div class=\"moni-elem-r\"><input type=\"text\" id=\"\" class=\"input-text verify\" value=\"\"></div>\n                </div>\n                <div class=\"moni-elem moni-elem-txarea\">\n                    <label for=\"\" class=\"moni-label\"><em class=\"required\">*</em>审核意见：</label>\n                    <div class=\"moni-elem-r\"><textarea class=\"txarea\" id=\"\" placeholder=\"\" cols=\"30\" rows=\"5\"></textarea></div>\n                </div>\n            </div>\n        </div>\n        <div class=\"moni-submit\">\n            <a href=\"javascript:;\" class=\"btn-blue-m\" @click=\"save\"><span>保 存</span></a>\n            <a href=\"javascript:;\" class=\"btn-gray-m\" @click=\"cancel\"><span>取 消</span></a>\n        </div>\n    </div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);

});

define('/views/log/log', function(require, exports, module) {

  'use strict';
  
  var _console; /**
                 * @file
                 * @author zhujianchen@baidu.com
                 */
  
  
  var _store = require('/views/vuex/store');
  
  var _store2 = _interopRequireDefault(_store);
  
  var _actions = require('/views/vuex/actions');
  
  var actions = _interopRequireWildcard(_actions);
  
  var _topnav = require('/views/topnav');
  
  var _topnav2 = _interopRequireDefault(_topnav);
  
  var _mainsubnav = require('/views/mainsubnav');
  
  var _mainsubnav2 = _interopRequireDefault(_mainsubnav);
  
  var _sidebar = require('/views/sidebar');
  
  var _sidebar2 = _interopRequireDefault(_sidebar);
  
  var _menu = require('/views/menu');
  
  var _menu2 = _interopRequireDefault(_menu);
  
  var _index = require('/components/phiselecter/index');
  
  var _index2 = _interopRequireDefault(_index);
  
  require('/kit/filters/trim');
  
  var _dialog = require('/components/dialog/dialog');
  
  var _dialog2 = _interopRequireDefault(_dialog);
  
  var _dialogPlugin = require('/components/dialog/dialog-plugin');
  
  var _dialogPlugin2 = _interopRequireDefault(_dialogPlugin);
  
  var _getUrlParams = require('/kit/getUrlParams');
  
  var _getUrlParams2 = _interopRequireDefault(_getUrlParams);
  
  require('/kit/partial');
  
  var _bluebird = require('/node_modules/bluebird/js/browser/bluebird');
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _list = require('/views/log/wgt-reg/list');
  
  var _list2 = _interopRequireDefault(_list);
  
  var _edit = require('/views/log/wgt-reg/edit');
  
  var _edit2 = _interopRequireDefault(_edit);
  
  var _approve = require('/views/log/wgt-reg/approve');
  
  var _approve2 = _interopRequireDefault(_approve);
  
  var _myapprove = require('/views/log/wgt-reg/myapprove');
  
  var _myapprove2 = _interopRequireDefault(_myapprove);
  
  var _list3 = require('/views/log/pg-reg/list');
  
  var _list4 = _interopRequireDefault(_list3);
  
  var _edit3 = require('/views/log/pg-reg/edit');
  
  var _edit4 = _interopRequireDefault(_edit3);
  
  var _approve3 = require('/views/log/pg-reg/approve');
  
  var _approve4 = _interopRequireDefault(_approve3);
  
  var _list5 = require('/views/log/md-reg/list');
  
  var _list6 = _interopRequireDefault(_list5);
  
  var _edit5 = require('/views/log/md-reg/edit');
  
  var _edit6 = _interopRequireDefault(_edit5);
  
  var _approve5 = require('/views/log/md-reg/approve');
  
  var _approve6 = _interopRequireDefault(_approve5);
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
  
  '';
  
  window.Vue.config.debug = true;
  window.Vue.config.devtools = true;
  window.Vue.use(window.VueResource);
  window.Vue.use(window.VueRouter);
  window.Vue.use(_dialogPlugin2.default);
  window._u = window._.noConflict();
  window._l = window._;
  
  window.Vue.mixin({
      ready: function ready() {
          var myOption = this.$options.myOption;
          if (myOption) {}
      },
      methods: {
          mixx: function mixx() {}
      }
  });
  
  var router = void 0;
  /*定义*/
  var App = Vue.extend({
      myOption: 'hello',
      components: {
          TopNav: _topnav2.default,
          MainSubNav: _mainsubnav2.default,
          Dialog: _dialog2.default,
          Sidebar: _sidebar2.default,
          Menu: _menu2.default
      },
      events: {
          'file:dialog:show': function fileDialogShow(_ref) {
              var data = _ref.data;
  
              this.showFileDialog = true;
              var flag = data.flag;
              var txt = data.txt;
              this.FileaddContent = flag === 0 ? '<div class="alert_content"><b class="icon_false"></b><span>' + txt + '</span></div>' : '<div class="alert_content"><b class="icon_checked"></b><span>' + txt + '</span></div>';
          }
      },
      props: {
          name: String
      },
      store: _store2.default,
      vuex: {
          actions: actions
      },
      data: function data() {
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
      created: function created() {},
      beforeCompile: function beforeCompile() {},
      compiled: function compiled() {},
      ready: function ready() {
          var _this = this;
  
          this.$http.get('/ch/manager/ch_manager/get_user_data').then(function (response) {
              if (response.ok) {
                  var data = response.json();
                  if (!data.errno) {
                      _this.loginName = data.login_name;
                      _this.rootPath = data.root_path;
                  }
              }
          }, function (error) {
              return;
          });
      },
  
      methods: {
          init: function init() {}
      }
  });
  
  /**路由选项*/
  router = new window.VueRouter({
      linkActiveClass: 'on'
  });
  
  router.on('/', { component: _list2.default }).map({
      '/wgt-list': {
          component: _list2.default
      },
      '/wgt-edit': {
          component: _edit2.default
      },
      '/wgt-approve': {
          component: function component(resolve) {
              resolve(_approve2.default);
          }
      },
      '/wgt-myapprove': {
          component: _myapprove2.default
      },
      '/pg-list': {
          component: _list4.default
      },
      '/pg-edit': {
          component: _edit4.default
      },
      '/pg-approve': {
          component: function component(resolve) {
              resolve(_approve4.default);
          }
      },
      '/md-list': {
          component: _list6.default
      },
      '/md-edit': {
          component: _edit6.default
      },
      '/md-approve': {
          component: function component(resolve) {
              resolve(_approve6.default);
          }
      }
  });
  
  /*到这里才new了App实例*/
  router.start(App, '#app');
  router.app.init();
  
  new _bluebird2.default(function () {
      console.log('bluebird');
  });
  function task(arg, callback) {
      // 模拟异步任务
      Thenjs.nextTick(function () {
          callback(null, arg);
      });
  }
  var ThenJS = window.Thenjs;
  ThenJS(function (cont) {
      task(10, cont);
  }, true).then(function (cont, arg) {
      console.log(arg);
      cont(new Error('error!'), 123);
  }).fin(function (cont, error, result) {
      console.log(error, result);
      cont();
  }).each([0, 1, 2], function (cont, value) {
      task(value * 2, cont); // 并行执行队列任务，把队列 list 中的每一个值输入到 task 中运行
  }).then(function (cont, result) {
      console.log(result);
      cont();
  }).series([// 串行执行队列任务
  function (cont) {
      task(88, cont);
  }, // 队列第一个是异步任务
  function (cont) {
      cont(null, 99);
  } // 第二个是同步任务
  ]).then(function (cont, result) {
      console.log(result);
      cont(new Error('error!!'));
  }).fail(function (cont, error) {
      // 通常应该在链的最后放置一个 `fail` 方法收集异常
      console.log(error);
      console.log('DEMO END!');
  });
  
  var cobu = window.co.wrap(regeneratorRuntime.mark(function _callee(bu) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
              switch (_context.prev = _context.next) {
                  case 0:
                      return _context.abrupt('return', 'Hello ' + bu);
  
                  case 1:
                  case 'end':
                      return _context.stop();
              }
          }
      }, _callee, this);
  }));
  
  console.log(cobu('bbb').then(function (value) {
      console.log(value);
  }));
  console.log(Reflect.has(Object, 'assign'));
  
  function add() {
      var sum = 0;
  
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
          values[_key] = arguments[_key];
      }
  
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
  
      try {
          for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var val = _step.value;
  
              sum += val;
          }
      } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
      } finally {
          try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
              }
          } finally {
              if (_didIteratorError) {
                  throw _iteratorError;
              }
          }
      }
  
      return sum;
  }
  
  add(2, 5, 3); // 10
  (_console = console).log.apply(_console, [1].concat([2, 3, 4], [5]));
  
  function checkout(_ref2) {
      var state = _ref2.state;
  
      var savedCartItems = [].concat(_toConsumableArray(state.cart.added));
  }
  checkout({ state: {
          cart: {
              added: [{ name: 1 }, { name: 2 }]
          }
      } });

});

//# sourceMappingURL=/static/target/log/static/log.js.map