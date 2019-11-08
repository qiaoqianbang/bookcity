<template>
  <div class="mybook">
    <div class="total">
      <p>数量：{{total.totalNum}}本</p>
      <p>总价：{{total.totalPrice}}元</p>
      <p class="poa">
        <label for="checked">
          全选：
          <input
            type="checkbox"
            :checked="total.flag"
            id="checked"
            @click="handelAllChecked($event)"
          />
        </label>
        <button @click="handelCheckedRemove()">选中删除</button>
      </p>
    </div>
    <div v-for="(item,index) in mybook" :key="index" class="my_book">
      <input type="checkbox" :checked="item.flag" @click="handelChecked(index)" />
      <h3>{{item.title}}</h3>
      <li>
        <span>价格：￥{{item.price}}</span>
      </li>
      <li>
        数量：
        <button @click="handelDel(index)">-</button>
        <span>{{item.num}}</span>
        <button @click="handelAdd(index)">+</button>
        <button @click="handelRemove(index)">删除</button>
      </li>
    </div>
  </div>
</template>

<script>
import api from '../api/index'
import Axios from "axios";
export default {
  methods: {
    //加
    handelAdd(index) {
      let book = this.mybook;
      book[index].num += 1;
      this.$store.commit({ type: "setState", key: "mybook", value: book });
    },
    //减
    handelDel(index) {
      let book = this.mybook;
      if (book[index].num <= 0) {
        book[index].num = 0;
      } else {
        book[index].num -= 1;
      }
      this.$store.commit({ type: "setState", key: "mybook", value: book });
    },
    //删除
    handelRemove(index) {
      let book = this.mybook;
      book.splice(index, 1);
      this.$store.commit({ type: "setState", key: "mybook", value: book });
    },
    //选框
    handelChecked(index) {
      let book = this.mybook;
      book[index].flag = !book[index].flag;
      this.flag = book.every(item => item.flag);
    },
    //全选
    handelAllChecked(e) {
      console.log(e)
      let book = this.mybook;
      book.forEach(item => {
        item.flag = e.target.checked;
      });
    },
    //全部删除（所有被选中）
    handelCheckedRemove() {
      let book = this.mybook;
      console.log(book);
      let new_mybook = book.filter(i => !i.flag);
      this.$store.commit({
        type: "setState",
        key: "mybook",
        value: new_mybook
      });
    }
  },
  computed: {
    mybook() {
      return this.$store.state.mybook;
    },
    total() {
      let newMyBook = this.$store.state.mybook;
      let totalNum = 0,
        totalPrice = 0;
      newMyBook.forEach(item => {
        totalNum += item.num;
        totalPrice += item.num * item.price;
      });
      let length = newMyBook.filter(i => i.flag).length;
      return {
        totalNum,
        totalPrice,
        flag: length === newMyBook.length && length > 0
      };
    }
  },
  mounted() {
    this.$store.dispatch({ type: "getMyBook" });
  },
  updated() {
    //避免刷新后数据恢复加减之前
    //  Axios({
    //   url: "/updata_mybook",
    //   data: {
    //     newbook: this.mybook
    //   },
    //   method: "post"
    // })
   api.updata_mybook({newbook:this.mybook}).then(res => {});
  }
};
</script>

<style lang='scss' scoped>
.mybook {
  width: 100%;
  height: 100%;
}
.my_book {
  list-style: none;
  border-bottom: 1px dashed #000;
  margin: 10px;
  button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin: 8px;
    border: none;
    padding: 6px 14px;
    background: rgb(241, 92, 55);
    border-radius: 5px;
    color: #fff;
  }
}
.total {
  width: 100%;
  height: 45px;
  background: #666;
  color: #fff;
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  button {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    margin: 8px;
    border: none;
    padding: 6px 14px;
    background: rgb(241, 92, 55);
    border-radius: 5px;
    color: #fff;
  }
}
.poa {
  position: absolute;
  right: 15px;
  top: 1px;
}
</style>