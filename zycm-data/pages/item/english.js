// pages/item/english.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: []
  },
  updateEnglish: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8087/english',
      method: 'GET',
      data: {
        count: 5,
      },
      success: function(res) {
        if (res.data.status==200){
          that.setData({
            itemList: res.data.data
          })
        }else{
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
      url: 'http://localhost:8087/english',
      method: 'GET',
      data: {
        count: 5,
      },
      success: function(res) {
        if (res.data.status == 200) {
          that.setData({
            itemList: res.data.data
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
  }
})