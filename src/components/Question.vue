<template>
    <Card class="question">
        <div class="question_content">
            <h1 class="title">{{question_title}}</h1>
            <h3 class="subtext"><Time :time="timeslot"/>&nbsp;•&nbsp;{{answer_count}}个回答</h3>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "Question",
        props:['data'],
        data(){
            return{
                question_id:this.data.question_id,
                question_title:this.data.question_title,
                answer_count:this.data.answer_count,
                timeslot:this.data.time,
            }
        },


        computed:{
        },
    }
</script>

<style scoped>
    .subtext{
        color:grey;
    }

    .question{
        width: 100%;
        margin: 4px 0;
    }
    .question_content{
        margin-left: 20px;
        text-align: left;
    }
    .title{
        font-size:24px;
    }
    .subtext{
        margin-top: 10px;
        margin-bottom:-10px;
        font-size:16px;
    }
</style>