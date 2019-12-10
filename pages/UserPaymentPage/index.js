var DS = require('../../utils/util.js')
Page({
  data: {
     id: '',
     phone: '',
     price: ''
  },
  onLoad (options) {
    if (options.q) {
      let q = decodeURIComponent(options.q)
      let qrId = this.queryUrl(q, 's')
      this.getWayBillInfo(qrId)
    } else {
      console.log('无效二维码')
    }
  },
  getQrImage () {
    return new Promise((resolve, reject) => {
      DS.request({
        action: 'app.transit.getQrImage',
        data: {}
      }).then(function (e) {
        if (e.data.success) {
          const fsm = wx.getFileSystemManager();
          const FILE_BASE_NAME = 'tmp_base64src';
          var base64data = e.data.data.img;
          const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
          if (!format) {
            reject(new Error('ERROR_BASE64SRC_PARSE'));
          }
          const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
          const buffer = wx.base64ToArrayBuffer(bodyData);
          fsm.writeFile({
            filePath,
            data: buffer,
            encoding: 'binary',
            success() {
              console.log(filePath)
              wx.getImageInfo({
                src: filePath,
                success: function (e) {
                  console.log(e)
                  console.log('getImageInfo')
                  const context = wx.createCanvasContext('shareCanvas')
                  context.drawImage(e.path, 0, 0, 200, 200)
                  context.setTextAlign('center')    // 文字居中
                  context.setFillStyle('#000000')  // 文字颜色：黑色
                  context.setFontSize(22)         // 文字字号：22px
                  context.fillText("123456", 600 / 2, 500)
                  context.draw()
                }
              })
            },
            fail() {
              reject(new Error('ERROR_BASE64SRC_WRITE'));
            },
          });
          resolve(e)
        } else {
          DS.showToast(e.data.message, 'error');
        }
      })
    })
  },
  payClick () {
    let that = this
    wx.requestSubscribeMessage({
      tmplIds: ['GG8Ww1XQ4D_Ok2B-gNhdsUfsrJvee40hvPJWna9KZus'],
      success(res) {
        console.log(res)
      }
    })
    let body = ''
    if (that.data.end) {
      body = '城乡物流订单-' + that.data.end
    } else {
      body = '城乡物流订单'
    }
    DS.payLogistics({
      body: body,
      fee: that.data.price,
      type: 'logisticsOrder',
      logisticsId: that.data.id
    }).then((res) => {
      wx.hideLoading()
    }).catch((res) => {
      wx.hideLoading()
      
    })
  },
  queryUrl (url, name) {
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
    var r = url.substr(1).match(reg)
    console.log(r)
    if (r != null) {
      return r[2]
    }
    return null;
  },
  getWayBillInfo (id) {
    let query = {}
    let that = this
    query.id = id
    DS.request({
      action: 'app.transit.getWayBillInfo',
      data: query
    }).then(function (e) {
       let data = e.data.data
       data.price = data.price || 5
       console.log(data)
       that.setData(data)
    })
  }
})