var DS = require('../../utils/util.js')
Page({
  data: {
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
  onLoad () {
    
  },
  toCarInfo (res) {
    let data = res.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/maphandle/index?lineId='+ data.id + '&lineTitle=' + data.title
    })
  }
})