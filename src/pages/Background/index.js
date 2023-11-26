console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener((request, render, sendResponse) => {
    console.log("onMessage", request);
    sendResponse("reslut");
    return true; // 重点是这一个 返回true：允许返回异步消息
});