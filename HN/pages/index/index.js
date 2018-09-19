//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indexUrls: [
      "../../pic/index/1.jpg",
      "../../pic/index/2.jpg"
    ]
  },
  queryType: function(e) {
    console.log(e.currentTarget.dataset.type);
  },
  postDetail: function(e){
    wx.navigateTo({
      url: '../../pages/postDetail/postDetail',
    })
  },
  onLoad: function() {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo == null) {
      wx.showModal({
        title: '提示',
        content: '还没授权',
        confirmText: '去授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.switchTab({
              url: '../../pages/user/user'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  onShow: function() {},
  getUserInfo: function(e) {}
})