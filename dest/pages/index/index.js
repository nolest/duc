//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cart_id: 8827,
    temp: [],
    show_cart_fade: 0,
    total: {
      total_num: 0,
      total_price: 0
    }
  },
  //事件处理函数
  onLoad: function () {
    let that = this;
    app.get_window_info(this, { pic_cal: [750, 422] });
    app.ready(
      function (res) {
        //本地缓存sessionId
        that.fetch();
        console.log(res);
      },
      function (res) {
        //报错
      })
  },
  fetch() {
    let that = this;
    wx.showLoading({
      title: '发送中',
    })
    app.util.xh_request({
      url: app.globalData.domain + app.globalData.version + '/type/wechat/all',
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          fetch: res.data
        })
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  add_cart: function (e) {
    let that = this;
    let fid = e.currentTarget.dataset.fid;
    let cid = e.currentTarget.dataset.cid;
    let temp = that.data.temp;
    if (!that.data.fetch[fid].foods[cid].num) {
      that.data.fetch[fid].foods[cid].num = 1;
    }
    else {
      that.data.fetch[fid].foods[cid].num++;
    }

    temp.push(that.data.fetch[fid].foods[cid]);
    
    that.setData({
      temp: temp
    });
    
    that.fresh_total();
  },
  fresh_total: function () {
    let that = this;
    let total = {
      total_num: 0,
      total_price: 0
    }
    for (let i in that.data.temp) {
      if (that.data.temp[i].num) {
        total.total_num = total.total_num + that.data.temp[i].num
        total.total_price = total.total_price + that.data.temp[i].price
      }
    }
    that.setData({
      total: total
    })
  },
  open_cart : function(){
    let that = this;
    that.setData({
      show_cart_fade : 1
    })
  },
  close_cart:function(){
    let that = this;
    that.setData({
      show_cart_fade: 0
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changedes: function(e){
    let that = this;
    let temp = that.data.temp;
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    console.log(e);
    temp[index].description = e.detail.value
    that.setData({
      temp : temp
    })
  },
  del : function(e){
    let that = this;
    let temp = that.data.temp;
    let index = e.currentTarget.dataset.index;
    temp.splice(index, 1);
    that.setData({
      temp: temp
    });
    that.fresh_total();
  },
  choose_fin : function(e){
    let that = this;
    wx.setStorage({
      key:'menu',
      data: that.data.temp,
      success: function (res) {
        wx.switchTab({
          url:'/pages/records/records'
        })
      }
    })
  }
})
