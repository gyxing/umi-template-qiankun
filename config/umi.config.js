const path = require('path');
const config = require('../common/config').default;

const rootDir = path.resolve(__dirname, '../');
const commonDir = path.resolve(rootDir, 'common');

module.exports = (project, masterName) => {

  let items = project ? {
    base: '/' + project,
    publicPath: `${config.prefix}/${project}/`,
    outputPath: '../../dist/' + project,
    mountElementId: project,
    qiankun: {
      slave: {},
    },
  } : {
    publicPath: `${config.prefix}/`,
    outputPath: `../../dist/${masterName || 'master'}`,
    qiankun: {
      master: {},
    },
  };

  const proxy = {
    [config.hostApi]: {
      target: config.host,
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  };

  return {
    ...items,
    proxy,
    title: config.name,
    hash: true,
    history: { type: 'hash' },
    define: {
      // 是否开启权限控制
      'process.env.PERMISSION': true,
    },
    dynamicImport: {
      loading: '@/pages/loading',
    },
    runtimePublicPath: process.env.NODE_ENV !== 'production',
    alias: {
      '@root': rootDir,
      '@common': commonDir,
    },
    plugins: [
      '@umijs/plugin-dva',
      '@umijs/plugin-model',
      '@umijs/plugin-antd',
      '@umijs/plugin-qiankun',
    ],
    targets: { android: 4, chrome: 48, edge: 13, firefox: 40, ie: 9, ios: 7, safari: 5 },
  }
};
