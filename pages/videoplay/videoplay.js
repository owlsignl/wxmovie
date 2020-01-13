Page({
    data: {
        result: [],
        source: '',
        jsid:0
    },
    onLoad() {
        const self = this;
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function(data) {
            var reqTask = wx.request({
                url: 'http://play8.top/yingshi/api.php',
                data: { flag: data.flag, id: data.id },
                header: { 'content-type': 'application/json' },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    let data = result.data;
                    data = data.slice(1, -2);
                    data = JSON.parse(data).info[0];
                    let videolist = data.video;
                    let list = videolist.map((item, index) => {
                        let i = item.indexOf('$');
                        return {
                            index,
                            source: item.slice(i + 1),
                            text: item.slice(0, i)
                        }
                    })
                    list.reverse();
                    self.setData({
                        result: list,
                        source: list[0].source
                    })

                },
                fail: () => {},
                complete: () => {}
            });
        })
    },
    changeSource(e) {
        let dataset = e.currentTarget.dataset;
        let { source,id } = dataset;
        this.setData({
            source,
            jsid:id
        })
    }
})