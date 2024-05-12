// 通过监控network请求，从请求中截取bookId
let bookId = '';
let pageMap = {};
let currPageKey = '';
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message);
    if (message === 'getBookId') {
        sendResponse(pageMap[currPageKey]);
    }
});

// 拦截网络请求 获取bookid参数
chrome.webRequest.onCompleted.addListener(
    function(details) {
        const reqUrl = details && details.url || '';
        // 监控阅读页面url变化 判断是否要更新bookId
        // 示例: https://weread.qq.com/web/reader/1cc3252071adc3b11cc0162k7f33291023d7f39f8317e0b
        if (reqUrl.includes('web/reader')) {
            currPageKey = reqUrl.split('/reader/')[1].slice(0, 10);
        }

        // 监控页面评论请求接口 获取bookId
        // 示例: https://weread.qq.com/web/review/list?bookId=3300024003&listType=3&maxIdx=0&count=3&listMode=2&synckey=0
        if (reqUrl.includes('bookId=') && !pageMap[currPageKey]) {
            let urlParams = new URLSearchParams(details.url.split('?')[1]);
            urlParams.get('bookId') && (bookId = urlParams.get('bookId'));
            console.log(details.url, 'bookId', bookId);
            pageMap[currPageKey] = bookId;
        }
    },
    // 监听这俩类请求
    {urls: ['https://weread.qq.com/web/review/*', 'https://weread.qq.com/web/reader/*']}
);

