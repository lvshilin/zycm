const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexUrls: [
      "../../pic/index/1.jpg",
      "../../pic/index/2.jpg"
    ],
    openId: null,
    isSave: null,
    storeId: null,
    id:null
  },
  shoucang: function() {
    var that = this;
    var isSaveFlag = '';
    if (this.data.isSave){
      isSaveFlag = '0'
    }else{
      isSaveFlag = '1'
    }
    wx.request({
      url: 'http://localhost:8084/zycm-we/store/addStoreSaveByOpenId.do',
      method: 'POST',
      data: {
        id: that.data.id,
        storeId: that.data.storeId,
        openId: that.data.openId,
        isSave: isSaveFlag
      },
      success: function(res) {
      }
    })
    if (this.data.isSave) {
      this.setData({
        isSave: false
      })
      wx.showToast({
        title: '取消收藏成功',
      })
    } else {
      this.setData({
        isSave: true
      })
      wx.showToast({
        title: '收藏成功',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.storeId = options.storeId;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.data.openId = app.data.openId;
    var that = this;
    wx.request({
      url: 'http://localhost:8084/zycm-we/store/queryStoreAndUser.do',
      method: 'POST',
      data: {
        openId: that.data.openId,
        storeId: that.data.storeId,
      },
      success: function (res) {
        if (res.data.data!=null){
          that.data.id =  res.data.data.id
          if(that.data.isSave==1){
            that.setData({
              isSave: true
            })
          }else{
            that.setData({
              isSave: false
            })
          }
        }else{
          that.setData({
            isSave: false
          })
        }
      }
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