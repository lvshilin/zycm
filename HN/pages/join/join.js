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
    storePhone:'',
    storeAddress:'',
    storeWechat:'',
    files: [],
    envfiles:[],
    storeEnv:[],
    storeEnvRecord:[],
    storeImg:null
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
  getStorePhone: function (e) {
    this.data.storePhone = e.detail.value;
  },
  getStoreAddress: function (e) {
    this.data.storeAddress = e.detail.value;
  },
  getStoreWechat: function(e){
    this.data.storeWechat = e.detail.value;
  },
  commitStore: function(){
    var that = this;
    if (that.data.storeName == '' || that.data.storeName == null){
      app.commonModal("提示","请输入店铺名称");
      return;
    }
    if (that.data.storeDesc == '' || that.data.storeDesc == null) {
      app.commonModal("提示", "请输入店铺介绍");
      return;
    }
    if (that.data.storeImg == '' || that.data.storeImg == null) {
      app.commonModal("提示", "请上传店铺封面图片");
      return;
    }
    if (that.data.storeEnv.length==0) {
      app.commonModal("提示", "请上传店铺环境图片");
      return;
    }
    if (that.data.storePhone == '' || that.data.storePhone == null) {
      app.commonModal("提示", "请输入店铺联系方式");
      return;
    }
    if (that.data.storeAddress == '' || that.data.storeAddress == null) {
      app.commonModal("提示", "请输入店铺地址");
      return;
    }
    wx.showModal({
      title: '提示',
      content: '请确认您提交的内容', 
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.config.host + 'store/addNewStore.do',
            method: 'POST',
            data: {
              storeName: that.data.storeName,
              storeType: that.data.storeType,
              storeDesc: that.data.storeDesc,
              storeImg: that.data.storeImg,
              storeEnv: that.data.storeEnv,
              storeWechat: that.data.storeWechat,
              storePhone: that.data.storePhone,
              storeAddress: that.data.storeAddress,
              openId: app.data.openId
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
  chooseImageImg: function (e) {
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
            url: app.config.host2 + 'uploadPic.do?fileType=store&openId=' + app.data.openId,
            // 指定要上传的文件的小程序临时文件路径
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              'cloudPath': cloudPath,
              'fileType': 'store'
            },
            // 成功回调
            success: function (res) {
              that.data.storeImg = res.data.replace(/"/g, "");
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
      })
    }
  },
  chooseImageEnv: function (e) {
    if (this.data.envfiles.length == 3) {
      wx.showModal({
        title: '提示',
        content: '只能上传3张环境图片',
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
          envfiles: that.data.envfiles.concat(res.tempFilePaths)
        });
        var filePath = res.tempFilePaths[0];
        var cloudPath = Date.parse(new Date());
        wx.uploadFile({
          // 指定上传到的云路径
          url: app.config.host2 + 'uploadPic.do?fileType=store&openId=' + app.data.openId,
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'cloudPath': cloudPath,
          },
          // 成功回调
          success: function (res) {
            if (res.statusCode == 200) {
              that.data.storeEnv.push(res.data.replace(/"/g, ""));
              that.data.storeEnvRecord.push(res.data.replace(/"/g, ""));
            }
          },
          fail: function (res) {
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
  delFileImg: function(){
    var that = this;
    if (that.data.storeImg == null || that.data.storeImg==''){
      wx.showModal({
        title: '提示',
        content: '还没有上传图片',
        showCancel: false
      })
      return;
    }else{
      wx.request({
        url: app.config.host + 'delFile.do',
        method: 'GET',
        data: {
          path: that.data.storeImg
        },
        success: function (res) {
          if (res.data.data){
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            that.data.files.splice(that.data.files.length - 1, 1);
            that.setData({
              files: that.data.files
            })
          }else{
            wx.showToast({
              title: res.data.message,
              duration: 2000
            })
          }
        }
      })
    }
  },
  delFileEnv: function () {
    var that = this;
    var lastStoreEnv = that.data.storeEnvRecord[that.data.storeEnvRecord.length - 1]
    if (lastStoreEnv == null || lastStoreEnv == '') {
      wx.showModal({
        title: '提示',
        content: '还没有上传图片',
        showCancel: false
      })
      return;
    } else {
      wx.request({
        url: app.config.host2 + 'delFile.do',
        method: 'GET',
        data: {
          path: lastStoreEnv
        },
        success: function (res) {
          if (res.data.data) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            that.data.envfiles.splice(that.data.envfiles.length - 1, 1);
            that.data.storeEnv.splice(that.data.storeEnv.length - 1, 1);
            that.data.storeEnvRecord.splice(that.data.storeEnvRecord.length - 1, 1);
            that.setData({
              envfiles: that.data.envfiles
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