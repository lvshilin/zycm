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
  postDetail: function(e) {
    wx.navigateTo({
      url: '../../pages/postDetail/postDetail',
    })
  },
  onLoad: function() {

  },
  onShow: function() {},
  getUserInfo: function(e) {}
})