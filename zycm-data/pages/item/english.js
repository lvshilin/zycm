// pages/item/english.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     itemList:[]
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
    wx.request({
      url: 'http://localhost:8083/english',
      method: 'GET',
      data: {
        count: 1,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          itemList: res.data
        })
        wx.hideLoading();
      }
    })
  }
})