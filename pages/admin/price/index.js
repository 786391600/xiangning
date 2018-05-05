//index.js  
//获取应用实例 
var until = require('../../../utils/util.js');
Page({
  data: {
      startTime: new Date().getFullYear() + '-01-01',
      tabArr: {
        curHdIndex: 0,
        curBdIndex: 0
      },
      price:{
        name:'',
        price:'',
        com:''
      },
      pricename:{
        name:'名称',
        price:'价格',
        com:'单位',
        time:'时间'
      },
      super:{
        name:'',
        notice:''  
      },
      supername:{
        name:'超市名称',
        notice:'公告'
      },
      priceClassIndex:0,
      priceClassArr:[],
      priceLoding:false,
      superLoding:false
  },
  onLoad: function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var endTime = month>=12?(year+1)+'-01-01':year+'-12-31';
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    this.setData({date:year+'-'+month+'-'+day,endTime:endTime})
    this.getPriceClass() 
  },
  bindDateChange: function(e){
    var time = e.detail.value;
    console.log(time);
    this.setData({date:time});
  },
  priceSubmit: function(e) {
    if(this.data.priceLoding){
      return;
    }
    var that=this;
    var valueArr = e.detail.value;
    var nameArr = this.data.pricename;
    if(!until.validate(valueArr, nameArr)){
      return false;
    }
    this.setData({priceLoding:true})
    until.send({
      action:'app.price.addPrice',
      data:e.detail.value
    },function(response){
      if(response.data.success){
        wx.showToast({
          title: '添加成功！',
          icon: 'success',
          duration: 1000
        })
      }else{
        wx.showToast({
          title: '添加失败！',
          icon: 'none',
          duration: 1000
        })
      }
      that.setData({ priceLoding: false,price:{name: '', price: '', com: '' }})
    })
  },
  superSubmit:function(e){
    var that = this; 
    var valueArr = e.detail.value;
    var nameArr = this.data.supername;
    if (!until.validate(valueArr, nameArr)) {
      return false;
    }
    this.setData({superLoding: true })
    until.send({
      action: 'app.price.addPriceClass',
      data: e.detail.value
    }, function (response) {
      if (response.data.success) {
        wx.showToast({
          title: '添加成功！',
          icon: 'success',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '添加失败！',
          icon: 'none',
          duration: 1000
        })
      }
      that.setData({ superLoding: false,super:{name:'',notice:''}})
    })
  },
  getPriceClass:function(){
    /*获取priceclass*/
    var that = this;
    until.send({
      action: 'app.price.getPriceClass',
      data: {}
    }, function (response) {
      if (response.data.success) {
        that.setData({priceClassArr:response.data.data})
      }else{
        console.log(response.message)
      }
    })
  },
  setPriceConfig:function(e){
    console.log(e.detail.value)
    var sendData = e.detail.value;
    sendData.name='price';
    until.send({
      action: 'app.config.addConfig',
      data: sendData
    }, function (response) {
      if (response.data.success) {
        wx.showToast({
          title: '添加成功！',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  changePriceClass:function(e){
    this.setData({priceClassIndex:e.detail.value})
  },
  tab:function(e){
    var dataId = e.target.dataset.id;
    var obj = {};
    obj.curHdIndex = dataId;
    obj.curBdIndex = dataId;
    this.setData({
      tabArr: obj
    })
  }
})  