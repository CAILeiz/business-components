<template>
  <el-tooltip
    :content="content"
    :placement="placement"
    :effect="effect"
    :disabled="manualDisabled || !isOverflow"
  >
    <div
      ref="ellipsisWrapper"
      class="text-ellipsis-wrapper"
      :style="{ 'line-clamp': lines, '-webkit-line-clamp': lines }"
      v-bind="$attrs"
      @click="handleEmit"
      :class="[needClick ? 'click-class' : '']"
    >
      <slot>
        <span
          v-for="(renderText, index) in renderTextList"
          :key="index"
          :class="[renderText.classStr]"
        >
          {{ renderText.text }}
        </span>
      </slot>
    </div>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useTooltipProps, getRenderTextList } from "./tooltip";

const props = defineProps(useTooltipProps);

const emit = defineEmits(["btnClick"]);

const ellipsisWrapper = ref(null);
const isOverflow = ref(false);

const renderTextList = computed(() => {
  return getRenderTextList(props.content, {
    hlBgColor: (props.searchWord || []) as string[],
  });
});

const tooltipDisabled = computed(() => {
  return !isOverflow.value || !props.content;
});

watch(
  () => props.content,
  () => {
    nextTick(checkIsOverflow);
  }
);

onMounted(() => {
  nextTick(checkIsOverflow);
});

const handleEmit = () => {
  if (props.needClick) emit("btnClick");
};

const checkIsOverflow = () => {
  if (!ellipsisWrapper.value) return;
  const lineHeight = ellipsisWrapper.value.clientHeight;
  const totalHeight = ellipsisWrapper.value.scrollHeight;
  console.log(lineHeight, totalHeight);
  isOverflow.value = lineHeight < totalHeight;
  console.log(isOverflow.value);
};
</script>

<style lang="less" scoped>
@import url("./common.less");
.text-ellipsis-wrapper {
  overflow: hidden;
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-all;
}
</style>