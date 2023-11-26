import React from 'react';

const Comment = props => {
    const {list} = props;
    return (
        <div className="comment-react-wrapper">
            <h1>获取到{list.legnth}条微信读书评论</h1>
            {list.map((item, idx) => (
                <div>
                    <span>{idx}</span>
                    <span>{item.content}</span>
                    <span>{item.createTime}</span>
                    <span>{item.userVid}</span>
                </div>
            ))}
        </div>
    );
};

export default Comment;
