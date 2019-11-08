<template>
  <div class="home">
    <Nav />
    <div class="box">
      <div class="home_cont">
        <List />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "../components/nav";
import List from "../components/list";
export default {
  components: {
    Nav,
    List
  },
  mounted() {
    this.$store.dispatch({ type: "getNavList" });
    this.$store.dispatch({ type: "getList" });
  }
};
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
}
nav {
  width: 100%;
  height: 35px;
  background: #eee;
  display: flex;
  span {
    flex: 1;
    text-align: center;
    line-height: 35px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
}

.home_cont {
  flex: 1;
  width: 100%;
}
</style>