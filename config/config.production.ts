/*
 * @description: umi config entry
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-10 10:04
 */

export default {
  define: {
    'process.env.runtime': 'production',
  },
  context: {
    runtime: 'production',
  }, // global ctx here, every page can use it
  hash: true,
};
