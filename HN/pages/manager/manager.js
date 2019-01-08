const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [{
        name: '实体店铺',
        value: '0',
        checked: true
      },
      {
        name: '微商店',
        value: '1'
      }
    ],
    btnFlag1: false,
    btnFlag2: false,
    btnFlag3: false,
    storeName: '',
    storeType: '0',
    storeDesc: '',
    storePhone: '',
    storeAddress: '',
    id: '',
    files: [],
    envfiles:[],
    oldStoreImg: null,
    storeImg: null,
    storeEnv: [],
  },
  radioChange: function(e) {
    this.data.storeType = e.detail.value;
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  chooseImage: function(e) {
    if (this.data.files.length == 1) {
      wx.showModal({
        title: '提示',
        content: '只能上传1张门面图片',
        showCancel: false
      })
      return;
    } else {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths)
          });
          var filePath = res.tempFilePaths[0];
          var cloudPath = Date.parse(new Date());
          wx.uploadFile({
            // 指定上传到的云路径
            url: app.config.host + 'uploadPic.do?fileType=store&openId=' + app.data.openId,
            // 指定要上传的文件的小程序临时文件路径
            filePath: res.tempFilePaths[0],
            name: 'file',
            formData: {
              'cloudPath': cloudPath,
              'fileType': 'store'
            },
            // 成功回调
            success: function(res) {
              that.data.storeImg = res.data.replace(/"/g, "");
            },
            fail: function(res) {
              console.log(res);
            }
          })
        }
      })
    }
  },
  chooseImage2: function (e) {
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
          url: app.config.host + 'uploadPic.do?fileType=store&openId=' + app.data.openId,
          // 指定要上传的文件的小程序临时文件路径
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'cloudPath': cloudPath,
            'fileType': 'push'
          },
          // 成功回调
          success: function (res) {
            if (res.statusCode == 200) {
              that.data.storeEnv.push(res.data.replace(/"/g, ""));
            }
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  delFile: function() {
    var that = this;
    if (that.data.storeImg == null || that.data.storeImg == '') {
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
          path: that.data.storeImg
        },
        success: function(res) {
          if (res.data.data) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            that.data.files.splice(that.data.files.length - 1, 1);
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
  delFile2: function () {
    var that = this;
    var lastStoreEnv = that.data.storeEnv[that.data.storeEnv.length - 1]
    if (lastStoreEnv == null || lastStoreEnv == '') {
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
          path: lastStoreEnv
        },
        success: function (res) {
          console.log(res.data.data);
          if (res.data.data) {
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            that.data.envfiles.splice(that.data.envfiles.length - 1, 1);
            that.data.storeEnv.splice(that.data.storeEnv.length - 1, 1);
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
      url: app.config.host + 'store/queryStoreDetailByOpenId.do',
      method: 'POST',
      data: {
        openId: 'oGfC84lx0gpeXXoAjyRklLGXH6-8'
      },
      success: function(res) {
        that.setData({
          storeName: res.data.data.storeName,
          storeDesc: res.data.data.storeDesc,
          storeAddress: res.data.data.storeAddress,
          storePhone: res.data.data.storePhone,
          id: res.data.data.id,
          oldStoreImg: res.data.data.storeImg
        })
        var radioItems = that.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == res.data.data.storeType;
        }
        that.setData({
          radioItems: radioItems
        });
      }
    })
  },
  updateStoreDetail: function() {
    var that = this;
    if (that.data.storeName == '' || that.data.storeName == null) {
      app.commonModal("提示", "请输入店铺名称");
      return;
    }
    if (that.data.storeDesc == '' || that.data.storeDesc == null) {
      app.commonModal("提示", "请输入店铺介绍");
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
            url: app.config.host + 'store/updateStore.do',
            method: 'POST',
            data: {
              storeName: that.data.storeName,
              storeType: that.data.storeType,
              storeDesc: that.data.storeDesc,
              storePhone: that.data.storePhone,
              storeAddress: that.data.storeAddress,
              id: that.data.id
            },
            success: function(res) {
              if (res.data.code == '200') {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000,
                })
                that.setData({
                  btnFlag1: true
                })
              }
            }
          })
        }
      }
    })
  },
  updateStoreImg: function() {
    var that = this;
    if (that.data.storeImg == null || that.data.storeImg==''){
      app.commonModal("提示", "还没有上传图片呢");
      return;
    }
    wx.request({
      url: app.config.host + 'store/updateStore.do',
      method: 'POST',
      data: {
        storeImg: that.data.storeImg,
        id: that.data.id
      },
      success: function(res) {
        if (res.data.code) {
          that.data.files.splice(that.data.files.length - 1, 1);
          that.setData({
            oldStoreImg: that.data.storeImg,
            btnFlag2: true,
            storeImg: '',
            files: that.data.files
          })
        }
      }
    })
  },
  updateStoreEnv: function(e){
    var that = this;
    console.log(that.data.storeEnv)
    if (that.data.storeEnv.length==0) {
      app.commonModal("提示", "还没有上传图片呢");
      return;
    }
  },
  getStoreName: function(e) {
    this.data.storeName = e.detail.value;
  },
  getStoreDesc: function(e) {
    this.data.storeDesc = e.detail.value;
  },
  getStorePhone: function(e) {
    this.data.storePhone = e.detail.value;
  },
  getStoreAddress: function(e) {
    this.data.storeAddress = e.detail.value;
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log(123);
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