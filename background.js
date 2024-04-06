const customUrl = "https://xxx.com/xxx/";  // 输入自己的代理地址

chrome.action.onClicked.addListener((tab) => {
  let currentUrl = tab.url;
  let newUrl;

  if (currentUrl.startsWith(customUrl)) {
    // 从代理 URL 转换回原始 URL 的逻辑
    let protocolAndRest = currentUrl.substring(customUrl.length);
    let protocol = protocolAndRest.startsWith('https/') ? 'https://' : 'http://';
    newUrl = protocol + protocolAndRest.substring(6);
  } else {
    // 为当前标签的 URL 添加代理前缀
    let urlWithoutProtocol = currentUrl.replace(/^https?:\/\//, '');
    newUrl = `${customUrl}${currentUrl.startsWith('https://') ? 'https/' : 'http/'}${urlWithoutProtocol}`;
  }

  if (currentUrl !== newUrl) {
    chrome.tabs.update(tab.id, {url: newUrl});
  }
});
