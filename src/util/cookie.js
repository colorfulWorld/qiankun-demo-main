export function setCookie (name, value, day) {
    if (value) {
        const days = day
        const exp = new Date()
        // exp.setTime(exp.getTime() + days * 0.5 * 60 * 60 * 1000)
        exp.setTime(exp.getTime() + days * 30 * 60 * 1000) // 定义30分钟过期
        // 写入Cookie, toGMTString将格林威治时间转换成字符串
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
    }
}

export function getCookie (name) {
// 判断document.cookie对象里面是否存有cookie
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(name + '=')
        // 如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
        if (start !== -1) {
            start = start + name.length + 1
            let end = document.cookie.indexOf(';', start)
            if (end === -1) {
                end = document.cookie.length
            }
            return unescape(document.cookie.substring(start, end))
        }
    }
    return ''
}
