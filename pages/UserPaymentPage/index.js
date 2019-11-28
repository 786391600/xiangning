var DS = require('../../utils/util.js')
Page({
  data: {
    
  },
  onShow () {
    
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
                  context.drawImage(e.path, 0, 0, 100, 100)
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
          until.showToast(e.data.message, 'error');
        }
      })
    })
  }
})