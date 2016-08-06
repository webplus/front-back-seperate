<template>
    <div vuec>

        <div class="pub-box-t">
            <h2><span>aaaa</span></h2>
        </div>
        <div class="pub-box-c">
            <div class="moni-box moni-box-conf">
                <div class="moni-basic">
                    <div class="moni-elem">
                        <label for="" class="moni-label">a：</label>
                        <div class="moni-elem-r moni-elem-rb">
                            <span class="selectbox">
                                <select id=""><option value="1">运营流水</option><option value="2">优惠金额</option><option value="3">用户</option><option value="4">销量</option><option value="5">退款</option><option value="6">渗透率</option><option value="7">门店数</option><option value="8">库存</option><option value="9">价格</option><option value="10">业绩流水</option><option value="11">毛利率</option><option value="12">团单</option><option value="13">ROI</option></select>
                                <i class="triangle"></i>
                            </span>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>b：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label class="moni-label" for=""><em class="required">*</em>b：</label>
                        <div class="moni-elem-r"><div id="date_sel"><input type="text" id="" class="input-text verify" value=""></div></div>
                    </div>
                    <div class="moni-elem moni-elem-txarea">
                        <label for="" class="moni-label"><em class="required">*</em>d：</label>
                        <div class="moni-elem-r"><textarea class="txarea verify" id="" placeholder="" cols="30" rows="5"></textarea></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>c：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>v：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>d：</label>
                        <div class="moni-elem-r"><input type="text" id="" class="input-text verify" value=""></div>
                    </div>
                    <div class="moni-elem moni-elem-txarea">
                        <label for="" class="moni-label"><em class="required">*</em>rr：</label>
                        <div class="moni-elem-r"><textarea class="txarea" id="" placeholder="" cols="30" rows="5"></textarea></div>
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

</style>
<script>
    export default{
        name:'approve',
        props:{

        },
        data(){
            return{
                msg:'hello vue'
            }
        },
        computed: {
          slider() {

          }
        },
        watch:{

        },
        events:{

        },
        compiled(){

        },
        ready(){
            this.$$el = $(this.$el)
        },
        components:{

        },
        methods:{
            $(selector){
                return this.$$el.find(selector)
            },
            cancel(){

            },
            save(){

            }
        }
    }
</script>
