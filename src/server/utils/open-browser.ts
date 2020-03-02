const opn = require('opn');
/**
 * 用opn库自动打开浏览器
 * @param {url} url
 */
function openBrowser(url: string) {
  // 默认谷歌 有需要请自行修改
  // opn(url, {app: 'firefox'});
  opn(url).catch((err: Error) => {
    throw err;
  });
}
export default openBrowser;
