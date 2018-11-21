const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:'',
    pushList: [] 
  },
  cancelPush: function(e){
    var that = this;
    wx.showModal({
      title: '请确认?',
      content: '点击将删除该帖子',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中',
          });
          wx.request({
            url: 'http://localhost:8084/zycm-we/push/deletePushById.do',
            method: 'POST',
            data: {
              id: e.currentTarget.dataset.id,
            },
            success: function (res) {
              wx.hideLoading();
              wx.showToast({
                title: res.data.data,
                icon: 'success',
                duration: 2000
              })
            }
          })
          that.loadDataList();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  loadDataList: function(){
    var that = this;
    this.data.openId = app.data.openId;
    wx.request({
      url: 'http://localhost:8084/zycm-we/push/queryPushListByOpenId.do',
      method: 'POST',
      data: {
        openId: this.data.openId,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          pushList: res.data.data
        })
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