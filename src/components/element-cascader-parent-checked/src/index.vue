<template>
  <div class="cascaderParentCheckedChild">
    <el-cascader
      :placeholder="placeholder"
      :options="options"
      filterable
      clearable
      :props="selfProps"
      collapse-tags
      v-model="cascaderValue"
    ></el-cascader>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { xor } from "lodash-es";

interface Option {
  code: string;
  name: string;
  children?: Option[];
}

// Props
const props = defineProps({
  cascaderValue: {
    type: Array as () => string[],
    required: true,
  },
  options: {
    type: Array as () => Option[],
    default: () => [],
  },
  selfProps: {
    type: Object as () => Record<string, any>,
    default: () => ({}),
  },
  placeholder: {
    type: String,
    default: "请选择",
  },
});

// Emits
const emit = defineEmits(["update:cascaderValue"]);

// Data
const cascaderValue = ref(props.cascaderValue);
const isReturnWatch = ref(false);

console.log(cascaderValue, cascaderValue.value);

// Watch
watch(
  cascaderValue,
  (nv, ov) => {
    if (isReturnWatch.value) return;
    console.log("nv", nv, "ov", ov);

    const isChecked = nv.length > ov.length;
    const chaArr = xor(nv, ov);
    isReturnWatch.value = true;

    const children = handleAreaCodesChildren(chaArr);
    if (JSON.stringify(children) !== JSON.stringify(chaArr)) {
      if (!isChecked) {
        cascaderValue.value = cascaderValue.value.filter(
          (item) => !children.includes(item)
        );
      } else {
        cascaderValue.value = cascaderValue.value.concat(children);
      }
    }

    setTimeout(() => {
      emit("update:cascaderValue", cascaderValue.value);
      isReturnWatch.value = false;
    }, 0);
  },
  { deep: true }
);

// Methods
const handleAreaCodesChildren = (code: string[]): string[] => {
  const searchCode = code[0];
  const res: string[] = [];

  const deep = (arr: Option[], flag: boolean | null): void => {
    if (flag === false) return;

    for (const item of arr) {
      if (flag || item.code === searchCode) {
        flag && res.push(item.code);
        if (item?.children?.length) {
          deep(item.children, true);
        }
      } else {
        if (item?.children?.length) {
          deep(item.children, null);
        }
      }
    }
  };

  deep(props.options, null);
  return res;
};
</script>

<style scoped lang="less">
</style>
<style lang="less" scoped>
@import url("./common.less");
</style>