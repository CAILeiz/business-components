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
.example {
  color: red;
}
</style>