//index.js
//获取应用实例
var app = getApp()
var until = require('../../utils/util.js');
Page({
  data: {
     
  },
  onLoad: function () {
   var that=this;
   wx.getUserInfo({
     success:function(res){
     that.setData({userInfo:res.userInfo});
     }
   })
  },
  formSubmit:function(e){
   console.log(e);
   console.log('提交表单了');
  },
  adminClick:function(e){
    var t = e.target.dataset.value;
    wx.navigateTo({
      url:'/pages/admin/'+t+'/index'
    })
  },
  detailsClick:function(){
    wx.navigateTo({
      url: '/pages/telbook/details/details',
    })
  }
})

