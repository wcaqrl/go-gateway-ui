
export class CacheUtil {

    setExpire(key, value, expire = null) {
        const currentTime = parseInt(Date.now() / 1000);
        let obj = {
            data: value,
            time: currentTime,
            expire: expire || 3600 * 24 * 30,
        };
        localStorage.setItem(key, JSON.stringify(obj));
    }

    getExpire(key) {
        let val = localStorage.getItem(key);
        if (!val) {
            return val;
        }
        const currentTime = parseInt(Date.now() / 1000);
        let res = JSON.parse(val);
        if (currentTime > parseInt(res.time) + parseInt(res.expire)) {
            localStorage.removeItem(key);
            return null;
        }
        return res.data;
    }

    getExpiration(key) {
        let val = localStorage.getItem(key);
        if (!val) {
            return null;
        }
        let res = JSON.parse(val);
        return parseInt(res.time) + parseInt(res.expire);
    }

}
