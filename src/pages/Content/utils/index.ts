// util工具函数

let params: any = {
    listType: 8 // 默认listType 不清楚含义
};

export const getBookIdFormNetwork = () => {
    // 微信读书页面禁止调试, 后台发送消息查看数据
    chrome.runtime.sendMessage('getBookId', function (bookId) {
        params.bookId = bookId;
    });
};

// 微信读书页面禁止调试, 后台发送消息查看数据
export const backgroundLog = data => {
    chrome.runtime.sendMessage(data);
};


export function safeParseJSON(str: string) {
    try {
        const json = JSON.parse(str);
        return json;
    } catch (error) {
        return null;
    }
}

// 生成评论请求url
// https://weread.qq.com/web/review/list?bookId=3300025096&chapterUid=12&listType=8
export const genCommetUrl = () => {
    console.log('params', params);
    
    let url = '';
    // v1：从书籍的封面图获取bookId:
    // https://cdn.weread.qq.com/weread/cover/96/3300025096/t6_3300025096.jpg
    // https://cdn.weread.qq.com/weread/cover/17/YueWen_23656825701619404/t6_YueWen_23656825701619404.jpg
    // const coverImage = document.querySelector('img.wr_bookCover_img') as HTMLImageElement;
    // if (coverImage && coverImage.src) {
    //     const bookId = coverImage.src.match(/\d{5,}/);
    //     if (bookId && bookId[0]) {
    //         params = {
    //             ...params,
    //             bookId: bookId[0].replace(/\//g ,'')
    //         };
    //     }
    // }

    // 获取chapterUid: 通过解析readerCatalog_list 解析出当前文章在第几节
    // TODO: 需要关注有些章节是层级的 需要调整一下计算方法, 目前这个chapterUid 在某些长篇小说里面不准确
    const catalogList = document.querySelectorAll('li.chapterItem');
    for (let idx = 0; idx < catalogList.length; idx++) {
        const ele = catalogList[idx];
        if (ele.classList.contains('chapterItem_current')) {
            params.chapterUid = 2 + idx;
            break;
        }
    }
    if (params.bookId && params.chapterUid) {
        let queryObj = new URLSearchParams(params);
        url = `https://weread.qq.com/web/review/list?${queryObj.toString()}`;
    }
    backgroundLog({params, url});

    return url;
};

// 日期格式化
export function getFormattedDate(timestamp: number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

export const getCommentData = async () => {
    const url = genCommetUrl();
    if (url) {
        const response = await fetch(url);
        const data = await response.json();
        // 数据格式化
        let commentList = [];
        if (data && data.reviews) {
            commentList = data.reviews.map(item => {
                return item && item.review;
            })
        }
        return commentList;
    }
};
