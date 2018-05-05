//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var DS = require('../../utils/util');
Page({
  data: {
    noTransiation:'没有评论，争当第一'
  },
  onLoad: function (data) {
    var that = this;
    var article = `<section class="_135editor" data-tools="135编辑器" data-id="91244">
    <section style="text-align:center;">
        <section style="display:inline-block;width:23px;">
            <img data-id="91244" data-role="guide-img" style="max-width: 100%; width: 23px; display: inline;" title="独自旅行  分割线" src="http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy91TjFMSWF2N29KaWN1NU9JbExuSDNzSWNlR3E3R3RpY095QUQ0Y2ZiYnpnM1AyWktORTk5dmM3S2duY0dmaWNEQjRVUDNmMWpzb3hrRThRVkdrZDBHbklFUS8wP3d4X2ZtdD1wbmc="/>
        </section>
    </section>
</section>
<section class="_135editor" data-tools="135编辑器" data-id="91240">
    <section style="padding: 0px; border: 0px none;" class="_135editor">
        <section style="padding: 10px;background-image: url(http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xbG9nby5jbi9tbWJpel9wbmcvdU4xTElhdjdvSjk2YWxpYTB3MnBGcGFqdUJpYWtlR0pLU2tISkM4dzRKV3VEQmRzVUxlRkppYWZsdmZBOGljb2pMd3pMOXNzZEk3Y25qeU5DbkcwbHRzZk5RLzA/d3hfZm10PXBuZw==);display: flex;display: -webkit-flex;background-size:100% auto">
            <section style="width: 50%;padding-right: 10px;border-bottom: 1px solid #333;" data-width="50%">
                <p class="135brush" data-brushtype="text" style="font-size: 20px">
                    美好的一天
                </p>
                <p>
                    2017.11.15
                </p>
                <section style="width: 80px;height: 4px;background-color: #a5e7f7;margin: 10px 0 20px"></section>
                <p style="line-height: 25px;font-size:14px">
                    有人说，云南是温婉的。是的，含蓄温婉，我喜欢这样的形容。婉约，这是一个容易令人心醉的词汇请原谅我的野心，我真的希望此行能有所收获。或者，我只想带回一些可以珍藏在心底的东西。
                </p>
            </section>
            <section style="width: 50%;padding: 8px 8px 8px 0;" data-width="50%">
                <section style="width: 100%; border: 0px none; padding: 0px;" class="_135editor" data-width="100%">
                    <section style="width: 100%;padding-bottom: 100%;background-image: url(http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xbG9nby5jbi9tbWJpel9wbmcvdU4xTElhdjdvSmljdTVPSWxMbkgzc0ljZUdxN0d0aWNPeUQwVldOam9lSkN4b1lldHFEalltZWliTnRBU2N5OXoyek03aWI1SjU1aGV0NGNpYUhFbmxXN1BEQS8wP3d4X2ZtdD1wbmc=);background-size: 100% 100%;background-repeat: no-repeat;" class="135bg" data-width="100%"></section>
                </section>
                <section style="width: 100%; border: 0px none; padding: 0px;" class="_135editor active" data-width="100%">
                    <section style="width: 100%;padding-bottom: 100%;margin-top:8px;background-image: url(http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xbG9nby5jbi9tbWJpel9wbmcvdU4xTElhdjdvSmljdTVPSWxMbkgzc0ljZUdxN0d0aWNPeU1XM1FiNU1uaWFqajFVQ2diT1NCVUNLTmdEQWlhNTZNcE5nTU9uZWZzYW5aU2JJTGRjRHFpYzJVdy8wP3d4X2ZtdD1wbmc=);background-size: 100% 100%;background-repeat: no-repeat;" class="135bg" data-width="100%"></section>
                </section>
            </section>
        </section>
    </section>
</section>
<section class="_135editor" data-tools="135编辑器" data-id="91239">
    <section style="text-align:center;">
        <section style="display:inline-block;width:144px;">
            <img data-id="91239" data-role="guide-img" style="max-width: 100%; width: 144px; display: inline;" title="旅行 心率图分割线" src="http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy91TjFMSWF2N29KaWN1NU9JbExuSDNzSWNlR3E3R3RpY095YlIzY3VSUFkyN252N1ZTSWdkc0RhYlphZmM3a2pSTGlickY5UVdpYjlNSTJMamFpYVc2V2FNMjZnLzA/d3hfZm10PXBuZw=="/>
        </section>
    </section>
</section>
<section class="_135editor" data-tools="135编辑器" data-id="91238">
    <section data-role="paragraph" class="_135editor" style="border: 0px none; padding: 0px;">
        <section style="width: 100%;background-image: url(http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xbG9nby5jbi9tbWJpel9wbmcvdU4xTElhdjdvSjk2YWxpYTB3MnBGcGFqdUJpYWtlR0pLU2tISkM4dzRKV3VEQmRzVUxlRkppYWZsdmZBOGljb2pMd3pMOXNzZEk3Y25qeU5DbkcwbHRzZk5RLzA/d3hfZm10PXBuZw==);background-size:100% auto" data-width="100%">
            <section style="width: 80%;margin: 0 auto;padding: 15px 0" data-width="80%">
                <img src="http://image2.135editor.com/cache/remote/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy91TjFMSWF2N29KaWN1NU9JbExuSDNzSWNlR3E3R3RpY095c0YxaG84QnhKUkFOa2FzWHRQTWlieUJMcmhCRXZWWE9WQ2hQNVZzRld3d0RUV21kOFMxcUVIdy8wP3d4X2ZtdD1wbmc=" alt="lx-01" style="width: 100%;display: block;" data-width="100%"/>
            </section>
            <section style="width: 87%;margin-left: 12%" data-width="87%">
                <section style="width: 100%;display: flex;display: -webkit-flex;align-items: center;" data-width="100%">
                    <section style="font-size: 20px" class="135brush" data-brushtype="text">
                        大理之行
                    </section>
                    <section style="width: 60%;text-align: center;line-height: 35px" data-width="60%">
                        2017.11.01
                        <section style="width: 60px;height: 1px;background-color: #333;margin: 0 auto"></section>2017.11.15
                    </section>
                </section>
                <section style="width: 80px;height: 4px;background-color: #a5e7f7"></section>
                <p style="line-height: 25px;padding: 10px 0 20px">
                    泼墨一隅山水与之相容，碧影涟漪回漾那一叶扁舟，古城旖旎风光依旧不瘦，迷路的人深爱憔悴夜色，小雨溺死在这片美丽的土地上，轻雾中那人匆匆焚香崇圣。
                </p>
            </section>
        </section>
    </section>
</section>
<p>
    <br/>
</p>`;
    WxParse.wxParse('article', 'html', article, that, 5);
    
    that.setData({name:data.name});
    // wx.getUserInfo({
    //   success: function (e) {
    //     DS.send({
    //       action: "app.user.validateUser",
    //       data: e.userInfo
    //     }, function (e) {
    //       console.log(e);
    //       console.log('hhhh');
    //     })
    //   }
    // })     
    DS.send({
      action:'app.getQRcode',
      data: {}
    },function(e){
      console.log(e);
      console.log('uuuuuu');
      DS.send({
        action:'app.getQR',
        data:{
          token: e.data.access_token,
          data: {scene:"wangtao",width:430}
        }
      },function(e){
        console.log(e);
        var aa=wx.arrayBufferToBase64(e.message);
        console.log(aa);
        console.log('yyyyyyyyyyyyyyyyyy');
      })
    })
    // wx.getWeRunData({
    //   success(e){
    //     DS.send({
    //       action: 'app.getRunData',
    //       data: e
    //     },(e)=>{
    //       console.log(e);
    //     })  
    //   }
    // })
  }
})

