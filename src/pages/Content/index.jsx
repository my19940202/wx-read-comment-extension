
import React from 'react';
import {createRoot} from 'react-dom/client';
import Comment from './Comment';
import {genCommetUrl, backgroundLog} from './utils';
import './content.styles.css';

window.addEventListener('load', (event) => {
    const reqUrl = genCommetUrl();

    // 修改页面结构显示评论dom
    const wrapper = document.createElement('div');
    const appDom = document.getElementById('app');
    wrapper.className = 'chrex-comment-wrapper';
    const {clientHeight: height, clientWidth: width} = document.documentElement;
    const commentWidth = Math.round(width - 1000 - 100);
    wrapper.style = `height: ${height}px;width: ${commentWidth}px;`;

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
            const props = {list: commentList, width: commentWidth};

            const root = createRoot(wrapper);
            root.render(<Comment {...props} />);
        })  
        .catch(error => console.error('Error:', error));
    }
    backgroundLog('backgroundLog', backgroundLog);
});
