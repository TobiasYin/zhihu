<template>
    <div class="header">
        <div class="inner">
            <Row>
                <Col span="9">
                    <div class="layout_logo"><p>LOGO</p></div>
                    <div class="layout_nav">
                        <Menu mode="horizontal" theme="light" :active-name="pos" width="auto" @on-select="select">
                            <MenuItem name="1">
                                首页
                            </MenuItem>
                            <MenuItem name="2">
                                话题
                            </MenuItem>
                            <MenuItem name="3">
                                关注
                            </MenuItem>
                        </Menu>
                    </div>
                </Col>
                <Col span="7">
                    <Input search @on-search="handleSearch" placeholder="搜索一下，遇见新鲜" size="default" class="search"
                           v-model="search_text"/>
                </Col>
                <Col span="4">
                    <Button type="primary" class="question" @click="Question">提问</Button>
                </Col>
                <template v-if="isLogin">
                    <Col span="2" class="head_sculpture tip">
                        <Badge :count="tip">
                            <Avatar icon="md-notifications" class="tips"/>
                        </Badge>
                    </Col>
                    <Col span="1">
                        <Dropdown>
                            <div class="head_sculpture">
                                <Avatar shape="square" :src="head_sculpture"/>
                            </div>
                            <DropdownMenu slot="list">
                                <DropdownItem>
                                    <router-link :to="'/user/' + this.userid">我的主页</router-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <router-link to="/modify_password">修改密码</router-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <a @click="logout">注销</a>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </template>
                <template v-else>
                    <Col span="2">
                        <div class="login" style="text-align: right;margin-right: 20px">
                            <router-link to="/login">
                                登陆
                                <Icon type="ios-contact"/>
                            </router-link>
                        </div>
                    </Col>
                    <Col span="2">
                        <div class="login" style="text-align: left">
                            <router-link to="/register">
                                注册
                                <Icon type="md-key"/>
                            </router-link>
                        </div>
                    </Col>
                </template>
            </Row>
        </div>
    </div>
</template>

<script>
    import Menu from 'iview'
    import Input from 'iview'
    import Button from 'iview'

    export default {
        name: "Header",
        component: {
            Menu,
            Input,
            Button,
        },
        data() {
            return {
                username: "",
                userid: "",
                head_sculpture: "",
                tip: 0,
                search_text: "",
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
            pos() {
                if (this.$route.path === "/index" || this.$route.path === "/")
                    return "1";
                else if (this.$route.path === "/topics")
                    return "2";
                else if (this.$route.path === "/following")
                    return "3";
                else return ""
            }
        },
        watch: {
            isLogin() {
                if (this.isLogin) this.get_self_info();
            }
        },
        methods: {
            logout() {
                if (!this.isLogin) {
                    this.$Message.error("未登录");
                    this.$router.push("/login");
                } else {
                    this.axios.get("/api/logout").then((resp) => {
                        if (resp.data.success) {
                            this.$store.commit("logout");
                            this.$router.push("/");
                        } else {
                            this.$Message.error("错误");
                        }
                    }).catch((err) => {
                        // eslint-disable-next-line no-console
                        console.log(err);
                        this.$Message.error("错误");
                    })
                }
            },
            select(value) {
                if (value === '1') {
                    this.$router.push("/index")
                } else if (value === '2') {
                    this.$router.push("/topics")
                } else {
                    this.$router.push("/following")
                }
            },
            handleSearch() {
                if (!this.search_text) {
                    this.$Message.error("请输入查询内容");
                } else {
                    let path = this.$route.path.split("/");
                    if (path[path.length - 1] === "answers")
                        this.$router.push("/search/" + this.search_text + "/answers");
                    else if (path[path.length - 1] === "users")
                        this.$router.push("/search/" + this.search_text + "/users");
                    else
                        this.$router.push("/search/" + this.search_text + "/answers")
                }
            },
            Question() {

            },
            get_self_info() {
                if (this.isLogin) {
                    this.axios.get('/api/self_info').then((resp) => {
                        let data = resp.data;
                        if (data.success) {
                            this.username = data.username;
                            this.userid = data.userid;
                            this.head_sculpture = data.head_sculpture;
                            this.tip = data.tip;
                            this.$store.commit('setUsername', this.username);
                            this.$store.commit('setUserID', this.userid);
                        }
                    })
                }
            }
        },
        mounted() {
            this.get_self_info();
        }
    }
</script>

<style scoped>
    .layout_logo {
        float: left;
        font-size: 30px;
        width: 80px;
        height: 60px;
        color: #2d8cf0;
        margin-top: 18px;
    }

    .ivu-menu-item {
        font-size: 16px;
    }

    .layout_nav {
        margin-top: 8px;
        margin-left: 100px;
    }

    .header {
        margin: 0px;
        width: 100%;
        position: fixed;
        top: 0px;
        border-bottom: lightgray solid 1px;
        height: 80px;
        overflow: visible;
        box-shadow: 1px 1px 1px lightgray;
        font-size: 16px;
        background-color: #FFF;
        z-index: 1000;
    }

    .inner {
        width: 70%;
        margin: 0px auto;
        min-width: 921px;
    }

    .search {
        margin-top: 25px;
    }

    .question {
        margin-top: 25px;
    }

    .ivu-row {
        margin-left: 50px;
    }

    .head_sculpture {
        margin: 22px auto;
    }

    .login {
        margin: 30px auto;
        font-size: 16px;
    }

    .ivu-menu-horizontal.ivu-menu-light:after {
        height: 0px;
    }

    .tips {
        background-color: #FFF;
        color: #8590a6;
        font-size: 26px;
    }

    .tip {
        text-align: right;
        margin-right: 15px;
    }
</style>