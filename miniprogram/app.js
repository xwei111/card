//app.js
App({
  onLaunch: function () {
    const that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'prod-0fksh',
        traceUser: true,
      })
    }
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res=>{
        const { result: { openid } } = res;
        that.globalData.openid = openid
        const db = wx.cloud.database()
        db.collection('users').where({ _openid: openid }).get().then(data=>{
          if(data.data && data.data.length) {
            that.globalData.userInfo = data.data[0]
            that.globalData.isLogin = true
          }
        })
      }
    })
  },
  globalData: {
    currentTem: {},
    userInfo: {},
    isLogin: false,
    openid: ''
  }
})
