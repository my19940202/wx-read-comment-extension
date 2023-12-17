// 通过监控network请求，从请求中截取bookId
let bookId = '';
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message === 'getBookId') {
        sendResponse(bookId);
    }
});

chrome.webRequest.onCompleted.addListener(function(details) {
    console.log('details.urldetails.url', details.url);
    if (details && details.url && details.url.includes('bookId=')) {
        let urlParams = new URLSearchParams(details.url.split('?')[1]);
        urlParams.get('bookId') && (bookId = urlParams.get('bookId'));
        console.log(details.url, 'bookId', bookId);
    }
    // 监控原来页面的评论请求接口 获取bookId
    // https://weread.qq.com/web/review/list?bookId=3300024003&listType=3&maxIdx=0&count=3&listMode=2&synckey=0
  }, {urls: ["https://weread.qq.com/web/review/*"]});

