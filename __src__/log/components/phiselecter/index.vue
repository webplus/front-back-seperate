<template>
    <div class="v-phiselecter" vuec>
        <div id="phiselecter_{{type}}" class="phiselecter">
            <div class="phiselecter_head" style="">
                <div class="phis_head">
                    <label v-for="v in headLabels1" :class="{on: v.value == on_value}" title="{{v.name}}"
                           data-value="{{v.value}}" data-index="{{$index}}" data-isall="" @click="clickLabel(v)">{{v.name}}</label>
                </div>
                <div class="phis_btns"><a href="#" id="btnmore_{{sel_id}}" v-if="show_more" @click="clickMore">更多</a>
                </div>
            </div>
            <div class="phiselecter_body" id="phibody_{{sel_id}}" :style="bodyStyle" v-show="bodyShow">
                <div class="phiselecter_bodybar">
                    <div class="phiselecter_bsearch">
                        <input type="text" id="search_id_{{sel_id}}" class="sipt" placeholder="搜索关键字"
                               @keyup.enter="searchLabel(keyword)" v-model="keyword">
                    </div>
                    <div class="phiselecter_bclose">
                        <a href="#" title="关闭" id="close_id_{{sel_id}}" @click="closeBody">关闭</a>
                    </div>
                </div>
                <div class="phiselecter_bodylist">
                    <div>
                        <label v-for="v in bodyLabels  | filterBy keyword in 'name'" class=""
                               :class="{on: v.value == on_value}" title="{{v.name}}" data-value="{{v.value}}"
                               data-pindex="{{v.pindex}}" data-index="{{v.$index}}" @click="clickLabel(v,'more')"><b
                                class="icon-ios"></b>{{v.name}}</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*单选selector*/
    import coerceBoolean from '../utils/coerceBoolean.js'

    export default {
        name: 'phiselecter',
        props: {
            promun: {
                type: String,
                default: 10
            },
            labels: {
                type: Array,
                default(){
                    return []
                }
            },
            headLabels1: {
                type: Array,
                default(){
                    let _this = this;
                    setTimeout(()=> {
                        this.headLabels1 = this.labels.slice(0, this.promun1)
                    })
                }
            },
            type: String,
            callback: {
                type: Function,
                default(){

                }
            }
        },
        data(){
            return {
                sel_id: parseInt(Math.random() * 1000 + 1000),
                show_more: false,
                on_value: -1,
                bodyShow: false,
                bodyStyle: null,
                keyword: '',
            }
        },
        computed: {
            promun1(){
                return Math.min(this.labels.length, this.promun)
            },
            headLabels(){
                return this.labels.slice(0, this.promun1)
            },
            bodyLabels(){
                return this.labels.slice(this.promun1)
            },
            show_more(){
                if (this.promun1 >= this.labels.length) {//无更多选项
                    return false
                } else {
                    return true
                }
            }
        },
        watch: {
            bodyShow(val){
                if (val) {
                    this.positionBody()
                }
            }
        },
        /*消息*/
        events: {},
        compiled(){

        },
        ready(){
            this.$$el = $(this.$el)
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            clickLabel(item, from){
                if (!from) {
                    this.bodyShow = false
                }
                _.each(this.labels, (v, k)=> {
                    if (v.value == item.value) {
                        this.on_value = v.value
                    }
                })
                this.$dispatch('click:label', {vue: this})
                this.callback && this.callback('click:label', this)
            },
            clickMore(){
                this.bodyShow = !this.bodyShow
            },
            positionBody(){
                let width = this.$('.phis_btns').width()
                let width_txt = this.$('#btnmore_' + this.sel_id).width()
                let top = this.$('.phiselecter_head').outerHeight()
                this.bodyStyle = {
                    top: top + 'px',
                    right: (width - width_txt) + 'px'
                }
            },
            closeBody(){
                this.bodyShow = false
            },
            searchLabel(keyword){

            }
        }
    }
</script>

<style lang="scss" scoped>
    .v-phiselecter[vuec] {
        min-height: 35px;
        .phiselecter {
            height: 28px;
            line-height: 28px;
            float: left;
            width: 965px;
            padding: 7px 0 0 12px;
            position: relative;
        }
        .phiselecter_head {
            overflow: hidden;
            font-size: 13px;
        }
        .phis_head {
            width: auto;
            overflow: hidden;
            label {
                height: 21px;
                line-height: 21px;
                padding: 0 5px;
                margin: 3px 15px 0 0;
                border-radius: 0;
                cursor: pointer;
                float: left;
                &.on {
                    background: #33a1ee;
                    color: #FFF;
                }
            }
        }
        .phis_btns {
            width: 50px;
            position: absolute;
            top: 0;
            right: 0;
        }

        .phiselecter_body {
            position: absolute;
            z-index: 200;
            width: 720px;
            background: #FFF;
            border: 1px solid #d2dae2;
            font-size: 13px;
            padding: 0px 0 0;
            border-radius: 3px;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
        }
        .phiselecter_bodybar {
            background: none;
            width: auto;
            overflow: hidden;
            height: 40px;
            padding: 0 0 0 19px;
            background: #ecebeb;
        }
        .phiselecter_bclose {
            position: absolute;
            right: 10px;
            top: 7px;
        }
        .phiselecter_bclose a {
            display: block;
            height: 24px;
            line-height: 24px;
            border: 1px solid #b5b9c4;
            border-radius: 2px;
            font-size: 12px;
            color: #333;
            padding: 0 12px;
            background: #f5f5f5 url(/ch/resource/images/bgbtn_scity.jpg) repeat-x;
        }
        .phiselecter_bsearch {
            padding: 0 0px;
            float: left;
        }
        .phiselecter_bsearch input.sipt {
            width: 175px;
            height: 26px;
            padding: 0 25px 0 10px;
            margin: 7px 0 0 0;
            border: 1px solid #d2dae2;
            background: #FFF url(/ch/resource/images/icon_dtydj.png) 189px 7px no-repeat;
        }
        .phiselecter_navlist {
            padding: 0px 10px 0px 10px;
            overflow: auto;
            margin: 8px 0 0px 0;
            max-height: 250px;
            /*border-top: 1px solid #dfdfdf;*/

        }
        .phiselecter_navlist label {
            display: block;
            float: left;
            height: 25px;
            line-height: 25px;
            padding: 0 11px;
            cursor: pointer;
            margin: 0 1px 5px 0;
            border-radius: 2px;
        }
        .phiselecter_navlist label:hover {
            background: #f1f1f1;
        }
        .phiselecter_navlist label.on {
            background: #33a1ee url(/ch/resource/images/icon_gou.png) bottom right no-repeat;
            background: #00b98b;
            color: #FFF;
        }
        .phiselecter_navlist label.hide {
            display: none;
        }

        .phiselecter_bodylist {
            padding: 10px 10px 0px 10px;
            overflow: auto;
            margin: 0;
            max-height: 250px;
            border-top: 1px solid #dfdfdf;

        }
        .phiselecter_bodylist label {
            display: block;
            float: left;
            height: 25px;
            line-height: 25px;
            padding: 0 11px;
            cursor: pointer;
            margin: 0 1px 5px 0;
            border-radius: 2px;
        }
        .phiselecter_bodylist label b {
            display: inline-block;
            width: 16px;
            height: 16px;
            overflow: hidden;
            font-size: 0;
            line-height: 0;
            margin: -3px 3px 0 0;
            vertical-align: middle;
        }
        .phiselecter_bodylist label:hover {
            background: #f1f1f1;
        }
        .phiselecter_bodylist label.on {
            background: #33a1ee url(/ch/resource/images/icon_gou.png) bottom right no-repeat;
            background: #33a1ee;
            color: #FFF;
        }
        .phiselecter_bodylist label.on .icon-android {
            background: url(/portal/resource/images/android-w.png) no-repeat;
        }
        .phiselecter_bodylist label.on .icon-ios {
            background: url(/portal/resource/images/ios-w.png) no-repeat;
        }
        .phiselecter_bodylist label.on .icon-ios-break {
            background: url(/portal/resource/images/ios-break-w.png) no-repeat;
        }
        .phiselecter_bodylist label.hide {
            display: none;
        }
        /*phiselecter end*/
    }

    /*动画*/
    .fadeIn-transition {
        opacity: 1;
    }

    .fadeIn-leave,
    .fadeIn-enter {
        opacity: 0;
    }
</style>
