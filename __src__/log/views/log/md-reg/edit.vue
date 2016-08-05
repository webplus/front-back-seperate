<template>
    <div id="edit" vuec>
        <div class="pub-box-t">
            <h2><span>demo</span></h2>
        </div>
        <div class="pub-box-c">
            <div class="moni-box moni-box-conf">
                <div class="moni-basic">
                    <div class="moni-elem">
                        <label for="" class="moni-label">日志归属：</label>
                        <div class="moni-elem-r moni-elem-rb">
                            <span class="selectbox">
                                <select id=""><option value="1">运营流水</option><option value="2">优惠金额</option><option
                                        value="3">用户</option><option value="4">销量</option><option value="5">退款</option><option
                                        value="6">渗透率</option><option value="7">门店数</option><option
                                        value="8">库存</option><option value="9">价格</option><option
                                        value="10">业绩流水</option><option value="11">毛利率</option><option
                                        value="12">团单</option><option value="13">ROI</option></select>
                                <i class="triangle"></i>
                            </span>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>a：</label>
                        <div class="moni-elem-r">
                            <div class="moni-elem-md" data-elems="md">
                                <input type="text" id="mdv" data-elems="mdv" class="input-text verify" value=""
                                       placeholder="key=value">

                            </div>
                            <div class="md-val">
                                <a href="javascript:;" class="md-val-add" @click.prevent="addMd"><i></i>b</a>
                            </div>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label class="moni-label" for=""><em class="required">*</em>c：</label>
                        <div class="moni-elem-r">
                            <div id="date_sel"><input type="text" id="" class="input-text verify" value=""></div>
                        </div>
                    </div>
                    <div class="moni-elem moni-elem-txarea">
                        <label for="" class="moni-label"><em class="required">*</em>d：</label>
                        <div class="moni-elem-r"><textarea class="txarea verify" id="" placeholder="" cols="30"
                                                           rows="5"></textarea></div>
                    </div>
                    <div class="moni-elem moni-elem-upld">
                        <label for="owner_manager" class="moni-label"><em class="required">*</em>e：</label>
                        <div class="moni-elem-r">
                            <file-add></file-add>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label for="owner_manager" class="moni-label"><em class="required">*</em>f：</label>
                        <div class="moni-elem-r">
                            <input-sug input-id="owner_manager" :sug-data="managers"></input-sug>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>g：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>h：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>

                </div>
            </div>
            <div class="moni-submit">
                <a href="javascript:;" class="btn-blue-m" @click="save"><span>保 存</span></a>
                <a href="javascript:;" class="btn-gray-m" @click="cancel"><span>取 消</span></a>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    [vuec] {
        border: 1px solid #e3e4e4;
        box-shadow: 2px 2px 0 0 rgba(227, 228, 228, 0.8);
        .moni-elem-md {
            margin-bottom: 10px;
        }
        .md-val {
            background: #f7f8f8;
            border: 1px solid #e3e9f0;
            height: 32px;
            line-height: 32px;
            margin-top: 4px;
            .md-val-add {
                color: #3d495d;
                display: inline-block;
                padding-left: 10px;
                i {
                    display: inline-block;
                    width: 13px;
                    height: 13px;
                    background: url('../../../styles/img/icon_add.png') no-repeat;
                    margin-right: 4px;
                    margin-right: 0.25rem;
                    vertical-align: middle;
                    position: relative;
                    top: -1px;
                }
            }
        }
    }
</style>
<script>
    import SearchBox from '../../search-box.vue'
    import InputSug from '../../input-sug.vue'
    import Dialog from '../../../components/dialog/dialog.vue'
    import FileAdd from '../file-add.vue'

    export default {
        name: 'edit',
        components: {
            SearchBox,
            InputSug,
            Dialog,
            FileAdd
        },
        props: {},
        data(){
            return {
                msg: 'hello vue',
                managers: [
                    {name: 'zjc', value: '1'},
                    {name: 'lhc', value: '2'}
                ]
            }
        },
        computed: {
            slider() {

            }
        },
        watch: {},
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
            /*添加埋点*/
            addMd(){
                let l = this.$('[data-elems=mdv]').length
                let id = l
                let tpl = `<div class="moni-elem-md" data-elems="md"><input type="text" id="mdv${id}" data-elems="mdv"
class="input-text verify"
value=""
placeholder="key=value格式"></div>`
                this.$('[data-elems=md]').last().after(tpl)
            },
            save(){

            },
            cancel(){

            }
        }
    }
</script>
