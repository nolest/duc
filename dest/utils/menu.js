/**
 * menu管理库
 */
function menu(options) {
  let control_type = options.control || '';
  let obj = options.obj || {};
  let index = options.index || 0;
  let s_cb = options.success || function () { };
  let f_cb = options.fail || function () { };
  let c_cb = options.complete || function () { };

  let menu_storage;
  wx.getStorage({
    key: 'menu',
    success: function (res) {
      console.log(res);
      let data = res.data;
      switch (control_type) {
        case 'add':
          if (JSON.stringify(obj) == '{}') {
            //空对象报错
            throw new Error('menu add obj should not be {}')
          }
          if (!obj.id) {
            //空id报错
            throw new Error('menu add obj.id should not be null')
          }
          //设置后再获取，保证一致
          data.push(obj);
          wx.setStorage({
            key: 'menu',
            data: data,
            success: function () {
              wx.getStorage({
                key: 'menu',
                success: function (resr) {
                  typeof s_cb == 'function' && s_cb(resr.data);
                }
              })
            }
          });
          break;
        case 'modify':
          if (JSON.stringify(obj) == '{}') {
            //空对象报错
            throw new Error('menu add obj should not be {}')
          }
          if (!obj.id) {
            //空id报错
            throw new Error('menu add obj.id should not be null')
          }
          if (!typeof index === 'number') {
            //空id报错
            throw new Error('menu del obj.index should not be null')
          }
          data[index] = obj;
          wx.setStorage({
            key: 'menu',
            data: data,
            success: function () {
              wx.getStorage({
                key: 'menu',
                success: function (resr) {
                  typeof s_cb == 'function' && s_cb(resr.data);
                }
              })
            }
          });
          break;
        case 'del':
          if (!typeof index === 'number') {
            //空id报错
            throw new Error('menu del obj.index should not be null')
          }
          data.splice(index, 1);
          wx.setStorage({
            key: 'menu',
            data: data,
            success: function () {
              wx.getStorage({
                key: 'menu',
                success: function (resr) {
                  typeof s_cb == 'function' && s_cb(resr.data);
                }
              })
            }
          });
          break;
        case 'clear':
          data = [];
          wx.setStorage({
            key: 'menu',
            data: data,
            success: function () {
              wx.getStorage({
                key: 'menu',
                success: function (resr) {
                  typeof s_cb == 'function' && s_cb(resr.data);
                }
              })
            }
          });
          break;
        case 'strick':
          let arr = [];
          let isin = false;
          for (let i in data) {
            for (let k in arr) {
              let list = [];
              if (arr[k].f_obj.id && arr[k].f_obj.id == data[i].id) {
                isin = true;
                break;
              }
              else {
                isin = false || isin
              }
            }
            if (isin) {
              for (let y in arr) {
                if (arr[y].f_obj.id == data[i].id) {
                  let list = arr[y].list;
                  arr[y].list = list.concat([data[i]])
                }
              }
              isin = false
            }
            else {
              let list = [];
              arr.push({
                f_obj: data[i],
                list: list.concat([data[i]])
              });
              isin = false
            }
          }

          let total = 0;
          let num = 0;
          let finish_total = 0;
          let finnish_num = 0;
          for (let x in arr) {
            finnish_num = finnish_num + arr[x].list.length;
            arr[x].num = arr[x].list.length;
            for (let z in arr[x].list) {
              total = total + arr[x].list[z].price
            }
            arr[x].total = total;
            finish_total = finish_total + total;
            total = 0;
          }
          finish_total = finish_total;
          typeof s_cb == 'function' && s_cb(arr, finish_total, finnish_num);
          break;
        default:
          typeof s_cb == 'function' && s_cb(res);
          break;
      }
    },
    fail: function (res) {
      wx.setStorage({
        key: 'menu',
        data: []
      })
      console.log(res);
      typeof f_cb == 'function' && f_cb(res);
    },
    complete: function (res) {
      typeof c_cb == 'function' && c_cb(res);
    }
  });
}


module.exports = {
  menu: menu
}
