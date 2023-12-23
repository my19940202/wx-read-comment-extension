import React, {useState, useCallback} from 'react';  
import {getFormattedDate, backgroundLog} from './utils';

const Comment = props => {
    const {list = [], width, isDark} = props;
    const githubUrl = `https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/dev/github-${isDark ? 'white' : 'black'}.png`;
    const lineClass = new Array(list.length || 0).fill('comment-item-abstract one-line');
    const [line, setLine] = useState(lineClass);
    const toggleAbstract = useCallback((e) => {
        const idx = e.target.dataset.key;
        line[idx] = line[idx].includes('one-line') ? 'comment-item-abstract' : 'comment-item-abstract one-line';
        setLine(line.concat([]));
    }, []);

    const reloadPage = useCallback(() => {
        window.location.reload();
    }, []);

    const emptyTip = (
        <h1 onClick={reloadPage}>部分书籍无法获取评论 待升级支持</h1>
    );

    const chapterTitle = list[0] && list[0].chapterTitle || '当前';

    const commentList = (
        <div style={{width: width - 40}}>
            <div className='comment-header'>
                <div className='github-bar'>
                    <a href="https://github.com/my19940202/wx-read-comment-extension" target='_blank'>
                        开发不易，求star支持
                        <img src={githubUrl} />
                    </a>
                </div>
                <h1>{chapterTitle}共有{list.length}条评论</h1>
            </div>
            {list.map((item, idx) => {
                const author = item.author || {};
                const createTime = getFormattedDate(item.createTime * 1000);
                const abstract = '对应原文:&nbsp;' + item.abstract;
                return (
                    <div className='comment-item' key={idx}>
                        <div className='comment-item-title'>
                            <img className="avatar" src={author.avatar} />
                            <span className="name" >{author.name}</span>
                            <span className="time">{createTime}</span>
                        </div>
                        <div className='comment-item-content' dangerouslySetInnerHTML={{__html: item.content}}>
                        </div>
                        {
                            item.abstract && (
                                <div className={line[idx]} onClick={toggleAbstract} data-key={idx} dangerouslySetInnerHTML={{__html: abstract}}>
                                </div>
                            )
                        }
                    </div>
                )
            })}
        </div>
    )
    return (
        <div className="comment-react-wrapper">
            {list.length === 0 ? emptyTip : commentList}
        </div>
    );
};

export default Comment;
