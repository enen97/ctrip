// src/utils/loadBMap.js
export function loadBMap(ak) {
  return new Promise((resolve, reject) => {
    if (window.BMap) {
      resolve(window.BMap);
      return;
    }
    // 百度地图异步加载的回调函数
    window.onBMapCallback = function () {
      resolve(window.BMap);
    };
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=onBMapCallback`;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
