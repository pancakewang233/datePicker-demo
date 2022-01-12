import Vue from 'vue'
import dayjs from 'dayjs'

// 时间选择器 - 输入格式转换
const dataPicker = Vue.directive('dateFormat', {
  inserted: function (el, binding, vnode) {
    const {value: _obj} = binding
    const {context: _this, data, componentInstance: temp} = vnode
    const {expression: key} = data.model
    let arr = []

    if (_this && _this._isVue) {
      let tmp = el.getElementsByTagName('input')
      const $this = tmp[0]
      const $this2 = tmp[1]
      // 判断是范围的还是单个独立的日期时间控件，范围的两个输入框都要绑定change事件
      if (tmp.length > 1) {
        $this.addEventListener('change', function () {
          let value = $this.value
          modelValue(value, 2);
        })
        $this2.addEventListener('change', function () {
          let value = $this2.value
          modelValue(value, 2);
        })
      } else {
        $this.addEventListener('change', function () {
          let value = $this.value
          modelValue(value, 1);
        })
      }
    }

    const modelValue = function (value, len) {

      let brr = value.split('')
      // 判断日期组件输入可能会出现的符号
      let typeList = [',', '.', '-', '，', '。', '/', '、',':','：']
      let canTyped
      for (let i = 0; i < typeList.length; i++) {
        if (brr.indexOf(typeList[i]) >= 0){
          canTyped = true
          break
        }else{
          canTyped = false
          continue
        }
      }

      // 不会正则，简单粗暴map循环去掉特殊符号
      if (canTyped) {
        let obk = brr.map(item =>{
          for (let i = 0;i<typeList.length;i++){
            item !== typeList[i]
          }
          return item
        }).join('')
        replaceTime(obk)
      } else {
        replaceTime(value)
      }

      // 判断输入的时间为几位数，正则匹配相应的事件格式。可直接采用dayjs转换,更直接。
      function replaceTime(value){
        if (value.length > 5 && value.length < 9) {
          value = value.replace(/^(\d{4})\D*(\d{1,2})\D*(\d{1,2})\D*/, '$1-$2-$3') // 格式化输入格式,2021-03-01
        } else if (value.length > 9 && value.length < 13) {
          value = value.replace(/^(\d{4})\D*(\d{1,2})\D*(\d{1,2})\D*(\d{1,2})\D*(\d{1,2})\D*/, '$1-$2-$3 $4:$5') // 格式化输入格式,2021-03-01 09:50
        } else if (value.length > 12) {
          value = value.replace(/^(\d{4})\D*(\d{1,2})\D*(\d{1,2})\D*(\d{1,2})\D*(\d{1,2})\D*(\d{1,2})\D*/, '$1-$2-$3 $4:$5:$6') // 格式化输入格式,2020-03-01 09:50:30
        } else {
          return false
        }
      }

      const time = value && value.constructor === String ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : value  // 转换时间格式
      let keys = key.split('.')
      if (arr.length === len) {
        arr = [];
      }
      arr.push(time)
      // el-date-picker有几种type, 判断指令是否有传值，是否有传数组的名称跟索引值，原因：转换出来的时间控件_this[key1][key2]取不到绑定的相关值
      if (temp.type === 'date') {
        let drr = key.split('.')
        let key1 = drr[0]
        let key2 = drr[1]
        drr.length === 1 ? _this[key] = time : _this[key1][key2] = time
      } else {
        if (!_obj) {
          // 处理简单的绑定
          if (keys && keys.length >= 2) {
            const [key1, key2, key3, key4] = keys
            if (key4) {
              _this[key1][key2][key3][key4] = len === 2 ? arr : time;
            } else if (key3) {
              _this[key1][key2][key3] = len === 2 ? arr : time;
            } else {
              _this[key1][key2] = len === 2 ? arr : time;
            }
          } else {
            _this[key] = len === 2 ? arr : time;
          }
        } else {
          // 处理循环中的时间控件绑定，需要传值，再去相应的数组中查找相应的字段赋值
          let objKey = _obj.obj.split('.')
          if (objKey && objKey.length >= 2) {
            // 解构赋值
            const [flag1, flag2, flag3, flag4] = objKey;
            // _obj.index：索引，_obj.modelName：绑定的字段名
            if (flag4) {
              _this[flag1][flag2][flag3][flag4][_obj.index][_obj.modelName] = len === 2 ? arr : time;
            } else if (flag3) {
              _this[flag1][flag2][flag3][_obj.index][_obj.modelName] = len === 2 ? arr : time;
            } else {
              _this[flag1][flag2][_obj.index][_obj.modelName] = len === 2 ? arr : time;
            }
          } else {
            _this[objKey][_obj.modelName] = len === 2 ? arr : time;
          }
        }
      }
    };
  }
})

export default dataPicker;
