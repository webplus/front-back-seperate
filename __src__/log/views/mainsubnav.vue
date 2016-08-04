<template>
    <div id="mainsubnav" vuec>
        <div class="mainnav">
            <div class="mainnav_cnt">
                <div class="logo_dt">
                    <a href="{{cur}}" title="{{title}}">{{text}}</a>
                </div>
                <ul class="mainnav_menu">
                    <li v-for="v in mainMenu"><a href="{{v.m_url}}" class="" :class="{'on':!!v.on}">{{v.m_name}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="subnav">
            <div class="subnav_cnt">
                <ul v-for="v in subMenu" id="subnav_menu{{$index}}" class="subnav_menu" :class="v['class']"
                    v-show="v.on">
                    <li v-for="v1 in v"><a href="{{v1.m_url}}" :class="{on:!!v1.on}">{{v1.m_name}}</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    [vuec] {
        .dn {
            display: none;
        }
    }
</style>
<script>
    /*导航*/
    export default{
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
            },
        },
        data(){
            return {}
        },
        computed: {
            slider() {

            }
        },
        watch: {},
        events: {},
        ready(){

        },
        methods: {}
    }
</script>
