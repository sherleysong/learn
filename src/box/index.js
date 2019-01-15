    import box from './box.js'

    // 实例化box对象
    const mybox = new box({
        // 传参 
        id: 'test001',
        title: 'title',
        // width: '100%',
        text: 'message',
        buttons: {
            '1' : {
                'txt' : 'cancel',
                'func': "console.log('cancel')"
            },
            '2' : {
                'txt' : 'ok',
            },
        }
    });

    // 此处和页面元素test1有关
    document.getElementById('test1').onclick = function() {
        mybox.open();
    }

    // 覆盖alert全局方法
    window.alert = function(str){
        new box({
            text : str 
        }).open()
    }