import './content.styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Comment from './Comment';

// // content发送消息并等待消息返回
// const cookie = document.cookie;
window.addEventListener('load', (event) => {
  // 1. 明确划线和请求评论数据的api
  // 1.1 微信读书APP里面解析评论请求
  // 1.2 微信PC版本解析评论请求
  // 2. chrome里面发起请求能不能获取到数据
  // 3. 页面里面渲染评论数据

    // 1. 获取评论接口需要的参数 准备发起请求(默认listType 不清楚含义)
    // // https://weread.qq.com/web/review/list?bookId=3300025096&chapterUid=12&listType=8
    let params = {listType: 8};
    // 1.1 获取bookId
    const coverImage = document.querySelector('img.wr_bookCover_img');
    if (coverImage && coverImage.src) {
        // https://cdn.weread.qq.com/weread/cover/96/3300025096/t6_3300025096.jpg
        const bookId = coverImage.src.match(/\/\d{5,}\//);
        if (bookId && bookId[0]) {
            params.bookId = bookId[0].replace(/\//g ,'');
        }
    }
    // 1.2 获取chapterUid 通过解析readerCatalog_list 解析出当前文章在第几节
    // 需要关注有些章节是层级的 需要调整一下计算方法
    // 目前这个chapterUid 在某些长篇小说里面不准确
    const catalogList = document.querySelectorAll('li.chapterItem');
    for (let idx = 0; idx < catalogList.length; idx++) {
        const ele = catalogList[idx];
        if (ele.classList.contains('chapterItem_current')) {
            params.chapterUid = 2 + idx;
            break;
        }
    }

    // 1.2 发起网络请求
    let queryObj = new URLSearchParams(params);
    let reqUrl = `https://weread.qq.com/web/review/list?${queryObj.toString()}`;
    let commentList = [];
    fetch(reqUrl)
        .then(response => response.json())  
        .then(data => {
            // content给后台发送消息
            if (data && data.reviews) {
                commentList = data.reviews.map(item => {
                    return item && item.review;
                })
            }
            // 3. react 节点插入 提升渲染效率
            const root = createRoot(wrapper);
            root.render(<Comment list={commentList} />);
            // chrome.runtime.sendMessage({commentList}, (response) => {
            //     if (callback) {
            //         callback(response);
            //     }
            // });
        })  
        .catch(error => console.error('Error:', error));

    // 2. 样式调整
    const wrapper = document.createElement('div');
    const appDom = document.getElementById('app');
    wrapper.className = 'chrex-comment-wrapper';
    appDom.append(wrapper);

});
