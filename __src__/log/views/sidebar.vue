<template>
    <ul class="menu-ul" id="sidebar_{{id}}" :style="sidebarStyle" v-show="sidebarShow" vuec>
        <li>
            <a href="javascript:;">组件注册</a>
            <ul class="sub-ul">
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-list' }" data-path="wgt-list" class="sub-a" :class=""
                       @click="clickItem($event)"><i class="icon-faq-list"></i><span>审核组件列表</span></a>
                </li>
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-edit' }" data-path="wgt-edit" class="sub-a" :class="[on1]"
                       @click="clickItem($event)"><i class="icon-faq-list"></i><span>新增组件</span></a>
                </li>
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-approve' }" data-path="wgt-approve" class="sub-a"><i class="icon-faq-list"></i><span>审核组件</span></a>
                </li>
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-myapprove' }" data-path="wgt-myapprove" class="sub-a"><i class="icon-faq-list"></i><span>我的申请</span></a>
                </li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">页面注册</a>
            <ul class="sub-ul">
                <li>
                    <a href="javascript:;" class="sub-a" v-link="{ path: '/pg-list' }" data-path="pg-list"><i
                            class="icon-faq-list"></i><span>页面审核列表</span></a>
                </li>
                <li>
                    <a href="javascript:;" class="sub-a" v-link="{ path: '/pg-edit' }" data-path="pg-edit"><i
                            class="icon-faq-list"></i><span>新增页面</span></a>
                </li>
                <li>
                    <a href="javascript:;" class="sub-a" v-link="{ path: '/pg-approve' }" data-path="pg-approve"><i
                            class="icon-faq-list"></i><span>审核页面</span></a>
                </li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">页面埋点注册</a>
            <ul class="sub-ul">
                <li>
                    <a href="javascript:;" class="sub-a" v-link="{ path: '/md-edit' }" data-path="md-list"><i
                            class="icon-faq-list"></i><span>新增埋点</span></a>
                </li>
                <li>
                    <a href="javascript:;" class="sub-a" v-link="{ path: '/md-approve' }" data-path="md-approve"><i
                            class="icon-faq-list"></i><span>审核埋点</span></a>
                </li>
                <li>
                    <a href="javascript:;" class="sub-a" v-link="{ path: '/md-list' }" data-path="md-list"><i
                            class="icon-faq-list"></i><span>埋点审核列表</span></a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
    [vuec] {

    }
</style>

<script>
    import * as actions from './vuex/actions'

    export default {
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
                searchShow1: state => state.showSearch
            },
            actions: actions
        },
        data(){
            return {
                id: parseInt(Math.random() * 1000 + 1000),
                on: ''
            }
        },
        watch: {
            text(val){

            },
            current(val){
                if (val) {

                }
            }
        },
        events: {
            'search:reset'(){
                this.text = ''
            }
        },
        ready(){
            let _this = this;
            this.$$el = $(this.$el)
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            search(){
                this.$dispatch('search:text', {vue: this, text: this.text})
            },
            show(){
                this.sidebarShow = true
            },
            clickItem(e){
                this.$('.sub-ul a').removeClass('on')
                $(e.currentTarget).addClass('on')
            }
        }
    }
</script>
