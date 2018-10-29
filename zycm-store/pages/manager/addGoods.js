// pages/manager/addGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pushTypeList: ["请选择类别", "新品推荐", "熟普洱茶", "生普洱茶", "茶壶茶具"],
    pushTypeIndex: 0,
    files: [],
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths);
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        var filePath = res.tempFilePaths[0];
        var cloudPath = Date.parse(new Date()) + ".png";
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath,
          // 指定要上传的文件的小程序临时文件路径
          filePath,
          // 成功回调
          success: function (res) {
            console.log(res)
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  previewImage: function (e) {
    console.log(e.currentTarget.id);
    console.log(this.data.files);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
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