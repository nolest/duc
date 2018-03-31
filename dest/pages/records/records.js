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
  sync_menu: function () {
    let that = this;
    app.menu.menu({
      control: 'strick',
      obj: {},
      success: function (res, finish_total, finish_num) {
        console.log(res, finish_total, finish_num);
        that.setData({
          menu: res,
          finish_total: finish_total,
          finish_num: finish_num
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
    wx.showModal({
      title: '提示',
      content: '确定要清除吗',
      showCancel: true,
      confirmColor: '#C80B0B',
      success: function (res) {
        if (res.confirm) {
          app.menu.menu({
            control: 'clear',
            success: function (res, finish_total, finish_num) {
              that.sync_menu();
            },
            fail: function (res) {

            },
            complete: function (res) {

            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  lock : function(e){
    let that = this;
  },
  clear : function(e){
    let that = this;
  },
  nav_index: function (e) {
    let that = this;
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  tap_check: function (e) {
    let that = this;
    let temp = that.data.menu;
    let fid = e.currentTarget.dataset.fid;
    let cid = e.currentTarget.dataset.cid;
    let local = e.currentTarget.dataset.local;
    console.log(fid,cid);
    console.log(local);

    app.menu.menu({
      control: '',
      success: function (res) {
        console.log(res);
        let obj,x;
        for(let k in res.data){
          if (res.data[k].local_id == local){
            obj = res.data[k];
            x = k;
            break;
          }
        }
       
        obj.check = obj.check?false:true;

        app.menu.menu({
          control: 'modify',
          index: x,
          obj: obj,
          success: function (resr) {
            
            app.menu.menu({
              control: 'strick',
              obj: {},
              success: function (resp, finish_total, finish_num) {
                console.log(resp, finish_total, finish_num);

                that.setData({
                  menu: resp,
                  finish_total: finish_total,
                  finish_num: finish_num
                })
              },
              fail: function (resp) {

              },
              complete: function (resp) {

              }
            });


          },
          fail: function (resr) {

          },
          complete: function (resr) {

          }
        });

      },
      fail: function (res) {

      },
      complete: function (res) {

      }
    });

  }
})