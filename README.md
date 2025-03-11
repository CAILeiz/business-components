# business-components

用途：将通用的业务组件封装成 npm 包，方便在其他项目中复用；同时将常见的工具库封装成 npm 包，不需要安装大体积的 lodash 类似的库

以下是目前涉及到的组件及工具，都会一一实现，组件目前采用 vue3 + typescript 实现，工具库采用纯 js 实现。

#### 1、业务组件

-- 案例

- [ ] **xx**
  - [ ] x1
  - [ ] x2

1. text-tooltips

- [x] **组件功能：**
  - [x] 文本超出打点
  - [x] 文本支持多行超出打点
  - [x] 超出打点支持 hover 查看全部内容
- [x] **实现：**

  - [x] 复用 el-tooltips
  - [x] 动态绑定 style，超出多少行打点
  - [x] 逻辑计算是否有超出，用于判断 hover 是否展示全部内容

2. more-tags
3. photo-video-audio

- [x] **组件功能：**
  - [x] 根据文件类型渲染不同组件，支持图片、视频、音频
  - [x] 类型都不满足，渲染下载按钮，支持下载
- [x] **实现：**
  - [x] 定义三种类型的组建
  - [x] 根据文件类型渲染不同组件

4. element-tree-parent-choose (父子级联动)
5. element-cascader-parent-checked (父子级联动)
6. photo-video-audio-upload 判断校验
7. message-cloud 消息云

#### 2、工具库

- [x] 1. cloneDeep
- [x] 2. debounce
- [x] 3. throttle
- [x] 4. eventBus
- [x] 5. windowPostMessage
- [x] 6. paintRenderText (标颜色)
- [x] 7. genId

## Installation

```
npm install business-components
```

## Usage

`import { cloneDeep, install } from "business-components";`

`install(Vue);`

#### Example:

```javascript
import { cloneDeep, install } from "business-components"; // 导入工具库和组件

// 注册全局组件
install(Vue);

// cloneDeep
const data = cloneDeep(originData);
```
