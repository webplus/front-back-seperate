<template>
    <ul class="menu-ul" id="sidebar_{{id}}" :style="sidebarStyle" v-show="sidebarShow" vuec>
        <li>
            <a href="javascript:;">^_^</a>
            <ul class="sub-ul">
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-list' }" data-path="wgt-list" class="sub-a" :class=""
                       @click="clickItem($event)"><i class="icon-faq-list"></i><span>hh</span></a>
                </li>
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-edit' }" data-path="wgt-edit" class="sub-a" :class="[on1]"
                       @click="clickItem($event)"><i class="icon-faq-list"></i><span>tt</span></a>
                </li>
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-approve' }" data-path="wgt-approve" class="sub-a"><i class="icon-faq-list"></i><span>mm</span></a>
                </li>
                <li>
                    <a href="javascript:;" v-link="{ path: '/wgt-myapprove' }" data-path="wgt-myapprove" class="sub-a"><i class="icon-faq-list"></i><span>ccc</span></a>
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
