/**
 * 二次封装请求函数，参数与wx.request一样
 */
let sessionId = '';
let shareId = '';
function setSession(id) {
  sessionId = id;
}
function setShare(id) {
  console.log('IDDDDDDD' + id);
  shareId = id;
}

function xh_request(options) {
  options = options || {};
  //页面栈处理
  let ref = getCurrentPages();
  let sent = {};
  let arr = [];
  for (let i = 0; i < ref.length; i++) {
    arr.push(ref[i].route + '/' + JSON.stringify(ref[i].options))
  }
  sent.paths = arr;
  sent.shareId = shareId;
  var default_params = {
    url: options.url,
    data: options.data || {},
    header: options.header || { 'Content-Type': 'application/json', 'sessionId': sessionId, 'TreeReferer': JSON.stringify(sent) || '' },
    method: options.method || 'GET',
    success: function (response) {
      typeof options.success == 'function' && options.success.call(this, response.data, response)
    },
    fail: function (response) {
      typeof options.fail == 'function' && options.fail.call(this, response.data, response)
    },
    complete: function (response) {
      typeof options.complete == 'function' && options.complete.call(this, response.data, response);
      options.page && options.page.setData({ global_fetching: false });
    }
  };

  options.page && options.page.setData({ global_fetching: true });

  if (options.promise) {
    return new Promise((resolve, reject) => {
      default_params.success = resolve;
      default_params.fail = reject;
      wx.request(default_params);
    })
  }
  else {
    wx.request(default_params)
  }
}

function settapbar(style) {
  let x_style = style || 'normal';
  switch (x_style) {
    case 'normal':
      wx.setTabBarStyle({
        color: '#666666',
        selectedColor: '#333333',
        backgroundColor: '#fff',
        borderStyle: 'white',
        success: function () {
          //console.log('succccc')
        },
        fail: function () {
          //console.log('failllll')
        }
      }); break;
    case 'play':
      wx.setTabBarStyle({
        color: '#fff',
        selectedColor: '#333333',
        backgroundColor: '#576ce9',
        borderStyle: 'black'
      }); break;
  }
}
module.exports = {
  xh_request: xh_request,
  settapbar: settapbar,
  setSession: setSession,
  setShare: setShare
}
