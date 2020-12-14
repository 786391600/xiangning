var DS = require('../../utils/util.js')
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onLoad (options) {
    if (options) {
      wx.setNavigationBarTitle({
        title:'密切接触者查询'
      })
    }
    // this.getCarInfo()
    let phone = wx.getStorageSync('phone')
    if (phone) {
      this.setData({havePhone: true})
    }
  },
  refresh() {
    wx.showLoading({
      title: '查询中...',
    })
    DS.request({
      action: 'app.transit.getSearchInfo',
      data: {}
    }, 'force').then(function (e) {
      if (e.data.success) {
        console.log(JSON.parse(e.data.data))
      }
    })
  },
  getPhoneNumber (data) {
    var that = this;
    if (!data.detail.encryptedData || !data.detail.iv) {
      return
    }
    DS.request({
      action: 'app.transit.getPhoneNumber',
      data: data.detail
    }, 'force').then(function (e) {
      if (e.data.success) {
        let phone = e.data.data.phoneNumber
        if (phone) {
          wx.setStorageSync('phone', phone)
          that.setData({havePhone: true})
        }
      }
    })
    this.refresh()
  },
  getWeiXinInfo(carInfo, carIndex) {
    let that = this
    if (carIndex === 'refresh') {
      carIndex = this.data.currentCarTab 
    } else {
      if (that.data.isGetWeiXinInfo || carIndex === that.data.currentCarTab) {
        return
      }
    }
    wx.showLoading({
      title: '车辆更新中...',
    })
    that.data.isGetWeiXinInfo = true
    qqmapsdk.reverseGeocoder({
      sig: 'aGiWaOaTVM4hHZ4NnZW4GKBtLGQfKdSx',
      location: {
        latitude: carInfo.lt, 
        longitude: carInfo.lg
      },
      coord_type: 1,
      success: function (res) {
        var markers = [{
          iconPath: "./aaa.png",
          id: 0,
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          width: 50,
          height: 50,
          rotate: carInfo.dir,
          label: {
            content: '当前位置：' + res.result.formatted_addresses.recommend,
            anchorY:-80,
            anchorX: -80,
            bgColor: '#FF5F0F',
            padding: 5,
            borderRadius: 5,
            color: '#FFFFFF'
          }
        }]
        wx.hideLoading()
        that.setData({ markers: markers, latitude: res.result.location.lat, longitude: res.result.location.lng, recommend: res.result.formatted_addresses.recommend, currentCarTab: carIndex, currentCarNo:  carInfo.carNo})
        that.data.isGetWeiXinInfo = false
      }
    })
  },
  carClick(res) {
    let carInfo = res.currentTarget.dataset.carinfo;
    let carIndex = res.currentTarget.dataset.carindex || 0;
    this.getWeiXinInfo(carInfo, carIndex)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '乡宁'+ this.data.lineTitle + '公交实时查看',
      path: '/pages/maphandle/index?lineId=' + this.data.lineId + '&lineTitle=' + this.data.lineTitle,
      imageUrl: '../../icon/share.png'
    }
  },
  toLineInfo () {
    wx.reLaunch({
      url: '/pages/carIndex/index'
    })
  }
})