<template>
    <div vuec>

        <div class="pub-box-t">
            <h2><span>组件审核</span></h2>
        </div>
        <div class="pub-box-c">
            <div class="moni-box moni-box-conf">
                <div class="moni-basic">
                    <div class="moni-elem">
                        <label for="" class="moni-label">命名空间：</label>
                        <div class="moni-elem-r moni-elem-rb">
                            <span class="selectbox">
                                <select id="f_namespace" v-model="nameSpace">
                                    <option value="">请选择</option>
                                    <option value="{{v}}" v-for="v in nameSpace">{{v}}</option>
                                </select>
                                <i class="triangle"></i>
                            </span>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>组件名：</label>
                        <div class="moni-elem-r"><input type="text" id="f_name" v-model="name" class="input-text verify"
                                                        value=""></div>
                    </div>
                    <div class="moni-elem">
                        <label class="moni-label" for=""><em class="required">*</em>上线日期：</label>
                        <div class="moni-elem-r">
                            <div id="date_sel">
                                <calendar v-ref:online-date></calendar>
                            </div>
                        </div>
                    </div>
                    <div class="moni-elem moni-elem-txarea">
                        <label for="" class="moni-label"><em class="required">*</em>详细描述：</label>
                        <div class="moni-elem-r"><textarea class="txarea verify" id="f_description"
                                                           v-model="description" placeholder="" cols="30"
                                                           rows="5"></textarea></div>
                    </div>
                    <div class="moni-elem">
                        <label for="owner_manager" class="moni-label"><em class="required">*</em>负责经理：</label>
                        <div class="moni-elem-r">
                            <input-sug input-id="f_tier2_manager" :sug-data="managers"
                                       :input-value.sync="tier2Manager"></input-sug>
                        </div>
                    </div>
                    <div class="moni-elem">
                        <label for="" class="moni-label"><em class="required">*</em>报警通知邮件列表：</label>
                        <div class="moni-elem-r"><input type="text" id="f_notification_mails" class="input-text verify"
                                                        value="" v-model="notificationMails"></div>
                    </div>
                    <div class="moni-elem moni-elem-txarea">
                        <label for="" class="moni-label"><em class="required">*</em>审核意见：</label>
                        <div class="moni-elem-r"><textarea class="txarea verify" id="f_action_comment"
                                                           v-model="actionComment" placeholder="" cols="30"
                                                           rows="5"></textarea></div>
                    </div>
                </div>
            </div>
            <div class="moni-submit">
                <a href="javascript:;" class="btn-blue-m" @click="save('APPROVE')"><span>通 过</span></a>
                <a href="javascript:;" class="btn-gray-m" @cancel="save('REJECT')"><span>不通过</span></a>
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
    import InputSug from '../../input-sug.vue'
    import Calendar from '../../../components/calendar/calendar.vue'
    import service from '../../../services/index'
    import getUrlParams from '../../../kit/getUrlParams'

    export default{
        name: 'approve',
        components: {
            InputSug,
            Calendar,
        },
        props: {},
        data(){
            return {
                managers: [
                    {name: 'zjc', value: '1'},
                    {name: 'lhc', value: '2'}
                ],
                name: '',
                nameSpace: '',
                tier2Manager: '',
                description: '',
                notificationMails: '',
                actionComment: ''
            }
        },
        computed: {
            msg() {

            }
        },
        watch: {},
        events: {},
        compiled(){

        },
        ready(){
            this.$$el = $(this.$el)
            this.compId = this.getCompId('compId')
            this.init1 = this.init().next()
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            getCompId(key){
                return this.$route.query[key] || ''
            },
            *init(){
                this.compInfo = yield this.getComp()
                this.loadInfo(compInfo)
            },
            initCo(){
                return window.co(function*() {
                    let result = yield this.getComp()
                    return result;
                })
            },
            async initAsync(){
            },
            initA: function*() {
            },
            getComp(){
                let compId = this.getCompId('compId') ? this.getCompId('compId') : ''
                if (compId) {
                    service.getComponentAllInfo(compId).then((response)=> {
                        if (response.ok) {
                            this.init1.next(response.json())
                        }
                    }).catch((error)=> {

                    })
                }
            },
            loadInfo(info){
                window._u.extend(this, info)
            },
            save(action){
                let onlineDate = this.$refs.onlineDate.retdata[0][0]
                let name = this.name
                let nameSpace = this.nameSpace
                let notificationMails = this.notificationMails
                let tier2Manager = this.tier2Manager
                let description = this.description
                let actionComment = this.actionComment
                if (!this.check()) {
                    return
                }
                if (this.compId) {
                    service.setApprovalResult({
                        componentId: compId,
                        actionComment,
                        oprator,
                        action
                    })
                } else {
                    service.addNewComponent({name, nameSpace, notificationMails, tier2Manager, description})
                }
            },
            check(){
                if (!this.compId) {
                    return false
                }
                return true
            }
        }
    }
</script>
