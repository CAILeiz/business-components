<template>
  <div :class="['avatar', bgColorName]" :style="style" :id="'msyPhoto_' + id">
    <el-image
      v-if="src && !loadError"
      class="avatar__img"
      :src="src"
      @error="loadError = true"
      :preview-src-list="previewSrcList"
      fit="cover"
    />
    <el-image
      v-else-if="defaultImage"
      class="avatar__img"
      :src="defaultImage"
      fit="cover"
    />
    <span v-else-if="firstLetter">{{ firstLetter }}</span>
    <el-image v-else>
      <template #error>
        <div class="image-slot">
          <el-icon><icon-picture /></el-icon>
        </div>
      </template>
    </el-image>
  </div>
</template>
    
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { genId } from "@/utils/index";

const BACKGROUND_COLOR_MAP = [0, 7, 4, 1, 6, 3, 5];
const BACKGROUND_COLORS = [
  "red",
  "green",
  "yellow",
  "blue",
  "violet",
  "pink",
  "cyan",
  "orange",
];

const props = defineProps({
  defaultImage: String,
  src: String,
  size: [String],
  radius: Number,
  peerId: [String, Number],
  filename: String,
  backgroundColor: String,
  adjustFontSize: Boolean,
  previewFlag: {
    type: Boolean,
    default: true,
  },
});

const id = ref(genId());

const emit = defineEmits(["init"]);
const loadError = ref(false);

// 计算属性重构
const previewSrcList = computed(() => (props.previewFlag ? [props.src] : []));

const style = computed(() => {
  const style = {} as any;
  if (props.size) {
    style.width = style.height =
      typeof props.size === "string" ? props.size : `${props.size}px`;
  }
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor;
  if (props.radius) style.borderRadius = `${props.radius}px`;
  if (props.size && props.adjustFontSize) {
    style.fontSize = (18 / 40) * parseInt(props.size) + "px";
  }
  return style;
});

const bgColorName = computed(() =>
  props.backgroundColor ? "" : `avatar_${getBgColorNameByUserId()}`
);

const firstLetter = computed(() => (props.filename ? props.filename[0] : ""));

// 方法重构
const getBgColorNameByUserId = () => {
  let peerId = +props.peerId;
  peerId = Number.isNaN(peerId) ? getRandom() : peerId;
  const idx = BACKGROUND_COLOR_MAP[Math.abs(peerId) % 7];
  return BACKGROUND_COLORS[idx];
};

const getRandom = () => Math.floor(Math.random() * 11);

// 生命周期钩子
onMounted(() => {
  emit("init", {
    // 暴露需要的方法...
  });
});
</script>
    
  <style lang="less" scoped>
.bgColor(@start, @end) {
  background: linear-gradient(@start, @end);
}

.avatar {
  width: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50%;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__default {
    width: 75%;
  }

  &_red {
    .bgColor(#ff845e, #d45246);
  }

  &_orange {
    .bgColor(#febb5b, #f68136);
  }

  &_violet {
    .bgColor(#b694f9, #6c61df);
  }

  &_green {
    .bgColor(#9ad164, #46ba43);
  }

  &_cyan {
    .bgColor(#53edd6, #28c9b7);
  }

  &_blue {
    .bgColor(#5bcbe3, #359ad4);
  }

  &_pink {
    .bgColor(#ff8aac, #d95574);
  }
}

.chat-type-name {
  opacity: 0.9;
  background: #5f82ff;
  border-radius: 0px 0px 4px 4px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #ffffff;
  line-height: 20px;
  font-weight: 400;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
  .el-icon {
    font-size: 30px;
  }
}
</style>