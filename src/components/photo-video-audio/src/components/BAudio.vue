<template>
  <div>
    <audio
      controls
      v-if="src"
      :id="'msgAudio_' + id"
      width="640"
      height="360"
      webkit-playsinline
      playsinline
      x5-playsinline
      x-webkit-airplay="allow"
    >
      <source :src="src" type="audio/mpeg" />
      <source :src="src" type="audio/ogg" />
      <source :src="src" type="audio/aac" />
      <source :src="src" type="audio/wav" />
      <source :src="src" type="audio/flac" />
      <source :src="src" type="audio/webm" />
      <source :src="src" type="audio/3gpp" />
      <source :src="src" type="audio/3gpp2" />
      <source :src="src" type="audio/mp4" />
      <source :src="src" type="audio/x-flac" />
      <source :src="src" type="audio/x-wav" />
      <source :src="src" type="audio/x-pn-wav" />
      <p>
        该音频暂不支持播放
        <a :href="src" target="_blank" :download="filename"></a>
      </p>
    </audio>
    <div class="img" v-else>
      <img :src="globalImgs.video" style="width: 48px" />
      <span>该音频暂不支持播放</span>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import globalImgs from "../assets/index";
import { genId } from "@/utils/index";

// 定义props
const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  filename: String,
});

const id = ref(genId());

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
audio {
  width: 640px;
  height: 60px;
}
</style>