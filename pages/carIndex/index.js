var DS = require('../../utils/util.js')
Page({
  data: {
    commonlyLine: {},
    lineList: [
      {
        title: '西坡',
        id: '1'
      },
      {
        title: '谭平',
        id: '2'
      },
      {
        title: '枣岭',
        id: '3'
      },
      {
        title: '师家滩',
        id: '4'
      },
      {
        title: '西交口',
        id: '5'
      },
      {
        title: '双鹤' ,
        id: '6'
      },
      {
        title: '关王庙',
        id: '7'
      },
      {
        title: '云丘山',
        id: '8'
      },
      {
        title: '管头',
        id: '9'
      },
      {
        title: '光华',
        id: '10'
      }
    ]
  },
  onShow () {
    let that = this
    let res = wx.getStorageSync('commonlyLine')
    console.log(res)
    if (res) {
      that.setData({ commonlyLine: JSON.parse(res) })
    }
  },
  toCarInfo (res) {
    let data = res.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/maphandle/index?lineId='+ data.id + '&lineTitle=' + data.title
    })
    let commonlyObj = { id: data.id, title: data.title }
    wx.setStorageSync('commonlyLine', JSON.stringify(commonlyObj))
  },
  telNumber () {
    wx.makePhoneCall({
      phoneNumber: '13934691550',
    })
  }
})