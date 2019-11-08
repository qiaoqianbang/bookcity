<template>
  <div class="detail">
    <img :src="detail.avatar" alt />
    <p>
      类型：
      <span v-for="(i,index) in detail.tags" :key="index">{{i}}</span>
    </p>
    <button v-if="detail.is_my_book" @click="handelremove(detail.id)">取消收藏</button>
    <button v-else @click="handelcollect(detail)">收藏</button>
    简介：
    <p>{{detail.summary}}</p>
  </div>
</template>
<script>
import api from "../api/index";
import Axios from 'axios'
export default {
  data() {
    return {
      detail: {}
    };
  },
  methods: {
    //详情收藏
    handelcollect(item) {
      // Axios({
      //   url: "/add_mybook",
      //   data: {
      //     book: item
      //   },
      //   method: "post"
      // })
      api.add_mybook({ book: item }).then(res => {
        if (res.code === 200) {
          this.detail.is_my_book = true;
        }
      });
    },
    //详情取消收藏
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
          this.detail.is_my_book = false;
        }
      });
    }
  },
  mounted() {
    //详情请求
    let id = this.$route.params.id;
    //  Axios({
    //   url: "/detail",
    //   data: {
    //     id
    //   },
    //   method: "post"
    // })
   api.detail({id}).then(res => {
      if (res.code === 200) {
        this.detail = res.data;
      }
    });
  }
};
</script>

<style lang='scss' scoped>
.detail {
  width: 100%;
  button {
    display: block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin: 8px;
    border: none;
    padding: 10px 10px;
    background: rgb(241, 92, 55);
    border-radius: 5px;
    color: #fff;
  }
  p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
  }
}
</style>