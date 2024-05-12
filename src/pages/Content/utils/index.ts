// util工具函数

export const getBookIdFormNetwork = (params) => {
    let idx = 0;
    const timer = setInterval(() => {
        backgroundLog({type: 'getBookIdFormNetwork', idx});
        idx++;
        chrome.runtime.sendMessage('getBookId', function (bookId) {
            params.bookId = bookId;
            if (!!params.bookId) {
                clearInterval(timer);
            }
        });
    }, 300);
};

// 微信读书页面有禁止调试逻辑, 在service worker打点调试
export const backgroundLog = (data: any) => {
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
export const genCommetUrl = (params: any) => {
    let url = '';
    // v1：从书籍的封面图获取bookId(实际效果不好，由于封面图图片url不统一，获取成功率偏低)
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

    // v2获取chapterUid: 通过解析页面章节dom推算当前章节的chapterUid
    // 存在的问题: 部分书籍章节多层级  需要调整一下计算方法(在某些长篇小说里面不准确)
    const catalogList = document.querySelectorAll('li.readerCatalog_list_item');
    for (let idx = 0; idx < catalogList.length; idx++) {
        const ele = catalogList[idx];
        if (ele.classList.contains('readerCatalog_list_item_selected')) {
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

export const getCommentData = async (params: any) => {
    const url = genCommetUrl(params);
    let commentList = [];
    if (url) {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.reviews) {
            commentList = data.reviews.map((item: any) => {
                return item && item.review;
            })
        }
        backgroundLog(commentList);
    }
    return commentList;
};
