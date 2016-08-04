<template>
    <div class="search" id="search_box_{{id}}" :style="searchStyle" v-show="searchShow" vuec>
        <span class="search-text">{{label}}：</span>
        <input type="text"
               class="search-input"
               placeholder="{{placeholder}}"
               autocomplete="off"
               v-model="text|trim"
               @keyup.enter="search">
        <a href="javascript:;" class="icon-search" title="{{hint}}" @click="search"></a>
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
            text(val){
                console.log(val)
            }
        },
        events: {
            'search:reset'(){
                this.text = ''
            }
        },
        ready(){
            this.mixx()
        },
        methods: {
            search(){
                this.$dispatch('search:text', {vue: this, text: this.text})
            },
            show(){
                this.showSearch = true
            }
        }
    }
</script>
