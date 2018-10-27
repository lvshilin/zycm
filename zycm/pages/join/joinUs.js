// pages/join/joinUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinUsTap: false,
    username: '',
    phone: '',
    qq: ''
  },
  joinUsTap: function(e) {
    var that = this;
    const db = wx.cloud.database();
    wx.showModal({
      title: '我要报名',
      content: '请确认您提交的信息,我们将在一个工日内联系您',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          db.collection('signList').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              name: that.data.username,
              phone: that.data.phone,
              qq: that.data.qq,
            },
            success: function (res) {
              console.log(res)
            }
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
    console.log('用户名:' + this.data.username + '手机:' + this.data.phone);
  },
  getUsername: function(e) {
    this.data.username = e.detail.value;
  },
  getPhone: function(e) {
    this.data.phone = e.detail.value;
  },
  getQq: function(e) {
    this.data.qq = e.detail.value;
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