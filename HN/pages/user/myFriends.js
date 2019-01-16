const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  loadDataList: function () {
    var that = this;
    this.data.openId = app.data.openId;
    wx.request({
      url: app.config.host + 'user/queryFriendsListByOpenId.do',
      method: 'POST',
      data: {
        openId: app.data.openId,
      },
      success: function (res) {
        console.log(res.data);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.loadDataList();
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