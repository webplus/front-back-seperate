<template>
    <div vuec id="{{inputId}}">
        <input type="text" id="ipt_{{id}}" class="input-text" value="" v-model="text | trim"
               @focus.stop="showSug = true">
        <ul class="sug" :style="sugStyle" v-show="showSug">
            <li v-for="v in sugData | filterBy text in 'name' 'value'">
                <a href="#" @click.stop.prevent="sugguestClicked(v)" class="can_select class_one"
                   data-value="{{v.value}}"
                   data-name="{{v.name}}">{{v.name}}</a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    [vuec] {
        .sug {
            width: 100%;
            border: 1px solid #AAA;
            background: #FFF;
            position: absolute;
            z-index: 100;
            overflow-x: hidden;
            max-height: 210px;
            color: #AAA;
            padding: 1px 0 0 0;
            list-style: none;
            font-family: "微软雅黑";
            font-size: 12px;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
            a {
                display: block;
                padding: 3px 5px;
                text-decoration: none;
                margin-bottom: 1px;
                color: #333;
                &:hover {
                    background: #f1f1f1;
                }
            }
        }
    }
</style>

<script>
    /*带有suggest的输入框*/
    import * as actions from './vuex/actions'

    export default {
        name: 'input-sug',
        props: {
            inputId: {
                type: String,
                default(){
                    return 'input-sug-' + this.id
                }
            },
            sugData: {
                type: Array,
                default(){
                    return []
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
                showSug1: state => state.showSug1
            },
            actions: actions
        },
        computed: {
            inputValue(){
                return this.text
            }
        },
        data(){
            return {
                id: parseInt(Math.random() * 1000 + 1000),
                sugStyle: {},
                text: '',
                showSug: false
            }
        },
        watch: {
            text(val){
                if (this.$('.sug').find('li').length > 1) {
                    this.show()
                    this.positionSug()
                }
            }
        },
        events: {
            'search:reset'(){
                this.text = ''
            }
        },
        ready(){
            this.$$el = $(this.$el)
            this.mixx()
            $(document).on('click', (e) => {
                if (this.$el && !$.contains(this.$el, e.target)) {
                    this.showSug = false
                }
            })
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            /*定位suggest*/
            positionSug(){
                let width = this.$('.input-text').outerWidth()
                this.sugStyle = {}
            },
            search(){
                this.$dispatch('sugguest:text', {vue: this, text: this.text})
            },
            show(){
                this.showSug = true
            },
            hide(){
                this.showSug = false
            },
            /*点击了suggest*/
            sugguestClicked(v){
                this.text = v[this.sugText]
                this.hide()
            }
        }
    }
</script>
