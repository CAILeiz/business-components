<template>
  <div>
    <video
      :id="'msgVideo_' + id"
      width="640"
      height="360"
      controls
      webkit-playsinline
      playsinline
      x5-playsinline
      x-webkit-airplay="allow"
      v-if="src"
      preload="none"
    >
      <source type="video/mp4" :src="src" />
      <source type="video/webm" :src="src" />
      <source type="video/mp4" :src="src" />
      <source type="video/ogg" :src="src" />
      <source type="video/quicktime" :src="src" />
      <source type="video/3gpp" :src="src" />
      <source type="video/3gpp2" :src="src" />
      <source type="video/mpeg" :src="src" />
      <p>
        该视频暂不支持播放
        <a :href="src" target="_blank" :download="filename"></a>
      </p>
    </video>
    <div class="img" v-else>
      <img :src="globalImgs.video" style="width: 48px" />
      <span>该视频暂不支持播放</span>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { genId } from "@/utils/index";
import globalImgs from "../assets/index";

// 定义props
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  filename: String,
});

const id = ref(genId());

console.log(id, props.src);

// 生命周期钩子
onMounted(() => {
  // 初始化逻辑
});
</script>
  
<style scoped lang="less">
#msgVideo {
  width: 582px;
  height: 305px;
}
.img {
  width: 188px;
  height: 116px;
  background: #eaeef5;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC-Regular;

  font-weight: 400;
  > img {
    margin-top: 14px;
    margin-bottom: 8px;
    width: 48px;
    height: 48px;
  }
  > span {
    font-size: 14px;
    color: #b8bfcd;
  }
}
</style>