<template>
  <comp
    content="111112222sdsdd"
    :searchWord="['2']"
    :needClick="true"
    style="width: 120px"
    @btnClick="btnClick"
  >
  </comp>
</template>
<script lang="ts" setup>
import comp from "../text-tooltips/index";

const btnClick = () => {
  console.log("点击了");
};
</script>

<style lang="less" scoped>
</style>