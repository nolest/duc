// pages/edit_type/edit_type.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    re_temp: {
      "name": "",
      "description": "",
      "disable": false,
      "image": "",
      "typeId": "5ab22c730d2bcb53376f9f56",
      "price": '',
      "tags": []
    },
    temp: {
      "name": "",
      "description": "",
      "disable": false,
      "image": "",
      "typeId": "5ab22c730d2bcb53376f9f56",
      "price": '',
      "tags": []
    }
  },
  add(e) {
    let that = this;
    wx.showLoading({
      title: '发送中',
    })
    console.log(e);
    app.util.xh_request({
      url: app.globalData.domain + app.globalData.version + '/type/wechat/info',
      method: 'POST',
      data: {
        "name": that.data.temp_type
      },
      success: function (res) {

        console.log(res);
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function (res) {
        wx.hideLoading();
        that.get_type();
      }
    })
  },
  add_menu(e) {
    let that = this;
    wx.showLoading({
      title: '发送中',
    })
    console.log(e);
    app.util.xh_request({
      url: app.globalData.domain + app.globalData.version + '/food/wechat/info',
      method: 'POST',
      data: that.data.temp,
      success: function (res) {
        that.setData({
          temp:that.data.re_temp
        })
        console.log('插入成功');
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  get_type() {
    let that = this;
    wx.showLoading({
      title: '发送中',
    })
    app.util.xh_request({
      url: app.globalData.domain + app.globalData.version + '/type/wechat/list',
      method: 'GET',
      data: {
        "name": that.data.temp_type
      },
      success: function (res) {

        console.log(res);
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  get_menu(){
    let that = this;
    wx.showLoading({
      title: '发送中',
    })
    app.util.xh_request({
      url: app.globalData.domain + app.globalData.version + '/food/wechat/list/' + '5ab22c730d2bcb53376f9f56',
      method: 'GET',
      success: function (res) {

        console.log(res);
      },
      fail: function (res) {
        console.log(res);

      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  change: function (e) {
    let that = this;
    that.setData({
      temp_type: e.detail.value
    })
  },
  change_menu: function (e) {
    let that = this;
    let sett = e.currentTarget.dataset.set;
    let obj = that.data.temp;
    switch (sett) {
      case 'name': obj.name = e.detail.value; break;
      case 'des': obj.description = e.detail.value; break;
      case 'price': obj.price = e.detail.value; break;
      case 'tase': obj.tags.push(e.detail.value); break;
    }
    console.log(obj);
    that.setData({
      temp: obj
    })
    console.log(e);
    //let name = e.current
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.ready(
      function (res) {
        //本地缓存sessionId
        //that.fetch(true);
        that.get_type();
        that.get_menu();
        console.log(res);
      },
      function (res) {
        //报错
      })
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