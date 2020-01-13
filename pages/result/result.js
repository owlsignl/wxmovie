Page({
    data: {
        result: []
    },
    onLoad() {
        let _self = this;
        const eventChannel = this.getOpenerEventChannel()
        eventChannel.on('acceptDataFromOpenerPage', function(data) {
            let value = data.value;
            var reqTask = wx.request({
                url: 'http://play8.top/yingshi/api.php',
                data: { wd: value },
                header: { 'content-type': 'application/json' },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    let data = result.data;
                    data = data.slice(1, -2);
                    let info = JSON.parse(data).info;
                    info = info.map((item, i) => {
                        var reqTask = wx.request({
                            url: 'http://play8.top/yingshi/api.php',
                            data: { flag: item.flag, id: item.id },
                            header: { 'content-type': 'application/json' },
                            method: 'GET',
                            dataType: 'json',
                            responseType: 'text',
                            success: (result) => {
                                let data = result.data;
                                data = data.slice(1, -2);
                                data = JSON.parse(data);
                                console.log(data);
                                let pic = data.pic;
                                let part = data.info[0].part;
                                let saveResult = _self.data.result;
                                saveResult[i] = {...saveResult[i], pic, part };
                                _self.setData({
                                    result: saveResult
                                })
                            },
                            fail: () => {},
                            complete: () => {}
                        });

                        return {
                            title: decodeURIComponent(item.title),
                            id: item.id,
                            flag: item.flag
                        }
                    })
                    _self.setData({
                        result: info
                    })
                    console.log(data);
                },
                fail: (error) => {
                    console.log(error);
                },
                complete: () => {}
            });
        })
    },
    openvideo(e) {
        let dataset = e.currentTarget.dataset;
        wx.navigateTo({
            url: '/pages/videoplay/videoplay',
            success: (result) => {
                result.eventChannel.emit('acceptDataFromOpenerPage', dataset);
            },
            fail: () => {},
            complete: () => {}
        });

    }
})