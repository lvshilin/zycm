//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indexUrls: [
      "../../pic/index/1.jpg",
      "../../pic/index/2.jpg"
    ],
    openId: '',
  },
  queryType: function(e) {
    console.log(e.currentTarget.dataset.type);
  },
  postDetail: function(e) {
    wx.navigateTo({
      url: '../../pages/postDetail/postDetail',
    })
  },
  onLoad: function() {
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userInfo'])
        if (!res.authSetting['scope.userInfo']){
          wx.redirectTo({
            url: '../../pages/auth/auth',
          })
        }
      }
    })
  },
  onShow: function() {
    this.data.openId = app.data.openId;
  },
  getUserInfo: function(e) {},
  /**
* 用户点击右上角分享（index.js）
*/
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: '印象桦南',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})