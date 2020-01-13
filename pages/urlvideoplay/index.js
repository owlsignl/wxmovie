// pages/urlvideoplay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playsource:[],
    xlid: 0,
    jsid: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      var url = data.url;
      if(url.indexOf("https:") === -1){
        url = url.slice(0,4) + "s" + url.slice(4);
      }
      console.log(url);
      var reqTask = wx.request({
        url: 'http://play8.top/yingshi/api.php?url=' + url,
        success: (result) => {
          let data = result.data;
          data = data.slice(1, -2);
          data = JSON.parse(data).info;
          let playsource = [];
          data.forEach(function(it,i){
            let videolist = it.video;
            let list = videolist.map((item, index) => {
              let i = item.indexOf('$');
              return {
                index,
                source: item.slice(i + 1),
                text: item.slice(0, i)
              }
            })
            list.reverse();
            playsource.push(i);
            self.setData({
              ["result" + i]: list,
              ["source" + i]: list[0].source,
              playsource
            })
            if(i === 0){
              self.setData({
                result: list,
                source: list[0].source
              })
            }
          });
        }
      });
    })
  },
  selectxl(e){
    let id = e.currentTarget.dataset.id;
    this.setData({
      xlid:id,
      result: this.data["result" + id],
      source: this.data["source" + id]
    })
  },
  changeSource(e) {
    let dataset = e.currentTarget.dataset;
    let { source,id } = dataset;
    this.setData({
      source,
      jsid: id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})