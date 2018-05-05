// pages/business/business.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'乡宁二中桥饸饹',//商家店名
    introduce:'致力为消费者提供高品质食品',//商家介绍
    gonggao:[
       {lx:'招聘', gg:'我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告'},
       {lx:'活动', gg: '我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告我是公告'},
    ],//商家公告
    phonecall: '13934691550',//商家电话
    time:'08:00-20:00',//营业时间
    dizhi:'乡宁二中桥',//商家地址
    dis:'block',//背景消失出现
    animation: ''
  },
  /**
   * 页面跳转
   */
  settled: function () {
    wx.navigateTo({
      url: '../settled/settled'
    })
  },

  /**
   * 打电话
   */
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.phonecall
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }, onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 500,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'ease',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left top 0',
      success: function (res) {
        console.log(res)
      }
    })
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
  onShareAppMessage: function (res) {
    return {
      title: this.data.name,  // 转发标题（默认：当前小程序名称）
      path: '/pages/business/business?id=', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
      imageUrl: "http://img.itc.cn/saapic/a/20472198.gif",
      success(e) {
        // shareAppMessage: ok,
        // shareTickets 数组，每一项是一个 shareTicket ，对应一个转发对象
        // 需要在页面onLoad()事件中实现接口
        wx.showShareMenu({
          // 要求小程序返回分享目标信息
          withShareTicket: true
        });
      },
      fail: (e) => {
        console.log("转发失败", e);
      },
    }
  },
  /**
   * 动效
   */
  chuxian: function () {
    this.animation.opacity(0.98).height('100%').step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
  yc: function () {
    this.animation.opacity(0).height('0%').step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },
})