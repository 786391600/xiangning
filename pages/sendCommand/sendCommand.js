// pages/sendCommand/sendCommand.js

/**
 * 此Demo仅供参考，可打印数字，英文，符号，中文，
 * 小程序支持的蓝牙为低功耗蓝牙（BLE），数据量大需分包发送
 */

var app = getApp();
var DS = require('../../utils/util.js')
var tsc = require("../../utils/tsc.js");
var esc = require("../../utils/esc.js");
var encode = require("../../utils/encoding.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CityArray: ['西坡', '谭平', '枣岭', '师家滩'],
    QRData: {
      Address: "",
      Iphone: "",
    },
    DeliveryTypeItems: [{
      value: 0,
      name: '快递件',
      checked: 'true'
    }, {
      value: 1,
      name: '物流件'
    }],
    weightItems: [{
        value: '5kg',
        checked: 'true'
      },
      {
        value: '10kg'
      },
      {
        value: '15kg'
      },
    ],
    CityIndex: 0,
    DeliveryType: 0,
    sendContent: "",
    looptime: 0,
    currentTime: 1,
    lastData: 0,
    oneTimeData: 0,
    returnResult: "",
    canvasWidth: 180,
    canvasHeight: 180,
    imageSrc: '../../imags/abc_ic_star_black_16dp.png',
    buffSize: [],
    buffIndex: 0,
    printNum: [],
    printNumIndex: 0,
    printerNum: 1,
    currentPrint: 1,
    isReceiptSend: false,
    isLabelSend: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.notifyBLECharacteristicValueChange({
      deviceId: app.BLEInformation.deviceId,
      serviceId: app.BLEInformation.notifyServiceId,
      characteristicId: app.BLEInformation.notifyCharaterId,
      state: true,
      success: function(res) {
        wx.onBLECharacteristicValueChange(function(r) {
          console.log(`characteristic ${r.characteristicId} has changed, now is ${r}`)
        })
      },
      fail: function(e) {
        console.log(e)
      },
      complete: function(e) {
        console.log(e)
      }
    })
  },
  ChangeDeliveryType: function(e) {
    console.log('ChangeDeliveryType携带数据为：', e.detail.value)
    this.setData({
      DeliveryType: e.detail.value
    })
  },
  ResetForm: function() {
    this.setData({
      DeliveryType: 0,
      CityIndex: 0,
      QRData: {
        Address: "",
        Iphone: "",
      },
      DeliveryTypeItems: [{
        value: 0,
        name: '快递件',
        checked: 'true'
      }, {
        value: 1,
        name: '物流件'
      }],
      weightItems: [{
          value: '5kg',
          checked: 'true'
        },
        {
          value: '10kg'
        },
        {
          value: '15kg'
        },
      ],
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      CityIndex: e.detail.value
    })
  },

  formSubmit: function(e) {
    var that=this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (this.Verification(e)) {
      return
    }
    wx.showModal({
      title: '提示',
      content: '生成二维码成功',
      confirmText: '重新生成',
      cancelText: '继续生成',
      success(res) {
        if (res.confirm) {
          console.log('用户点击重新生成')
        } else if (res.cancel) {
          console.log('用户点击继续生成')
          that.ResetForm()
        }
      }
    })
    // this.getQrId();
  },
  Verification(e) {
    var res = e.detail.value;
    if (!res.City || !res.GoodsType || !res.Iphone || !res.weight) {
      wx.showToast({
        title: '请填写必填项',
        icon: 'none',
        duration: 1500
      })
      return true
    }
    if (res.GoodsType == 1 && !res.Address) {
      wx.showToast({
        title: '请填写必填项',
        icon: 'none',
        duration: 1500
      })
      return true
    }
    console.log(res, "res")
    return false
  },

  inputEvent: function(e) { //获取输入内容
    this.setData({
      sendContent: e.detail.value
    })
  },

  sendData: function() { //输入框点击发送
    var data = this.data.sendContent + "\n"

    this.setData({
      looptime: 0
    })
    var content = new encode.TextEncoder(
      'gb18030', {
        NONSTANDARD_allowLegacyEncoding: true
      }).encode(data);

    this.prepareSend(content)
  },

  labelTest: function() { //标签测试
    var that = this;
    var canvasWidth = that.data.canvasWidth
    var canvasHeight = that.data.canvasHeight
    var command = tsc.jpPrinter.createNew()
    command.setSize(40, 30)
    command.setGap(2)
    // command.setHome()
    command.setCls()
    //command.setText(0, 30, "TSS24.BF2", 1, 1, "图片")
    command.setQR(80, 16, "L", 5, "A", "http://www.beijixiong.club/qr/?s=157503861990215")
    command.setText(112, 176, "TSS24.BF2", 1, 1, "扫码取件")
    command.setText(64, 206, "TSS24.BF2", 1, 1, "157503861990215")
    // command.setText(170, 50, "TSS24.BF2", 1, 1, "小程序测试")
    // command.setText(170, 90, "TSS24.BF2", 1, 1, "测试数字12345678")
    // command.setText(170, 120, "TSS24.BF2", 1, 1, "测试英文abcdefg")
    // command.setText(170, 150, "TSS24.BF2", 1, 1, "测试符号/*-+!@#$")
    // command.setBarCode(170, 180, "EAN8", 64, 1, 3, 3, "1234567")
    command.setPagePrint()
    that.setData({
      isLabelSend: true
    })
    console.log(command.getData())
    that.prepareSend(command.getData())
    // wx.canvasGetImageData({
    //   canvasId: 'shareCanvas',
    //   x: 0,
    //   y: 0,
    //   width: canvasWidth,
    //   height: canvasHeight,
    //   success: function(res) {
    //     command.setBitmap(60, 0, 1, res)
    //     command.setPagePrint()
    //     that.setData({
    //       isLabelSend: true
    //     })
    //     console.log(command.getData())
    //     that.prepareSend(command.getData())
    //   },
    //   complete: function() {
    //     // command.setPagePrint()
    //     // that.setData({
    //     //   isLabelSend: true
    //     // })
    //     // console.log(command.getData())
    //     // that.prepareSend(command.getData())
    //   }
    // })

  },

  receiptTest: function() { //票据测试
    var that = this;
    var canvasWidth = that.data.canvasWidth
    var canvasHeight = that.data.canvasHeight
    var command = esc.jpPrinter.createNew()
    command.init()
    command.setText("票据测试!");
    command.setPrint()
    command.setText("This is a receipt test!!!")
    command.setPrint()
    command.setText("二维码测试:")
    command.setPrint()
    command.setSelectSizeOfModuleForQRCode(5)
    command.setSelectErrorCorrectionLevelForQRCode(49)
    command.setStoreQRCodeData("佳博智汇网络")
    command.setPrintQRCode()
    command.setPrint()
    command.setSelectJustification(0)
    command.setText("向左对齐")
    command.setPrint()
    command.setSelectJustification(1)
    command.setText("居中对齐")
    command.setPrint()
    command.setSelectJustification(2)
    command.setText("向右对齐")
    command.setPrint()
    command.setSelectJustification(0)
    command.setText("图片测试")
    command.setPrint()
    wx.canvasGetImageData({
      canvasId: 'edit_area_canvas',
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      success: function(res) {
        command.setBitmap(res)
      },
      complete: function(res) {
        console.log("finish")
        command.setPrint()
        that.setData({
          isReceiptSend: true
        })
        that.prepareSend(command.getData())
      }
    })

    // this.send(buff)
  },

  prepareSend: function(buff) { //准备发送，根据每次发送字节数来处理分包数量
    console.log(buff)
    var that = this
    var time = that.data.oneTimeData
    var looptime = parseInt(buff.length / time);
    var lastData = parseInt(buff.length % time);
    console.log(looptime + "---" + lastData)
    that.setData({
      looptime: looptime + 1,
      lastData: lastData,
      currentTime: 1,
    })

    that.Send(buff)
  },

  queryStatus: function() { //查询打印机状态
    var command = esc.jpPrinter.Query();
    command.getRealtimeStatusTransmission(1);
  },

  Send: function(buff) { //分包发送
    var that = this
    var currentTime = that.data.currentTime
    var loopTime = that.data.looptime
    var lastData = that.data.lastData
    var onTimeData = that.data.oneTimeData
    var printNum = that.data.printerNum
    var currentPrint = that.data.currentPrint
    var buf
    var dataView
    if (currentTime < loopTime) {
      buf = new ArrayBuffer(onTimeData)
      dataView = new DataView(buf)
      for (var i = 0; i < onTimeData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    } else {
      buf = new ArrayBuffer(lastData)
      dataView = new DataView(buf)
      for (var i = 0; i < lastData; ++i) {
        dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i])
      }
    }
    console.log("第" + currentTime + "次发送数据大小为：" + buf.byteLength)
    wx.writeBLECharacteristicValue({
      deviceId: app.BLEInformation.deviceId,
      serviceId: app.BLEInformation.writeServiceId,
      characteristicId: app.BLEInformation.writeCharaterId,
      value: buf,
      success: function(res) {
        console.log(res)
      },
      fail: function(e) {
        console.log(e)
      },
      complete: function() {
        currentTime++
        if (currentTime <= loopTime) {
          that.setData({
            currentTime: currentTime
          })
          that.Send(buff)
        } else {
          wx.showToast({
            title: '已打印第' + currentPrint + '张',
          })
          if (currentPrint == printNum) {
            that.setData({
              looptime: 0,
              lastData: 0,
              currentTime: 1,
              isReceiptSend: false,
              isLabelSend: false,
              currentPrint: 1
            })
          } else {
            currentPrint++
            that.setData({
              currentPrint: currentPrint,
              currentTime: 1,
            })
            that.Send(buff)
          }
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var list = []
    var numList = []
    var j = 0
    for (var i = 20; i < 200; i += 10) {
      list[j] = i;
      j++
    }
    for (var i = 1; i < 10; i++) {
      numList[i - 1] = i
    }
    this.setData({
      buffSize: list,
      oneTimeData: list[0],
      printNum: numList,
      printerNum: numList[0]
    })

    // var that = this
    // wx.getImageInfo({
    //   src: that.data.imageSrc,
    //   success(res) {
    //     console.log(res.width)
    //     console.log(res.height)
    //     that.setData({
    //       canvasWidth: res.width,
    //       canvasHeight: res.height
    //     })
    //   }
    // })
    // that.setData({
    //   canvasWidth: width,
    //   canvasHeight: height
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    var width
    var height
    wx.getImageInfo({
      src: that.data.imageSrc,
      success(res) {
        console.log(res.width)
        console.log(res.height)
        width = res.width
        height = res.height
        that.setData({
          canvasWidth: res.width,
          canvasHeight: res.height
        })
      }
    })
    const ctx = wx.createCanvasContext("edit_area_canvas", this);
    // if (app.globalData.platform == "android") {
    //   ctx.translate(width, height)
    //   ctx.rotate(180 * Math.PI / 180)
    // }
    ctx.drawImage(this.data.imageSrc, 0, 0, width, height);
    ctx.draw();
  },

  buffBindChange: function(res) { //更改打印字节数
    var index = res.detail.value
    var time = this.data.buffSize[index]
    this.setData({
      buffIndex: index,
      oneTimeData: time
    })
  },
  printNumBindChange: function(res) { //更改打印份数
    var index = res.detail.value
    var num = this.data.printNum[index]
    this.setData({
      printNumIndex: index,
      printerNum: num
    })
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
    wx.closeBLEConnection({
      deviceId: app.BLEInformation.deviceId,
      success: function(res) {
        console.log("关闭蓝牙成功")
      },
    })
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
  getQrId() {
    let that = this;
    return new Promise((resolve, reject) => {
      DS.request({
        action: 'app.transit.getQrId',
        data: {}
      }).then(function(e) {
        if (e.data.success) {
          let qrId = e.data.data
          that.printerQr(qrId)
          wx.showModal({
            title: '提示',
            content: '生成二维码成功',
            confirmText: '重新生成',
            cancelText: '继续生成',
            success(res) {
              if (res.confirm) {
                console.log('用户点击重新生成')
              } else if (res.cancel) {
                console.log('用户点击继续生成')
              }
            }
          })
        } else {
          DS.showToast(e.data.message, 'error');
        }
      })
    })
  },
  printerQr(qrId) {
    var that = this;
    var canvasWidth = that.data.canvasWidth
    var canvasHeight = that.data.canvasHeight
    var command = tsc.jpPrinter.createNew()
    command.setSize(40, 30)
    command.setGap(2)
    command.setCls()
    command.setQR(80, 16, "L", 5, "A", "http://www.beijixiong.club/qr/?s=" + qrId)
    command.setText(112, 176, "TSS24.BF2", 1, 1, "扫码取件")
    command.setText(64, 206, "TSS24.BF2", 1, 1, qrId)
    command.setPagePrint()
    that.setData({
      isLabelSend: true
    })
    console.log(command.getData())
    that.prepareSend(command.getData())
  }
})