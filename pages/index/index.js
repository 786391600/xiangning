//index.js
//获取应用实例
var app = getApp()
var DS=require('../../utils/util');
Page({
  data: {
   dateArr:[1,2,3,4,5,6,7,8,9,10]
  },
  onLoad: function (options) {
    var that = this
    wx.getUserInfo({
      lang:'zh_CN',
      success:function(data){
        that.setData({userInfo:data.userInfo});
      }
    })
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
  },
  showImg:function(e){
    console.log(e)
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls:[current],
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.info("点击图片了");
      },
    })
  },
  showDateils:function(data){
    var data=data.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../dateils/dateils?name='+data
    })
  },
  aa:function(){
    console.log('滚动到底了');
  }
})
