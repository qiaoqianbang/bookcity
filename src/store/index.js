import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
//引入封装的接口文件
import api from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navList:[],
    currentId:0,
    list:[],
    mybook:[]
  },
  mutations: {
    setState(state,payload){
      state[payload.key]=payload.value
    }
  },
  actions: {
    //nav列表
    getNavList({commit}){
    api.getNav().then(res=>{
        if(res.code===200){      
          commit({type:'setState',key:'navList',value:res.list})
        }
      })
    },
    //list列表 
    getList({commit,state}){
     api.getList(`?id=${state.currentId}`).then(res=>{
        if(res.code===200){
          commit({type:'setState',key:'list',value:res.list})
        }
      })
    },
    //mybook 渲染书架
    getMyBook({commit}){
      api.get_mybook().then(res=>{
        if(res.code===200){
          commit({type:"setState",key:"mybook",value:res.data})
        }
      })
    }
  },
  modules: {
  }
})
