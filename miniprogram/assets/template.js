import {
  getuid
} from './utils';

export const templates = [{
  id: getuid(),
  background: '#fff',
  width: '660rpx',
  height: '400rpx',
  views: [{
    id: getuid(),
    type: 'rect',
    css: [{
      height: '160rpx',
      width: '160rpx',
      color: '#DC4553',
      top: '190rpx',
      left: '0'
    }]
  }, {
    id: getuid(),
    type: 'rect',
    css: [{
      height: '160rpx',
      width: '490rpx',
      color: '#DC4553',
      top: '190rpx',
      left: '170rpx'
    }]
  }, {
    id: getuid(),
    type: 'rect',
    css: [{
      height: '40rpx',
      width: '660rpx',
      color: '#DC4553',
      top: '360rpx',
      left: '0'
    }]
  }, {
    id: getuid(),
    type: 'image',
    url: '/images/qr.jpg',
    css: [{
      height: '130rpx',
      width: '130rpx',
      top: '205rpx',
      left: '96rpx'
    }]
  }, {
    id: getuid(),
    type: 'image',
    url: '/images/hui.png',
    css: [{
      height: '200rpx',
      top: '10rpx',
      left: '20rpx',
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '百小绘',
    css: [{
      fontSize: '40rpx',
      color: '#222',
      left: '200rpx',
      top: '60rpx',
    }]
  }, {
    id: getuid(),
    type: 'image',
    url: '/images/iphone.png',
    css: [{
      height: '30rpx',
      top: '210rpx',
      left: '270rpx'
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '17688888888',
    css: [{
      fontSize: '24rpx',
      color: '#fff',
      left: '310rpx',
      top: '210rpx',
    }]
  }, {
    id: getuid(),
    type: 'image',
    url: '/images/email.png',
    css: [{
      height: '30rpx',
      top: '255rpx',
      left: '270rpx'
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '41438@qq.com',
    css: [{
      fontSize: '24rpx',
      color: '#fff',
      left: '310rpx',
      top: '255rpx',
    }]
  }, {
    id: getuid(),
    type: 'image',
    url: '/images/address.png',
    css: [{
      height: '30rpx',
      top: '300rpx',
      left: '270rpx'
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '杭州滨江',
    css: [{
      fontSize: '24rpx',
      color: '#fff',
      left: '310rpx',
      top: '300rpx',
    }]
  }]
}, {
  id: getuid(),
  background: '#fff',
  width: '660rpx',
  height: '400rpx',
  views: [{
    id: getuid(),
    type: 'rect',
    css: [{
      height: '1000rpx',
      width: '1000rpx',
      color: '#efc8cb',
      top: '0',
      left: '-450rpx',
      rotate: 45
    }]
  }, {
    id: getuid(),
    type: 'rect',
    css: [{
      height: '600rpx',
      width: '600rpx',
      color: '#9cbdb2',
      top: '-410rpx',
      left: '-300rpx',
      rotate: 60
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '联系方式：',
    css: [{
      fontSize: '24rpx',
      color: '#ad9f64',
      left: '126rpx',
      top: '200rpx',
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '17688888888',
    css: [{
      fontSize: '24rpx',
      color: '#ad9f64',
      left: '240rpx',
      top: '200rpx',
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '邮箱：',
    css: [{
      fontSize: '24rpx',
      color: '#ad9f64',
      left: '172rpx',
      top: '250rpx',
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '41438@qq.com',
    css: [{
      fontSize: '24rpx',
      color: '#ad9f64',
      left: '240rpx',
      top: '250rpx',
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '地址：',
    css: [{
      fontSize: '24rpx',
      color: '#ad9f64',
      left: '172rpx',
      top: '300rpx',
    }]
  }, {
    id: getuid(),
    type: 'text',
    text: '杭州滨江',
    css: [{
      fontSize: '24rpx',
      color: '#ad9f64',
      left: '240rpx',
      top: '300rpx',
    }]
  }, , {
    id: getuid(),
    type: 'image',
    url: '/images/hui.png',
    css: [{
      height: '200rpx',
      top: '16rpx',
      left: '460rpx'
    }]
  }]
}]

export const templateEmpty = {
  id: '',
  background: '#eee',
  width: '660rpx',
  height: '400rpx',
  views: []
}

export const defaultText = {
  id: '',
  type: 'text',
  text: '请填写',
  css: [{
    fontSize: '50rpx',
    color: '#F56C6C',
    left: '20rpx',
    top: '20rpx',
  }]
}

export const defaultImage = {
  id: '',
  type: 'image',
  url: '',
  css: [{
    height: '130rpx',
    width: '130rpx',
    top: '20rpx',
    left: '20rpx'
  }]
}

export const defaultRect = {
  id: '',
  type: 'rect',
  css: [{
    height: '160rpx',
    width: '160rpx',
    color: '#F56C6C',
    top: '20rpx',
    left: '20rpx'
  }]
}