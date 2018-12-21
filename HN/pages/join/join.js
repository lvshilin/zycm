const app = getApp();

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
    files: [],
    shoreImg:''
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
    if (this.data.storeName == '' || this.data.storeName == null){
      app.commonModal("提示","请输入店铺名称");
      return;
    }
    if (this.data.storeDesc == '' || this.data.storeDesc == null) {
      app.commonModal("提示", "请输入店铺介绍");
      return;
    }
    if (this.data.storeImg == '' || this.data.storeImg == null) {
      app.commonModal("提示", "请上传店铺头像");
      return;
    }
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
              storeImg: that.data.storeImg
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
  chooseImage: function (e) {
    if (this.data.files.length==1){
      wx.showModal({
        title: '提示',
        content: '只能上传1张门面图片',
        showCancel: false
      })
      return;
    }else{
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
            url: app.config.host+'uploadPic.do?fileType=store',
            // 指定要上传的文件的小程序临时文件路径
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              'cloudPath': cloudPath,
              'fileType': 'push'
            },
            // 成功回调
            success: function (res) {
              that.data.shoreImg = res.data;
              console.log(res.data);
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      })
    }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})