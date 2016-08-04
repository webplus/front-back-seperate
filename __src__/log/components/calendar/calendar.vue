<style lang="scss" scoped>
    @charset "utf-8";
    $imgPath: '../../styles/img';
    /* CSS Document */
    .calendar p, .calendar ul, .calendar li {
        margin: 0;
        padding: 0;
    }

    .calendar_head {
    }

    .calendar_head label, .calendar_head span {
        margin: 0;
        padding: 0;
    }

    .calendar_head .hide {
        display: none;
    }

    .calendar_head .calendar_date {
        border: 1px solid #d8d8d8;
        background: #f5f5f5;
        height: 29px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        padding: 0 35px 0 3px;
        border-radius: 2px;
        background: url(#{$imgPath}/icon_con_date.jpg) no-repeat 94% 50%;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        font-family: "微软雅黑";
        cursor: pointer;
        margin: 0;
        color: #3d495d;
    }

    .calendar_head a.shortcut_on {
        background: #527ec0;
        color: #FFF
    }

    .calendar_head .shortcut {
        color: #7179c5;
        text-decoration: none;
        margin: 0 0 0 10px;
        line-height: 30px;
        font-family: "微软雅黑";
    }

    .calendar_head .shortcut:hover {
        text-decoration: underline;
    }

    .calendar_head .calendar_date_single {
        width: 100px;
    }

    .calendar_head .btn_calendarcompare {
        border: 1px solid #d8d8d8;
        display: inline-block;
        position: relative;
        bottom: 0px;
        height: 29px;
        line-height: 29px;
        font-size: 14px;
        margin: 0 0 0 6px;
        padding: 0px 5px 0;
        background: url(#{$imgPath}/input_calendar.jpg) no-repeat center left;
    }

    .calendar_head .btn_calendarcompare input {
        position: relative;
        top: 2px;
    }

    .calendar_head .calendar_date_double {
        width: 180px;
    }

    .calendar ul, .calendar li {
        list-style: none;
    }

    .calendar a {
        text-decoration: none;
        color: #333;
    }

    .calendar {
        border: 1px solid #cccccc;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
        width: auto;
        font: 12px Arial, Helvetica, sans-serif;
        position: absolute;
        top: 0;
        left: 0;
        background: #FFF;
        z-index: 999;
    }

    .calendar .head {
        width: auto;
        overflow: hidden;
        zoom: 1;
        font-family: Tahoma, Geneva, sans-serif;
    }

    .calendar .head a {
        color: #999;
    }

    .calendar .head a:hover {
        color: #6590c1;
    }

    .calendar .head .prev {
        position: absolute;
        left: 8px;
        top: 8px;
    }

    .calendar .head .prev a {
        display: block;
        float: left;
        width: 25px;
        height: 25px;
        text-indent: 50px;
        overflow: hidden;
    }

    .calendar .head .prev a.btn_prevmonth {
        background: url(#{$imgPath}/btn_prevmonth.jpg) no-repeat;
    }

    .calendar .head .prev a.btn_prevmonth:hover {
        background: url(#{$imgPath}/btn_prevmonthhover.jpg) no-repeat;
    }

    .calendar .head .prev a.btn_prevyear {
        background: url(#{$imgPath}/btn_prevyear.jpg) no-repeat;
    }

    .calendar .head .prev a.btn_prevyear:hover {
        background: url(#{$imgPath}/btn_prevyearhover.jpg) no-repeat;
    }

    .calendar .head .next {
        position: absolute;
        right: 8px;
        top: 8px;
    }

    .calendar .head .next a {
        display: block;
        float: left;
        width: 25px;
        height: 25px;
        text-indent: 50px;
        overflow: hidden;
    }

    .calendar .head .next a.btn_nextmonth {
        background: url(#{$imgPath}/btn_nextmonth.jpg) no-repeat;
    }

    .calendar .head .next a.btn_nextmonth:hover {
        background: url(#{$imgPath}/btn_nextmonthhover.jpg) no-repeat;
    }

    .calendar .head .next a.btn_nextyear {
        background: url(#{$imgPath}/btn_nextyear.jpg) no-repeat;
    }

    .calendar .head .next a.btn_nextyear:hover {
        background: url(#{$imgPath}/btn_nextyearhover.jpg) no-repeat;
    }

    .calendar .main {
        width: auto;
        overflow: hidden;
        zoom: 1;
        clear: both;
        padding: 10px 10px 0 10px;
    }

    .calendar .main .list .yearmonth {
        text-align: center;
        padding: 3px 0 7px 0;
        font-size: 14px;
    }

    .calendar .main .list {
        width: 247px;
        overflow: hidden;
        float: left;
        margin-right: 5px;
    }

    .calendar .main .list .week {
        overflow: hidden;
        width: 245px;
        zoom: 1;
        border: 1px solid #CCC;
        margin: 0 0 5px 0;
    }

    .calendar .main .week li {
        float: left;
        width: 35px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: #f7f8fa;
    }

    .calendar .main .day li {
        float: left;
        text-align: center;
        width: 35px;
        height: 24px;
        margin: 0 0 5px 0;
    }

    .calendar .main .list .day li.beginning {
        background: url(#{$imgPath}/bg_beginend.jpg) 18px 0 no-repeat;
    }

    .calendar .main .list .day li.ending {
        background: url(#{$imgPath}/bg_beginend.jpg) -18px 0 no-repeat;
    }

    .calendar .main .list .day a {
        display: block;
        width: 35px;
        height: 24px;
        line-height: 24px;
    }

    .calendar .main .list .day .hide {
        display: none;
    }

    .calendar .main .list .day a:link, a.calendar .main .list .day a:visited, .calendar .main .list .day a:hover, .calendar .main .list .day a:active {
    }

    .calendar .main .list .day a.today {
        background: #EEE;
        width: 22px;
        height: 22px;
        margin: auto;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
    }

    .calendar .main .list .day a.selected {
        color: #FFF;
        background: #6590c1;
        width: 35px;
        height: 24px;
        -moz-border-radius: 0px;
        -webkit-border-radius: 0px;
        border-radius: 0px;
    }

    .calendar .main .list .day a.on {
        width: 22px;
        height: 22px;
        color: #FFF;
        margin: auto;
        background: #6590c1;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
    }

    .calendar .main .list .day a.beginning, .calendar .main .list .day a.ending {
        color: #6590c1;
        background: #FFF;
        border: 1px solid #6590c1;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
        width: 22px;
        height: 22px;
        margin: auto;
    }

    .calendar .main .list .day a.disabled {
        color: #bbcee1;
        background: none;
        cursor: default;
    }

    .calendar .foot {
        width: auto;
        overflow: hidden;
        zoom: 1;
        margin: 0;
        border-top: 1px solid #CCC;
        padding: 5px 10px;
        background: #fafafa;
    }

    .calendar .foot .date_split {
        position: relative;
        top: 5px;
        margin: 0 3px 0 0;
    }

    .calendar .foot .hide {
        display: none;
    }

    .calendar .foot div {
        float: left;
    }

    .calendar .foot div.calendarbtn {
        float: right;
    }

    .calendar .foot div input.text {
        width: 75px;
        height: 25px;
        padding: 0 3px;
        margin: 0 2px 0 0;
        color: #8f5573;
        border: 1px solid #CCC;
        background: url(#{$imgPath}/bg_input.jpg) no-repeat;
    }

    .calendar .foot div input.calendarbtn {
        background: #b4d66f;
        border: 1px solid #88ab4a;
        color: #56740f;
        height: 25px;
        cursor: pointer;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        padding: 0 6px
    }

    /*no border*/
    .calendar_noborder p, .calendar_noborder ul, .calendar_noborder li {
        margin: 0;
        padding: 0;
    }

    .calendar_head {
        padding: 0 0 0 0;
    }

    .calendar_head_noborder label, .calendar_head_noborder span {
        margin: 0;
        padding: 0;
    }

    .calendar_head_noborder .hide {
        display: none;
    }

    .calendar_head_noborder .calendar_date {
        border: 1px solid #CCC;
        height: 23px;
        line-height: 24px;
        padding: 0 0 0 3px;
        background: #fff url(#{$imgPath}/bg_calendararrow.jpg) no-repeat center right;
        font-size: 12px;
        font-family: "微软雅黑";
        cursor: pointer;
        margin: 0 0px 0 0;
        float: left;
    }

    .calendar_head_noborder .calendar_date:hover {
        background: #fff url(#{$imgPath}/bg_calendararrowhover.jpg) no-repeat center right;
    }

    .calendar_head_noborder a.shortcut_on {
        background: #527ec0;
        color: #FFF
    }

    .calendar_head_noborder .shortcut {
        color: #7179c5;
        position: relative;
        bottom: 2px;
        text-decoration: none;
        margin: 0 0 0 10px;
        line-height: 30px;
        font-family: "微软雅黑";
    }

    .calendar_head_noborder .shortcut:hover {
        text-decoration: underline;
    }

    .calendar_head_noborder .calendar_date_single {
        width: 105px;
    }

    .calendar_head_noborder .btn_calendarcompare {
        display: inline-block;
        position: relative;
        height: 23px;
        line-height: 23px;
        font-size: 12px;
        margin: 0 0 0 0px;
        padding: 0px 5px 0;
        float: left;
        background: none;
    }

    .calendar_head_noborder .btn_calendarcompare input {
        position: relative;
        top: 2px;
    }

    .calendar_head_noborder .calendar_date_double {
        width: 190px;
    }

    .calendar_noborder ul, .calendar_noborder li {
        list-style: none;
    }

    .calendar_noborder a {
        text-decoration: none;
        color: #333;
    }

    .calendar_noborder {
        border: 1px solid #cccccc;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
        width: auto;
        font: 12px Arial, Helvetica, sans-serif;
        position: absolute;
        top: 0;
        left: 0;
        background: #FFF;
        z-index: 999;
    }

    .calendar_noborder .head {
        width: auto;
        overflow: hidden;
        zoom: 1;
        font-family: Tahoma, Geneva, sans-serif;
    }

    .calendar_noborder .head a {
        color: #999;
    }

    .calendar_noborder .head a:hover {
        color: #6590c1;
    }

    .calendar_noborder .head .prev {
        position: absolute;
        left: 8px;
        top: 8px;
    }

    .calendar_noborder .head .prev a {
        display: block;
        float: left;
        width: 25px;
        height: 25px;
        text-indent: 50px;
        overflow: hidden;
    }

    .calendar_noborder .head .prev a.btn_prevmonth {
        background: url(#{$imgPath}/btn_prevmonth.jpg) no-repeat;
    }

    .calendar_noborder .head .prev a.btn_prevmonth:hover {
        background: url(#{$imgPath}/btn_prevmonthhover.jpg) no-repeat;
    }

    .calendar_noborder .head .prev a.btn_prevyear {
        background: url(#{$imgPath}/btn_prevyear.jpg) no-repeat;
    }

    .calendar_noborder .head .prev a.btn_prevyear:hover {
        background: url(#{$imgPath}/btn_prevyearhover.jpg) no-repeat;
    }

    .calendar_noborder .head .next {
        position: absolute;
        right: 8px;
        top: 8px;
    }

    .calendar_noborder .head .next a {
        display: block;
        float: left;
        width: 25px;
        height: 25px;
        text-indent: 50px;
        overflow: hidden;
    }

    .calendar_noborder .head .next a.btn_nextmonth {
        background: url(#{$imgPath}/btn_nextmonth.jpg) no-repeat;
    }

    .calendar_noborder .head .next a.btn_nextmonth:hover {
        background: url(#{$imgPath}/btn_nextmonthhover.jpg) no-repeat;
    }

    .calendar_noborder .head .next a.btn_nextyear {
        background: url(#{$imgPath}/btn_nextyear.jpg) no-repeat;
    }

    .calendar_noborder .head .next a.btn_nextyear:hover {
        background: url(#{$imgPath}/btn_nextyearhover.jpg) no-repeat;
    }

    .calendar_noborder .main {
        width: auto;
        overflow: hidden;
        zoom: 1;
        clear: both;
        padding: 10px 10px 0 10px;
    }

    .calendar_noborder .main .list .yearmonth {
        text-align: center;
        padding: 3px 0 7px 0;
        font-size: 14px;
    }

    .calendar_noborder .main .list {
        width: 247px;
        overflow: hidden;
        float: left;
        margin-right: 5px;
    }

    .calendar_noborder .main .list .week {
        overflow: hidden;
        width: 245px;
        zoom: 1;
        border: 1px solid #CCC;
        margin: 0 0 5px 0;
    }

    .calendar_noborder .main .week li {
        float: left;
        width: 35px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: #f7f8fa;
    }

    .calendar_noborder .main .day li {
        float: left;
        text-align: center;
        width: 35px;
        height: 24px;
        margin: 0 0 5px 0;
    }

    .calendar_noborder .main .list .day li.beginning {
        background: url(#{$imgPath}/bg_beginend.jpg) 18px 0 no-repeat;
    }

    .calendar_noborder .main .list .day li.ending {
        background: url(#{$imgPath}/bg_beginend.jpg) -18px 0 no-repeat;
    }

    .calendar_noborder .main .list .day a {
        display: block;
        width: 35px;
        height: 24px;
        line-height: 24px;
    }

    .calendar_noborder .main .list .day .hide {
        display: none;
    }

    .calendar_noborder .main .list .day a:link, a.ccalendar .main .list .day a:visited, .calendar_noborder .main .list .day a:hover, .calendar_noborder .main .list .day a:active {
    }

    .calendar_noborder .main .list .day a.today {
        background: #EEE;
        width: 22px;
        height: 22px;
        margin: auto;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
    }

    .calendar_noborder .main .list .day a.selected {
        color: #FFF;
        background: #6590c1;
        width: 35px;
        height: 24px;
        -moz-border-radius: 0px;
        -webkit-border-radius: 0px;
        border-radius: 0px;
    }

    .calendar_noborder .main .list .day a.on {
        width: 22px;
        height: 22px;
        color: #FFF;
        margin: auto;
        background: #6590c1;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
    }

    .calendar_noborder .main .list .day a.beginning, .calendar_noborder .main .list .day a.ending {
        color: #6590c1;
        background: #FFF;
        border: 1px solid #6590c1;
        -moz-border-radius: 20px;
        -webkit-border-radius: 20px;
        border-radius: 20px;
        width: 22px;
        height: 22px;
        margin: auto;
    }

    .calendar_noborder .main .list .day a.disabled {
        color: #bbcee1;
        background: none;
        cursor: default;
    }

    .calendar_noborder .foot {
        width: auto;
        overflow: hidden;
        zoom: 1;
        margin: 0;
        border-top: 1px solid #CCC;
        padding: 5px 10px;
        background: #fafafa;
    }

    .calendar_noborder .foot .date_split {
        position: relative;
        top: 5px;
        margin: 0 3px 0 0;
    }

    .calendar_noborder .foot .hide {
        display: none;
    }

    .calendar_noborder .foot div {
        float: left;
    }

    .calendar_noborder .foot div.calendarbtn {
        float: right;
    }

    .calendar_noborder .foot div input.text {
        width: 75px;
        height: 25px;
        padding: 0 3px;
        margin: 0 2px 0 0;
        color: #8f5573;
        border: 1px solid #CCC;
        background: url(../../styles/styles/css/bg_input.jpg) no-repeat;
    }

    .calendar_noborder .foot div input.calendarbtn {
        background: #b4d66f;
        border: 1px solid #88ab4a;
        color: #56740f;
        height: 25px;
        cursor: pointer;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        padding: 0 6px
    }

    .fname_tips {
        color: #999;
    }

    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    @-webkit-keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    .dialog-fadeIn-transition {

    }

    .dialog-fadeIn-enter {
        -webkit-animation: fadeIn .5s;
        animation: fadeIn .5s;
    }

    .dialog-fadeIn-leave {
        -webkit-animation: fadeOut .5s;
        animation: fadeOut .5s;
    }
</style>

<template>
    <div class="v-calendar" id="{{calendarId}}">
        <slot></slot>
    </div>
</template>

<script>
    /**
     * @file 日历
     * @author zhujianchen@baidu.com
     * @description 先把pharos用的组件改成vue组件格式，以后再改吧
     */
    export default {
        name: 'calendar',
        props: {
            callback: {
                type:Function,
                default(){

                }
            },
            range_select: {
                type: Array,
                default(){
                    return []
                }
            },
            default_selected: {
                type: Array,
                default(){
                    return []
                }
            },
            short_cut: {
                type: Array,
                default(){
                    return []
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
            positionClass() {
                return this.position ? `calendar-${this.position}` : '';
            },
            calendarId(){
                  return `calendar-${this.calendar_id}`
            },
            cfg(){
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
                        sure: function (data) {
                            this.callback('sure', {vue: this, data: data})
                        },
                        selected: function (data) {
                            this.callback('selected', {vue: this, data: data})
                        }
                    }
                }
            }
        },
        data() {
            return {
                /*内部变量*/
                calendar_id: parseInt(Math.random() * 1000 + 1000),
                scatter_init: false,
                tretdata: [],
            }
        },
        watch: {
            show(val, oldVal){
                if (val) {
                    this.position()
                }
            }
        },
        events: {
            'open:calendar'(){

            },
            'close:calendar'(){

            }
        },
        compiled(){

        },
        ready(){
            this.$$el = $(this.$el)
            this.init(this.cfg)
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            position(){

            },
            init(config){
                let tdy = this.getDateFormat(new Date())
                if (config.range_select.length == 0) {
                    config.range_select = ['', tdy]
                }

                if (config.default_selected == 0) {
                    config.default_selected = [tdy, tdy]
                }
                this.config = {
                    container: `${this.calendarId}`,
                    ready_only: false,//input是否可以手动输入 false：不可以，true:可以
                    short_cut: [],//快捷方式//{name:"7天",value:7,on;true},{name:"14天",value:14},{name:"30天",value:30}
                    autosubmit: false,//是否自动返回选择结束 false:按确定返回，true:选择完成直接返回
                    type: "single",//single:单日，double:区间
                    style: "",//散点选择 “”：不是，scatter：“散点选择”
                    pivot: "",//原点
                    sheet: 2,//月份个数
                    range_select: ["", ""],//可选择范围，空为无限制，数组0：开始点，数组1：结束点
                    default_selected: ["", ""],//默认已选择范围，空为无指定，数组0：开始点，数组1：结束点
                    zIndex: 999,
                    docclose: true,//点击窗口其他地方关闭
                    usagecol: "1111111",//
                    input_width: "",//显示框的宽
                    input_height: "",//显示框的高
                    date_split: "~",//时间分隔符
                    skin_name: "",
                    select_rangday: null,// [3,10] 区间范围时，选择范围，单位：天,以原点为中心
                    disabled_day: [],
                    body_click: false,
                    no_head: false,//没有选择头
                    applist_id: "",//列表添加到的容器ID
                    compare: {
                        open: false,
                        type: "double",//single:单点，double:区间
                        deploy: false //true:展开，false:不展开
                    },
                    ent: {
                        context: this,
                        selected: null,//选择事件,自动提交，不需要点确定按钮
                        clickday: null,//日历天点击事件
                        sure: function () {
                        },//确定按钮事件
                        init: null,//日历控件初始化事件
                        show: null,//日历列表显示事件
                        shortcut: null//快捷方式事件
                    }
                }
                this.extend(config);
                this.container = this.config.container;
                this.ready_only = this.config.ready_only;
                this.shortcut = this.config.short_cut;
                this.selected_index = -1;//用于监听区间选择
                this.autosubmit = this.config.autosubmit;
                this.type = this.config.type;//double
                this.stype = this.config.stype;
                this.pivot = this.getPivotDate(this.config.pivot);
                this.sheet = this.config.sheet;
                this.range_select = this.getDateRangeArray(this.config.range_select);
                this.range_select_init = this.getDateRangeArray(this.config.range_select);
                this.default_selected = this.getDateRangeArray(this.config.default_selected, true);
                this.range_selected = this.default_selected;//当前已选择的范围
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

                let _this = this;
                window.setTimeout(function () {
                    _this.setContainerWidth();
                }, 20)

                this.setRetdata();

                //初始化事件
                if (this.ent && this.ent.init && typeof(this.ent.init) == "function") {
                    this.ent.init.call(this.ent.context, this.retdata);
                }
            },
            extend(config){
                for (let key in config) {
                    this.config[key] = config[key];
                }
            },
            getDateFormat(date){
                let _fillDigit;
                _fillDigit = function(str, digit) {
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
            setContainerWidth(){
                let width = $("#" + this.container + "_calendar .list").width();
                if (width == 0) {
                    let _this = this;
                    window.setTimeout(function () {
                        _this.setContainerWidth();
                    }, 20)
                    return;
                }

                width = Math.max(255, width);//用于btn
                let cwidth = (width + 10) * this.sheet;
                $("#" + this.container + "_calendar").css({width: (cwidth) + "px"});
                $("#" + this.container + "_calendar div[data-calendar=list]").css({width: (cwidth + 10) + "px"});
                $("#" + this.container + "_calendar div[data-calendar=foot]").css({display: (this.autosubmit == true ? "none" : "")});
            },
            getDateStr(date){
                let year = date.getFullYear();
                let month = (date.getMonth() + 1);
                month = month < 10 ? ("0" + month) : month;//个位补零
                let date1 = date.getDate();
                date1 = date1 < 10 ? ("0" + date1) : date1;//个位补零
                return year + "-" + month + "-" + date1;
            },
            getDate(date_str){//字符类型输为日期类型
                let date_element = date_str.split("-");
                return new Date(date_element[0], date_element[1] - 1, date_element[2]);
            },
            getPivotDate(datestr){
                return datestr ? (new Date(this.getDate(datestr))) : (new Date());
            },
            getDateRangeArray(datestr_array, dflag){
                let retdate = [];
                for (let i = 0, ilength = datestr_array.length; i < ilength; i++) {
                    let idata = datestr_array[i];
                    if (idata == "") {
                        retdate.push(dflag ? new Date() : idata);//默认时间为今天
                    } else {
                        retdate.push(new Date(this.getDate(idata)));
                    }
                }
                return retdate;
            },
            showHeader(){
                let start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
                let end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
                //当type=double时，如果start=end，就只显示一个日期 modified by zjc 20150427
                let val = this.type == "single" ? (start ? start : "") : ((start && end) ? (start + this.date_split + end) : '');
                let data_value = this.range_selected[0] + "|" + this.range_selected[1];
                let input_width = this.input_width ? (this.input_width + "px") : "";
                let input_height = this.input_height > 0 ? this.input_height : "";
                let skin_name = this.skin_name ? "_" + this.skin_name : "";

                let template = '<div data-calendar="head" class="calendar_head' + skin_name + '"><input type="text" data-calendar="headinput"  data-val="0" readonly class="calendar_date calendar_date_{type}" style="width:{input_width};height:{input_height}px" value="{val}" data-value="{data_value}"/>{shortcut}</div>';
                let shortcut = this.getShortcut("");
                shortcut = shortcut ? shortcut : "";
                template = template.replace(/\{type\}/g, this.type).replace(/\{input_height\}/g, input_height).replace(/\{input_width\}/g, input_width).replace(/\{val\}/g, val).replace(/\{data_value\}/g, data_value).replace(/\{shortcut\}/g, shortcut);

                $("#" + this.container).html(template);
                this.headerEvent();
            },
            showCompareHeader(){
                let start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
                let end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
                let val = this.compare.type == "single" ? (start ? start : "") : (start && end ? (start + this.date_split + end) : "");
                this.type = this.compare.type;//用于选择
                let data_value = this.range_selected[0] + "|" + this.range_selected[1];
                let input_width = this.input_width ? (this.input_width + "px") : "";
                let schide = "";//快捷方式隐藏
                let hide = "";//对比隐藏
                let checked = "";//对比勾选
                let skin_name = this.skin_name ? "_" + this.skin_name : "";
                let template = '<div data-calendar="head" class="calendar_head' + skin_name + '"><input type="text" data-calendar="headinput"  data-val="0" readonly class="calendar_date calendar_date_{type}" style="width:{input_width}px" value="{val}" data-value="{data_value}"/><label class="btn_calendarcompare"><input type="checkbox"  {checked} data-calendar="btncompare"/> 对比</label> <input data-calelement="compare" type="text" data-calendar="headinput"  data-val="0" readonly class="calendar_date calendar_date_{type} {hide}" style="width:{input_width}px" value="{val}" data-value="{data_value}"/>{shortcut}</div>';
                if (this.compare.deploy == false) {
                    hide = "hide";
                    checked = "";
                } else {
                    schide = "hide"
                    checked = "checked";
                }
                this.isCompare = (checked == "checked");
                let shortcut = this.getShortcut(schide);
                shortcut = shortcut ? shortcut : "";
                template = template.replace(/\{type\}/g, this.type).replace(/\{input_width\}/g, input_width).replace(/\{val\}/g, val).replace(/\{data_value\}/g, data_value).replace(/\{checked\}/g, checked).replace(/\{hide\}/g, hide).replace(/\{shortcut\}/g, shortcut);
                $("#" + this.container).html(template);
                this.headerEvent();
            },
            headerEvent(){
                this.list();
                let _this = this;
                $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").on("click", function (e) {
                    e.stopPropagation();
                    _this.range_select = _this.range_select_init;
                    //关闭列表
                    if (!$("#" + _this.container + "_calendar" + "").is(":hidden")) {
                        $("#" + _this.container + "_calendar" + "").hide();
                        return;
                    }
                    let pos = $(this).offset();//当前元素信息集合
                    let height = $(this).outerHeight() + 1;//对话框高度
                    let width = $(this).outerWidth();//对话框宽度
                    let lleft = pos.left - $("#" + _this.container + "_calendar" + "").outerWidth() + width;//左边距
                    let rleft = pos.left;
                    let dwidth = $(document).width() / 2;
                    let left = pos.left < dwidth ? rleft : lleft;
                    let top = pos.top + height;
                    let h = $("#" + _this.container + "_calendar" + "").outerHeight();
                    if (top + h + height > $(window).height() + $(window).scrollTop()) {
                        top = pos.top - h;
                    }
                    $("#" + _this.container + "_calendar" + "").css({top: top + "px", left: left + "px"});
                    _this.selected_index = -1;//重新初始化区间点击
                    $(this).attr("data-thisinput", "this_input");
                    let val = $(this).attr("data-value").split("|");
                    let start = val[0] ? (new Date(val[0])) : "";
                    let end = val[1] ? (new Date(val[1])) : "";
                    _this.range_selected = [start, end];
                    _this.listDate();
                    _this.show();
                });

            },
            getShortcut(schide){
                let short_cut = '';
                let shortcut_count = 0;
                for (let i = 0, ilength = this.shortcut.length; i < ilength; i++) {
                    let idata = this.shortcut[i];
                    let on = idata.on ? "shortcut_on" : "";
                    if (on) {
                        shortcut_count++
                    }
                    short_cut += '<a href="#" class="shortcut ' + schide + ' ' + on + '" data-calendar="shortcut" data-value="' + idata.value + '">' + idata.name + '</a>';
                }
                this.is_shortcut = shortcut_count > 0 ? true : false;
                return short_cut;
            },
            list(apid){//显示日期控件
                let readonly = this.ready_only ? "readonly" : "";
                let zIndex = this.zIndex;
                let skin_name = this.skin_name ? "_" + this.skin_name : "";
                let listHTML = '<div class="calendar' + skin_name + '" data-calendar="body" id="' + this.container + '_calendar" style="display:none;z-index:' + zIndex + '">'
                        + '<div class="head">'
                        + '<div class="prev"><a href="#" data-calendar="btn_prevyear" class="btn_prevyear">&lt;&lt;</a> <a href="#" data-calendar="btn_prevmonth" class="btn_prevmonth">&lt;</a></div>'
                        + '<div class="next"><a href="#" data-calendar="btn_nextmonth" class="btn_nextmonth">&gt;</a> <a href="#" data-calendar="btn_nextyear" class="btn_nextyear">&gt;&gt;</a></div>'
                        + '</div>'
                        + '<div class="main" data-calendar="list">'
                        + '</div>'
                        + '<div class="foot" data-calendar="foot">'
                        + '<div><input type="text" class="text" ' + readonly + ' data-calendar="start"/></div>'
                        + '<div data-calendar="double" class="date_split">' + this.date_split + '</div>'
                        + '<div data-calendar="double"><input type="text" class="text" ' + readonly + ' data-calendar="end"/></div>'
                        + '<div class="calendarbtn"><input type="button" value="确定" data-calendar="btn_submit"  class="calendarbtn"/></div>'
                        + '</div>'
                        + '</div>';
                if (apid) {
                    $("#" + apid).html(listHTML);
                    $("#" + this.container + '_calendar').show();
                    if (this.stype) {//隐藏ipt
                        $("#" + this.container + "_calendar .foot input[data-calendar=start]").hide();
                    }
                } else {
                    $("body").append(listHTML);
                }
                this.listDate();


                //隐藏多余的input
                if (this.type == "single") {
                    $("#" + this.container + "_calendar .foot div[data-calendar=double]").css({display: "none"});
                }
                let _this = this;
                //下一个月
                $("#" + this.container + "_calendar" + " a[data-calendar=btn_nextmonth]").on("click", function (e) {
                    e.preventDefault();
                    _this.listDate(true, _this.getViewDate(_this.sheet));
                })
                //上一个月
                $("#" + this.container + "_calendar" + " a[data-calendar=btn_prevmonth]").on("click", function (e) {
                    e.preventDefault();
                    _this.listDate(true, _this.getViewDate(-_this.sheet));
                })
                //上一年
                $("#" + this.container + "_calendar" + " a[data-calendar=btn_prevyear]").on("click", function (e) {
                    e.preventDefault();
                    _this.listDate(true, _this.getViewDate(-12));
                })
                //下一年
                $("#" + this.container + "_calendar" + " a[data-calendar=btn_nextyear]").on("click", function (e) {
                    e.preventDefault();
                    _this.listDate(true, _this.getViewDate(12));
                })

                //确定
                $("#" + this.container + "_calendar" + " input[data-calendar=btn_submit]").on("click", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (_this.range_selected[0] && _this.range_selected[1]) {
                        if (_this.isValidDate()) {
                            if (_this.ent && _this.ent.sure && typeof(_this.ent.sure) == "function") {
                                _this.setRetdata();
                                _this.close();
                                //alert("this.tretdata = " + _this.tretdata);
                                if (_this.no_head) {
                                    let tdata = [];
                                    //alert("_this.tretdata.length = " + _this.tretdata.length);
                                    for (let i = 0, ilength = _this.tretdata.length; i < ilength; i++) {
                                        let idata = _this.tretdata[i];
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
                })

                //阻止冒泡，配合页面点击关闭窗口
                $("#" + this.container + "_calendar").on("click", function (e) {
                    e.stopPropagation();
                })
                //点击页面其他地方关闭窗口
                $(document).bind("click", function () {
                    if (_this.docclose) {
                        _this.close(true);
                    }
                })

                //快捷方式
                $("#" + this.container + " a[data-calendar=shortcut]").on("click", function (e) {
                    e.preventDefault();
                    $("#" + _this.container + " a[data-calendar=shortcut]").removeClass("shortcut_on");
                    $(this).addClass("shortcut_on");
                    let val = parseInt($(this).attr("data-value"), 10);
                    _this.range_selected[0] = new Date(_this.pivot.getFullYear(), _this.pivot.getMonth(), _this.pivot.getDate() - val + 1);
                    //修复开始时间
                    _this.range_selected[0] = _this.amendStartDate(_this.range_selected[0]);
                    _this.range_selected[1] = _this.pivot;
                    let input = $("#" + _this.container + " div[data-calendar=head] input[data-calendar=headinput]").eq(0);
                    input.val(_this.getDateStr(_this.range_selected[0]) + _this.date_split + _this.getDateStr(_this.range_selected[1]));
                    input.attr("data-value", (_this.range_selected[0] + "|" + _this.range_selected[1]));
                    _this.close();
                    //快捷方式事件
                    if (_this.ent && _this.ent.shortcut && typeof(_this.ent.shortcut) == "function") {
                        _this.is_shortcut = true;
                        _this.setRetdata();
                        _this.ent.shortcut.call(_this.ent.context, _this.retdata);
                    }
                })

                //时间对比
                $("#" + this.container + " input[data-calendar=btncompare]").on("click", function () {
                    let checked = $(this).attr("checked");
                    if (checked == "checked") {
                        $("#" + _this.container + " input[data-calelement=compare],#" + _this.container + " span[data-calelement=compare]").removeClass("hide");
                        $("#" + _this.container + " a[data-calendar=shortcut]").addClass("hide");
                        _this.setCompareInputValue();
                    } else {
                        $("#" + _this.container + " input[data-calelement=compare],#" + _this.container + " span[data-calelement=compare]").addClass("hide");
                        $("#" + _this.container + " a[data-calendar=shortcut]").removeClass("hide");
                    }
                    if (_this.ent && _this.ent.compare && typeof(_this.ent.compare) == "function") {
                        _this.ent.compare.call(_this.ent.context, _this.retdata, (checked == "checked"));
                    }
                    _this.isCompare = (checked == "checked");
                    _this.close();
                });
            },
            setCompareInputValue(){
                let msec = (this.getDate(this.retdata[0][1]) - this.getDate(this.retdata[0][0]));
                let diff = parseInt(msec / 1000 / 60 / 60 / 24);
                let end = new Date(this.getDate(this.retdata[0][0]));
                end.setDate(end.getDate() - 1);
                let start = new Date(end);
                start.setDate(start.getDate() - diff);
                this.retdata[1] = [this.getDateStr(start), this.getDateStr(end)];
                this.range_selected = [start, end];
                $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").eq(1).attr("data-value", (this.range_selected[0] + "|" + this.range_selected[1]));
                $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").eq(1).val(this.retdata[1][0] + this.date_split + this.retdata[1][1]);
            },
            getViewDate(months){
                let val = $("#" + this.container + "_calendar" + " .day a").eq(20).attr("data-value");
                let view_sdate = new Date(val);
                view_sdate.setMonth(view_sdate.getMonth() + months);
                return view_sdate;
            },
            setHeadInputValue(){
                let start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
                let end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
                let input = $("#" + this.container + " input[data-thisinput=this_input]");
                switch (this.type) {
                    case "single":
                        input.val(start);
                        input.attr("data-value", (this.range_selected[0] + "|" + this.range_selected[1]));
                        //this.tretdata = [this.range_selected[0],this.range_selected[1]];
                        break;
                    case "double":
                        let split = (start && end) ? this.date_split : "";
                        if (split) {
                            input.val(start + split + end);
                            input.attr("data-value", (this.range_selected[0] + "|" + this.range_selected[1]));
                            //this.tretdata = [this.range_selected[0],this.range_selected[1]];
                        }
                        break;
                }
            },
            amendStartDate(sdate){//用于点快捷方式，确认开始时间
                let sdate_init = this.range_select_init[0];
                if (sdate_init) {
                    //let sdate_date = this.getDate(sdate);
                    if (sdate < sdate_init) {
                        sdate = sdate_init;
                    }
                    //sdate = this.getDateStr(sdate);
                }
                return sdate;
            },
            isValidDate(){
                let flag = true;
                let start = $("#" + this.container + "_calendar" + " input").eq(0).val();
                let end = $("#" + this.container + "_calendar" + " input").eq(1).val();
                if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(start) && /^\d{4}-\d{1,2}-\d{1,2}$/.test(end)) {
                    let date_start = this.getDate(start);
                    let date_end = this.getDate(end);
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
            setSelectedValue(){//设置日历input框的值
                let start = this.range_selected[0] ? this.getDateStr(this.range_selected[0]) : "";
                let end = this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "";
                $("#" + this.container + "_calendar" + " input").eq(0).val(start)
                let endDom = $("#" + this.container + "_calendar" + " input").eq(1)
                endDom.val(end);
            },
            listDate(flag, pdate){//显示日期列表
                let retHTML = "";
                let list_date = this.range_selected[0] ? new Date(this.range_selected[0]) : new Date();
                list_date = flag ? pdate : list_date;

                //alert("list_date.getMonth() = " + list_date.getMonth());
                //alert("this.range_select_init[0].getMonth() = " + this.range_select_init[1].getMonth());

                //修复最大显示月份不能选择，则不显示。
                let lmonth = list_date.getMonth();
                //if(this.type=="single" &&!flag && this.sheet>1 && this.range_select_init[1] && (lmonth+this.sheet > this.range_select_init[1].getMonth()) && this.isSameMonth(this.range_selected[0],list_date)){
                if (this.stype == "scatter" && this.tretdata.length == 0 && !this.scatter_init) {
                    list_date.setMonth(lmonth - this.sheet + 1);
                    this.scatter_init = true;
                }


                for (let i = 0, ilength = this.sheet; i < ilength; i++) {
                    let year = list_date.getFullYear();
                    let month = list_date.getMonth();
                    retHTML += '<div class="list">'
                            + '<div class="yearmonth">' + year + '年' + (month + 1) + '月</div>'
                            + '<div>'
                            + '<ul class="week"><li><a href="#">日</a></li><li><a href="#">一</a></li><li><a href="#">二</a></li><li><a href="#">三</a></li><li><a href="#">四</a></li><li><a href="#">五</a></li><li><a href="#">六</a></li></ul>'
                            + '</div>'
                            + '<div class="day">'
                            + '<ul>';
                    let max_day = this.getMonthMaxDate(list_date);
                    let start_index = this.getWeekdayIndex(list_date);
                    let lihide = "";
                    for (let j = 0, jlength = 42; j < jlength; j++) {
                        let day = j - start_index + 1;
                        if (day > (max_day)) {
                            lihide = "hide";
                        }
                        if (j < start_index || day > (max_day)) {
                            day = "";
                        }

                        let this_date = day ? (new Date(year, month, day)) : "";
                        retHTML += '<li class="' + lihide + '"><a href="#" data-value="' + this_date + '" class="">' + day + '</a></li>';
                    }
                    retHTML += '</ul>'
                            + '</div>'
                            + '</div>';
                    list_date.setDate(1);//修复跨二月bug
                    list_date.setMonth(list_date.getMonth() + 1);
                }
                $("#" + this.container + "_calendar" + " div[data-calendar=list]").html(retHTML);
                this.setListDateState();
                this.setBeginningAndEnding();

                let _this = this;
                $("#" + this.container + "_calendar" + " div[data-calendar=list] a").on("click", function (e) {
                    e.preventDefault();
                    let val = $(this).attr("data-value");
                    let disabled = $(this).hasClass("disabled");
                    if (disabled || !val) {
                        return
                    }
                    let date1 = new Date(val);

                    if (_this.stype) {//散点选择日期
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
                            if (_this.selected_index % 2 == 0) {//三个重选择
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
                                    _this.range_select = _this.range_select_init;//选择完成后，恢复始限定范围
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
                    if (_this.ent && _this.ent.clickday && typeof(_this.ent.clickday) == "function" && _this.range_selected[0] && _this.range_selected[1]) {
                        if (_this.isValidDate()) {
                            _this.setRetdata();
                            _this.ent.clickday.call(_this.ent.context, _this.retdata);
                        }

                    }
                    if (_this.autosubmit && _this.range_selected[0] && _this.range_selected[1]) {//自动提交，不用点确定
                        _this.setRetdata();
                        _this.close();
                        if (_this.ent && _this.ent.selected && typeof(_this.ent.selected) == "function") {
                            _this.ent.selected.call(_this.ent.context, _this.retdata);
                        }
                    }
                })
                //填写列表中input value
                $("#" + this.container + "_calendar .foot input[data-calendar=start]").val(this.getDateStr(this.range_selected[0]));
                $("#" + this.container + "_calendar .foot input[data-calendar=end]").val(this.range_selected[1] ? this.getDateStr(this.range_selected[1]) : "");
            },
            setTRetdata(date, opt){//设置散点时间返回值
                let date1 = new Date(date);//字符换成日期
                switch (opt) {
                    case "add":
                        this.tretdata.push(date1);
                        break;
                    case "remove":
                        for (let i = 0, ilength = this.tretdata.length; i < ilength; i++) {
                            let idata = this.tretdata[i];
                            if (this.isSameDay(idata, date1)) {//同一天
                                this.tretdata.splice(i, 1);
                                break;
                            }
                        }
                        break;
                }

            },
            setSelectedRangDay(date){
                let start_date = new Date(date);
                if (typeof(this.select_rangday[0]) == "number" && this.select_rangday[0] >= 0) {
                    start_date.setDate(start_date.getDate() - this.select_rangday[0]);
                    start_date = this.range_select[0] > start_date ? this.range_select[0] : start_date;
                } else {
                    start_date = this.range_select[0];
                }
                let end_date = new Date(date);
                if (typeof(this.select_rangday[1]) == "number" && this.select_rangday[1] >= 0) {
                    end_date.setDate(end_date.getDate() + this.select_rangday[1]);
                    end_date = this.range_select[1] < end_date ? this.range_select[1] : end_date;
                } else {
                    end_date = this.range_select[1];
                }

                $("#" + this.container + "_calendar" + " div[data-calendar=list] a").removeClass("disabled");
                $("#" + this.container + "_calendar" + " div[data-calendar=list] a").each(function (i) {
                    let val = $(this).attr("data-value");
                    if (!val) {
                        return
                    }
                    let date1 = new Date(val);

                    if ((end_date && date1 > end_date) || (start_date && date1 < start_date)) {
                        $(this).addClass("disabled");
                    }
                });
                start_date = start_date ? start_date : this.range_select[0];
                end_date = end_date ? end_date : this.range_select[1];
                this.range_select = [start_date, end_date];
            },
            setListDateState(){
                let _this = this;
                $("#" + this.container + "_calendar" + " div[data-calendar=list] a").each(function (i) {
                    let val = $(this).attr("data-value");
                    let date = val ? (new Date(val)) : "";
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
            setBeginningAndEnding(){
                if (this.type == "single") {
                    return
                }//单选不进行起点终点设置
                let _this = this;
                if (!_this.range_selected[0] || !_this.range_selected[1]) {
                    return
                }
                $("#" + this.container + "_calendar" + " div[data-calendar=list] a").each(function () {
                    let val = $(this).attr("data-value");
                    if (!val) {
                        return
                    }
                    let cname = "";
                    if (_this.isSameDay(_this.range_selected[0], new Date(val))) {
                        cname = "beginning";
                    }
                    if (_this.isSameDay(_this.range_selected[1], new Date(val))) {
                        cname = _this.isSameDay(_this.range_selected[0], _this.range_selected[1]) ? "beginendsame" : "ending";
                    }
                    if (cname) {
                        $(this).addClass(cname);
                        $(this).parent().addClass(cname);
                        if (cname == "beginendsame") {//选择同一天
                            $(this).addClass("ending");
                            $(this).parent().removeClass();
                        }
                    }
                });
            },
            close(unreset){//关闭窗口{reset_date:true,exe_selectedent:false}
                if (this.no_head) {
                    //console.log("close")
                    //$("#"+this.container).hide();
                } else {
                    $("#" + this.container + "_calendar").hide();
                }

            },
            setRetdata(){
                this.retdata = [];
                let _this = this;
                this.setHeadInputValue();
                $("#" + this.container + " div[data-calendar=head] input[data-calendar=headinput]").each(function (i) {
                    let val = $(this).attr("data-value");
                    if (!val) {
                        return
                    }
                    let start = val.split("|")[0], end = val.split("|")[1];
                    _this.retdata.push([_this.getDateStr(new Date(start)), _this.getDateStr(new Date(end))]);
                });
                if (!this.is_shortcut) {
                    $("#" + this.container + " a[data-calendar=shortcut]").removeClass("shortcut_on");//删除快捷方式选中
                }
                this.is_shortcut = false;
            },
            show(){//显示窗口
                if (this.body_click) {//用于收起列表
                    $("body").click();
                }
                if (this.no_head) {
                    //$("#"+this.container).show();
                    //console.log("show");
                } else {
                    $("#" + this.container + "_calendar" + "").show();
                }

                //初始化事件
                if (this.ent && this.ent.show && typeof(this.ent.show) == "function") {
                    this.ent.show.call(this.ent.context, this.retdata);
                }
            },
            isSameDay(date1, date2){
                return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
            },
            isSameMonth(date1, date2){
                return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth();
            },
            isSDSelected(date){//散点选中
                //date = new Date(date);
                let flag = false;
                for (let i = 0, ilength = this.tretdata.length; i < ilength; i++) {
                    let idata = this.tretdata[i];
                    if (this.isSameDay(idata, date)) {//同一天
                        flag = true;
                        break;
                    }
                }
                return flag;
            },
            isSelected(date){//设置已选择
                let flag = false;
                if (this.range_selected[0] && this.range_selected[1] && this.range_selected[0] <= date && this.range_selected[1] >= date) {
                    flag = true;
                } else if (this.range_selected[0] && date && this.range_selected[0].getTime() == date.getTime()) {
                    flag = true;
                }
                return flag;
            },
            isOn(date){//设置已选择
                let flag = false;
                if (this.range_selected[0] && date && this.range_selected[0].getTime() == date.getTime()) {
                    flag = true;
                }
                return flag;
            },
            isDisabled(date, col){//设置不可选
                let flag = false;
                col = col % 7;
                if ((this.range_select[0] && this.range_select[0].getTime() > date.getTime()) || (this.range_select[1] && this.range_select[1].getTime() < date.getTime())) {
                    flag = true;
                }
                for (let i = 0, ilength = this.disabled_day.length; i < ilength; i++) {//指定不可选择日期
                    let idata = this.disabled_day[i];
                    if (idata && this.isSameDay(this.getDate(idata), date)) {
                        flag = true;
                    }
                }
                flag = this.usagecol.charAt(col) == "0" ? true : flag;
                return flag;
            },
            isToday(date){//判断是否为今天
                let today = new Date();
                return this.isSameDay(today, date);
            },
            getWeekdayIndex(date){//获取月头一天为星期几
                let retdate = new Date(date.getFullYear(), date.getMonth(), 1);
                return retdate.getDay();
            },
            getMonthMaxDate(date){//获取月的最大天数
                let date_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                let year = date.getFullYear();
                date_month[1] = (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0))) ? 29 : date_month[1];//润年
                return date_month[date.getMonth()];
            },
            remove(){
                $("#" + this.container).html("");
                $("#" + this.container + "_calendar").remove();
            }
        }
    };
</script>