//app.js
var DS=require('./utils/util.js');
App({
  onLaunch: function (e) {
    //调用API从本地缓存中获取数据
   var that=this;
   that.getUserInfo();
  },
  getUserInfo:function(cb){
    var that=this;
    //验证用户是否注册过
    wx.getUserInfo({
      success:function(e){
        DS.send({
          action: "app.user.validateUser",
          data:e.userInfo
        },function(re){
          if(re.data.success){
            that.globalData.userInfo=e.userInfo;
          }else{
            console.log(re)
            console.log('app.js 验证用户注册失败')
          }
        })
      }
    })     
  },
  globalData:{
    userInfo:null,
    runData:null
  }
})