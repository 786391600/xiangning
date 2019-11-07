// pages/Testpage/personal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    winHeight: "",//窗口高度
    boolea:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this; 
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 404;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
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

  },
  /**
   * 切换个人中心订单与活动
   */
  changestate: function(e) {
    this.setData({
      active: e.currentTarget.dataset.active
    })
  },
  // 滚动切换标签样式
  switchTab: function(e) {
    console.log(e.detail.current)
    this.setData({
      active: e.detail.current
    });
  },
  //下拉刷新
  upper: function () {
    var that = this; 
    console.log("刷新");
    wx.setNavigationBarTitle({
      title: '刷新中……'
    }) //动态设置当前页面的标题。
    wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。
    //this.loadProduct2();//重新加载产品信息
    wx.hideNavigationBarLoading(); //隐藏导航条加载动画。
    wx.stopPullDownRefresh(); //停止当前页面下拉刷新。
    console.log("关闭");
    wx.setNavigationBarTitle({
      title: ''
    }) //动态设置当前页面的标题。
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  lower: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    // page = page + 1;
    console.log('加载中')
    // 隐藏加载弹框
    wx.hideLoading();
    console.log('加载完成')
  }
})