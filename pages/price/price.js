//index.js  
//获取应用实例 
var until = require('../../utils/util.js');
Page({
  data: {
    priceClassArr:[],
    classIndex: 0,
    priceArr: [],
    priceTime:'',
    canvasClass:'canhide',
    imgUrl:"",
    msgList: [
    { title: "多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
    { title: "悦如公寓三周年生日趴邀你免费吃喝欢唱" },
    { title: "你想和一群有志青年一起过生日嘛？" }
    ],
  },
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    console.log(options)
    this.getPriceList();
  },
  bindPickerChange: function (e) {
    var classIndex=e.detail.value;
    var that = this;
    var classId=this.data.priceClassArr[classIndex]._id;
    this.getPriceList(classId,classIndex)
  },
  getPriceList:function(classId,classIndex){
    var that = this
    var sendData = classId?{priceClassId:classId}:{};
    this.setData({loadingHidden:true})
    until.send({
      action: 'app.price.getPriceList', data: sendData
    }, function (response) {
      var data = response.data;
      if (data&&data.success) {
        if(classId){
          that.setData({ classIndex: classIndex, priceArr: data.data.priceList, priceTime: data.data.time, loadingHidden: false})
        }else{
          that.setData({priceClassArr: data.data.priceClass,classIndex: 0, priceTime: data.data.time, priceArr: data.data.priceList, loadingHidden: false})
        }   
      } else {
        that.setData({loadingHidden: false })
        until.showToast("网络错误，稍等再试","error",1000);
      }
      wx.stopPullDownRefresh(); 
    })
  },
  onPullDownRefresh:function(){
      this.getPriceList();
  },
  onShareAppMessage: function (res) {
    console.log(res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '乡宁菜价表',
      path: 'pages/price/price',
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  },
  getQR () {
    var that = this;
    this.setData({canvasClass:'canshow'})
    wx.showLoading({
      title: '图片生成中',
      mask: true
    })
    until.send({
      action: 'app.common.getQRurl', data:{path:"pages/price/price",scene:"wangtao"}
    }, function (response) {
      console.log(response)
      console.log('yayyyy')
      // var ctx = wx.createCanvasContext('myCanvas')
      // ctx.drawImage(response.data.data, 0, 0, 200, 200)
      // ctx.draw()
      // wx.previewImage({
      //   current: response.data.data, // 当前显示图片的http链接
      //   urls: [response.data.data] // 需要预览的图片http链接列表
      // })
      wx.showLoading({
        title: '图片生成中',
        mask:true
      })
      const ctx = wx.createCanvasContext('myCanvas')
      wx.getImageInfo({
        src: response.data.data,
        success:function(img1){
          wx.getImageInfo({
            src: 'http://i2.bvimg.com/644269/7a1b0bc24788d4c4.jpg',
            success:function(img2){
              ctx.rect(0, 0, 360, 640)
              ctx.setFillStyle('white')
              ctx.fill()
              ctx.beginPath()
              ctx.rect(0, 0, 360, 390)
              ctx.setFillStyle('red')
              ctx.fill()
              ctx.setFillStyle('black')
              ctx.setTextAlign('center')
              ctx.setFontSize(25)
              ctx.fillText('长按扫码，帮我赢奖品！', 180, 590)
              ctx.drawImage(img1.path, 105, 400, 150, 150)
              ctx.drawImage(img2.path, 0, 0, 360, 390)
              ctx.draw(true, function () {
                console.log('绘制完毕')
                wx.canvasToTempFilePath({
                  x: 0,
                  y: 0,
                  width: 360,
                  height: 640,
                  destWidth: 720,
                  destHeight: 1280,
                  canvasId: 'myCanvas',
                  success: function (res) {
                    console.log(res.tempFilePath)
                    wx.previewImage({
                      urls: [res.tempFilePath] // 需要预览的图片http链接列表
                    })
                    that.setData({ canvasClass: 'canhide' })
                    wx.hideLoading()
                  }
                })
              });
   
            }
          })
                    
        },fail:function(res){
          console.log('dddderr')
          console.log(res)
        }
      })
      // wx.chooseImage({
      //   success: function (res) {
      //     console.log(res)
      //     ctx.drawImage(res.tempFilePaths[0], 0, 0, 150, 100)
      //     ctx.draw()
      //   }
      // })
      that.setData({imgsrc:response.data.data})
    })
  },
  uploadImg:function(){
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://chen910.duapp.com/fileUpload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            let data = JSON.parse(res.data)
            that.setData({ imgUrl: data.linkurl})
            wx.getImageInfo({
              src: 'http://i4.bvimg.com/644269/b1373666854749d3.jpg',
              success: function (res) {
               console.log(res)
              }
            })
          }
        })
      }
    })
  }
})  