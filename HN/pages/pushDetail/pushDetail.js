const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   id:'',
   pushDetail:'',
   replyText:'',
   pushImgsList:[],
   replyPushList:[]
  },
  getText: function(e){
    this.data.replyText = e.detail.value;
  },
  reply: function(){
    var that = this;
    if (that.data.replyText == '' || that.data.replyText.length==0){
      app.commonModal("提示","回复内容不能为空");
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认回复,请确认您回复的内容无误',
      success(res){
        if (res.confirm){
          console.log(app.data.openId)
          wx.request({
            url: app.config.host + 'push/addPushReplyByOpenId.do',
            method: 'POST',
            data: { 
              pushId: that.data.id,
              openId: app.data.openId,
              replyText: that.data.replyText
            },
            success: function (res) {
            console.log(res);
              if(res.data.code==200){
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })
                that.reloadReply();
                that.setData({
                  replyText:"",
                })
              }else{
                app.commonModal("提示",res.data.message)
              }
            }
          })
        } 
      }
    })
  },
  replyClick: function(e){
    //console.log(e.currentTarget.dataset.nickname);
    this.setData({
      replyText: '回复@' + e.currentTarget.dataset.nickname + '：' ,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var that = this;
    wx.request({
      url: app.config.host + 'push/queryPushDetailById.do',
      method: 'POST',
      data: {
        id: this.data.id,
      },
      success: function (res) {
        that.setData({
          pushDetail: res.data.data,
          pushImgsList: res.data.data.pushImgs
        })
      }
    });
    this.reloadReply();
  },
  reloadReply: function(){
    var that = this;
    wx.request({
      url: app.config.host + 'push/queryPushReplyByPushId.do',
      method: 'POST',
      data: {
        pushId: this.data.id,
      },
      success: function (res) {
        that.setData({
          replyPushList: res.data.data
        })
      }
    })
  },
  previewImage: function (e) {
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.pushImgsList 
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