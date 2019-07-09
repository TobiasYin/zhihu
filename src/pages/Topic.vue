<template>
    <div class="index">
        <Card class="single_topic_top">
            <div style="text-align:left">
                <img :src="this.topic_pic" class="picture">
                <div class="topic_text">
                    <p class="topic_name">{{this.topic_name}}</p>
                    <p class="topic_desc">{{this.description}}</p>
                </div>
            </div>
        </Card>
        <div style="clear: both"></div>
        <AnswerList api="/api/topic_answer" :more_data="'&topic_id='+ topic_id"></AnswerList>
    </div>
</template>

<script>
    import AnswerList from "../components/AnswerList"
    export default {
        name: "Topic",
        components: {AnswerList},
        data(){
            return {
                topic_name:'',
                description:'',
                topic_pic:'',
                data:[],
            }
        },
        computed:{
            topic_id(){
                return this.$route.params.id;
            }
        },
        methods: {
            getData(){
                this.axios.get('/api/topic?topic_id=' + this.topic_id).then((res)=>{
                    let resp = res.data;
                    if(!resp.success){
                        this.$Message.error(resp.error);
                    }
                    else {
                        this.topic_name=resp.topic_name;
                        this.description=resp.description;
                        this.topic_pic=resp.topic_pic;
                        this.data=resp.data;
                    }
                })
            },
            fakeData(){
                this.topic_name='BTS';
                this.description='btsbtsbtsbtsbtsbts';
                this.topic_pic='https://i.loli.net/2017/08/21/599a521472424.jpg';
            }
        },
        mounted(){
            this.fakeData();
            this.getData();
        }
    }
</script>

<style scoped>
    .single_topic_top{
        width:100%;
    }
    .picture{
        float:left;
        width:180px;
        height:180px;
        margin-top:1%;
        margin-bottom:5%;
        margin-left:1%;
    }
    .topic_text{
        text-align: left;
        margin-left:20%;
        padding:40px;
    }
    .topic_name{
        font-size:40px;
        font-weight:bolder;
    }
    .topic_desc{
        font-size:30px;
    }
</style>