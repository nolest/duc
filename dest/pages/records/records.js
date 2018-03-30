// pages/records/records.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    app.get_window_info(this);
    app.ready(
      function (res) {
        //本地缓存sessionId

        console.log(res);
      },
      function (res) {
        //报错
      })
  },
  fetch() {
    let that = this;
    wx.getStorage({
      key: 'menu',
      success: function (res) {
        that.setData({
          temp: res.data
        })
        that.strick();
      }
    })
  },
  strick() {
    let that = this;
    let d = that.data.temp;
    let arr = [];
    let isin = false;
    for (var i in d) {
      console.log(d[i])
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
    let that = this;
    that.sync_menu();
  },
  sync_menu :function(){
    let that = this;
    app.menu.menu({
      control: 'strick',
      obj: {},
      success: function (res, finish_total) {
        console.log(res, finish_total);
        that.setData({
          menu : res,
          finish_total: finish_total
        })
      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    });
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

  },
  clear: function (e) {
    let that = this;
    wx.removeStorage({
      key: 'menu',
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})