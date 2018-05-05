//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log)       {
        return {"time":util.formatTime(new Date(log))}
      })
    })
  }
})
