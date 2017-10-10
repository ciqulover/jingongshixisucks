const app = getApp()

Page({
  data: {},
  navTo: function (event) {
    const page = event.target.dataset.page
    if (page.indexOf('recite') === -1) {
      wx.navigateTo({
        url: `../select/select?type=${page}`
      })
      return
    }
    wx.navigateTo({
      url: `../${page}/${page}`
    })
  },
  toAbout() {
    wx.navigateTo({
      url: `../about/about`
    })
  },
  onShareAppMessage() {
    return {
      title: '苏州大学金工实习专版练习小程序',
      path: 'pages/nav/nav'
    }
  }
})


