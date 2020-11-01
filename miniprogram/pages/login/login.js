// miniprogram/pages/login/login.js
const app = getApp()
Page({
  data: {
    option: {}
  },
  onLoad: function(option) {
    this.setData({option})
  },
  getUserInfo(e) {
    const { detail: { userInfo } } = e;
    const { data: { option: { type, path } } } = this
    const db = wx.cloud.database();
    db.collection('users').add({
      data: userInfo
    }).then(res=>{
      if(res.errMsg == 'collection.add:ok') {
        app.globalData.userInfo = userInfo
        app.globalData.isLogin = true
        wx.showToast({
          title: '登录成功',
        })
        if(type == 'tabbar') {
          wx.switchTab({
            url: path,
          })
        } else {
          const eventChannel = this.getOpenerEventChannel()
         eventChannel.emit('save', {data: 'test'});
          wx.navigateBack()
        }
      }
    })
  }
})