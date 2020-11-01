//index.js
import { templates, templateEmpty } from '../../assets/template';
import { getuid } from '../../assets/utils';

const app = getApp()

Page({
  data: {
    url: '',
    templates: templates
  },
  onLoad() {
    
  },
  selectHandle(data) {
    const { currentTarget: { dataset: { item } } } = data
    app.globalData.currentTem = item ? item : {}
    wx.navigateTo({
      url: '/pages/edit/edit',
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
  onShareAppMessage: function() {
    return {
      title: `快绘制作`
    }
  }
})