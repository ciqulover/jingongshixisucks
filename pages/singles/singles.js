const app = getApp()

Page({
  data: {
    hint: true,
    displayData: [],
  },
  radioChange: function (e) {
    const key = `displayData[${e.target.dataset.index}].selected`
    this.setData({[key]: e.detail.value})
  },
  switch(e) {
    this.setData({hint: e.detail.value})
  },
  onShow() {
    const {displayData, correctIds} = app.singles
    const wrongs = displayData.filter(function (row, index) {
      if (correctIds.indexOf(index) === -1) {
        row.selected = null
        return true
      }
    })
    this.setData({displayData: wrongs})
  },
  onLoad() {
    wx.showLoading({title: '解析数据中中', mask: true})
    const {displayData} = app.singles
    this.setData({displayData}, function () {
      wx.hideLoading()
    })
  },
  submit: function () {
    const data = this.data.displayData
    const correctIds = []
    data.forEach(function (row, index) {
      if (row.selected === null) return
      if (row.ans === +row.selected) correctIds.push(index)
    })
    app.singles = {
      displayData: data,
      correctIds
    }
    wx.navigateTo({
      url: `../result/result?type=singles`
    })
  },
  onShareAppMessage() {
    return {
      title: '苏州大学金工实习专版练习小程序',
      path: 'pages/nav/nav'
    }
  }
})
