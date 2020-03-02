/**
 * @description 常用的工具函数
 * @author tracyqiu
 * @date 2019-8-8
 */

/**
 * 数字千分位
 * @param input
 */
export const thousandsFormat = (input: number) => {
  return (
    input &&
    input
      .toString()
      .replace(/(^|\s)-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
  );
};

/**
 * 获取 URL 中的参数
 * @param name
 */
export const getParameterByName = (name: string) => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * 洗牌shuffle
 * @param arr
 * @param size
 */
export const shuffle = (arr: number[], size: number): number[] => {
  const res = [];
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * (arr.length - i));
    const item = arr[randomIndex];
    const changeIndex = arr.length - 1 - i;
    res.push(item);
    arr[randomIndex] = arr[changeIndex];
    arr[changeIndex] = item;
  }
  return res;
};
