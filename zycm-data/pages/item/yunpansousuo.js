// pages/item/yunpansousuo.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    neirong:[],
    wd:'',
    page:1,
  },
  query: function() {
    var that = this;
    wx.request({
      url: app.config.host + '/yunpansousuo',
      method: 'GET',
      data: {
        page: this.data.page,
        wd: this.data.wd
      },
      success: function (res) {
        if (res.data.status == 200) {
          that.setData({
            neirong: res.data.data
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false
          })
        }
        wx.hideLoading();
      }
    })
  },
  getWd: function(e){
    this.data.wd = e.detail.value;
  },
  getPage: function(e){
    this.data.page = e.detail.value;
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