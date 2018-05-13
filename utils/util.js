
var config=require('../serverConfig.js');

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/');
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}




/**
 * 发送请求
 */
var sendAction = function (data,callback,fail) {
  checkSession(function(sessionId){
    wx.request({
      url: config.appUrl,
      method: 'GET',
      data:{
        action:data.action,
        data:data.data,
        sessionId:sessionId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (data) {
        if(data.data&&data.data.success){
          callback(data);
        }else{
          if (typeof fail === 'function') {
            fail(data)
          }
          showToast('网络错误','none',1000);
        }
      },
      fail: function(data){
       if(data){
         if (typeof fail === 'function'){
           fail(data)
         }
         showToast('网络错误', 'none', 1000);
       }
      }
    })
  })
}

/**
 * 获取login code 
 * 通过code获取到session_key openId
 * 存取redis以后返回自己服务器的sessionId
 */
var login=function(callback){
  try {
    var sessionId = wx.getStorageSync('sessionId');
    if(sessionId){
      var lastSession = sessionId;
    }else{
      var lastSession=null;
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: config.appUrl,
            data: {
              action: "app.login",
              data: { code: res.code, sessionId: lastSession }
            },
            success: function (res) {
              console.log('重新登陆成功');
              console.log(res);
              wx.setStorage({
                key: 'sessionId',
                data: res.data.sessionId
              })
              callback(res.data.sessionId);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  } catch (e) {
    console.log(e);
  }   
}



var checkSession=function(callback){
  wx.getStorage({
    key: 'sessionId',
    success: function (res) {
      console.log("checksessionData" + res.data);
      var sessionId = res.data;
      // serverCheckSession(sessionId, function (data) {
      //   console.log('serverCheckSession');
      //   console.log(data);
      //   callback(data);
      // })
      console.log('本地读取sessionId为')
      console.log(sessionId);
      callback(sessionId);
    },
    fail: function (res) {
      console.log('checksession重新登陆')
      login(function (sessionId) {
        callback(sessionId);
      });
    }
  })
}
var checkSession1=function(callback){
  /**
 * 判断微信session是否到期
 * 判断自身服务器sessionId是否到期
 * 到期重新获取sessionId
 * 没有到期获取缓存里的sessionId
 */
  console.log('checkSession');
  wx.checkSession({
    success: function () {
      wx.getStorage({
        key: 'sessionId',
        success: function (res) {       
           console.log("checksessionData"+res.data);
          var sessionId=res.data;
            // serverCheckSession(sessionId, function (data) {
            //   console.log('serverCheckSession');
            //   console.log(data);
            //   callback(data);
            // })
            console.log('本地读取sessionId为')
            console.log(sessionId);
            callback(sessionId);
        },
        fail:function(res){
          console.log('checksession重新登陆')
          login(function (sessionId) {
            callback(sessionId);
          }); 
        }
      })
    },
    fail: function () {
      console.log('登陆过期')
      //登录态过期
     login(function(sessionId){
      callback(sessionId);
     }); 
  }
})
}

var serverCheckSession = function (sessionId, call) {
  /**
 * 判断自己服务器的sessionId是否过期；
 * 返回可用的sessionId
 */
  if(!sessionId){
    login(function (sessionId) {
      call(sessionId);
    });
  }else{
  wx.request({
    url: config.appUrl,
    data: {
      action: "app.checkSession",
      data: { key: sessionId }
    },
    success: function (result) {
      var checkSession = result.data.checkSession;
      if (checkSession) {
        call(sessionId);
      } else {
        login(function (sessionId) {
          call(sessionId); 
        });
      }
    }
  })
  }
}

var validate = function(valueArr,nameArr){
  for (var k in valueArr) {
    if (!valueArr[k]) {
      wx.showToast({
        title: nameArr[k] + '为空',
        icon: 'waiting',
        duration: 1000
      })
      return false;
    }
  }
  return true;
}

var showToast=function(title, icon, time) {
  var title = title || '';
  var icon = icon || 'none';
  var time = time || 1000;
  wx.showToast({
    title: title,
    icon: icon,
    duration: time
  })
}

function getArrData(arr,type) {
  var setArr = []
  if(type==='string'){
    for (let i = 0; i < arr.length; i++) {
      setArr.push(JSON.stringify(arr[i]))
    }
    return JSON.stringify(setArr)
  }else{
    for (let i = 0; i < arr.length; i++) {
      setArr.push(JSON.parse(arr[i]))
    }
    return setArr
  }
}

/**
 * send发送请求
 * data{
 * action:action,
 * data:{
 * 
 * }
 * }
 */

module.exports = {
  formatTime: formatTime,
  send:sendAction,
  validate:validate,
  showToast:showToast,
  getArrData: getArrData
}
