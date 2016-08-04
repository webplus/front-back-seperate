<template>
    <div id="list" vuec>
        <div class="pub-box-t">
            <h2><span>组件列表</span></h2>
            <div class="filter-list">
                <div class="filter-elem" data-value="creator">
                    <span class="filter-text">负责经理：</span>
                    <input type="text" class="moni-ipt" id="tier2Manager"/>
                </div>
                <div class="filter-elem" data-value="nameSpace">
                    <span class="filter-text">命名空间：</span>
                    <span class="selectbox">
                        <select class="moni-selt" id="nameSpace">
                            <option value="">全部</option>
                            <option v-for="v in nameSpace" value="{{v}}">{{v}}</option>
                        </select>
                        <i class="triangle"></i>
                    </span>
                </div>
                <search-box label="关键字" placeholder="" hint="搜索" @search:text="search"
                            :text.sync="searchKeyword"></search-box>
            </div>
        </div>
        <div class="pub-box-c">
            <partial name="tbl"></partial>
            <div class="page-w">
                <!--Page-->
                <page :page="page" :page-size="pageSize" :total="total" :max-link="maxLink" :page-handler="pageHandler"
                      :create-url="changHash"></page>
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
    import service from '../../../services/index'

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
                eventName: 'custom',
                lists: []
            }
        },
        computed: {
            msg(){

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
            setTimeout(()=> {
                this.lists = [{value: 1},{value:2}]
            },1000)
        },
        methods: {
            $(selector){
                return this.$$el.find(selector)
            },
            renderTbl(){
                service.getComponentList({status, creator}).then(data => {

                }).catch(error => {

                })
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
