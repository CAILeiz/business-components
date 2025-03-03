<template>
  <div class="example">{{ msg }}</div>
</template>
  
<script>
export default {
  name: "text-tooltips",
  data() {
    return {
      msg: "Hello world!",
    };
  },
};
</script>
  
<style lang="less" scoped>
@import url("./common.less");
.example {
  color: red;
}
</style>