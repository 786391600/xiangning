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
    loadingHidden:false
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
    var id=e.target.dataset.id;
    var title=e.target.dataset.title;
    wx.navigateTo({
      url: '../business/business?id='+id+'&title='+title
    })
  },
  getClassData:function(callback){
    var that=this;
    that.setData({loadingHidden:true});
    until.send({
      action:'app.telbook.getTelData',data:{}},
      function(response){
      if(response.data.success){
        that.setData({classData: response.data.data, loadingHidden: false});
        if (typeof callback === 'function') {
          callback();
        }
      }else{
        if (typeof callback === 'function') {
          callback();
        }
      }
    })
    // until.send({
    //   action: 'app.telbook.addTelList', data: { title:'酒店  火锅  饭店'}},function(response){
    //   // that.setData({classData:response.data.data});
    //   console.log(response)
    // })
  },
  onPullDownRefresh:function(){
    this.getClassData(function(){
      wx.stopPullDownRefresh()
    });
  }
})  