<template>
  <BPhoto
    v-if="photo"
    :src="src"
    url="url"
    style="accept-radio: 16/9; height: 90px; width: 160px; border-radius: 0"
  />
  <BVideo v-else-if="video" :src="src" />
  <BAudio v-else-if="audio" :src="src" />
  <div v-else-if="svg" :id="svgId"></div>
  <el-link type="primary" onClick="handleDownFile" underline="false" v-else>
    暂不支持预览，点击下载
  </el-link>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BPhoto from "./components/BPhoto.vue";
import BAudio from "./components/BAudio.vue";
import BVideo from "./components/BVideo.vue";
import { isPhoto, isSvg, isAudio, isVideo, downFile } from "./components/utils";

// 使用ref定义响应式数据
const msg = ref("Hello world!");
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  filename: {
    type: String,
    default: "",
  },
});
const type = ref(props.src.split(".")[props.src.split(".").length - 1]);
const src = ref(props.src);
const photo = ref(isPhoto(type.value));
const video = ref(isVideo(type.value));
const audio = ref(isAudio(type.value));
const svg = ref(isSvg(type.value));

console.log(photo.value, video.value, audio.value, svg.value, props);

if (svg.value) {
  const svgId = ref(props.src);
}
const handleDownFile = () => {
  downFile(props.src, props.filename);
};
</script>

<style lang="less" scoped>
@import url("./common.less");
.example {
  color: red;
}
</style>