<template>
  <nav>
    <span 
    v-for="(item,index) in navlist" 
    :key="index"
    @click='handelClick(item.id)'
    :class="currentid===item.id?'active':''"
    >{{item.title}}</span>
  </nav>
</template>

<script>
export default {
  computed: {
    //获取nav列表
    navlist() {
      return this.$store.state.navList;
    },
    //设置高亮
    currentid(){
      return this.$store.state.currentId
    }
  },
  methods:{
     handelClick(id){
       this.$store.commit({type:"setState",key:'currentId',value:id})
        this.$store.dispatch({type:"getList"})
    }
  }
};
</script>

<style lang='scss' scoped>
nav {
  width: 100%;
  height: 100%;
  display: flex;
  span {
    flex: 1;
    text-align: center;
    line-height: 35px;
  }
}
.active{
  color: tomato;
  border-bottom: 1px solid tomato;
}
</style>