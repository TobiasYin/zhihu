<template class="list">
    <ul>
        <li v-for="item in data" :key="item.userid">
            <FollowerItem :data="item"></FollowerItem>
        </li>
        <Button long v-if="!data.length" class="hint" @click="getFollowers()">
            还没有人哟, 请稍后再试...
        </Button>
    </ul>
</template>

<script>
    import FollowerItem from './FollowerItem';

    export default {
        name: "FollowerList",
        components: {
            FollowerItem,
        },
        props: {
            api: String,
            pro: {
                type:String,
                default:""
            }
        },
        data() {
            return {
                data: [],
            }
        },
        watch: {
            // eslint-disable-next-line no-unused-vars
            // '$route'(to, from) {
            //     this.getFollowers()
            // }
        },
        methods: {
            fakeData() {
                let data1 = {
                    username: 'cuishuting',
                    head_sculpture: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                    intro: '这里是个人简介sadddddddddddddddddddddddddddddddddddddddddddddddd的dassssssssssssssssssssssssss部分啊啊啊啊',
                    answer_count: 10,
                    followers_count: 30,
                    isFollow: false,
                };
                let data2 = {
                    username: 'cuishuting',
                    head_sculpture: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
                    intro: '这里是个人简介的部分啊啊啊啊',
                    answer_count: 10,
                    followers_count: 30,
                    isFollow: false,
                };
                this.data.push(data1);
                this.data.push(data2);
            },
            getFollowers() {
                this.axios.get(this.api + '?user_id=' + this.$route.params.id + this.pro).then((response) => {
                    if (!response.data.success) {
                        this.$Message.error(response.data.error);
                    } else {
                        this.data = response.data.data;
                    }
                })
            }
        },
        mounted: function () {
            // this.fakeData();
            this.getFollowers()
        }

    }
</script>

<style scoped>
    ul li {
        list-style: none;
    }

    .list {
        width: 100%;
    }
</style>