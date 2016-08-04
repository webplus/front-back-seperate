<template>
    <div class="nav-head" id="search_box_{{id}}" :style="menuStyle" v-show="menuShow" vuec>
        <div class="cnt">
            <div class="logo-dt">
                <h1 class="logo"><a id="nav_href" href="#" title="百糯指标体系"><img id="nav_home"
                                                                                  src="../styles/img/is-logo.png"
                                                                                  alt="百糯指标体系" width="186" height="47">
                </a></h1>
            </div>
            <div class="nav" id="main-menu">
                <ul>
                    <li class="cur">
                        <a href="log.html">日志埋点管理</a>
                    </li>
                    <li class="">
                        <a href="monitor.html">日志埋点监控</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    [vuec] {
        .search-text {
            width: 60px;
            text-align: right;
            display: inline-block;
            line-height: 25px;
        }
    }
</style>

<script>
    import * as actions from './vuex/actions'

    export default {
        name: 'menu',
        props: {
            menuShow: {
                type: Boolean,
                default: true
            }
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
            }
        },
        watch: {

        },
        events: {

        },
        ready(){

        },
        methods: {

        }
    }
</script>
