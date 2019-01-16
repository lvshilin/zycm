const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    replyPushList: [],
  },
  loadDataList: function () {
    var that = this;
    wx.request({
      url: app.config.host + 'push/queryPushReplyByOpenId.do',
      method: 'POST',
      data: {
        openId: app.data.openId,
      },
      success: function (res) {
        console.log(res);
        that.setData({
          replyPushList: res.data.data
        })
      }
    })
  },
  delMyReply: function(e){
    console.log(e);
    var that = this;
    wx.showModal({
      title: '请确认?',
      content: '点击将删除该回复',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.config.host + 'push/delPushReplyById.do',
            method: 'POST',
            data: {
              id: e.currentTarget.dataset.id,
              pushId: e.currentTarget.dataset.pushid,
            },
            success: function (res) {
              console.log(res);
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
              if (res.data.code == 200) {
                that.loadDataList();
              }
            }
          })
        }
      }
    })
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
      this.loadDataList();
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