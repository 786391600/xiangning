//index.js  
//获取应用实例 
var until = require('../../../utils/util.js');
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    classData: [],
    loadingHidden: false,
    className:'一级导航',
    classId:'',
    inputText:'',
    inputFocus:false
  },
  onLoad: function () {
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
  /**
   * 导航显示隐藏
   */
  classToggle: function (e) {
    var name=e.target.dataset.title;
    var id = e.target.dataset.id;
    if(id==='one'){
      this.setData({ className: '一级菜单', classId: '', inputFocus:true})
    }else{
      this.setData({ className: name, classId: id, inputFocus: true})
    }
  },
  listDataClick: function (e) {
    var id = e.target.dataset.id;
    var title = e.target.dataset.title;
    wx.navigateTo({
      url: '/pages/telbook/details/details?id=' + id + '&title=' + title
    })
  },
  getClassData: function (callback) {
    var that = this;
    if (that.loadingHidden) {
      return;
    }
    that.setData({ loadingHidden: true });
    until.send({
      action: 'app.telbook.getTelData', data: {}}, 
      function (response) {
      if (response.error) {
        that.getClassData()
      } else {
        that.setData({ classData: response.data.data });
        that.setData({ loadingHidden: false });
        if (typeof callback === 'function') {
          callback();
        }
      }
    })
  },
  onPullDownRefresh: function () {
    this.getClassData(function () {
      wx.stopPullDownRefresh()
    });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var name = e.detail.value.input;
    var that=this;
    var id=this.data.classId;
    if(!name){
     that.showToast('名称为空');
    }else{
    var sendData={title:name,_id:id};
    until.send({
      action: 'app.telbook.addTelList', data:sendData},function(response){
      if(response.data.success){
        that.showToast('提交成功');
        that.setData({ className: '一级菜单', classId: '',inputText:''})
      }else{
        that.showToast('名称失败');
      }
    })
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  showToast:function(title,icon,time){
    var title=title||'';
    var icon = icon || '';
    var time= time||1000;
    wx.showToast({
      title: title,
      icon: icon,
      duration: time
    })
  }
})  