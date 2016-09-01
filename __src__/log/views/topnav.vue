<template>
    <div class="topnav" vuec>
        <div class="topnav_cnt">
            <div class="topnav_logmsg topnav_logmsg_login">
                <div class="login">您好，{{loginname}} <a href="{{rootpath}}logout">注销</a></div>
                <div class="unlogin"><a href="#">登录</a></div>
            </div>
            <div class="topnav_menu">
                <ul>
                    <li v-for="v in menuData" :class="{'menu-item':1}"
                        data-id="{{v.m_name}}"><a href="{{v.m_url}}">{{v.m_name}}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>
<script>
    /*
     * @file 顶部导航组件
     * @author zhujianchen
     * */
    import * as actions from './vuex/actions'

    export default {
        name: 'topnav',
        vuex: {
            getters: {
                count: state => state.count,
                from: state => state.menu_from
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
                default(){
                    return []
                }
            },
            subActive: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                isSubActive: this.subActive,
            }
        },
        computed: {
            module1(){
                /*set 方法设置了 function noop，所以this.module = xxx不起作用的*/
                return this;
            },
            isSubActive(){
                return this.subActive
            }
        },
        watch: {
            module(val, oldVal){

            },
            subActive(val){

            },
            menuData(val){

            }
        },
        ready(){
            this.$dispatch('topnav:ready', this)
        },
        methods: {}
    }
</script>
