const customUrl = "https://xxx.com/xxx/"; // 用户自定义的网址

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changeDomain") {
    changeDomain();
  }
});

function changeDomain() {
  let currentUrl = window.location.href;
  let newUrl;

  // 检查当前URL是否以自定义前缀开始
  if (currentUrl.startsWith(customUrl)) {
    // 提取协议和域名
    let strippedUrl = currentUrl.substring(customUrl.length);
    let protocol = strippedUrl.startsWith('https/') ? 'https://' : 'http://';
    newUrl = protocol + strippedUrl.substring(6); // 移除 'https/' 或 'http/'
  } else {
    // 添加自定义前缀
    let protocol = window.location.protocol;
    let domain = window.location.hostname;
    let path = window.location.pathname + window.location.search;
    newUrl = customUrl + protocol.replace(':', '') + '/' + domain + path;
  }

  // 防止循环跳转
  if (currentUrl !== newUrl) {
    window.location.href = newUrl;
  }
}
