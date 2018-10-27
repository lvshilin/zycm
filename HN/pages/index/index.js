//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indexUrls: [
      "../../pic/index/1.jpg",
      "../../pic/index/2.jpg"
    ],
    openId:'',
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
    this.getOpenid();
  },
  onShow: function() {},
  getUserInfo: function(e) {},
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: function (res) {
        var openId = res.result.openId;
        console.log(openId);
        that.setData({
          openId: openId
        })
        console.log(that.data.openId);
        app.globalData.openId = openId;
      }
    })
  }
})