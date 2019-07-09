<template>
    <div id="app">
        <Header/>
        <div style="height: 100px;"></div>
        <div class="main-content">
            <RightNav v-if="exist"></RightNav>
            <router-view>
            </router-view>
        </div>
    </div>

</template>

<script>
    import Header from "./components/Header";
    import RightNav from "./components/RightNav"

    export default {
        name: 'app',
        components: {
            Header,
            RightNav
        },
        computed:{
            exist(){
                let path = this.$route.path.split("/");
                 return path[1] === "index" || path[1] === "following" || path[1] === "search" || path[1] === "topics" || path[1] === "" ||path[1] === 'topic';
            }
        },
        beforeCreate() {
            this.axios.get("/api/islogin").then((resp) => {
                let data = resp.data;
                if (data.islogin) {
                    this.$store.commit("login");
                }
            })
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #f6f6f6;
    }

    html {
        margin: 0px;
        min-width: 1100px;
        background-color: #f6f6f6;
        color: #1a1a1a;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
    }
    .main-content{
        min-width: 1300px;
    }
</style>
