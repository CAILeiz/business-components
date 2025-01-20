<template>
  <div class="text-tooltips">
    <tooltip-trigger :disabled="disabled">
      <slot v-if="$slots.default" />
    </tooltip-trigger>
    <tooltip-content :disabled="disabled"></tooltip-content>
    11·1
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from "vue";
import { useTooltipProps } from "./tooltip";
import TooltipTrigger from "./trigger.vue";
import TooltipContent from "./content.vue";

defineOptions({
  name: "text-tooltips",
});

// 定义 props
const props = defineProps(useTooltipProps);

// provide 数据

// 定义方法
</script>
  
<style lang="less" scoped>
.example {
  color: red;
}
</style>