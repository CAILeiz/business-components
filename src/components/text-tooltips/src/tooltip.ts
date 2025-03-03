import { tify } from "chinese-conv";

export const useTooltipProps = {
  searchWord: {
    type: Array,
    default: () => [],
  },
  needLetter: {
    type: Boolean,
    default: false,
  },
  lines: {
    type: Number,
    default: 1,
  },
  content: String,
  effect: {
    type: String,
    default: "dark",
  },
  placement: String,
  needClick: {
    type: Boolean,
    default: false,
  },
  manualDisabled: {
    type: Boolean,
    default: false,
  },
};

interface HightLightConfig {
  hlBgColor?: string[];
  hlColor?: string[];
  underLine?: string[];
  [key: string]: string[] | undefined;
}

interface TextSegment {
  text: string;
  classStr?: string;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isLetter(char: string): boolean {
  return /^[a-zA-Z]$/.test(char);
}

export function hightChangeContent(
  content: string,
  sensitiveList: string[] = []
): Record<number, number> {
  sensitiveList = sensitiveList.filter((item) => item);
  const result: Record<number, number> = {};
  if (sensitiveList.length === 0) return result;

  const indexNeedHight = new Map<number, boolean>();

  for (const item of sensitiveList) {
    const key = escapeRegExp(item);
    // const twKey = convert.cn2tw(key); // 中文繁体
    const twKey = tify(key);
    let regKey = "";

    for (let y = 0; y < key.length; y++) {
      if (key[y] !== twKey[y]) {
        regKey += `(${key[y]}|${twKey[y]})`;
      } else if (isLetter(key[y])) {
        regKey += `(${key[y].toLowerCase()}|${key[y].toUpperCase()})`;
      } else {
        regKey += key[y];
      }
    }

    const regex = new RegExp(regKey, "g");
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      const startIndex = match.index;
      const endIndex = startIndex + item.length;
      for (let i = startIndex; i < endIndex; i++) {
        indexNeedHight.set(i, true);
      }
    }
  }

  let i = 0;
  while (i < content.length) {
    if (indexNeedHight.get(i)) {
      const start = i;
      while (indexNeedHight.get(i) && i < content.length) {
        i++;
      }
      result[start] = i - 1;
    } else {
      i++;
    }
  }
  return result;
}

export function getRenderTextList(
  content: string,
  config: HightLightConfig
): TextSegment[] {
  if (!content) {
    return [{ text: "" }];
  }

  const pos: Record<string, Record<number, number>> = {};

  // 处理配置项
  for (const key of Object.keys(config) as (keyof HightLightConfig)[]) {
    const values = config[key];
    if (values && values.length > 0) {
      pos[key] = hightChangeContent(content, values);
    }
  }

  if (Object.keys(pos).length === 0) {
    return [{ text: content }];
  }

  const indexToClass: Record<number, string> = {};

  // 生成字符索引到class的映射
  for (let i = 0; i < content.length; i++) {
    let classStr = "";
    for (const key in pos) {
      const positions = pos[key];
      for (const startStr in positions) {
        const start = parseInt(startStr);
        const end = positions[start];
        if (i >= start && i <= end) {
          classStr += `${key} `;
          break;
        }
      }
    }
    indexToClass[i] = classStr.trim();
  }
  // 合并连续相同样式的字符
  const renderList: TextSegment[] = [];
  for (let i = 0; i < content.length; i++) {
    const currentChar = content[i];
    const currentClass = indexToClass[i];

    if (
      i > 0 &&
      currentClass === indexToClass[i - 1] &&
      renderList.length > 0
    ) {
      renderList[renderList.length - 1].text += currentChar;
    } else {
      renderList.push({
        text: currentChar,
        classStr: currentClass || undefined,
      });
    }
  }

  return renderList;
}
