<template>
    <div class="container">
        <div class="mode">
            <input type="checkbox"
                   v-model="mode"
                   id="mode"
                   value="test">
            <label for="mode">测试模式 (无错误提醒)</label>
        </div>
        <button v-if="state" @click="reDo">重做错题</button>
        <ul>
            <li v-for="(v,i) in qns"
                :key="i"
                :class="whetherWrong(i)">
                <span>{{i+1}}.</span>
                <span>{{ v.dsb }}</span>
                <i class="fa fa-check"
                   v-if="hintCorrect(v.inp,v.chs[v.ans],i)">
                </i>
                <i class="fa fa-close"
                   v-if="hintWrong(v.inp,v.chs[v.ans],i)">
                </i>
                <ul>
                    <li v-for="(ch,idx) in v.chs">
                        <input type="radio"
                               :value="ch"
                               v-model="v.inp"
                               @change="alter(i)">
                        <label>{{ch}}</label>
                    </li>
                </ul>
            </li>
        </ul>
        <button v-if="mode[0]=='test'" @click="check">提交</button>
        <p v-if="state">答对 {{cct.length}}/{{qns.length}} 题</p>
        <p v-if="state">正确率{{Math.ceil(cct.length/qns.length*100)}}%</p>
    </div>
</template>
<script>
    import q from '../data/choiceData.json'
    let qns = Array.from(q)
    qns.forEach(i=> {
        i.inp = 2222
        i.alerted = false
        i.wrong = false
    })
    export default{
        data(){
            return {
                qns,
                mode: ['test'],
                cct: [],
                wrg: [],
                state: false
            }
        },
        computed: {
            getCctC(){
                return this.$store.state.cctC
            }
        },
        created(){
            this.getCctC.forEach(i=> {
                let temp = Array.from(this.qns)
                temp.forEach((j, k)=> {
                    if (j.qid == i) {
                        this.qns.splice(k, 1)
                    }
                })
            })
            if (this.qns.length === 0) {
                alert('已经全部做对了')
                this.$router.push({path: '/'})
            }
        },
        methods: {
            alter(i){
                this.qns[i].altered = true
            },
            hintWrong(inp, ans, i){
                return inp != ans
                        && this.mode[0] != 'test'
                        && this.qns[i].altered
            },
            hintCorrect(inp, ans, i){
                return inp == ans
                        && this.mode[0] != 'test'
                        && this.qns[i].altered
            },
            check(){
                this.state = true
                this.qns.forEach((i, j)=> {
                    if (i.inp == i.chs[i.ans]) {
                        this.cct.push(i.qid)
                    } else {
                        this.wrg.push(j)
                    }
                })
                this.mode.splice(0, 1, '')
                this.wrg.forEach(i=> {
                    this.qns[i].wrong = true
                })
                this.$store.commit('updateQnsC', this.cct)
            },
            whetherWrong(i){
                if (this.qns[i].wrong) {
                    return 'wrong'
                }
            },
            reDo(){
                this.$router.push({path: '/Jump1'})
            }
        }
    }
</script>