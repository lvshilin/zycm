const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pushTypeList: ["请选择类别", "打听求助", "求职招聘", "二手闲置","交流互动"],
    pushTypeIndex: 0,
    pushTitle:'',
    pushType:'',
    pushDetail:'',
    isHide:'0',
    files: [],
    openId:''
  },
  pushTypeChange: function(e){
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    if (e.detail.value == 1){
      this.data.pushType = 'dtqz'
    }
    if (e.detail.value == 2) {
      this.data.pushType = 'qzzp'
    }
    if (e.detail.value == 3) {
      this.data.pushType = 'esxz'
    }
    if (e.detail.value == 4) {
      this.data.pushType = 'jlhd'
    }
    this.setData({
      pushTypeIndex: e.detail.value
    })
  },
  getTitle: function(e){
    this.data.pushTitle = e.detail.value;
    console.log(this.data.pushTitle);
  },
  getPushDetail: function (e) {
    this.data.pushDetail = e.detail.value;
    console.log(this.data.pushDetail);
  },
  switchChange: function(e){
    console.log(e.detail.value);
    if (e.detail.value){
      this.isHide = '1'
    }else{
      this.isHide = '0'
    }
  },
  commitPush: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '请确认您发布的内容，请勿涉及到政治色情等违法内容',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:8084/zycm-we/push/addNewPush.do',
            method: 'POST',
            data: {
              openId: that.data.openId,
              pushTitle: that.data.pushTitle,
              pushType: that.data.pushType,
              pushDetail: that.data.pushDetail,
              isHide: that.data.isHide
            },
            success: function (res) {
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000,
                success: function(){
                  wx.switchTab({
                    url: '/pages/push/push',
                  })
                }
              })
            }
          })
        }
      }
    })
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
        var cloudPath = Date.parse(new Date());
        wx.uploadFile({
          // 指定上传到的云路径
          url: 'http://localhost:8084/zycm-we/uploadPic.do?fileType=push',
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'cloudPath': cloudPath,
            'fileType': 'push'
          },
          // 成功回调
          success: function(res) {
            console.log(res)
          },
          fail: function(res){
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
    this.data.openId = app.data.openId;
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