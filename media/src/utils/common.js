import axios from 'axios';
import qs from 'qs';

export const assign = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

//反解析序列化对象，$.param和sirialize()类似的数据
export const unparam = (str) => {
    let dataObj = {};
    if (str !== "") {
        let src = str.indexOf("?") === 0 ? str.substring(1, str.length) : str;
        let arr = src.split('&');
        for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split('=');
            dataObj[arr2[0]] = decodeURIComponent(arr2[1]);
        }
    }
    return dataObj;
};

export const toArray = (data) => {
    return Array.isArray(data) ? data : [data]
}

export const getScrollTop = () => {
    var scroll_top = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
    }
    else if (document.body) {
        scroll_top = document.body.scrollTop;
    }
    return scroll_top;
}

//颜色转换16进制转rgba
export function hex2Rgba(hex, opacity) {
    if (!hex) hex = "#2c4dae";
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + (opacity || "1") + ")";
}

// rgb转rgba
export function rgb2rgba(rgb = '', opacity = 1) {
    let rgbValue = rgb.replace(/rgb\((.+)\)/g, '$1');
    return `rgba(${rgbValue}, ${opacity})`
}

export function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        var r;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

// 查找下一个元素节点的兼容方案
export function getNextNode(el) {
    if (el.nextElementSibling !== undefined) {
        //IE9+,Chrome,firefox..
        return el.nextElementSibling;
    } else {
        var item = el.nextSibling;
        //IE8-
        while (item && item.nodeType != 1) {
            item = item.nextSibling;
        }
        return item;
    }
}

// 截流函数
export function throttle(cb, context) {
    clearTimeout(context.tid);
    context.tid = setTimeout(() => { cb() }, 30);
}

// 判断设备类型
export function isPC() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return !flag;
}

// axios默认参数配置
axios.defaults.baseURL = '/api/v0';
axios.defaults.timeout = 10000;
export const ajax = (option) => {
    let ajaxUrl = option.url+'?iSaJAx=isAjax';

    let ajaxMethod = option.method ? option.method.toLowerCase() : "get";
    var ajaxData = null;
    if (ajaxMethod === "get") {
        ajaxData = {
            params: option.data || {}
        }
    } else {
        ajaxData = {
            data: qs.stringify(option.data || {})
        }
    }
    return new Promise(function (resolve, reject) {
        axios({
            url: ajaxUrl,
            type: 'json',
            method: ajaxMethod,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            ...ajaxData
        }).then((res) => {
            if (res.status === 200) {
                resolve(res.data);
            } else {
                reject("fail: ", res);
            }
        }).catch((err) => {
            console.log("error: ", err);
            reject(err);
        });
    })
}
