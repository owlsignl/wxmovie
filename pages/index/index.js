//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad(){
      wx.showLoading({
        title: '加载中',
      })
      this.render(this.data.tabid);
    },
    data: {
        tabid: 2,
        value: '',
        TabCur: 0,
      videoList: [],
        CustomBar: getApp().globalData.CustomBar,
        tabProject: [
          {
            name: "电视剧",
            id: 2
          },
          {
            name: "电影",
            id: 1
          },
          {
            name: "动漫",
            id: 4
          },
          {
            name: "综艺",
            id: 6
          },
          {
            name: "游戏",
            id: 8
          },
          {
            name: "纪录片",
            id: 3
          },
          {
            name: "娱乐",
            id: 7
          },
        ]
    },
    bindinput(e) {
      console.log(e);
        let detail = e.detail.value;
        this.setData({
            value: detail
        })
    },
    search(e) {
        let { value } = this.data;
        let _self = this;
        wx.navigateTo({
            url: '/pages/result/result',
            success: (result) => {
                result.eventChannel.emit('acceptDataFromOpenerPage', { value: _self.data.value });
            },
        })
    },
  tabSelect(e) {
    wx.showLoading({
      title: '加载中',
    })
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    this.render(type);
    this.setData({
      TabCur: id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  skipvideo(e){
    wx.navigateTo({
      url: '/pages/urlvideoplay/index',
      success: (result) => {
        result.eventChannel.emit('acceptDataFromOpenerPage', { url: e.currentTarget.dataset.url });
      },
    })
  },
  render(id){
    wx.request({
        url: 'https://pcw-api.iqiyi.com/search/video/videolists',
        data:{
          access_play_control_platform: 14,
          channel_id: id,
          data_type: 1,
          from: "pcw_list",
          mode: 24,
          pageNum: 1,
          pageSize: 100,
          site:"iqiyi",
          without_qipu:1
        },
    success:(res)=>{
      wx.hideLoading();
      console.log(res)
      this.setData({
        videoList: res.data.data.list
      })
    }
  })
  }
})