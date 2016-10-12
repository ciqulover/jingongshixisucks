import Vue          from 'vue'
import VueRouter    from 'vue-router'
import Vuex         from 'vuex'

import Selector     from './components/Selector.vue'
import YesOrNo      from './components/YesOrNo.vue'
import Jump         from './components/Jump.vue'
import Jump1        from './components/Jump1.vue'
import MutiChoice   from  './components/MutiChoice.vue'


Vue.use(VueRouter)
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        cct:[],
        cctC:[]
    },
    mutations:{
        updateQns(state,cct){
            state.cct=cct
        },
        updateQnsC(state,cct){
            state.cctC=cct
        }
    }
})

const routes = [
    {path: '/', component: Selector},
    {path: '/yesOrNo', component: YesOrNo},
    {path: '/mutiChoice', component: MutiChoice},
    {path: '/Jump', component: Jump},
    {path: '/Jump1', component: Jump1}
]

const router = new VueRouter({
    routes
})

new Vue({
    router,
    store
}).$mount('#app')