//index.js
//获取应用实例
const app = getApp()

Page({
  data: {},
  onLoad: function() {

  },
  yylzyl: function() {
    wx.navigateTo({
      url: '../../pages/item/english'
    })
  },
  cjx: function() {
    wx.navigateTo({
      url: '../../pages/item/cejixiong'
    })
  },
  ctssc: function() {
    wx.navigateTo({
      url: '../../pages/item/cangtousi'
    })
  }
})