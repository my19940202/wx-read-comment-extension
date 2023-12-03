
import React from 'react';
import {createRoot} from 'react-dom/client';
import Comment from './Comment';
import {backgroundLog, getCommentData} from './utils';
import './content.styles.css';

let root;

window.addEventListener('load', async () => {
    // 修改页面结构显示评论dom
    const wrapper = document.createElement('div');
    const appDom = document.getElementById('app');
    wrapper.className = 'chrex-comment-wrapper';
    const {clientHeight: height, clientWidth: width} = document.documentElement;
    const commentWidth = Math.round(width - 1000 - 100);
    wrapper.style = `height: ${height}px;width: ${commentWidth}px;`;

    appDom.append(wrapper);

    // 首次页面加载 渲染评论
    let commentList = await getCommentData();
    const props = {list: commentList, width: commentWidth};
    root = createRoot(wrapper);
    root.render(<Comment {...props} />);
    backgroundLog('backgroundLog', backgroundLog);

    // 监控标题变化(针对切换章节和点击上下一章)重新渲染评论
    const chapterNode = document.querySelector('.readerTopBar_title_chapter');
    const observer = new MutationObserver(async (mutationsList, observer) => {
        backgroundLog({data: 'aaaa'});
        for(let mutation of mutationsList) {
            if (mutation.type === 'characterData') {
                let commentList = await getCommentData();
                const props = {list: commentList, width: commentWidth};
                root = createRoot(wrapper);
                root.render(<Comment {...props} />);
            }
        }
    });
    observer.observe(chapterNode, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    });
});

