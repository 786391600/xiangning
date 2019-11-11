var DS = require('../../utils/util.js')
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    currentCarNo: '',
    currentCarTab: 0,
    recommend: '',
    longitude: '110.8469700000',
    latitude: '35.9704400000',
    markers: [],
    polyline: [{
      points: [],
      color: "#CCCCCC",
      width: 10,
      dottedLine: true
    }],
    includePoints: [{
      latitude: 35.890723,
      longitude: 110.73842,
    }, {
      latitude: 35.890723,
      longitude: 120.73842,
    }],
    'show-compass': true,
    'include-points': [],
    carList: []
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
  onLoad () {
    qqmapsdk = new QQMapWX({
      key: 'QHWBZ-HC36J-OP6FG-KAWAP-AD3W6-BCBDC'
    });
    this.getCarInfo()
  },
  refresh() {
    this.getCarInfo()
  },
  getWeiXinInfo(carInfo, carIndex) {
    console.log(carInfo, 'carInffo')
    let that = this
    qqmapsdk.reverseGeocoder({
      sig: 'aGiWaOaTVM4hHZ4NnZW4GKBtLGQfKdSx',
      location: {
        latitude: carInfo.lt, 
        longitude: carInfo.lg
      },
      coord_type: 1,
      success: function (res) {
        console.log(res)
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
        that.setData({ markers: markers, latitude: res.result.location.lat, longitude: res.result.location.lng, recommend: res.result.formatted_addresses.recommend, currentCarTab: carIndex, currentCarNo:  carInfo.carNo})
      }
    })
  },
  getCarInfo() {
    let query = {}
    if (this.data.currentCarNo) {
      query.CarNo = this.data.currentCarNo
    }
    let that = this;
    DS.request({
      action: "app.transit.getLocationInfo",
      data: query
    }).then((res)=>{
      if (res.data.success) {
        let carList = res.data.data;
        let carInfo = carList[0]
        if (this.data.currentCarNo) {
          let oldCarList = this.data.carList
          oldCarList[this.data.currentCarTab] = carInfo
          this.setData({ carList: oldCarList, currentCarTab: this.data.currentCarTab })
        }else {
          this.setData({ carList: carList })
        }
        this.getWeiXinInfo(carInfo)
      }
    })
  },
  carClick(res) {
    let carInfo = res.currentTarget.dataset.carinfo;
    let carIndex = res.currentTarget.dataset.carindex || 0;
    this.getWeiXinInfo(carInfo, carIndex)
  }
})