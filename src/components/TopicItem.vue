<template>
    <div  class="topic_item">
            <img :src="topic_pic" class="picture">
            <div class="topic_text">
                <router-link :to="'/topic/' + topic_id"><p class="topic_name">{{topic_name}}</p></router-link>
                <p class="topic_desc">{{description}}</p>
            </div>
    </div>
</template>

<script>
    export default {
        name: "TopicItem",
        props: [
            "data"
        ],
        data() {
            return {
                topic_name: this.data.topic_name,
                topic_id: this.data.topic_id,
                description: this.data.description,
                topic_pic: this.data.topic_pic
            }
        }
    }
</script>

<style scoped>
    .topic_item{
        width:90%;
        height:100%;
        margin: 25px 0;

    }
    .picture{
        float:left;
        width:100px;
        height:100px;
        margin-top:0;
        margin-bottom:5%;
    }
    .topic_name{
        font-size:18px;
        font-weight:bolder;
        margin-top: -10px;
    }
    .topic_desc{
        font-size:16px;
        word-break: break-all;
    }
    .topic_text{
        text-align: left;
        margin-left:30%;
        padding:25px;
    }
    .topic_text a{
        color: #1a1a1a;
    }
</style>