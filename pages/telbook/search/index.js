
var until = require('../../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'搜索中...'
    })
    this.search(options.content)
  },
  search:function(content){
    var that = this;
    until.send({
      action: 'app.telbook.searchTelList', data: { content: content }
    }, function (response) {
      if(response.data.data.length>0){
        that.setData({ classData: response.data.data }) 
      }else{
        
      }
       wx.hideLoading()
    })
  },
  listDataClick: function (e) {
    var id = e.currentTarget.dataset.id;
    var dataSet = e.currentTarget.dataset
    var title = dataSet.title;
    var details = dataSet.details ? JSON.stringify(dataSet.details) : '{}';
    var notice = dataSet.notice ? until.getArrData(dataSet.notice, 'string') : '{}';
    wx.navigateTo({
      url: '../business/business?id=' + id + '&title=' + title + '&details=' + details + '&notice=' + notice
    })
  },
  dailing:function(e){
    var phone = e.currentTarget.dataset.phone;
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
})