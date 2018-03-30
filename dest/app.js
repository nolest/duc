//app.js
var util = require('/utils/util.js');
var menu = require('/utils/menu.js');
var db = '-test';//-test';
App({
  db: db,
  util: util,
  menu: menu,
  get_window_info: function (page, ext) {
    var that = this;
    //获取当前页面的窗口信息，在每个page 调用
    wx.getSystemInfo({
      success: function (res) {
        //console.log(ext);
        res.ext = ext || {};
        if (ext && ext.pic_cal) {
          res.ext.pic_res = Math.floor(res.windowWidth / ext.pic_cal[0] * ext.pic_cal[1]);
        }
        else {

        }
        console.log(res);
        page.setData({
          window: res
        })
      }
    })
  },
  onLaunch: function (op) {
    let that = this;
    console.log(op);
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      }
    })
  },
  ready: function (cb, cb2) {
    var that = this;
    that.get_app_session(cb, cb2);
  },
  update_user: function () {

  },
  onShow: function (op) {

  },
  get_app_session: function (cb, cb2) {
    var that = this;
    if (that.globalData.app_session) {
      //已获取登录状态
      typeof cb == "function" && cb(that.globalData)
    } else {
      console.log('!inn')
      wx.login({
        success: function (data) {
          that.code = data.code;
          var code = data.code;
          var encryptedData = '';
          var iv = '';
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
          })
          wx.getUserInfo({
            withCredentials: true,
            lang: 'zh_CN',
            success: function (resr) {
              // success
              console.log(resr);
              that.globalData.userInfo = resr.userInfo;
              encryptedData = resr.encryptedData;
              iv = resr.iv;
              wx.request({
                url: that.globalData.domain + that.globalData.version + '/user/wechat/login',
                data: {
                  encryptedData: encryptedData,
                  iv: iv,
                  code: code
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res_2) {
                  console.log('ABC')
                  console.log(res_2)
                  that.globalData.app_session = res_2.data.data.sessionId;
                  that.globalData.bindNumber = res_2.data.data.bindNumber;
                  that.globalData.userId = res_2.data.data.userId;
                  that.util.setSession(res_2.data.data.sessionId);
                  //that.globalData.account_type = res_2.data.result_data.result_data.result;//2
                  //that.globalData.cellphone = res_2.data.result_data.result_data.cellphone;
                  //that.globalData.yue_login_id = res_2.data.result_data.result_data.user_id;

                  typeof cb == "function" && cb(that.globalData);
                  //荣少说 无用就不要管了 union_id 用于绑定手机
                  //that.session_check(that.globalData.app_session);
                }
              })
            },
            fail: function (resr) {
              // fail
              wx.showModal({
                title: '微信授权失败',
                content: '请点击「确定」>「设置」中打开「用户信息」，令小程序获得授权。如您有任何问题，请直接勾搭客服吧！',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (ress) => {
                        /*
                         * res.authSetting = {
                         *   "scope.userInfo": true,
                         *   "scope.userLocation": true
                         * }
                         */
                        console.log(ress);
                        wx.reLaunch({
                          url: '/pages/index/index'
                        })
                      }
                    })
                  } else if (res.cancel) {
                  }
                }
              })
            },
            complete: function (resr) {
              // complete

            }
          })
        },
        fail: function (res) {
          // fail
          typeof cb2 == "function" && cb2(that.globalData);
        },
        complete: function (res) {
          // complete
          wx.hideToast();
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    domain: 'https://duc' + db + '.starsriver.cn/',//'https://readygo-test.starsriver.cn/'
    version: 'v1.0',
    navigateback_record: {
      id: ''
    },
    normal_share: function () {
      return {
        title: '都城',
        path: '/pages/index/index',
        imageUrl: ''
      }
    }
  },
  navigateTo: function (page, options) {
    //全局跳转函数
    var url = options.url || '',
      page = page || {},
      success = options.success || function () { },
      fail = options.fail || function () { },
      complete = options.complete || function () { };

    if (!page.data.navigating) {
      wx.navigateTo({
        url: url,
        success: function (e) {
          console.log(e);
          if (typeof success == 'function') { success.call(page, e) }
        },
        fail: function (e) {
          if (typeof fail == 'function') { fail.call(page, e) }
        },
        complete: function (e) {
          if (typeof complete == 'function') { complete.call(page, e) }
        }
      })
    }
    page.setData({
      navigating: true
    })
    setTimeout(function () {
      page.setData({
        navigating: false
      })
    }, 1000)
  },
  redirectTo: function (page, options) {
    var url = options.url || '',
      page = page || {},
      success = options.success || function () { },
      fail = options.fail || function () { },
      complete = options.complete || function () { };

    if (!page.data.redirecting) {
      wx.redirectTo({
        url: url,
        success: function (e) {
          console.log(e);
          if (typeof success == 'function') { success.call(page, e) }
        },
        fail: function () {
          if (typeof fail == 'function') { fail.call(page, e) }
        },
        complete: function (e) {
          if (typeof complete == 'function') { complete.call(page, e) }
        }
      })
    }
    page.setData({
      redirecting: true
    })
    setTimeout(function () {
      page.setData({
        redirecting: false
      })
    }, 1000)
  },
  onHide: function () {

  }
})