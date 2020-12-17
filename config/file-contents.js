function envFile(port) {
  return `PORT=${port}
BROWSER=none
USE_REMOTE_IP=true
`
}

function umircJs(name) {
  return `const baseConfig = require('../../config/umi.config')

module.exports = {
  ...baseConfig('${name}'),
};
`
}

function appJs() {
  return `
export const qiankun = { };

export function patchRoutes({routes}) {
  window.g_routes = routes;
}
  `
}

function globalLess(name) {
  return `
#${name} {
  height: 100%;
}`
}

function packageJson(name) {
  return `{
  "name": "${name}",
  "scripts": {
    "start": "umi dev",
    "build": "COMPRESS=none umi build",
    "test": "umi test"
  },
  "devDependencies": {
    "source-map-loader": "^0.2.4"
  }
}
`
}

function serveJson(name) {
  return `{
  "public": "dist",
  "rewrites": [
    {
      "source": "/${name}/*",
      "destination": "/${name}/index.html"
    }
  ]
}
`
}

function indexJs(name) {
  return `
export default () => {

  return (
    <div>
      ${name} page
    </div>
  )

}`
}

module.exports = {
  envFile, umircJs, indexJs, serveJson, packageJson, globalLess, appJs
};
