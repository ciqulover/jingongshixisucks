<template>
    <div>
        <h1>金工实习练习 & 评测</h1>
        <button @click="yesOrNo">判断题</button>
        <button @click="mutiChoice">选择题</button>
    </div>
</template>
<style>
    @import "../style/font-awesome.css";

    body {
        font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
        color: #34495e;
        line-height: 2;
    }

    ul, ol, li {
        list-style: none;
    }

    h1{
        font-size: 30px;
        text-align: center;
        margin: 100px auto;
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods: {
            yesOrNo(){
                this.$router.push({path: 'yesOrNo'})
            },
            mutiChoice(){
                this.$router.push({path: 'mutiChoice'})
            }
        }
    }
</script>
