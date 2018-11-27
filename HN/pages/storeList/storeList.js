// pages/storeList/storeList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexUrls: [
      "../../pic/index/1.jpg",
      "../../pic/index/2.jpg"
    ],
    storeList:[],
  },
  queryStoreDetail: function(e){
    console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/storeDetail/storeDetail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this;
    wx.request({
      url: 'http://localhost:8084/zycm-we/store/queryStoreList.do',
      method: 'POST',
      data: {
      },
      success: function (res) {
        that.setData({
          storeList: res.data.data
        })
      }
    })
  },
  queryStoreListByType: function(e){
    var that = this;
    wx.request({
      url: 'http://localhost:8084/zycm-we/store/queryStoreList.do',
      method: 'POST',
      data: {
        storeType: e.currentTarget.dataset.storetype
      },
      success: function (res) {
        that.setData({
          storeList: res.data.data
        })
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