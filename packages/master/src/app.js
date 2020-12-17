import { useState } from 'react';
import config from '@common/config';
import loading from './utils/loading';

// 这些域名不需qiankun拦截代理
const excludeAssets = ['map.qq.com', 'map.gtimg.com', 'agtsjb.com', 'so9.cc'];

// entry: 'http://localhost:8001/app1',
// 注册微应用
const apps = [
  { name: 'app1', port: 8001 },
].map(d => ({
  name: d.name,
  entry: d.entry ? d.entry : ((process.env.NODE_ENV === 'production' ? `${config.prefix}/` : `http://localhost:${d.port}/`) + d.name),
}));

export const qiankun = async () => {
  return {
    apps,
    lifeCycles: {
      beforeLoad() {
        loading.show();
      },
      afterMount() {
        loading.hide();
      },
      beforeUnmount() {
        loading.show();
      }
    },
    excludeAssetFilter: url => {
      const item = excludeAssets.find(d => url.indexOf(d) !== -1);
      return !!item;
    },
  };
};

export const useQiankunStateForSlave = () => {
  const [globalState, setQiankunGlobalState] = useState({
    slogan: 'Hello MicroFrontend',
  });

  return {
    globalState,
    setQiankunGlobalState,
  };
};
