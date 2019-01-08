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
    openId: '',
    hasUserInfo: false,
    integral: '0',
    signNum: '0',
    lastSignTimeStr: null
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
          app.globalData.openId = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    this.data.openId = app.data.openId;
    var latitude = 0;
    var longitude = 0;
    this.loadUserSign();
    // wx.getLocation({
    //   altitude:true,
    //   success: function(res) {
    //     // 调用接口
    //     demo.reverseGeocoder({
    //       location: {
    //         'latitude': res.latitude,
    //         'longitude': res.longitude
    //       },
    //       success: function (res) {
    //         console.log(res);
    //       },
    //       fail: function (res) {
    //         console.log(res);
    //       }
    //     });
    //   },
    // })
  },
  loadUserSign: function() {
    var that = this;
    wx.request({
      url: app.config.host + 'user/queryUserSignByOpenId.do',
      method: 'POST',
      data: {
        openId: app.data.openId,
      },
      success: function(res) {
        console.log(res)
        that.setData({
          integral: res.data.data.integral,
          signNum: res.data.data.signNum,
          lastSignTimeStr: res.data.data.lastSignTimeStr
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  toShare: function() {
    console.log('点击转发了')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  bindGetUserInfo: function(e) {
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
  toMyPush: function() {
    wx.navigateTo({
      url: '../../pages/user/myPush',
    })
  },
  toMyReply: function() {
    wx.navigateTo({
      url: '../../pages/user/myReply',
    })
  },
  toMySave: function() {
    wx.navigateTo({
      url: '../../pages/user/mySave',
    })
  },
  toJoin: function() {
    wx.request({
      url: app.config.host + 'store/queryUserIsHaveStore.do',
      method: 'POST',
      data: {
        openId: app.data.openId,
      },
      success: function(res) {
        console.log(res);
        if (res.data.data) {
          wx.navigateTo({
            url: '../../pages/join/join',
          })
        }else{
          app.commonModal('提示','用户已经申请过商店了');
        }
      }
    })
  },
  toMyLike: function() {
    wx.navigateTo({
      url: '../../pages/user/myLike',
    })
  },
  toManager: function() {
    wx.request({
      url: app.config.host + 'store/queryUserIsHaveStore.do',
      method: 'POST',
      data: {
        openId: app.data.openId,
      },
      success: function (res) {
        if (!res.data.data) {
          wx.navigateTo({
            url: '../../pages/manager/manager',
          })
        } else {
          app.commonModal('提示', '用户还没有申请自己的商店');
        }
      }
    })
  },
  signBtn: function() {
    var that = this;
    wx.request({
      url: app.config.host + 'user/addSignRecord.do',
      method: 'POST',
      data: {
        openId: this.data.openId,
      },
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success(res) {}
        })
        if (res.data.code == 200) {
          that.loadUserSign();
        }
      }
    })
  }
})