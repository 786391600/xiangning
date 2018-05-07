// pages/business/business.js
var until = require('../../../utils/util.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{},
    name:'宠宠福利社',//商家店名
    introduce: '本店内所有龙猫用品均为本人自己制作，手工厕所、跳板 木窝（材质为杉木）、冰窝、栈道（材质为杨木）等用品。常规板子厚度均在1.7cm左右。各种尺寸可随意定做。',//商家介绍
    gonggao:[
       {lx:'招聘', gg:'急招一名服务员'},
       {lx:'活动', gg: '购买就送精美包装，方便送礼'},
       { lx: '活动', gg: '七夕节本店推出"浪漫情人节，唯爱一生不变"的活动将优惠进行到底，让浪漫与你同在' },
    ],//商家公告
    phonecall: '13934691550',//商家电话
    time:'08:00-20:00',//营业时间
    dizhi:'武汉光谷西班牙风情街C2101（肯德基楼上）',//商家地址
    animation: '',
    animation1: '',
    jiajian:'block',
    image: '',
    flexNavState: true,
    zhezhaoState:false,
    wxid:'123123',
    block:'none',
    bgurl:'http://i4.bvimg.com/644269/b1373666854749d3.jpg'
  },
  /**
   * 页面跳转
   */
  flexNavAnimate: function() {
    let height = this.data.flexNavState ? "330rpx": '0rpx';
    let state = !this.data.flexNavState
    this.animation1.height(height).step()
    
    this.setData({
      //输出动画
      animation1: this.animation1.export(),
      flexNavState:state
    })
  },
  details: function () {
    wx.navigateTo({
      url: '../detailsupdate/detailsupdate'
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
    if (options.scene){
      var scene = decodeURIComponent(options.scene)
      this.getDetailData({ id: options.id })
    }
    if (options.details !='undefined'){
      let details = JSON.parse(options.details)
      console.log(details)
      console.log('hhhhgggg')
      this.setData({ id: options.id, details: details })
    }
  }, 
  onShow(e) {
   
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
    }),
    this.animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
        delay: 100,
        transformOrigin: 'left top 0',
        success: function (res) {
          console.log(res)
        }
      });
    let that= this;
    wx.getImageInfo({
      src: that.data.bgurl,
      success: function (res) {
        if (res.width == 200 && res.height == 200) {
          that.setData({
            bgurl: 'http://i4.bvimg.com/644269/b1373666854749d3.jpg'
          })
        }
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
      imageUrl: this.data.image,
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
    if (this.data.flexNavState) {
      this.flexNavAnimate()
    }
    this.setData({
      //输出动画
      animation: this.animation.export(),
      zhezhaoState:true
    })
  },
  yc: function () {
    this.animation.opacity(0).height('0%').step()
    if (!this.data.flexNavState) {
      this.flexNavAnimate()
    }
    this.setData({
      //输出动画
      animation: this.animation.export(),
      zhezhaoState: false
    }) 
  },
  /**
 * 分享自定义图片
 */
  imgupdate: function () {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          image: tempFilePaths[0]
        })
      },
    })
  },
  /**
   * 剪切板
   */
  jianqie:function(){
    wx.setClipboardData({
      data: this.data.wxid,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
    this.setData({
      block: 'none'
    })
  },
  /**
   * 微信号显示影藏
   */
  block:function(){
    this.setData({
      block:'block'
    })
  },
  none:function(){
    this.setData({
      block:'none'
    })
  },
  getDetailData:function(data,callback){
    var that = this;
    until.send({
      action: 'app.telbook.getDetails', data: data
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
  }
})
