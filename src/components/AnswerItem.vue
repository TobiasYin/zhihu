<template>
    <Card class="root">
        <div class="answer" style="text-align:left">
            <router-link :to="'/question/'+this.question_id" style="color: #1a1a1a"><h2 class="question">{{title}}</h2></router-link>
            <div class="answer_content" v-if="!read_all">
                <p class="content">
                    <router-link :to="'/user/' + author_id">
                        {{author_name}}
                    </router-link>
                    <span>: </span>
                    <span @click="read_all=true">{{content_fragment}}</span>
                    &nbsp;
                    <span @click="read_all=true" class="read" style="margin-left: 10px">阅读全文<Icon type="ios-arrow-down"/></span>
                </p>
            </div>
            <div v-else>
                <div class="author">
                    <Row>
                        <router-link :to="'/user/' + this.author_id">
                            <Col span="1">
                                <img :src="author_head">
                            </Col>
                            <Col span="4">
                                {{author_name}}
                            </Col>
                        </router-link>
                    </Row>
                </div>
                <div class="read_more_agrees">{{agree_num}} 人赞同了该回答</div>
                <div class="content" v-html="content"></div>
                <div class="read_more_agrees">发布于 {{time}}</div>
            </div>
        </div>
        <div class="bottom">
            <Row>
                <Col span="6" style="text-align: left">
                    <Button icon="md-arrow-dropup" type="primary" @click="agree(1)"
                            :class="is_agree === 1?'agreed':'agree'">
                        赞同 <span>{{numFilter(agree_num)}}</span>
                    </Button>
                    &nbsp;
                    <Button type="primary" @click="agree(-1)"
                            :class="is_agree === -1?'agreed':'agree'">
                        <Icon type="md-arrow-dropdown"/>
                    </Button>
                </Col>
                <Col span="4">
                    <Button @click="seeComment" type="default" class="other">
                        <Icon type="ios-text" size="20"></Icon>
                        <span>{{numFilter(comment_num)}}条评论</span>
                    </Button>
                </Col>
                <Col span="3">
                    <Button @click="share" type="default" class="other btn" :data-clipboard-text="copyValue">
                        <Icon type="ios-send" size="20"></Icon>
                        分享
                    </Button>
                </Col>
                <Col span="4">
                    <span @click="read_all=false" class="other" v-if="read_all">收起<Icon type="ios-arrow-up"/></span>
                </Col>
                <Col span="4">
                <span v-if="author_id===$store.state.userID"><Button @click="deleteAnswer" class="other"><Icon type="md-close" />删除</Button></span>
                </Col>

            </Row>
        </div>
        <div v-if="see_com">
            <CommentList :answer_id="answer_id" @add-comment="comment_num = $event"></CommentList>
        </div>

    </Card>
</template>

<script>

    import CommentList from "./CommentList"
    import ClipboardJS from 'clipboard'
    export default {
        name: "AnswerItem",
        components: {
            CommentList,
        },
        props: {
            data: Object,
            preview: {
                type: Number,
                default: 200
            }
        },
        computed: {
            content_fragment() {
                if (this.content.length > this.preview)
                    return this.content.substr(0, this.preview) + '...';
                else return this.content;
            },
            isLogin() {
                return this.$store.state.isLogin;
            },
            time() {
                let date = new Date(this.timeslot);
                let year = date.getFullYear();
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let hour = date.getHours();
                let min = date.getMinutes();
                let sec = date.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
            },
            copyValue(){
                let a = window.location.href;
                let a2 = a.split('/').slice(0,3).join('/');
                return a2 + '/question/'+ this.question_id+'打开这条链接查看问题详情';
            },
        },
        data() {
            return {
                read_all: false,
                see_com: false,
                question_id: this.data.question_id,
                title: this.data.question_title,
                answer_id: this.data.answer_id,
                content: this.data.answer_content,
                author_name: this.data.answer_author,
                author_id: this.data.answer_author_id,
                author_head: this.data.answer_author_head_sculpture,
                is_agree: this.data.is_agree,
                agree_num: this.data.agree_count,
                comment_num: this.data.comment_count,
                answer_num: this.data.answer_id,
                timeslot: this.data.time
            }
        },
        component: {
            Comment,
        },
        methods: {
            deleteAnswer(){
                this.$Modal.confirm({
                    title: '确认要删除吗?',
                    content: '<p>您即将删除一个回答</p><p>删除后将不可恢复</p><p>确认要删除吗?</p>',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: ()=>{
                        this.axios.post("/api/delete_answer", {
                            "answer_id": this.answer_num
                        }).then((resp)=>{
                            if (resp.data.success){
                                this.$emit('delete-answer', this.answer_num);
                                this.$Message.success("删除成功")
                            } else {
                                this.$Message.error(resp.data.error)
                            }
                        }).catch((err)=>{
                            // eslint-disable-next-line no-console
                            console.log(err);
                            this.$Message.error("网络连接失败");
                        });
                    }
                });

            },
            share() {
                let clipboard = new ClipboardJS('.btn');
                clipboard.on('success', (e)=> {
                    this.$Message.success('已复制链接，粘贴可分享给好友', '提示');
                    e.clearSelection();
                });
                // eslint-disable-next-line no-unused-vars
                clipboard.on('error',(e)=> {
                    this.$Message.error('暂时不支持此浏览器的复制，请手动选择以下链接后再复制分享:\n' + this.clipBoardData, '提示');
                });
            },
            seeComment() {
                this.see_com = !this.see_com;
            },
            numFilter(num) {
                if (num > 1000) {
                    return (num / 1000).toFixed(1) + "k"
                } else {
                    return num
                }
            },
            agree(num) {
                num = parseInt(num);
                if (!this.isLogin) {
                    this.$Message.error("登陆才能点赞");
                    return;
                }
                let val;
                if (num === this.is_agree) {
                    val = 0;
                } else {
                    val = num;
                }
                this.axios.post("/api/agree", {
                    answer_id: this.answer_id,
                    agree: val
                }).then((resp) => {
                    if (resp.data.success) {
                        if (this.is_agree === 1)
                            this.agree_num--;
                        this.is_agree = val;
                        if (this.is_agree === 1) {
                            this.agree_num++
                        }
                    } else {
                        this.$Message.error(resp.data.error);
                    }
                }).catch((err) => {
                    this.$Message.error("网络连接失败, 请检查网络后再试");
                    // eslint-disable-next-line no-console
                    console.log(err);
                })
            }
        },
    }

</script>

<style scoped>
    .show_count {
        width: 41px;
        height: 32px;
        float: left;
        border: transparent;
        position: absolute;
        margin-left: 75px;
        margin-top: -21px;
        background-color: #2d8cf0;
    }

    .bottom {
        margin-top: 20px;
        line-height: 33px;
    }

    .answer {
        width: auto;
    }

    .root {
        width: 100%;
        height: auto;
        margin: auto;
    }

    .agree {
        background-color: rgba(0, 132, 255, .15);
        border: 0px;
        color: #0084ff;
        font-size: 14px;
    }

    .other {
        border: none;
        color: #888;
    }


    .answer_content {
        margin-top: 10px;
        word-wrap: break-word;
    }

    .agreed {
        background-color: #0084ff;
        color: #FFF;
    }

    .author {
        height: 24px;
        line-height: 24px;
        margin-top: 10px;
    }

    img {
        height: 24px;
        width: 24px;
    }

    .read_more_agrees {
        color: #999;
        margin-top: 10px;
        text-align: left;
        width: auto;
    }

    .content {
        margin-top: 10px;
        word-wrap: break-word;
        word-break: break-all;
        line-height: 1.67;
        font-size: 15px;
    }

    .read {
        color: #175199;
    }

    .read :hover {
        cursor: hand
    }
</style>