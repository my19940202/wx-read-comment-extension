
import React from 'react';
import {createRoot} from 'react-dom/client';
import Comment from './Comment';
import {getCommentData, getBookIdFormNetwork, backgroundLog} from './utils';
import './content.styles.css';

let root;
let params = {
    listType: 8 // 默认listType 不清楚含义
};
// 每次页面加载都刷新一次bookId
getBookIdFormNetwork(params);

window.addEventListener('load', async () => {
    // 1.修改页面结构 便于显示评论dom
    const wrapper = document.createElement('div');
    const appDom = document.getElementById('app');
    const isDark = !document.body.classList.contains('wr_whiteTheme');
    const {clientHeight: height, clientWidth: width} = document.documentElement;
    const commentWidth = Math.round(width - 1000 - 100);
    wrapper.className = 'chrex-comment-wrapper';
    wrapper.style = `height: ${height}px;width: ${commentWidth}px;`;
    appDom.append(wrapper);

    // 2.首次页面加载 渲染评论
    async function renderComments() {
        let commentList = await getCommentData(params);
        const props = {list: commentList, width: commentWidth, isDark, params};
        root = createRoot(wrapper);
        root.render(<Comment {...props} />);
    }
    // 延迟一秒钟渲染评论
    setTimeout(renderComments, 1000)

    // 3.监控标题变化(针对切换章节和点击上下一章)重新渲染评论
    const chapterNode = document.querySelector('.readerTopBar_title_chapter');
    const observer = new MutationObserver(async (mutationsList, observer) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'characterData') {
                renderComments();
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

