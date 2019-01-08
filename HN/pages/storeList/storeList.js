const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    indexUrls: [
      "../../pic/index/1.jpg",
      "../../pic/index/2.png"
    ],
    storeList:[],
    inputVal: ''
  },
  searchInput: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    console.log(this.data.inputVal);
  },
  queryStoreDetail: function(e){
    var storeId = e.currentTarget.dataset.storeid;
    wx.navigateTo({
      url: '../../pages/storeDetail/storeDetail?storeId=' + storeId,
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
      url: app.config.host + 'store/queryStoreList.do',
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
  search: function () { 
    wx.showLoading({
      title: '加载中',
    });
    var that = this;
    wx.request({
      url: app.config.host + 'store/queryStoreListBySearch.do',
      method: 'POST',
      data: {
        searchText: that.data.inputVal,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          storeList: res.data.data
        })
      }
    })
  },
  queryStoreListByType: function(e){
    var that = this;
    wx.request({
      url: app.config.host +  'store/queryStoreList.do',
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