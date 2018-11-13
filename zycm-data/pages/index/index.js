//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // wx.getSetting({
    //   success(res) {
    //     console.log(res.authSetting['scope.userInfo'])
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.redirectTo({
    //         url: '../../pages/auth/auth',
    //       })
    //     }
    //   }
    // })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})