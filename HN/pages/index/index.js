//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indexUrls: [
      "../../pic/index/1.jpg",
      "../../pic/index/2.png"
    ],
    openId: '',
    userCountNum: '0',
    pushCountNum: '0',
    cardList:[],
  },
  queryType: function(e) {
    console.log(e.currentTarget.dataset.type);
  },
  postDetail: function(e) {
    wx.navigateTo({
      url: '../../pages/postDetail/postDetail',
    })
  },
  queryUserCard: function (e) {
    wx.navigateTo({
      url: '../../pages/user/queryCard?openId=' + e.currentTarget.dataset.openid,
    })
  },
  onLoad: function() {
    wx.getSetting({
      success(res) {
        console.log(res.authSetting['scope.userInfo'])
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '../../pages/auth/auth',
          })
        }else{
          wx.getUserInfo({
            success(res) {
              app.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
  },
  onShow: function() {
    var that = this;
    this.data.openId = app.data.openId;
    this.loadCountData();
    wx.request({
      url: app.config.host + 'user/queryUserCardList.do',
      method: 'GET',
      success: function(res){
        that.setData({
          cardList:res.data.data
        })
      }
    })
  },
  loadCountData: function() {
    var that = this;
    wx.request({
      url: app.config.host + 'push/queryPushAndUserCountNum.do',
      method: 'GET',
      success: function(res) {
        if (res.data.code == 200) {
          that.setData({
            pushCountNum: res.data.data.pushCountNum,
            userCountNum: res.data.data.userCountNum
          })
        }
      }
    })
  },
  getUserInfo: function(e) {},
  /**
   * 用户点击右上角分享（index.js）
   */
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      console.log(ops.target)
    }
    return {
      title: '印象桦南',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  previewImage: function(e) {
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.indexUrls
    })
  },
})