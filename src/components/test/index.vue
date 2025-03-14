<!-- 3. 测试 element-cascader-parent-checked -->
<template>
  <comp
    placeholder="请选择XX"
    :options="areaOpts"
    :selfProps="belongAreaProp"
    v-model:cascaderValue="areaCodes"
  >
  </comp>
  <div>code: {{ areaCodes }}</div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import comp from "../element-cascader-parent-checked/index";

const areaOpts = [
  {
    name: "浙江省",
    code: "330000",
    children: [
      {
        name: "杭州市",
        code: "330100",
      },
      {
        name: "宁波市",
        code: "330200",
      },
      {
        name: "温州市",
        code: "330300",
      },
      {
        name: "嘉兴市",
        code: "330400",
      },
    ],
  },
];

const belongAreaProp = {
  multiple: true,
  value: "code",
  label: "name",
  checkStrictly: true,
  emitPath: false,
};
const areaCodes = ref([]);
</script>

<style lang="less" scoped>
</style>


<!-- 2. 测试 msg-video -->
<!-- <template>
  <comp :src="src" :filename="src"> </comp>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import comp from "../photo-video-audio/index";
const photoSrc =
  "https://public.ysjf.com/content/title-image/%E8%87%AA%E7%84%B6%E9%A3%8E%E6%99%AF-%E7%8E%89%E9%BE%99%E6%8B%89%E6%8E%AA-01-%E5%85%A8%E6%99%AF.jpg";
const videoSrc = "https://www.bilibili.com/video/BV1yW9hYKEkA?t=0.7";
const src = ref(photoSrc);
</script>

<style lang="less" scoped>
</style> -->



<!-- 1. 测试 text-ellipsis -->
 <!-- <template>
  <comp
    content="111112222sdsdd222"
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
</style> -->