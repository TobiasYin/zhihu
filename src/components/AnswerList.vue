<template>
    <div class="list">
        <ul v-if="data.length">
            <li v-for="(item,key) in data" :key="key" style="margin-top: 3px">
                <blog-post v-on:delete_this_answer="items.splice(key,1)"></blog-post>
                <AnswerItem :data="item" :preview="preview"></AnswerItem>
            </li>
        </ul>
        <Button long v-if="data.length && hasMore" class="hint" @click="getAnswer()">
            加载更多
        </Button>
        <div v-else-if="load" class="hint" style="width: 32px;">
            <Spin size="large"></Spin>
        </div>
        <Button long v-else class="hint" @click="getAnswer()">
            没有找到回答, 请稍后再试...
        </Button>
    </div>
</template>

<script>
    import AnswerItem from '../components/AnswerItem.vue';

    export default {
        name: "AnswerList",
        props: {
            api: String,
            more_data: {
                type: String,
                default: ""
            },
            preview: {
                type: Number,
                default: 200
            }
        },
        data() {
            return {
                data: [],
                start: 0,
                end: 20,
                hasMore: true,
                load: true
            }
        },
        components: {
            AnswerItem,
        },
        watch: {
            more_data() {
                this.reset();
                this.getAnswer();
            },
            api() {
                this.reset();
                this.getAnswer();
            }
        },
        methods: {
            reset() {
                this.start = 0;
                this.end = 20;
                this.hasMore = true;
                this.data = [];
            },
            getAnswer() {
                this.load = true;
                this.axios.get(this.api + '?start=' + this.start + '&end=' + this.end + this.more_data).then((response) => {
                    let temp = response.data;
                    if (temp.success) {
                        this.hasMore = temp.hasMore;
                        for (let i = 0; i < temp.data.length; i++) {
                            this.data.push(temp.data[i])
                        }
                        if (this.hasMore) {
                            this.start = this.end;
                            this.end = this.start + 10;
                        } else {
                            this.start = this.data.length;
                            this.end = this.start + 10
                        }
                    } else {
                        this.$Message.error(temp.error);
                    }
                    this.load = false;
                }).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.log(err);
                    this.$Message.error("提交失败,请检查网络后再试...");
                    this.load = false;
                })
            },
            fakeData() {
                let data1 = {
                    question_id: "123",
                    question_title: "测试问题3",
                    answer_id: "1234",
                    answer_author: "name1",
                    answer_author_id: "12345",
                    answer_content: "回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内",
                    answer_author_head_sculpture: "/abc.png",
                    is_agree: 1,
                    agree_count: 100,
                    comment_count: 123,
                    time: 1562480410
                };
                let data2 = {
                    question_id: "1233",
                    question_title: "测试问题4",
                    answer_id: "12345",
                    answer_author: "name2",
                    answer_author_id: "123453",
                    answer_content: "回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 回答的内容 ",
                    answer_author_head_sculpture: "/abc.png",
                    is_agree: -1,
                    agree_count: 123,
                    comment_count: 143,
                    time: 1562481567
                };
                this.data.push(data1);
                this.data.push(data2);
                this.data.push(data2);
            }
        },
        mounted: function () {
            this.getAnswer(this.start, this.end);
            this.fakeData();
        }
    }
</script>

<style>
    .hint {
        margin: 20px auto;
        font-size: 14px;
        width: auto;
    }

    ul li {
        list-style: none;
    }

    .list {
        background-color: #f6f6f6;
    }
</style>