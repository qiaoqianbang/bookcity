<template>
  <div class="box">
    <div class="list_item" v-for="(item,index) in list" :key="index">
      <div class="left">
        <img :src="item.avatar" alt />
      </div>
      <div class="right">
        <h3>{{item.title}}</h3>
        <p>￥{{item.price}}</p>
        <button @click="handeldetail(item)">详情</button>
        <button v-if="item.is_my_book" @click="handelremove(item.id)">取消收藏</button>
        <button v-else @click="handelcollect(item)">收藏</button>
      
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import api from '../api/index'
export default {
  methods: {
    //详情
    handeldetail(item) {
      this.$router.push({
        name: "detail",
        params: { id: item.id }
      });
    },
    //收藏
    handelcollect(item) {
      //   Axios({
      //   url: "/add_mybook",
      //   data: {
      //     book: item
      //   },
      //   method: "post"
      // })
   api.add_mybook({book:item}) .then(res => {
        if (res.code === 200) {
          this.$store.dispatch({ type: "getList" });
        }
      });
    },
    //取消收藏
    handelremove(id) {
      //   Axios({
      //   url: "/del_mybook",
      //   data: {
      //     id
      //   },
      //   method: "post"
      // })
    api.del_mybook({id}).then(res => {
        if (res.code === 200) {
          this.$store.dispatch({ type: "getList" });
        }
      });
    }
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  }
};
</script>

<style lang='scss' scoped>
.box {
  overflow: auto;
}
.list_item {
  width: 100%;
  height: 150px;
  display: flex;
  margin: 5px;
}
.left {
  width: 112px;
  height: 100%;
  img {
    width: 100%;
  }
}
.right {
  flex: 1;
  text-align: left;
  h3 {
    margin: 5px;
  }
  button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin: 8px;
    border: none;
    padding: 10px 10px;
    background: rgb(241, 92, 55);
    border-radius: 5px;
    color: #fff;
  }
}
</style>