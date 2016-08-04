<template>
    <div vuec id="{{fileId}}">
        <div class="batch-add">
            <form id="task_add" target="iframe_upload_box" method="post" action="/ch/manager/ch_manager/do_upload"
                  enctype="multipart/form-data">
                <div class="fesc_line">
                    <div class="input_sec">
                        <div class="file_upload_box">
                            <input type="text" value="" class="file_ubox_input" id="file_input" placeholder="请选择文件"/>
                            <input type="button" value="浏览" class="file_ubox_btn" id="file_find"/>
                            <input type="file" class="file_ubox_true" id="file_input_true" name="userfile"/>
                            <button type="submit" class="btn btn_blue" id="file_upload">上传</button>
                            <input type="hidden" id="file_input_ipt" value="">
                        </div>
                    </div>
                </div>
            </form>

            <div class="fesc_line_botcont_box" id="botcont_box">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    [vuec] {
        .batch-add {

        }
        .fesc_line {
            width: 881px;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            margin-bottom: 12px;
            font-size: 12px;
            color: #3d495d;
            margin-bottom: 0;
        }
        .input_sec {
            height: 51px;
        }
        .input_tips {
            float: left;
            padding-right: 7px;
            width: 60px;
            text-align: right;
        }
        .file_upload_box {
            position: relative;
            overflow: hidden;
        }
        #file_upload {
            margin-left: 7px;
            outline: 0;
        }
        .file_upload_box input {
            font-family: 微软雅黑, 宋体;
            outline: 0px;
        }
        .file_ubox_true {
            position: absolute;
            z-index: 3;
            left: 0;
            height: 28px;
            width: 401px;
            opacity: 0;
            filter: alpha(opacity=0);
        }
        .file_ubox_input {
            height: 18px;
            border: 1px solid #bcc3cc;
            border-radius: 1px;
            width: 328px;
            padding: 4px 10px;
            color: #333;
            float: left;
            font-size: 12px;
            text-overflow: ellipsis;
            border-radius: 2px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        .file_ubox_btn {
            padding: 0 12px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border: 1px solid #bcc3cc;
            border-left: 0;
            color: #3d495d;
            float: left;
            margin: 0;
            background: #f9f9f9;
            background: linear-gradient(top, #fff, #fdfdfd 50%, #f5f6f7);
            background: -webkit-linear-gradient(top, #fff, #fdfdfd 50%, #f5f6f7);
            background: -o-linear-gradient(top, #fff, #fdfdfd 50%, #f5f6f7);
            background: -moz-linear-gradient(top, #fff, #fdfdfd 50%, #f5f6f7);
            border-radius: 2px;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
    }
</style>

<script>
    /*带有suggest的输入框*/
    import * as actions from '../vuex/actions'

    export default {
        name: 'file-add',
        props: {
            inputId: {
                type: String,
                default(){
                    return 'file-add-' + this.id
                }
            },
        },
        vuex: {
            getters: {
                showSug1: state => state.showSug1
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

            }
        },
        events: {},
        ready(){
            this.$$el = $(this.$el)
            this.mixx()
            this.init()
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            init: function() {
                this.names();//设置上传文件时的提示box里面的内容
                this.bindEvents();
            },
            names: function() {
                this.$tipsBox = '<div class="fesc_line_botcont">';
                this.$uploading = '<span class="uploading">正在上传...</span>';
                this.$file_name = '<span class="file_name">{file_name}</span>';
                this.$transfering = '<span class="transfering">正在导入...</span>';
                this.$trans_suc = '<span class="trans_suc">导入审核中</span>';
                this.$trans_fail = '<span class="trans_fail">导入失败</span>';
                this.$trans_cancel = '<span class="trans_cancel">尚未导入</span>';
                this.$trans = '<span class="trans"><a href="#" class="trans_btn">导入数据</a></span>';

                //classname
                this.append_div = $('#botcont_box');
                this.$tipsBox_class = '.fesc_line_botcont';
                this.$uploading_class = '.uploading';
                this.$file_name_class = '.file_name';
                this.$transfering_class = '.transfering';
                this.$trans_suc_class = '.trans_suc';
                this.$trans_fail_class = '.trans_fail';
                this.$trans_cancel_class = '.trans_cancel';
                this.$trans_class = '.trans';

            },
            bindEvents: function() {
                var _this = this;
                this.fileChange = false;
                //浏览文件后，文件名会随之改变
                $('#file_input_true').on('change', function() {
                    $('#file_input').val($(this).val());
                    $('#file_input_ipt').val($(this).val());
                });
                //点击文件输入框，算作一次重新提交
                $('#file_input_true').on('click', () => {
                    this.fileChange = true;
                });
                //提交
                $('#task_add').on('submit', () => {
                    this.uploadingShow();
                    this.fileChange = false;
                    //除了尚未导入的块保留，其他移走
                    $(this.$trans_suc_class).parent().remove();
                    $(this.$trans_fail_class).parent().remove();
                });
                //上传结果
                $("#iframe_upload_box").on("load", () => {
                    //removeloading;//移走正在上传
                    this.removeUploading();
                    uploadResult();
                })
                //导入数据按钮
                $('#botcont_box').find('.trans_btn').on('click', function() {
                    $(this).preventDefault();
                    var filename = $(this).parent().parent().find(_this.$file_name_class).html();
                    _this.importData(filename, $(this).parent().parent());
                })
            },
            //上传
            uploadResult() {
                var iwindow = document.getElementById("iframe_upload_box");
                var data = JSON.parse(iwindow.contentWindow.document.getElementsByTagName('body')[0].innerHTML);
                var filename = data.file;
                if (!data.code) {
                    _this.filenameShow(filename);
                    _this.transWinPop('上传成功，是否导入数据？', filename);
                } else {
                    //上传失败
                    _this.alertWinPop('上传失败，请重新上传！', 0);
                }
            },
            transWinPop: function(txt, filename) {//弹出窗口
                var _this = this;
                var $first_tips_box = this.append_div.find(this.$tipsBox_class).eq(0);
                this.$dialog({
                    props: {
                        content: `<div class="alert_content"><b class="icon_checked"></b><span>' + ${txt} + '</span></div>`,
                        title: '上传提示',
                        showFooter: {
                            showFooterConfirm: true,
                            showFooterCancel: true,
                        },
                        callback: function({data}) {
                            if (data.type == 'confirm') {
                                _this.importData(filename, $first_tips_box);
                            }
                            _this.dialog_alert.hide();
                            _this.transCancel($first_tips_box);
                        }
                    }
                }).show = true;
            },
            //导入数据
            importData: function(file_name, selector) {
                var _this = this;
                var url = '/ch/manager/ch_manager/do_import';
                if (PHPCONF.page != 'NA') {
                    url = '/ch/manager/ch_manager_pcwap/do_import/' + PHPCONF.page.toLowerCase();
                }
                var param = {
                    file: file_name,
                }
                url += $.param(param);
                //效果展示
                _this.removeTransCancel(selector);
                _this.removeTransFail(selector);
                _this.transferingShow(selector);

                $.ajax({
                    type: 'GET',
                    url: url,
                    data: {},
                    dataType: 'json',
                    success: function(data) {
                        _this.removeTransfering(selector);
                        if (!data.code) {
                            //导入成功
                            _this.alertWinPop('导入操作已进入审核阶段', 1);
                            _this.transSuc(selector);
                        } else {
                            //导入失败
                            _this.transFail(selector);
                            _this.alertWinPop(data.msg, 0);
                        }
                    },
                    error: function() {
                        //removeloading
                        _this.removeTransfering(selector);
                        _this.transFail(selector);
                    }
                });
            },
            //各个tips的显示与消失;
            uploadingShow: function() {
                //正在上传...
                this.append_div.prepend(this.$tipsBox + this.$uploading + '</div>');
            },
            removeUploading: function() {
                this.append_div.find(this.$tipsBox_class).eq(0).find(this.$uploading_class).remove();
            },
            filenameShow: function(file_name) {
                this.append_div.find(this.$tipsBox_class).eq(0).prepend(this.$file_name.replace(/{file_name}/g, file_name));
            },
            transferingShow: function(selector) {
                selector.append(this.$transfering);
            },
            removeTransfering: function(selector) {
                selector.find(this.$transfering_class).remove();
            },
            transSucShow: function(selector) {
                selector.append(this.$trans_suc);
            },
            transFailShow: function(selector) {
                selector.append(this.$trans_fail);
            },
            removeTransFail: function(selector) {
                selector.find(this.$trans_fail_class).remove();
            },
            transCancelShow: function(selector) {
                selector.append(this.$trans_cancel);
            },
            removeTransCancel: function(selector) {
                selector.find(this.$trans_cancel_class).remove();
            },
            transShow: function(selector) {

            },
            removeTrans: function(selector) {
                selector.find(this.$trans_class).remove();
            },
            //导入数据成功，显示
            transSuc: function(selector) {
                this.removeTrans(selector);
                this.removeTransfering(selector);
                this.removeTransCancel(selector);
                this.transSucShow(selector);
            },
            //取消导入数据，显示
            transCancel: function(selector) {
                this.transCancelShow(selector);
                this.transShow(selector);
            },
            //导入数据失败，显示
            transFail: function(selector) {
                this.removeTransCancel(selector);
                if (selector.find(this.$trans_class).length != 0) {
                    selector.find(this.$trans_class).remove();
                }
                this.transFailShow(selector);
            },
            alertWinPop: function(txt, flag) { //弹窗
                this.$dispatch('file:dialog:show', {vue: this, data: {flag, txt}})
            }
        }
    }
</script>