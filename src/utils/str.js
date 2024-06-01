
export function randStr(len=6) {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = len; i > 0; --i)
        result += str[Math.floor(Math.random() * str.length)];
    return result;
}

export function inArray(val, arr) {
    return arr.some(function (v) {
        return val === v;
    })
}

export function parseJWT(token) {
    if (!!token) {
        const strings = token.split(".");
        return JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
    }
    return {};
}
