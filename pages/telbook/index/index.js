//index.js  
//获取应用实例 
var until=require('../../../utils/util.js');
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    searchStart:false,    
    winWidth: 0,
    winHeight:0, 
    currentTab: 0,
    classData:[],
    add:0,
    loadingHidden:false,
    page:1,
    loading:false
  },
  onReady: function () {
    this.getClassData()
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 滚动底部加载
  */
  phoneListBottom:function(e){
    console.log('滚动到底部了');
  },
  /**
   * 导航显示隐藏
   */
  classToggle:function(e){
    var data = e.target.dataset.toggle;
    var index=e.target.dataset.index;
    data=data?false:true;
    this.data.classData[index].toggle=data
    this.setData({
      classData:this.data.classData
    })
  },
  searchStart:function(){
   var that=this;
   that.setData({searchStart:true})
  },
  searchEnd:function(){
    var that=this;
    that.setData({searchStart:false});
  },
  listDataClick:function(e){
    var id = e.currentTarget.dataset.id;
    var dataSet = e.currentTarget.dataset
    var title=dataSet.title;
    var details =dataSet.details? JSON.stringify(dataSet.details):'{}';
    var notice = dataSet.notice ? until.getArrData(dataSet.notice,'string'):'{}';       
    wx.navigateTo({
      url: '../business/business?id=' + id + '&title=' + title +'&details='+details+'&notice='+notice
    })
  },
  getClassData:function(type,callback){
    var that=this;
    var page = this.data.page;
    if(that.data.loading){
      return
    }
    that.setData({loadingHidden:true});
    until.send({
      action:'app.telbook.getTelList',data:{page:page}},
      function(response){
      if(response.data.success){
        if (type === 'refresh') {
          var data = response.data.data
        } else {
          var data = response.data.data.length > 0 ? that.data.classData.concat(response.data.data) : that.data.classData
          if (response.data.data.length <=0){
            that.data.loading = true;
          }else{
            that.data.loading = false;
          }
        }
        that.setData({ classData: data, loadingHidden: false,loading:that.data.loading});
        if (typeof callback === 'function') {
          callback();
        }
      }else{
        if (typeof callback === 'function') {
          callback();
        }
      }
    },function(){
        that.setData({loadingHidden: false});
    })
  },
  onPullDownRefresh:function(){
    this.data.page = 1
    this.data.loading = false;
    this.getClassData("refresh",function(){
      wx.stopPullDownRefresh()
    });
  },
  /**
   * 滚动条到底部触发函数
   */
  onReachBottom: function () {
    this.data.page++;
    this.getClassData();
  },
  dailing: function(e) {
    var phone = e.currentTarget.dataset.phone;
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone
      })
    }
  }
})  