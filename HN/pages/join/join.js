// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [
      { name: '实体店铺', value: '0', checked: true },
      { name: '微商店', value: '1'}
    ],
      storeName:'',
      storeType:'0',
      storeDesc:'',
  },
  radioChange: function (e) {
    this.data.storeType = e.detail.value;
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  getStoreName: function(e){
    this.data.storeName = e.detail.value;
  },
  getStoreDesc: function (e) {
    this.data.storeDesc = e.detail.value;
  },
  commitStore: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请确认您提交的内容',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8084/zycm-we/store/addNewStore.do',
            method: 'POST',
            data: {
              storeName: that.data.storeName,
              storeType: that.data.storeType,
              storeDesc: that.data.storeDesc,
            },
            success: function (res) {
              if (res.data.code=='200'){
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    wx.navigateTo({
                      url: 'msg_success'
                    })
                  }
                })
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