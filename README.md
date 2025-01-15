# bussiness-components

用途：将通用的业务组件封装成 npm 包，方便在其他项目中复用；同时将常见的工具库封装成 npm 包，不需要安装大体积的 lodash 类似的库

以下是目前涉及到的组件及工具，都会一一实现，组件目前采用 vue3 + typescript 实现，工具库采用纯 js 实现。

#### 1、业务组件

1. text-tooltips
2. more-tags
3. photo-viedeo-audio
4. element-tree-父子级联动
5. element-cascader-父子级联动
6. photo-viedeo-audio-upload 判断校验

#### 2、工具库

1. cloneDeep
2. debounce
3. throttle
4. eventBus
5. window-postMesage
6. renderText，标颜色
7. message-cloud
8. genId

## Installation

```
npm install bussiness-components
```

## Usage

`import { cloneDeep, install } from "bussiness-components";`

`install(Vue);`

#### Example:

```javascript
import { cloneDeep, install } from "bussiness-components"; // 导入工具库和组件

// 注册全局组件
install(Vue);

// cloneDeep
const data = cloneDeep(originData);
```
