const customUrl = "https://xxx.com/xxx/";  // 输入自己的代理地址

// 当扩展安装后，创建右键菜单项
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "proxy-link",
    title: "代理打开链接",
    contexts: ["link"]
  });
});

// 监听工具栏图标的点击事件
chrome.action.onClicked.addListener((tab) => {
  toggleProxy(tab);
});

// 监听右键菜单项的点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "proxy-link") {
    // 如果是在链接上点击，则在新标签页中打开代理后的链接
    let linkUrl = info.linkUrl;
    let newUrl = getProxiedUrl(linkUrl);
    chrome.tabs.create({ url: newUrl });
  } else if (tab) {
    // 如果是通过工具栏图标点击，则切换当前标签页的代理状态
    toggleProxy(tab);
  }
});

// 切换代理状态的函数
function toggleProxy(tab) {
  let currentUrl = tab.url;
  let newUrl = getProxiedUrl(currentUrl);

  if (currentUrl !== newUrl) {
    chrome.tabs.update(tab.id, { url: newUrl });
  }
}

// 获取代理后的URL的函数
function getProxiedUrl(url) {
  let newUrl;

  if (url.startsWith(customUrl)) {
    let protocolAndRest = url.substring(customUrl.length);
    let protocol = protocolAndRest.startsWith('https/') ? 'https://' : 'http://';
    newUrl = protocol + protocolAndRest.substring(6);
  } else {
    let urlWithoutProtocol = url.replace(/^https?:\/\//, '');
    newUrl = `${customUrl}${url.startsWith('https://') ? 'https/' : 'http/'}${urlWithoutProtocol}`;
  }

  return newUrl;
}
