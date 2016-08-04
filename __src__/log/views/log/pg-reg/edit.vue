<template>
    <div id="edit" vuec>
        <div class="pub-box-t">
            <h2><span>页面编辑</span></h2>
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
                        <label for="" class="moni-label"><em class="required">*</em>页面埋点：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>页面名称：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label">组件（业务线）归属：</label>
                        <div class="moni-elem-r moni-elem-rb">
                            <span class="selectbox">
                                <select id="">
                                    <option value="1">运营流水</option><option value="2">优惠金额</option><option
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
                        <label class="moni-label" for=""><em class="required">*</em>上线日期：</label>
                        <div class="moni-elem-r">
                            <div id="date_sel"><input type="text" id="" class="input-text verify" value=""></div>
                        </div>
                    </div>
                    <div class="moni-elem moni-elem-txarea">
                        <label for="" class="moni-label"><em class="required">*</em>页面描述：</label>
                        <div class="moni-elem-r"><textarea class="txarea verify" id="" placeholder="" cols="30"
                                                           rows="5"></textarea></div>
                    </div>
                    <div class="moni-elem moni-elem-upld">
                        <label for="owner_manager" class="moni-label"><em class="required">*</em>页面截图：</label>
                        <div class="moni-elem-r">
                            <file-add></file-add>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>负责经理：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>RD Owner：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>所属业务线：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>

                </div>
            </div>
            <div class="moni-submit">
                <a href="javascript:;" class="btn-blue-m"><span>保 存</span></a>
                <a href="javascript:;" class="btn-gray-m"><span>取 消</span></a>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    [vuec] {
        border: 1px solid #e3e4e4;
        box-shadow: 2px 2px 0 0 rgba(227, 228, 228, 0.8);
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
            FileAdd,
            Dialog
        },
        props: {},
        data(){
            return {
                msg: 'hello vue',
                managers: [
                    {name:'zjc',value:'1'},
                    {name:'lhc',value:'2'}
                ],
                showFileDialog:false
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
            var ifr =
                    `<iframe id="iframe_upload_box" width="0" height="0" style="display: none" name="iframe_upload_box" src="">
                        <html>
                            <head></head>
                            <body></body>
                        </html>
                    </iframe>`
            this.$('.batch_add').append(ifr);
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
        }
    }
</script>
