
export function assembleQuery(args={}, urlStr='') {
    let paramStr = '';
    if(Object.keys(args).length !== 0){
        for(let k in args){
            paramStr += (k + '=' + args[k] + '&');
        }
        paramStr = paramStr.substring(0, paramStr.length-1);
    }

    // 拼接分页url
    if (urlStr === '' || urlStr === ' ' || urlStr === null){
        return paramStr;
    } else {
        if(urlStr.indexOf('?') < 0) {
            return urlStr + '?' + paramStr;
        } else {
            return urlStr + '&' + paramStr;
        }
    }
}