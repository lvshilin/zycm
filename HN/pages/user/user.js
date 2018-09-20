const app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
const uploadImage = require('../../lib/uploadAliyun.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'UXIBZ-RRRLP-X6EDJ-LOUVL-73NAV-4DBNN' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
 



    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     var tempFilePaths = res.tempFilePaths;
    //     console.log(tempFilePaths);
    //     uploadImage(
    //       {
    //         filePath: tempFilePaths[0],
    //         dir: 'imagessss/',
    //         success: function (res) {
    //           console.log(res)
    //         },
    //         fail: function (res) {
    //           console.log("上传失败")
    //           console.log(res)
    //         }
    //       })
    //   },
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var latitude = 0;
    var longitude = 0;
    wx.getLocation({
      altitude:true,
      success: function(res) {
        // 调用接口
        demo.reverseGeocoder({
          location: {
            'latitude': res.latitude,
            'longitude': res.longitude
          },
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        });
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo);

    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.redirectTo({
        url: '../../pages/index/index',
      })
    } else {
      console.log('用户拒绝了授权');
    }
  },
  toMyPush: function(){
    wx.navigateTo({
      url: '../../pages/myPush/myPush',
    })
  },
  toMySave: function(){
    wx.navigateTo({
      url: '../../pages/mySave/mySave',
    })
  },
  toMyLike: function () {
    wx.navigateTo({
      url: '../../pages/myLike/myLike',
    })
  }
})