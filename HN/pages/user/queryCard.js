const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    userCard: null,
    pushList: [],
    id: '',
    isDel: '',
    isFirst: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.openId = options.openId;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: app.config.host + 'user/queryUserCardByOpenId.do',
      method: 'POST',
      data: {
        openId: that.data.openId
      },
      success: function(res) {
        that.setData({
          userCard: res.data.data
        })
      }
    })
    wx.request({
      url: app.config.host + 'push/queryPushListByOpenId.do',
      method: 'POST',
      data: {
        openId: this.data.openId,
      },
      success: function(res) {
        that.setData({
          pushList: res.data.data
        })
      }
    })
    that.queryIsFriend();
  },
  addFriend: function(e) {
    var that = this;
    if (app.data.openId == that.data.openId){
      wx.showToast({
        title: '不要关注自己啊!',
        icon: 'success',
        duration: 2000
      })
      return false;
    }
    wx.request({
      url: app.config.host + 'user/addFriend.do',
      method: 'POST',
      data: {
        id: that.data.id,
        openId: app.data.openId,
        targetOpenId: that.data.openId,
        isDel: e.currentTarget.dataset.isdel
      },
      success: function(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            isDel: e.currentTarget.dataset.isdel
          })
          //如果是首次关系需要重新获取ID
          if (that.data.isFirst) {
            console.log('首次关系');
            that.queryIsFriend();
          }
        } else {
          wx.showToast({
            title: '操作异常,请稍后再试',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  queryIsFriend: function() {
    var that = this;
    wx.request({
      url: app.config.host + 'user/queryIsFriend.do',
      method: 'POST',
      data: {
        openId: app.data.openId,
        targetOpenId: this.data.openId,
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.data == null) {
          that.setData({
            isDel: '1'
          })
        } else {
          if (res.data.data.isDel == '0') {
            //已经是好友
            that.setData({
              isDel: '0',
              id: res.data.data.id,
              isFirst: false
            })
          }
          if (res.data.data.isDel == '1') {
            //取消的好友
            that.setData({
              isDel: '1',
              id: res.data.data.id,
              isFirst: false
            })
          }
        }
      }
    })
  },
  pushDetailPage: function (e) {
    wx.navigateTo({
      url: '../../pages/pushDetail/pushDetail?id=' + e.currentTarget.dataset.id,
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})