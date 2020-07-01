// pages/components/radio-modal/inde.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioOptions: Array,
    title: String,
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    success: null,
    fail: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化 RadioModal 组件
    initRadioModal() {
      wx.ysShop = wx.ysShop || {}
      wx.ysShop.showRadioModal = (options) => {
        const { radioOptions, title, success, fail } = options
        this.setData({
          radioOptions, title, show: true, success, fail
        })
      }
    },

    selectClick(e) {
      const { success } = this.data
      let index = e.currentTarget.dataset.index
      this.data.radioOptions.forEach((item, ind) => {
        item.selected = false
        if (index == ind) {
          item.selected = true
        }
      })
      // this.setData({ radioOptions: this.data.radioOptions })
      success && success({ index, radioOptions: this.data.radioOptions })
      this.triggerEvent('radioSelected', { data: this.data.radioOptions, index }, {})
      this.setData({show: !this.data.show})
    },

    onCancel() {
      const {fail} = this.data
      fail && fail({
        msg: 'error'
      })
      this.triggerEvent('cancel', {}, {})
      this.setData({ show : !this.data.show})
    },

    /**
    * 弹出框蒙层截断touchmove事件
    */
    preventTouchMove: function () {
    },
  },
  lifetimes: {
    attached() {
      this.initRadioModal()
    }
  },
  pageLifetimes: {
    show() {
      this.initRadioModal()
    }
  }
})
