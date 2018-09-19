// pages/push/push.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [
      {
        "menuName": "全部帖子",
        "menuCode": null
      },
      {
        "menuName": "打听求助",
        "menuCode": 'dtqz'
      },
      {
        "menuName": "求职招聘",
        "menuCode": 'qzzp'
      },
      {
        "menuName": "二手闲置",
        "menuCode": 'esxz'
      },
      {
        "menuName": "交流互动",
        "menuCode": 'jlhd'
      }
    ],
    pushList:[],
    catalogSelect: 0,//判断是否选中
  },
  hoverClick: function(e){
    console.log(e.target.dataset.vtext);
    var that = this;
    that.setData({//把选中值放入判断值
      catalogSelect: e.target.dataset.vtext
    })
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://localhost:8084/zycm-we/push/queryPushListByType.do',
      method: 'POST',
      data: {
        pushType: e.target.dataset.vtext,
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
  push: function(){
    console.log('点击了发布');
    wx.navigateTo({
      url: '../../pages/newPush/newPush',
    })
  },
  pushDetailPage: function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../../pages/pushDetail/pushDetail?id='+e.currentTarget.dataset.id,
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
    var that = this;
    wx.request({
      url: 'http://localhost:8084/zycm-we/push/queryPushListByType.do',
      method: 'POST',
      data: {
        pushType: null,
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