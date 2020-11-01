// miniprogram/pages/edit/edit.js
import {
  getuid
} from '../../assets/utils';
import {
  types
} from '../../assets/types';
import {
  defaultText,
  defaultImage,
  defaultRect
} from '../../assets/template';
const app = getApp();
let timer = null;

Page({
  data: {
    dancePaletteData: {},
    paletteData: {},
    type: 'cvs',
    attrs: types['cvs'],
    currentId: '',
    customActionStyle: {
      border: {
        borderColor: '#999',
        borderStyle: 'dashed'
      }
    },
    customStyle: `left: 0rpx; top: 0rpx;`,
    moveStyl: 'top: 180rpx;right: 320rpx;',
    stl: {},
    left: 0,
    top: 0,
    mRight: 320,
    mTop: 180,
    updateId: '',
    touchS: [],
    isShowMove: false,
    sendIgType: '',
    previewImg: '',
    shareId: null,
    preStl: 'top: 0rpx;',
    yy: '',
    offsetTop: 0,
    pretop: '',
    addArr: [
      '文本', '图片', '矩形'
    ],
    addObj: {
      0: 'addText',
      1: 'addImg',
      2: 'addRect'
    },
    saveArr: ['至本地', '至我的'],
    savObj: {
      0: 'saveIphone',
      1: 'saveMine'
    }
  },
  onLoad(option) {
    this.setData({
      updateId: option.id,
      shareId: option.shareId
    })
  },
  onReady: function () {
    const {
      data: {
        shareId
      }
    } = this;
    if (shareId) {
      const db = wx.cloud.database();
      db.collection('timeCards').where({
        id: shareId
      }).get().then(res => {
        this.setData({
          dancePaletteData: res.data[0]
        })
        this.getAttrs(this.data.attrs, res.data[0])
      })
    } else {
      const {
        globalData: {
          currentTem
        }
      } = app;
      this.setData({
        dancePaletteData: currentTem
      })
      this.getAttrs(this.data.attrs, currentTem)
    }
  },
  viewClicked(e) {
    const {
      detail: {
        view
      }
    } = e
    const {
      data: {
        dancePaletteData
      }
    } = this
    if (view) {
      const {
        id,
        type
      } = view
      this.setData({
        type: type,
        attrs: types[type],
        currentId: id
      })
      this.getAttrs(this.data.attrs, view.css, view.text)
    } else {
      this.setData({
        type: 'cvs',
        attrs: types['cvs']
      })
      this.getAttrs(this.data.attrs, dancePaletteData)
    }
  },
  backTemHandle() {
    this.setData({
      type: 'cvs',
      attrs: types['cvs']
    })
    this.getAttrs(this.data.attrs, this.data.dancePaletteData)
  },
  touchEnd(e) {
    const {
      windowWidth
    } = wx.getSystemInfoSync();
    const {
      detail: {
        view: {
          css
        }
      }
    } = e
    let top = (750 / windowWidth) * Number(css.top.replace('px', ''));
    let left = (750 / windowWidth) * Number(css.left.replace('px', ''));
    top = top.toFixed(2)
    left = left.toFixed(2)
    css.top = `${top}rpx`
    css.left = `${left}rpx`
    this.viewClicked(e)
    this.setCurrentTem(top + '', 'top', 'number')
    this.setCurrentTem(left + '', 'left', 'number')
  },
  getAttrs(data, obj, text) {
    const newData = JSON.parse(JSON.stringify(data));
    newData.map(item => {
      if (item.type == 'number') {
        item.value = obj[item.key] ? obj[item.key].replace('rpx', '') : ''
      } else {
        item.value = obj[item.key]
        if (item.key == 'text') {
          item.value = text
        }
      }
    })
    this.setData({
      attrs: newData
    })
  },
  selectBg() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let {
          data: {
            dancePaletteData
          }
        } = that;
        const tempFilePaths = res.tempFilePaths
        dancePaletteData.background = tempFilePaths[0]
        that.setData({
          dancePaletteData
        })
      }
    })
  },
  inputChange(e) {
    const {
      detail: {
        value
      },
      currentTarget: {
        dataset: {
          key,
          type
        }
      }
    } = e;
    this.setCurrentTem(value, key, type)
  },
  setCurrentTem(value, key, t) {
    let timer;
    const {
      type,
      dancePaletteData,
      currentId
    } = this.data
    if (type == 'cvs') {
      if (t == 'number') {
        if (isNaN(value) && value !== 'auto') return
        dancePaletteData[key] = value == 'auto' ? value : value.trim() == '' ? '' : value.trim() + 'rpx'
      } else {
        dancePaletteData[key] = value
      }
    } else {
      dancePaletteData.views.map(item => {
        if (item.id == currentId) {
          if (t == 'number') {
            if (isNaN(value) && value !== 'auto') return
            item.css[0][key] = value == 'auto' ? value : value.trim() == '' ? '' : value.trim() + 'rpx'
            if (key == 'maxLines') {
              item.css[0][key] = value ? value : 1
            }
          } else {
            if (key == 'text') {
              item['text'] = value.trim() ? value.trim() : '请填写'
            } else {
              item.css[0][key] = value
            }
          }
        }
      })
    }
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      this.setData({
        dancePaletteData
      })
    }, 200)
  },
  addText() {
    const {
      data: {
        dancePaletteData
      }
    } = this;
    const text = JSON.parse(JSON.stringify(defaultText))
    text.id = getuid()
    dancePaletteData.views.push(text);
    this.setData({
      dancePaletteData
    })
  },
  addImg() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let {
          data: {
            dancePaletteData
          }
        } = that;
        const igData = JSON.parse(JSON.stringify(defaultImage))
        igData.id = getuid()
        const tempFilePaths = res.tempFilePaths
        igData.url = tempFilePaths[0]
        dancePaletteData.views.push(igData)
        that.setData({
          dancePaletteData
        })
      }
    })
  },
  addRect() {
    const {
      data: {
        dancePaletteData
      }
    } = this;
    const rect = JSON.parse(JSON.stringify(defaultRect))
    rect.id = getuid()
    dancePaletteData.views.push(rect);
    this.setData({
      dancePaletteData
    })
  },
  deleteChild() {
    const {
      data: {
        dancePaletteData,
        currentId
      }
    } = this
    dancePaletteData.views.map((item, index) => {
      if (item.id == currentId) {
        dancePaletteData.views.splice(index, 1)
      }
    })
    this.setData({
      dancePaletteData,
      type: 'cvs',
      currentId: ''
    })
    this.getAttrs(types['cvs'], this.data.dancePaletteData)
  },
  onImgOK(e) {
    wx.hideLoading()
    const {
      detail: {
        path
      }
    } = e;
    const {
      data: {
        sendIgType
      }
    } = this
    if (sendIgType == 'preview') {
      this.setData({
        previewImg: path
      })
    }
    sendIgType == 'download' && wx.saveImageToPhotosAlbum({
      filePath: path,
      success() {
        wx.showToast({
          title: '已保存至本地相册',
        })
      }
    })
  },
  imgErr(e) {
    wx.hideLoading()
    wx.showModal({
      content: e?.detail?.error?.errMsg ?? "生成图片失败"
    })
  },
  saveIphone() {
    this.setData({
      paletteData: this.data.dancePaletteData,
      sendIgType: 'download'
    })
    wx.showLoading({
      title: '图片生成中',
    })
  },
  saveMine() {
    const that = this;
    const {
      globalData: {
        isLogin
      }
    } = app;
    const {
      data: {
        dancePaletteData,
        updateId
      }
    } = this;
    if (isLogin) {
      if (updateId) {
        that.updateCard(dancePaletteData, updateId)
      } else {
        that.saveCard(dancePaletteData)
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
        events: {
          save: function () {
            that.saveCard(dancePaletteData)
          }
        }
      })
    }
  },
  saveCard(dancePaletteData) {
    const db = wx.cloud.database();
    db.collection('cards').add({
      data: { ...dancePaletteData,  createTime: db.serverDate() }
    }).then(res => {
      if (res.errMsg == 'collection.add:ok') {
        wx.showToast({
          title: '保存成功',
        })
      }
    })
  },
  updateCard(dancePaletteData, updateId) {
    const db = wx.cloud.database();
    const {
      _id,
      _openid,
      isClick,
      ...data
    } = dancePaletteData;
    db.collection('cards').doc(`${updateId}`).update({
      data:{...data, updateTime: db.serverDate() }
    }).then(res => {
      if (res.errMsg == 'document.update:ok') {
        wx.showToast({
          title: '更新成功',
        })
      }
    })
  },
  addHandle(e) {
    const { detail: { value } } = e;
    const {data: { addObj } } = this;
    const handle = addObj[value]
    this[handle]()
  },
  saveHandle(e) {
    const { detail: { value } } = e;
    const {data: { savObj } } = this;
    const handle = savObj[value]
    this[handle]()
  },
  touchstart(e) {
    let sx = e.touches[0].pageX
    let sy = e.touches[0].pageY
    this.data.touchS = [sx, sy]
  },
  touchmove(e) {
    const {
      data: {
        touchS: [sx, sy],
        top,
        left,
        mRight,
        mTop
      }
    } = this
    let vx = e.touches[0].pageX;
    let vy = e.touches[0].pageY;
    let x = vx - sx + left
    let y = vy - sy + top
    let mx = sx - vx + mRight
    let my = vy - sy + mTop
    this.setData({
      customStyle: `left: ${x}rpx; top: ${y}rpx;`,
      moveStyl: `top: ${my}rpx;right: ${mx}rpx;`,
      stl: {
        x,
        y,
        mx,
        my
      }
    })
  },
  touchend() {
    const {
      data: {
        stl: {
          x,
          y,
          mx,
          my
        },
        mRight,
        mTop
      }
    } = this;
    this.setData({
      left: x,
      top: y,
      moveStyl: `top: ${mTop}rpx;right: ${mRight}rpx;`,
    })
  },
  showMoveIg() {
    this.setData({
      isShowMove: !this.data.isShowMove
    })
  },
  resetPos() {
    this.setData({
      customStyle: `left: 0rpx; top: 0rpx;`,
      moveStyl: 'top: 180rpx;right: 320rpx;',
      left: 0,
      top: 0,
    })
  },
  previewHandle() {
    wx.showLoading({
      title: '图片生成中',
    })
    this.setData({
      paletteData: this.data.dancePaletteData,
      sendIgType: 'preview',
      isShowMove: false
    })
  },
  hiddenHandle() {
    this.setData({
      previewImg: '',
      preStl: 'top: 0rpx;',
      yy: '',
      offsetTop: 0,
      pretop: ''
    })
  },
  pretouchstart(e) {
    const { touches: [y]} = e;
    this.setData({
      yy: y.pageY
    })
  },
  pretouchmove(e) {
    const { touches: [my]} = e;
    const { data: {yy, offsetTop} } = this
    const vy = my.pageY - yy
    const pos = offsetTop + vy
    this.setData({
      preStl: `top: ${pos}rpx`,
      pretop: pos
    })
  },
  pretouchend() {
    this.setData({
      offsetTop: this.data.pretop
    })
  },
  saveTimeCard(data) {
    const db = wx.cloud.database();
    db.collection('timeCards').add({
      data: { ...data, createTime: db.serverDate()}
    }).then()
  },
  onShareAppMessage: function () {
    const {
      data: {
        dancePaletteData
      }
    } = this;
    const { _openid, _id, id, ...data } = dancePaletteData
    data.id = getuid()
    this.saveTimeCard(data)
    return {
      title: `快绘制作`,
      path: `pages/edit/edit?shareId=${data.id}`,
      success: function (res) {
        wx.showToast({
          title: '已分享',
        })
      }
    }
  }
})