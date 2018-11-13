const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:'',
    authHeight:'',
    openId: '',
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      console.log(e.detail.userInfo);
      this.data.openId = app.data.openId;
      wx.request({
        url: 'http://localhost:8084/zycm-we/user/addUserDetail.do',
        method: 'POST',
        data: {
          openId: this.data.openId,
          nickName: e.detail.userInfo.nickName,
          gender: e.detail.userInfo.gender,
          city: e.detail.userInfo.city,
          country: e.detail.userInfo.country,
          avatarUrl: e.detail.userInfo.avatarUrl,
          language: e.detail.userInfo.language,
          province: e.detail.userInfo.province
        },
        success: function (res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    } else {
      console.log('用户拒绝了授权');
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight + "px",
          authHeight: res.windowHeight/2 + "px",
        })
        console.log(that.data.height)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})