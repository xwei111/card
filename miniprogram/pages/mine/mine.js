// miniprogram/pages/mine/mine.js
import {
  templateEmpty
} from '../../assets/template'
import {
  getuid
} from '../../assets/utils';
const app = getApp()
const {
  globalData: {
    isLogin,
    openid
  }
} = app
Page({
  data: {
    isLogin: isLogin,
    avatarUrl: '',
    nickName: '',
    templates: [],
    loading: true,
    paletteData: {},
    type: '',
    cardUrl: ''
  },
  onShow: function () {
    const {
      globalData: {
        userInfo,
        isLogin
      }
    } = app
    if (!isLogin) {
      wx.redirectTo({
        url: '/pages/login/login?type=tabbar&path=/pages/mine/mine'
      })
    } else {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      })
      this.getCardList()
    }
  },
  onHide() {
    this.setData({
      loading: true
    })
  },
  getCardList() {
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    const db = wx.cloud.database();
    db.collection('cards').where({
      _openid: openid
    }).get().then(res => {
      that.setData({
        templates: res.data.reverse(),
        loading: false
      })
      wx.hideLoading()
    })
  },
  selectHandle(e) {
    const {
      data: {
        templates
      }
    } = this;
    const {
      currentTarget: {
        dataset: {
          id,
          item
        }
      }
    } = e
    templates.map(item => {
      if (item._id == id) {
        item.isClick = !item.isClick
      } else {
        item.isClick = false
      }
    })
    this.setData({
      templates,
      paletteData: item,
      type: 'select'
    })
  },
  deleteHandle(e) {
    const that = this;
    const {
      currentTarget: {
        dataset: {
          id
        }
      }
    } = e;
    const db = wx.cloud.database();
    wx.showModal({
      title: '您将永久删除该作品',
      success(res) {
        if (res.confirm) {
          db.collection('cards').doc(id).remove({
            success: function (res) {
              if (res.errMsg == 'document.remove:ok') {
                that.getCardList()
              }
            }
          })
        }
      }
    })
  },
  editHandle(e) {
    const {
      currentTarget: {
        dataset: {
          id,
          item
        }
      }
    } = e;
    app.globalData.currentTem = item
    wx.navigateTo({
      url: `/pages/edit/edit?id=${id}`,
    })
  },
  downLoadHandle(e) {
    const {
      currentTarget: {
        dataset: {
          item
        }
      }
    } = e;
    this.setData({
      paletteData: item,
      type: 'download'
    })
  },
  onImgOK(e) {
    const {
      detail: {
        path
      }
    } = e;
    const {
      data: {
        type
      }
    } = this
    this.setData({
      cardUrl: path
    })
    type == 'download' && wx.saveImageToPhotosAlbum({
      filePath: path,
      success() {
        wx.showToast({
          title: '已保存至本地相册',
        })
      }
    })
  },
  customHandle() {
    let tem = JSON.parse(JSON.stringify(templateEmpty))
    tem.id = getuid()
    app.globalData.currentTem = tem
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },
  onShareAppMessage: function () {
    const {
      data: {
        nickName,
        cardUrl
      }
    } = this
    return {
      title: `${nickName}的快绘作品`,
      imageUrl: cardUrl,
      success: function (res) {
        // 转发成功之后的回调
        wx.showToast({
          title: '已分享',
        })
      }
    }
  }
})