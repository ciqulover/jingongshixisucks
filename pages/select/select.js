const singleData = require('../../data/single')
const multipleData = require('../../data/multiple')
const app = getApp()

function shuffle(amount = 100, type) {
  const copy = Array.prototype.slice.call(type === 'singles' ? singleData : multipleData)
  const result = []
  while (amount--) {
    const rnd = Math.ceil(Math.random() * copy.length)
    const item = copy.splice(rnd, 1)[0]
    result.push(item)
  }
  return result
}

Page({
  data: {
    type: null,
    inputValue: null,
    max: null,
  },

  bindKeyInput: function (e) {
    this.setData({inputValue: e.detail.value})
  },

  onLoad(options) {
    const {type} = options
    if (type === 'allSingles' || type === 'allMultiples') {
      const newType = type === 'allSingles' ? 'singles' : 'multiples'
      app[newType] = {
        displayData: newType === 'singles' ? singleData : multipleData,
        correctIds: []
      }
      wx.redirectTo({
        url: `../${newType}/${newType}`
      })
      return
    }
    const max = type === 'singles' ? singleData.length : multipleData.length
    this.setData({type, max})
  },

  submit() {
    const {type, inputValue, max} = this.data
    if (inputValue == null) return wx.showModal({
      title: '你好像忘了啥',
      content: `输入个数字吧`,
      showCancel: false
    })
    const num = +inputValue
    if (isNaN(num)) return wx.showModal({
      title: '请按套路来',
      content: `输入个数字吧`,
      showCancel: false
    })
    if (num < 1) return wx.showModal({
      title: '请按套路来',
      content: `到底还想不想做题`,
      showCancel: false
    })
    if (num > max) return wx.showModal({
      title: '请按套路来',
      content: `毕竟一共才${max}题`,
      showCancel: false
    })
    app[type] = {
      displayData: shuffle(num, type),
      correctIds: []
    }
    wx.navigateTo({
      url: `../${type}/${type}`
    })
  }
})
