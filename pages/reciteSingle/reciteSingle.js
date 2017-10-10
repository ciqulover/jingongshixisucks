const singleData = require('../../data/single')

const correct = singleData.filter(row => !!row.ans)
const wrong = singleData.filter(row => !row.ans)

Page({
  data: {
    state: true,
    correct,
    wrong,
  },
  switch: function (e) {
    this.setData({state: e.detail.value})
  },
  onShareAppMessage() {
    return {
      title: '苏州大学金工实习专版练习小程序',
      path: 'pages/nav/nav'
    }
  }
})
