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
    pushImgs:[],
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
      this.data.isHide = '1'
    }else{
      this.data.isHide = '0'
    }
  },
  commitPush: function(){
    var that = this;
    if (that.data.pushTitle == '' || that.data.pushTitle == null) {
      app.commonModal("提示", "请输入帖子标题");
      return;
    }
    if (that.data.pushTypeIndex == 0) {
      app.commonModal("提示", "请选择帖子类型");
      return;
    }
    if (that.data.pushDetail == '' || that.data.pushDetail == null) {
      app.commonModal("提示", "请输入帖子内容");
      return;
    }
    wx.showModal({
      title: '提示',
      content: '请确认您发布的内容，请勿涉及到政治色情等违法内容',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.config.host + 'push/addNewPush.do',
            method: 'POST',
            data: {
              openId: that.data.openId,
              pushTitle: that.data.pushTitle,
              pushType: that.data.pushType,
              pushDetail: that.data.pushDetail,
              pushImgs: that.data.pushImgs,
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
    if (this.data.files.length == 4) {
      wx.showModal({
        title: '提示',
        content: '只能上传4张图片',
        showCancel: false
      })
      return;
    }
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        var filePath = res.tempFilePaths[0];
        var cloudPath = Date.parse(new Date());
        wx.uploadFile({
          // 指定上传到的云路径
          url: app.config.host + 'uploadPic.do?fileType=push&openId=' + app.data.openId,
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'cloudPath': cloudPath,
          },
          // 成功回调
          success: function(res) {
            if (res.statusCode==200){
              that.data.pushImgs.push(res.data.replace(/"/g, ""));
            }
          },
          fail: function(res){
            console.log(res);
          }
        })
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  delFile: function () {
    var that = this;
    var lastPushImg = that.data.pushImgs[that.data.pushImgs.length-1]
    if (lastPushImg == null || lastPushImg == '') {
      wx.showModal({
        title: '提示',
        content: '还没有上传图片',
        showCancel: false
      })
      return;
    } else {
      wx.request({
        url: app.config.host + 'delFile.do',
        method: 'GET',
        data: {
          path: lastPushImg
        },
        success: function (res) {
          console.log(res.data.data);
          if (res.data.data) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            that.data.files.splice(that.data.files.length-1, 1);
            that.data.pushImgs.splice(that.data.pushImgs.length - 1, 1);
            that.setData({
              files: that.data.files
            })
          } else {
            wx.showToast({
              title: res.data.message,
              duration: 2000
            })
          }
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