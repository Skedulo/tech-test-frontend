import { delay } from '../utils';

export const caches = {};

export const cache = (key, data, expiredTime) => {
  caches[key] = {
    data,
    expiredTime: new Date().getTime() + expiredTime,
  };
};

export function getCache(key) {
  const cacheData = caches[key];
  if (cacheData && cacheData.expiredTime > new Date().getTime()) {
    return cacheData.data;
  }
  return null;
}

export const clearCache = (key) => {
  if (!caches[key]) {
    return;
  }
  delete caches[key];
};

export const cachePromise = async (key, promiseFunc, expiredTime) => {
  const cachedData = getCache(key);
  if (cachedData !== null) {
    return cachedData;
  }
  await delay();
  const data = await promiseFunc();
  cache(key, data, expiredTime || 10000);
  return data;
};
