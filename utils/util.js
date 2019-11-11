const config = require('../serverConfig.js')

exports.login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          exports.loginRequest({
            action: 'login',
            data: {
              code: res.code
            }
          }).then((e) => {
            if (e.data.sessionId) {
              wx.setStorage({
                key: 'sessionId',
                data: e.data.sessionId,
                success: function () {
                  resolve(e.data.sessionId)
                }, fail: function (e) {
                  reject(e)
                }
              })
            }
          })
        }
      }
    })
  })
}
exports.getSessionId = function (force) {
  return new Promise((resolve, reject) => {
    if (force) {
      exports.login().then(function (e) {
        resolve(e)
      })
    } else {
      if (wx.getStorageSync('sessionId')) {
        console.log('本地存在')
        console.log(wx.getStorageSync('sessionId'))
        resolve(wx.getStorageSync('sessionId'))
      } else {
        exports.login().then(function (e) {
          console.log('本地不存在')
          console.log(e)
          resolve(e)
        })
      }
    }
  })
}
exports.request = function (data) {
  var data = data;
  return new Promise(function (resolve, reject) {
    exports.getSessionId().then((sessionId) => {
      data.sessionId = sessionId;
      wx.request({
        url: config.serverUrl,
        data: data,
        method: 'POST',
        success: function (e) {
          if (e.data.sessionExpire) {
            console.log('session到期 重新请求');
            exports.getSessionId('force').then((sessionId) => {
              data.sessionId = sessionId;
              wx.request({
                url: config.serverUrl,
                data: data,
                method: 'POST',
                success: function (e) {
                  if (!e.data.success && e.data.err) {
                    exports.showToast('服务异常', 'error')
                  } else {
                    resolve(e)
                  }
                }
              })
            })
          } else {
            console.log(e)
            if (!e.data.success && e.data.err) {
              exports.showToast('服务异常', 'error')
            } else {
              resolve(e)
            }
          }
        },
        fail: function (e) {
          reject(e)
        }
      })
    })
  })
}
exports.loginRequest = function (data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.serverUrl,
      data: data,
      method: 'POST',
      success: function (e) {
        resolve(e)
      },
      fail: function (e) {
        reject(e)
      }
    })
  })
}


exports.pay = function (obj) {
  return new Promise((resolve, reject) => {
    exports.request({
      action: 'app.until.bookingPay',
      data: obj
    }).then(function (e) {
      console.log('看看是成功还是失败')
      if (e.data && e.data.success) {
        let out_trade_no = e.data.data.out_trade_no;
        wx.requestPayment({
          timeStamp: e.data.data.timeStamp,
          nonceStr: e.data.data.nonceStr,
          package: e.data.data.package,
          signType: e.data.data.signType,
          paySign: e.data.data.paySign,
          success(res) {
            resolve({ data: e, successData: res })
          },
          fail(res) {
            let err = res || {}
            err.out_trade_no = out_trade_no
            reject(err)
          }
        })
      } else {
        if (e.data && e.data.data && e.data.data.notEnough) {
          reject({ notEnough: true })
        } else {
          reject({ notEnough: false })
        }
      }
    })
  })
}
exports.confirmUser = function (obj) {
  return new Promise((resolve, reject) => {
    exports.request({
      action: 'app.user.confirmUser',
      data: obj
    }).then(function (e) {
      resolve(e)
    })
  })
}
exports.getUserInfo = function (query) {
  var query = query || {}
  exports.request({
    action: 'app.user.getUserInfo',
    data: query
  }).then(function (e) {
    console.log(e)
  })
}

exports.setUserInfo = function (obj) {
  return new Promise((resolve, reject) => {
    exports.request({
      action: 'app.user.setUserInfo',
      data: obj
    }).then(function (e) {
      resolve(e)
    })
  })
}

exports.getUserAuth = function () {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              exports.confirmUser({ userInfo: res.userInfo }).then(function (e) {
                wx.setStorageSync('userInfo', e.data.data)
                resolve({ auth: true, userInfo: res })
              })
            }
          })
        } else {
          resolve({ auth: false })
        }
      }
    })
  })
}
exports.getQrImage = function (data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.serverUrl,
      data: data,
      method: 'POST',
      success: function (e) {
        resolve(e)
      },
      fail: function (e) {
        reject(e)
      }
    })
  })
}

exports.showToast = function (title, type) {
  var image = type ? '/style/image/' + type + '.png' : '';
  console.log(image)
  wx.showToast({
    title: title,
    image: image,
    duration: 2000
  })
}
