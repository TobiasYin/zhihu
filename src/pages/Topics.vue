<template>
    <div class="index">
        <Divider orientation="left">
            <Icon type="logo-twitch" size="24" style="margin-right: 10px"/>
            <span class="page_top">话题广场</span>
        </Divider>
        <Button class="add-topic" @click="send = !send">添加话题</Button>
        <div v-if="send" class="add">
            <Form ref="formInline" :model="upload">
                <FormItem prop="user">
                    <Input type="text" v-model="upload.topic_name" placeholder="请输入话题标题"/>
                </FormItem>
                <FormItem prop="password">
                    <Input type="textarea" :autosize="true" v-model="upload.topic_desc" placeholder="请输入描述"/>
                </FormItem>
                <FormItem>
                    <Button @click="addTopic">提交</Button>
                </FormItem>
            </Form>
        </div>
        <div class="topic">
            <span v-for="(item,key) in data" :key="key" class="topic_row">
                <TopicItem :data="item"></TopicItem>
            </span>
        </div>
        <div style="clear: both"></div>
        <Button long v-if="data.length && hasMore && !load" class="hint" @click="getData()">
            加载更多
        </Button>
        <div v-else-if="load" class="hint" style="width: 32px;">
            <Spin size="large"></Spin>
        </div>
        <Button long v-else class="hint" @click="getData()">
            没有找到话题, 请稍后再试...
        </Button>
    </div>
</template>

<script>
    import TopicItem from '../components/TopicItem'

    export default {
        name: "Topics",
        components: {
            TopicItem,
        },
        data() {
            return {
                data: [],
                start: 0,
                end: 30,
                hasMore: true,
                load: false,
                send: false,
                upload: {
                    topic_name: "",
                    topic_desc: ""
                }
            }
        },
        methods: {
            addTopic() {
                this.axios.post("/api/add_topic", {
                    topic_name: this.upload.topic_name,
                    topic_desc: this.upload.topic_desc,
                }).then((resp)=>{
                    if (resp.data.success){
                        this.$Message.success("添加成功");
                        this.data.push(resp.info)
                    }else {
                        this.$Message.error(resp.data.error);
                    }
                }).catch((err)=>{
                    // eslint-disable-next-line no-console
                    console.log(err)
                    this.$Message.error("网络连接失败");

                })
            },
            getData() {
                this.load = true;
                this.axios.get("/api/get_topics?start=" + this.start + "&end=" + this.end)
                    .then((resp) => {
                        if (!resp.data.success) {
                            this.$Message.error(resp.data.error)
                        } else {
                            for (let i = 0; i < resp.data.data.length; i++) {
                                this.data.push(resp.data.data[i])
                            }
                            this.hasMore = resp.data.hasMore;
                            if (this.hasMore) {
                                this.start = this.end;
                                this.end += 15;
                            }else {
                                this.start = this.data.length;
                                this.end = this.start + 10
                            }
                        }
                        this.load = false
                    })
                    .catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                        this.$Message.error("网络连接错误");
                        this.load = false;
                    })
            },
            fakeData() {
                let data1 = {
                    topic_name: 'bts',
                    description: 'cst&btsbtsbtsbtsbtsbtsbts',
                    topic_pic: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                };
                let data2 = {
                    topic_name: 'bts',
                    description: 'cst&btsbtsbtsbtsbtsbtsbts',
                    topic_pic: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                };
                let data3 = {
                    topic_name: 'bts',
                    description: 'cst&btsbtsbtsbtsbtsbtsbts',
                    topic_pic: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                };
                let data4 = {
                    topic_name: 'bts',
                    description: 'cst&btsbtsbtsbtsbsdaaaaaaaaaaaaaaatsbtsbts',
                    topic_pic: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                };
                this.data.push(data1);
                this.data.push(data2);
                this.data.push(data3);
                this.data.push(data4);
            },
        },
        mounted: function () {
            // this.fakeData();
            this.getData()
        },
    }
</script>

<style scoped>
    .topic {
        width: 100%;
        height: 30%;
        margin-left: 5%;
        margin-right: 5%;
        padding: 5px;
    }

    .add {
        width: 90%;
        margin: 20px auto;
    }

    .topic_row {
        float: left;
        width: 50%;
    }

    .page_top {
        font-size: 20px;
        margin-right: 20px;
    }

    .add-topic {
        position: relative;
        top: -47px;
        right: -250px;
    }

    .add {

    }
</style>