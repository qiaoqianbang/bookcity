<template>
  <div class="index">
    <nav>
      <router-link
        tag="span"
        :to="item.path"
        v-for="(item,index) in navList"
        :key="index"
        active-class='active'
      >{{item.tit}}</router-link>
    </nav>
    <div class="index_cont">
      <router-view />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      navList: [
        {
          tit: "首页",
          path: "/index/home"
        },
        {
          tit: "书架",
          path: "/index/mybook"
        }
      ]
    };
  },
  mounted(){
  
  }
};
</script>

<style lang='scss' scoped>
.index{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
nav{
  width: 100%;
  height: 35px;
  background: #eee;
  margin-bottom: 2px;
  display: flex;
  span{
    flex: 1;
    text-align: center;
    line-height: 35px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
}
.index_cont{
  flex: 1;
  width: 100%;
  overflow: auto;
}
.active{
  color: tomato;
  border-bottom: 1px solid tomato;
}
</style>