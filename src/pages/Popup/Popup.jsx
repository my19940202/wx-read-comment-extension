import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>评论很6:微信读书显示评论</div>
        <div>使用说明 点击前往</div>
      </header>
    </div>
  );
};

export default Popup;
