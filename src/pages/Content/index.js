// import { printLine } from './modules/print';

function main() {
  const h1 = document.createElement('h1');
  h1.innerText = '显示评论测试输出';
  h1.style.color = 'red';
  document.body.append(h1);
}
main();
// printLine('this is contentjs');

// // content给后台发送消息
// function sendMessageToBackground(msg, callback) {
//   chrome.runtime.sendMessage(msg, (response) => {
//     if (callback) {
//       callback(response);
//     }
//   });
// }

// // content发送消息并等待消息返回
// const cookie = document.cookie;
// window.addEventListener('load', (event) => {
//   // 1. 明确划线和请求评论数据的api
//   // 1.1 微信读书APP里面解析评论请求
//   // 1.2 微信PC版本解析评论请求
//   // 2. chrome里面发起请求能不能获取到数据
//   // 3. 页面里面渲染评论数据
// });
