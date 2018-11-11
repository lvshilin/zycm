//app.js
App({
  data: {
    openId: null,
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
      var that = this;
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: function (res) {
          that.data.openId = res.result.openId;
          console.log(that.data.openId);
        }
      })
    }
  },
  globalData: {
    userInfo: null,
  }
})