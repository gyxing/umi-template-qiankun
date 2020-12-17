const path = require('path');
const fs = require('fs');
const contents = require('./file-contents');

// 生成递进的端口号
function getPort() {
  const dir = path.resolve(__dirname, '../packages');
  const dirs = fs.readdirSync(dir);
  const ports = [];
  dirs.forEach(name => {
    const envFilePath = path.join(dir, name, '.env');
    if (fs.existsSync(envFilePath)) {
      const str = String(fs.readFileSync(envFilePath));
      const portStr = str.split('\n').find(line => line.indexOf('PORT') !== -1);
      if (portStr) {
        ports.push(Number(portStr.substring(portStr.indexOf('=') + 1)))
      }
    }
  });
  return Math.max(...ports) + 1
}

// 创建子项目文件
function createFiles(projectName) {
  console.log("\nstarting project ===> ", projectName);
  const projectDir = path.resolve(__dirname, `../packages/${projectName}`);
  if (fs.existsSync(projectDir)) {
    console.log("project 已存在 ===> ", projectName);
    return false;
  }
  fs.mkdirSync(projectDir);
  fs.mkdirSync(path.join(projectDir, 'src'));
  fs.mkdirSync(path.join(projectDir, 'src/pages'));

  const files = [
    {name: '.env', content: contents.envFile(getPort())},
    {name: '.umirc.js', content: contents.umircJs(projectName)},
    {name: 'package.json', content: contents.packageJson(projectName)},
    {name: 'serve.json', content: contents.serveJson(projectName)},
    {name: 'src/app.js', content: contents.appJs(projectName)},
    {name: 'src/global.less', content: contents.globalLess(projectName)},
    {name: 'src/pages/index.js', content: contents.indexJs(projectName)},
  ];
  files.forEach(d => {
    fs.appendFileSync(path.join(projectDir, d.name), d.content);
  })
}

// 子项目名
const projects = JSON.parse(process.env.npm_config_argv).remain;

// 开始创建子项目文件
if (projects && projects.length > 0) {
  projects.forEach(d => createFiles(d))
}

console.log('\n\nDone ! Finished !');

process.exit();
