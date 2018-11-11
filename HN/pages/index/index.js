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
    console.log("index" + this.data.openId)
  },
  getUserInfo: function(e) {},
})