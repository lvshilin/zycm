// pages/item/cejixiong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: ["请选择相关类型","姓名打分", "公司名测吉凶", "QQ号测吉凶", "车牌号测吉凶", "手机号测吉凶"],
    typeIndex: 0,
    testType: 0,
    surname: '',
    name: '',
    companyName: '',
    qq:'',
    contentList: [],
    gongsiText: [],
    qqText: [],
  },
  typeChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    if (e.detail.value == 1) {
      this.setData({
        testType: 1
      })
    }
    if (e.detail.value == 2) {
      this.setData({
        testType: 2
      })
    }
    if (e.detail.value == 3) {
      this.setData({
        testType: 3
      })
    }
    if (e.detail.value == 4) {
      this.setData({
        testType: 4
      })
    }
    if (e.detail.value == 5) {
      this.setData({
        testType: 5
      })
    }
    this.setData({
      typeIndex: e.detail.value
    })
  },
  queryTest: function(){
    var that = this;
    if (this.data.testType==0){
      wx.showModal({
        title: '提示',
        content: '请选择相关的类型',
        showCancel: false
      })
    }
    if (this.data.testType==1){
      wx.request({
        url: 'http://localhost:8087/cejixiong-1',
        method: 'GET',
        data: {
          surname: this.data.surname,
          name: this.data.name
        },
        success: function (res) {
          if (res.data.status == 200) {
            that.setData({
              contentList: res.data.data
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
    if (this.data.testType == 2) {
      wx.request({
        url: 'http://localhost:8087/cejixiong-2',
        method: 'GET',
        data: {
          companyName: this.data.companyName
        },
        success: function (res) {
          if (res.data.status == 200) {
            that.setData({
              gongsiText: res.data.data
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
    if (this.data.testType == 3) {
      wx.request({
        url: 'http://localhost:8087/cejixiong-3',
        method: 'GET',
        data: {
          qq: this.data.qq
        },
        success: function (res) {
          if (res.data.status == 200) {
            that.setData({
              qqText: res.data.data
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

  },
  getXing: function(e){
    this.data.surname = e.detail.value;
  },
  getMing: function (e) {
    this.data.name = e.detail.value;
  },
  getGongsiming: function(e){
    this.data.companyName = e.detail.value;
  },
  getQqhao: function(e){
    this.data.qq = e.detail.value;
  }
})