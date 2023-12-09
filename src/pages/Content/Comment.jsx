import React, {useState, useCallback} from 'react';  
import {getFormattedDate, backgroundLog} from './utils';

const Comment = props => {
    const {list = [], width} = props;
    const wechatUrl = 'https://636c-cloud1-5g5eyjtze161c202-1319072486.tcb.qcloud.la/dev/wechat-qr-code.jpg';
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
        <h1 onClick={reloadPage}>暂时获取不到评论，点击重新载入评论</h1>
    );

    const commentList = (
        <div style={{width: width - 40}}>
            <div className='comment-header'>
                <h1>获取{list.length}条评论</h1>
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
                        <div className={line[idx]} onClick={toggleAbstract} data-key={idx} dangerouslySetInnerHTML={{__html: abstract}}>
                        </div>
                    </div>
                )
            })}
            {list.length > 3 && (
                <div className='wechat-reward'>
                    <p>
                        <a href="https://github.com/my19940202/wx-read-comment-extension" target='_blank'>
                            开发不易，求打赏和支持star
                        </a>
                    </p>
                    <img src={wechatUrl} />
                </div>
            )}
        </div>
    )
    return (
        <div className="comment-react-wrapper">
            {list.length === 0 ? emptyTip : commentList}
        </div>
    );
};

export default Comment;
