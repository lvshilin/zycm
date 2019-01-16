const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    company: null,
    position: null,
    working: null,
    address: null,
    phone: null,
    wechat: null,
    isContact: '1',
    isList: '1',
    isContactFlag: true,
    isListFlag:true,
    btnFlag: false
  },
  commitCard: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '完善信息其他人会更快的联系你,点击确定提交',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.config.host + 'user/addUserCard.do',
            method: 'POST',
            data: {
              openId: app.data.openId,
              name: that.data.name,
              company: that.data.company,
              position: that.data.position,
              working: that.data.working,
              address: that.data.address,
              phone: that.data.phone,
              wechat: that.data.wechat,
              isContact: that.data.isContact,
              isList: that.data.isList
            },
            success: function (res) {
              if(res.data.code==200){
                wx.showToast({
                  title: res.data.message,
                  duration: 2000
                })
                that.setData({
                  btnFlag: true
                })
              }
            }
          })
        }
      }
    })
  },
  switchChangeIsList: function(e) {
    if (e.detail.value) {
      this.data.isList = '1'
    } else {
      this.data.isList = '0'
    }
    console.log(this.data.isList);
  },
  switchChangeIsContact: function(e) {
    if (e.detail.value) {
      this.data.isContact = '1'
    } else {
      this.data.isContact = '0'
    }
    console.log(this.data.isContact);
  },
  getName: function(e) {
    this.data.name = e.detail.value;
  },
  getCompany: function(e) {
    this.data.company = e.detail.value;
  },
  getPosition: function(e) {
    this.data.position = e.detail.value;
  },
  getWorking: function(e) {
    this.data.working = e.detail.value;
  },
  getAddress: function(e) {
    this.data.address = e.detail.value;
  },
  getPhone: function(e) {
    this.data.phone = e.detail.value;
  },
  getWechat: function(e) {
    this.data.wechat = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: app.config.host + 'user/queryUserCardByOpenId.do',
      method: 'POST',
      data: {
        openId: app.data.openId
      },
      success: function (res) {
        console.log(res);
        that.setData({
          name: res.data.data.name,
          company: res.data.data.company,
          position: res.data.data.position,
          working: res.data.data.working,
          address: res.data.data.address,
          phone: res.data.data.phone,
          wechat: res.data.data.wechat,
        })
        if (res.data.data.isContact == 1) {
          that.setData({
            isContact: 1,
            isContactFlag: true
          })
        } else {
          that.setData({
            isContact:0,
            isContactFlag: false
          })
        }
        if (res.data.data.isList == 1) {
          that.setData({
            isList: 1,
            isListFlag: true
          })
        } else {
          that.setData({
            isList: 0,
            isListFlag: false
          })
        }
      }
    })
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