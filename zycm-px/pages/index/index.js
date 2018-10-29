//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pro1: "../../static/index/javaee.jpg",
    pro2: "../../static/index/web.jpg",
    pro3: "../../static/index/mysql.jpg",
    pro4: "../../static/index/javawork.jpg",
    pro5: "../../static/index/wechat.jpg",
    indexUrls:[
      "../../static/index/back1.jpg",
      "../../static/index/back2.jpg"
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openid:''
  },
  //事件处理函数
  more: function() {
    wx.showModal({
      content: '更多热门课程即将推出',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '18362153278',
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  onLoad: function () {
  },
})
