/**
 * system status管理库
 */
function status(options) {
  let control_type = options.control || '';
  let s_cb = options.success || function () { };
  let f_cb = options.fail || function () { };
  let c_cb = options.complete || function () { };


  wx.getStorage({
    key: 'status',
    success: function (res) {
      console.log('get status')
      console.log(res);
      switch (control_type) {
        case 'unlock':
          wx.setStorage({
            key: 'status',
            data:
            {
              'lock': false
            },
            success: function () {
              wx.getStorage({
                key: 'status',
                success: function (resr) {
                  typeof s_cb == 'function' && s_cb(resr.data);
                }
              })
            }
          });
          break;
        case 'lock':
          wx.setStorage({
            key: 'status',
            data:
            {
              'lock': true
            },
            success: function () {
              wx.getStorage({
                key: 'status',
                success: function (resr) {
                  typeof s_cb == 'function' && s_cb(resr.data);
                }
              })
            }
          });
          break;
        default:
          typeof s_cb == 'function' && s_cb(res);
          break;
      }
    },
    fail: function (res) {
      wx.setStorage({
        key: 'status',
        data:
        {
          'lock': false
        }
      })
      console.log(res);
      typeof f_cb == 'function' && f_cb(res);
    }
  })
}


module.exports = status
