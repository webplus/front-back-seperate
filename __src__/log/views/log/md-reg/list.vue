<template>
    <div id="list" vuec>
        <div class="pub-box-t">
            <h2><span>埋点审核列表</span></h2>
            <div class="filter-list">
                <search-box label="关键字" placeholder="创建人/指标名称" hint="搜索" @search:text="search"
                            :text.sync="searchKeyword"></search-box>
            </div>
        </div>
        <div class="pub-box-c">
            <table class="index-tbl page-index-tbl">
                <colgroup>
                    <col class="col10">
                    <col class="col10">
                    <col class="col6">
                    <col class="">
                    <col class="col8">
                    <col class="">
                </colgroup>
                <thead>
                    <tr>
                        <th>组件ID</th>
                        <th>组件名</th>
                        <th>组件版本</th>
                        <th>申请日期</th>
                        <th>等级</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="indexTbody">
                    <tr>
                        <td class="f_code">10001001</td>
                        <td>运营流水</td>
                        <td class="f_name"><a href="/is/index_list/detail?id=1333">测试已经事项</a></td>
                        <td class="psr">
                            <div class="psrr">
                                <pre class="pre" title="测试已经事项">测试已经事项</pre>
                            </div>
                        </td>
                        <td class="f_platform">
                            <div class="f_platform_cnt"><a href="http://ph.baidu.com/dt" target="_blank">灯塔</a></div>
                        </td>
                        <td class="f_opt">
                            <div class="opt opt-bug"><a href="javascript:;" class="index-tbl-a index-bug"
                                                        data-code="10001001" data-name="测试已经事项">报错</a></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="page-w">
                <!--Page-->
                <page :page="page" :page-size="pageSize" :total="total" :max-link="maxLink"
                      :page-handler="pageHandler" :create-url="changHash"></page>
            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped>
    [vuec] {
        .page-w {
            text-align: right;
            padding-right: 10px;
        }
    }
</style>
<script>
    import SearchBox from '../../search-box.vue'
    import Page from '../../../components/page/page.vue'

    export default {
        name: 'list',
        components: {
            SearchBox,
            Page
        },
        props: {},
        data(){
            return {
                searchKeyword: '',
                page: 1, //page
                pageSize: 10, //pageSize,  default is 10
                total: 509, //total item count
                maxLink: 5, //how many links to show, must not less than 5,  default is 5
                // page change event name, default is 'page-change',
                // optional
                // for different pagenav, should use different name
                eventName: 'custom'
            }
        },
        computed: {
            slider() {

            }
        },
        watch: {},
        events: {
            custom(page) {
                this.page = page
                console.log(page)
            }
        },
        compiled(){

        },
        ready(){
            this.$$el = $(this.$el)
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            $(selector){
                return this.$$el.find(selector)
            },
            search(opt){
                let value = opt.text;
                this.pageIndex = 1;
                this.pageRange = undefined;
                this.loadTbl();
            },
            pageHandler(page) {
                //here you can do custom state update
                this.page = page
            },
            changHash(unit) {
              
            }
        }
    }
</script>
