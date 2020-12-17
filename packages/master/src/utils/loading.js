let ele = window._loading_ele;

const mainStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  'background-color': 'rgba(255, 255, 255, 0.15)',
};

const imgStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '36px',
  height: '36px',
};

function getStyle(obj, ele) {
  // ie static　模式下不允许　el.style = "width: 20px;height: 30px" -> 改成 el.style.width = '20px'
  Object.keys(obj).forEach(key => {
    ele.style[key] = obj[key];
  });
  // return Object.keys(obj).reduce((pre, key) => (pre + `${key}:${obj[key]};`), '')
}

export default {
  create() {
    ele = document.createElement('div');
    ele.id = '_loading_ele';
    getStyle(mainStyle, ele);
    const img = document.createElement('img');
    img.src = 'https://gdin-1253773489.cos.ap-guangzhou.myqcloud.com/static/comm/loading.gif';
    getStyle(imgStyle, img);
    ele.appendChild(img);
    window._loading_ele = ele;
  },
  show() {
    if (!ele) {
      this.create();
    }
    if (document.body.contains(ele)) {
      this.hide(true)
    }
    document.body.appendChild(ele);
  },
  hide(isImmediately) {
    if (isImmediately) {
      document.body.removeChild(ele);
      return;
    }
    if (ele) {
      setTimeout(() => {
        if (document.body.contains(ele)) {
          document.body.removeChild(ele);
        }
      }, 1000)
    }
  }
}
