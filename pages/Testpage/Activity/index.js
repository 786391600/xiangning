// pages/Testpage/Activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ActTelephone:false,
    ActState:2, //手机号活动：1,集赞活动：2
    Someone: 2, //朋友:1, 自己:2
    QRState:2   //集赞中：1 ,已集满:2,已领取:3,活动已经结束:0
    
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
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: 'xx小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },

  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNumber = e.detail.value
    if (phoneNumber.length === 11) {
      this.checkPhoneNum(phoneNumber)
    }else{
      if (this.data.ActTelephone==true){
        this.setData({
          ActTelephone: false
        })
      }
    }
  },
  checkPhoneNum: function (phoneNumber) {
    let str = /^1[34578]\d{9}$/
    if (str.test(phoneNumber)) {
      this.setData({
        ActTelephone: true
      })
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../../icon/warning.png',
        duration: 1500
      })
      this.setData({
        ActTelephone: false
      })
    }
  },
  //form数据
  formSubmit(e) {
    if (this.data.ActTelephone==false){
      wx.showToast({
        title: '手机号不正确',
        image: '../../../icon/warning.png',
        duration: 1500
      })
    }else{
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    }
  },
  toQRcode: function (e) {
    wx.navigateTo({
      url: '/pages/Testpage/QRcode/index',
    })
  },
  changea:function(e){
    if (e.currentTarget.dataset.state =='ActState'){
      this.setData({
        ActState: e.currentTarget.dataset.num
      })
    } else if (e.currentTarget.dataset.state == 'Someone'){
      this.setData({
        Someone: e.currentTarget.dataset.num
      })
    } else if (e.currentTarget.dataset.state == 'QRState') {
      this.setData({
        QRState: e.currentTarget.dataset.num
      })
    }
  }
})