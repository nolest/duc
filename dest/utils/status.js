/**
 * system status管理库
 */
function status(options) {
  let control_type = options.control || '';
  let obj = options.obj || {};
  let index = options.index || 0;
  let s_cb = options.success || function () { };
  let f_cb = options.fail || function () { };
  let c_cb = options.complete || function () { };

  wx.getStorage({
    key: 'status',
    success: function (res) { },
    fail: function (res) {
      wx.setStorage({
        key: 'status',
        data: 
        {
          'lock' : false
        }
      })
      console.log(res);
      typeof f_cb == 'function' && f_cb(res);
    }
  })
}


module.exports = status
