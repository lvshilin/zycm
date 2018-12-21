//app.js
App({
  data: {
    openId: null,
    session_key: null
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
      // var that = this;
      // wx.cloud.callFunction({
      //   name: 'getOpenid',
      //   complete: function (res) {
      //     that.data.openId = res.result.openId;
      //   }
      // })
      this.getOpenIdTap();
    }
  },
  globalData: {
    userInfo: null,
  }, 
  config: {
    host: "http://localhost:8084/zycm-we/"
  },
  getOpenIdTap: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx3571ddcf3a406f27',
            secret: 'd4cf729c405ce04c2694416225b7cadf',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            that.data.openId = res.data.openid,
              that.data.session_key = res.data.session_key
            console.log(that.data.openId)
            console.log(that.data.session_key)
          }
        })
      }
    })
  },
  commonModal: function (title, content){
    wx.showModal({
      title: title,
      content: content,
      showCancel: false
    })
    return;
  }
})