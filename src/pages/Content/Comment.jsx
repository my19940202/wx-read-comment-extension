import React from 'react';
import {getFormattedDate} from './utils';

const Comment = props => {
    const {list = []} = props;
    const emptyTip = (
        <h1>暂时没有获取到评论</h1>
    );
    const commentList = (
        <>
            <div className='comment-header'>
                <h1>获取{list.length}条评论</h1>
            </div>
            {list.map((item, idx) => {
                const author = item.author || {};
                const createTime = getFormattedDate(item.createTime * 1000);
                return (
                    <div className='comment-item' key={idx}>
                        <div className='comment-item-title'>
                            <img className="avatar" src={author.avatar} />
                            <span className="name" >{author.name}</span>
                            <span className="time">{createTime}</span>
                            <span className="time">点赞数: {item.likesCount || 0}</span>
                        </div>
                        <p className='comment-item-content' dangerouslySetInnerHTML={{__html: item.content}}>
                        </p>
                        <p className='comment-item-abstract' dangerouslySetInnerHTML={{__html: item.abstract}}>
                        </p>
                    </div>
                )
            })}
        </>
    )
    return (
        <div className="comment-react-wrapper">
            {list.length === 0 ? emptyTip : commentList}
        </div>
    );
};

export default Comment;
