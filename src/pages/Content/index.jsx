
import React from 'react';
import {createRoot} from 'react-dom/client';
import Comment from './Comment';
import {genCommetUrl} from './utils';
import './content.styles.css';

window.addEventListener('load', (event) => {
    const reqUrl = genCommetUrl();

    // 修改页面结构显示评论dom
    const wrapper = document.createElement('div');
    const appDom = document.getElementById('app');
    wrapper.className = 'chrex-comment-wrapper';
    const height = document.documentElement.clientHeight;
    wrapper.style = `height: ${height}px`;

    appDom.append(wrapper);

    // 请求评论数据
    if (reqUrl) {
        fetch(reqUrl)
        .then(response => response.json())  
        .then(data => {
            // 数据格式化
            let commentList = [];
            if (data && data.reviews) {
                commentList = data.reviews.map(item => {
                    return item && item.review;
                })
            }

            const root = createRoot(wrapper);
            root.render(<Comment list={commentList} />);

            // 微信读书页面禁止调试, 后台发送消息查看数据
            chrome.runtime.sendMessage({reqUrl, commentList}, (response) => {
                if (callback) {
                    callback(response);
                }
            });
        })  
        .catch(error => console.error('Error:', error));
    }
});
