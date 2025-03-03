// 是否是图片
export const isPhoto = (suffix) => {
  return [
    ".webp",
    ".bmp",
    ".pcx",
    ".tif",
    ".gif",
    ".jpeg",
    ".jpg",
    ".tga",
    ".exif",
    ".fpx",
    ".psd",
    ".cdr",
    ".pcd",
    ".dxf",
    ".ufo",
    ".eps",
    ".ai",
    ".png",
    ".hdri",
    ".raw",
    ".wmf",
    ".flic",
    ".emf",
    ".ico",
    ".avif",
    ".apng",
  ].includes("." + suffix);
};

// 是否是svg
export const isSvg = (suffix) => {
  return suffix === "svg";
};

// 是否是音频
export const isAudio = (suffix) => {
  // 返回一个布尔值，表示给定的后缀名是否表示一个音频文件
  return [
    // 音频文件的后缀名列表
    ".aac",
    ".mpeg",
    ".flac",
    ".ogg",
    ".wav",
    ".mp3",
    ".cd",
    ".aiff",
    ".mp4",
    ".midi",
    ".wma",
    ".ra",
    ".vqf",
    ".amr",
    ".ape",
  ].includes("." + suffix);
};

// 是否是视频
export const isVideo = (suffix) => {
  return [
    ".webm",
    ".3gp",
    ".mpeg",
    ".mp4",
    ".ogg",
    ".quicktime",
    ".avi",
    ".navi",
    ".asf",
    ".mov",
    ".wmv",
    ".rm",
    ".rmvb",
    ".flv",
    ".f4v",
    ".h264",
    ".h265",
  ].includes("." + suffix);
};

// 将svg转换为dom元素
export const svgTransformToDom = (name, suffix, url, svgContent) => {
  const svgId = name + suffix + url;
  const blob = new Blob([svgContent], {
    type: "image/svg+xml",
  });
  // 使用 FileReader 读取 BLOB
  const reader = new FileReader();
  reader.onload = function (event) {
    // 获取数据 URL
    const svgDataUrl = event.target.result as string;
    // 创建一个 img 元素并设置其 src 属性
    const img = document.createElement("img");
    img.src = svgDataUrl;
    img.alt = "SVG 图像";
    img.style.maxWidth = "160px";
    img.style.maxHeight = "90px";
    // 将 img 元素添加到 DOM 中
    if (
      document.getElementById(svgId) &&
      !document.getElementById(svgId).firstElementChild
    )
      document.getElementById(svgId).appendChild(img);
  };
  // 读取 BLOB 数据
  reader.readAsDataURL(blob);
  return `<div id="${svgId}"></div>`;
};

// 下载文件
export const downFile = (href, filename) => {
  debugger;
  const a = document.createElement("a");
  // 创建一个下载的链接
  //   a.href = URL.createObjectURL(blob);
  a.href = href;
  // 设置文件名
  a.download = filename;
  // 模拟点击事件，进行下载
  document.body.appendChild(a);
  a.click();
  // 移除元素
  document.body.removeChild(a);
};
