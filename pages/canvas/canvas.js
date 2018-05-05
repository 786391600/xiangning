//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    fontSize:14
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    
    var context = wx.createCanvasContext('can');
    //设置字体填充颜色
    context.setFillStyle('white')
    context.fillRect(0, 0, 320,1000)
    context.setFillStyle('black');
    context.setTextAlign('left');
    context.setFontSize('16');
    context.setTextBaseline('bottom');
    console.log(context);
    //从坐标点(50,50)开始绘制文字
    var url ='王涛章文章。章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章'
    var url1 ="  ddd";
   context.setLineWidth(100)
   wx.getImageInfo({
     src:'https://wtserver.duapp.com/aa.png',
     success:function(res){
       context.drawImage(res.path, 0, 48, 320,          160);
       wx.getImageInfo({
         src: 'https://wtserver.duapp.com/aa.png',
         success: function (res) {
           console.log(res);
           console.log('image');
           context.drawImage(res.path, 0, 500, 320, 500);
           context.fillText(url, 16, 16)
           context.fillText(url1, 16, 32);
           context.fillText(url1, 16, 208);
           context.draw();
         }
       })
     }
   })
    wx.getSystemInfo({
      success:function(res){
      console.log(res);
      }
    })
  },
  showImage:function(e){
    console.log(e.target)
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 320,
      height: 1000,
      destWidth: 960,
      destHeight: 3000,
      canvasId: 'can',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.previewImage({
          current: res.tempFilePath,
          urls: [res.tempFilePath],
          fail: function () {
            console.log('fail')
          },
          complete: function () {
            console.info("点击图片了");
          },
        })
      }
    })
  }
  ,
  drawText:function(t, x, y, w,obj) {
    var context=obj;
    var chr = t.split("");
    var temp = "";
    var row = [];

    context.font = "20px Arial";
    context.fillStyle = "black";
    context.textBaseline = "middle";

    for (var a = 0; a < chr.length; a++) {
      if (context.measureText(temp).width < w) {
        ;
      }
      else {
        row.push(temp);
        temp = "";
      }
      temp += chr[a];
    }

    row.push(temp);

    for (var b = 0; b < row.length; b++) {
      context.fillText(row[b], x, y + (b + 1) * 20);
    }
  },
  bindTextAreaBlur:function(e){
   var value=e.detail.value;
   var arr = [' 生命里，一些缱绻，无论素净，还是喧哗，都已经被岁s s s月赋予了清喜的味道，一些闲词，或清新，或淡雅，总会在某一个回眸的时刻醉了流年，濡湿了柔软的心，冥冥之中，我们沿着呼唤的风声，终于在堆满落花的秋里，再次重逢，念在天涯，心在咫尺，我相信，一米阳光，才是我们最好的距离。   ',' 缘起是诗，缘离是画，这些关于岁月，关于记忆的章节，终会被时光搁置在无法触及的红尘之外，曾经，你我一别经年，可风里，总有一段美丽会与我们不期而遇，一盏琉璃，半杯心悦，端然着那一份醉人的静，这安静行走的流年，总会被过往赋予一份清喜，一份浪漫。'];
   var strArr=[];
   for(var i=0;i<arr.length;i++){
     strArr.push(this.getStrArr(arr[i]));
   }
   console.log(strArr);
  this.getCanvasImg('preCan',strArr);
 
  },
  getStrArr:function(str){
    var w = 322;
    str = str.replace(/\s+/g, '');
    var fontWidth = this.data.fontSize;
    //每行多少个字
    var lineWith = w / fontWidth-2;
    //总共多少列
    var l = Math.ceil((str.length+2) / lineWith);
    var arr = [];
    for (var i = 0; i < l; i++) {
      if(i==0){
        var strWidth = (i + 1) * lineWith-2;
        var startStr=0;
      }else{
        if (i == 1) {
          var startStr = i * lineWith - 2;
        } else {
          var startStr = (lineWith - 2)+lineWith*(i-1);
        }
        strWidth = startStr + lineWith;
      }
      arr.push(str.substring(startStr,strWidth));
    }
    return arr;
  },
  getCanvasImg:function(id,arr){
    var fontSize=this.data.fontSize;
    var context = wx.createCanvasContext(id);
    //设置字体填充颜色
    context.setFillStyle('white')
    var canvasHeight=0;
   /* context.fillRect(0, 0, 320, arr.length*fontSize);
    this.setData({canvasHeight:arr.length*fontSize});*/
    for(var i=0;i<arr.length;i++){
      canvasHeight+=arr[i].length;
    }
    context.fillRect(0, 0, 320,canvasHeight * fontSize);
    this.setData({ canvasHeight: canvasHeight * fontSize });
    context.setFillStyle('black');
    context.setFontSize(fontSize);
    context.setTextBaseline('bottom');
   var lieHeight=1; 
   for(var i=0;i<arr.length;i++){
     for(var k=0;k<arr[i].length;k++){
       if(k==0){
         var x=fontSize*3;
       }else{
         var x=fontSize;
       }
       context.fillText(arr[i][k],x,lieHeight*fontSize);
       
       lieHeight+=1;
     }
   }
    /*for(var i=0;i<arr.length;i++){
      if(i==0){
        var x=fontSize*3;
      }else{
        var x=fontSize;
      }
      context.fillText(arr[i],x,(i+1)*fontSize);
    }*/
   context.draw();
   console.log('uuuuuu');
   this.getCanvasImg1('preCan', ['aaaaaaaaaaa', 'bbbbbbbbbbbbb']);
  },
  getCanvasImg1: function (id, arr) {
    var fontSize = this.data.fontSize;
    var context = wx.createCanvasContext(id);
    //设置字体填充颜色
   for(var i=0;i<arr.length;i++){
     context.fillText(arr[i],fontSize,fontSize*i);
   }
    context.draw(true);
  }
})

