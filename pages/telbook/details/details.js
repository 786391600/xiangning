// pages/settled/settled.js
var until = require('../../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    title:'',
    imgUrl:null,
    array: ['婚纱', '餐饮', '超市', '健康'],
    index: 0,
    gonggao: [
      { title: '招聘', content: '急招一名服务员' },
      { title: '活动', content: '购买就送精美包装，方便送礼' },
      { title: '活动', content: '七夕节本店推出"浪漫情人节，唯爱一生不变"的活动将优惠进行到底，让浪漫与你同在' },
    ]
  },

  /**
   * 更换商家头像
   */
  imgupdate:function(){
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          imgUrl: tempFilePaths
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  /**
   * 选择分类
   */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
/**
 * 提交返回数据
 */
  formSubmit: function (e) {
    if (e.detail.value.businessname.length == 0) {
      wx.showToast({
        title: '商家名称不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (e.detail.value.Contacts.length == 0){
      wx.showToast({
        title: '联系人不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (e.detail.value.Telephone.length == 0) {
      wx.showToast({
        title: '联系电话不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (e.detail.value.Wechat.length == 0) {
      wx.showToast({
        title: '商家微信号不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (e.detail.value.address.length == 0) {
      wx.showToast({
        title: '商家地址不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    } else if (e.detail.value.introduce.length == 0) {
      wx.showToast({
        title: '商家介绍不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }else{
      let query = {id:this.data.id,details:e.detail.value}
      this.changeDetails(query,function(response){
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
      })
       //提交
    // wx.request({
    //   url: '',
    //   data: {
    //     businessname: e.detail.value.businessname,//商家名称
    //     Contacts: e.detail.value.Contacts,//联系人
    //     Telephone: e.detail.value.Telephone,//联系电话
    //     Wechat: e.detail.value.Wechat,//商家微信号
    //     address: e.detail.value.address,//商家地址
    //     classification: e.detail.value.classification,//选择分类
    //     introduce: e.detail.value.introduce//商家介绍
    //   },
    //   method: 'POST',
    //   success: function (requestRes) {
    //     that.setData({ submitHidden: true })
    //     appInstance.userState.status = 0
    //     wx.navigateBack({
    //       delta: 1
    //     })
    //   },
    // })
    }
  },
  changeDetails (data,callback) {
    let that = this;
    until.send({
      action: 'app.telbook.changeDetails', data: data
    },
      function (response) {
        if (response.error) {
          console.log(error)
        } else {
          if (typeof callback === 'function') {
            callback(response);
          }
        }
      })
  },
  typeUpdate: function (e) {
    var gonggao = this.data.gonggao;
    if (e.target.dataset.type == 'title') {
      gonggao[e.target.dataset.index].title = e.detail.value
    } else if (e.target.dataset.type == 'content') {
      gonggao[e.target.dataset.index].content = e.detail.value
    }
  },
  NoticeSubmit: function (e) {
    console.log(this.data.gonggao)
  },
  /**
   * 添加公告数据
   */
  addNotice: function () {
    var obj = { title: '', content: '' }
    var gonggao = this.data.gonggao;
    gonggao.push(obj);
    this.setData({
      gonggao: gonggao
    })
  },
  /**
   * 删除公告数据
   */
  NoticeDelete: function (e) {
    var gonggao = this.data.gonggao;
    gonggao.splice(e.target.dataset.index, 1);
    this.setData({
      gonggao: gonggao
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   if (options.id) {
     this.setData({id:options.id,title:options.title})
   }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})