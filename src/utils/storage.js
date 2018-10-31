/**
 * 保存
 */
export const setStore = (key, value) => {
  if(!key) {
    return;
  }
  if(typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

/**
 * 获取
 */
export const getStore = (key) => {
  if(!key) {
    return ;
  }
  return window.localStorage.getItem(key);
}

/**
 * 删除
 */
export const removeStore = (key) => {
  if(!key) {
    return ;
  }
  window.localStorage.removeItem(key);
}

/**
 * 清空
 */
export const clearStore = () => {
  window.localStorage.clear();
}
