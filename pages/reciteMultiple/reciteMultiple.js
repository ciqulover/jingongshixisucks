const multipleData = require('../../data/multiple')

multipleData.forEach(row => {
  row.ansString = row.chs[row.ans]
})

Page({
  data: {
    displayData: multipleData
  },
  onShareAppMessage() {
    return {
      title: '苏州大学金工实习专版练习小程序',
      path: 'pages/nav/nav'
    }
  }
})
