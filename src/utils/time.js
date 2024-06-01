
export class TimeUtil {

  // 去掉首尾空格 replace(/(^\s*)|(\s*$)/g, "")

  // 时间格式化
  // 参数 time_stamp 是10位的时间戳
  timetrans(time_stamp) {
    const dtime = new Date(time_stamp * 1000);// 如果date为10位需要乘1000
    const Y = dtime.getFullYear() + '-';
    const M = (dtime.getMonth() + 1 < 10 ? '0' + (dtime.getMonth() + 1) : dtime.getMonth() + 1) + '-';
    const D = (dtime.getDate() < 10 ? '0' + (dtime.getDate()) : dtime.getDate()) + ' ';
    const h = (dtime.getHours() < 10 ? '0' + dtime.getHours() : dtime.getHours()) + ':';
    const m = (dtime.getMinutes() < 10 ? '0' + dtime.getMinutes() : dtime.getMinutes()) + ':';
    const s = (dtime.getSeconds() < 10 ? '0' + dtime.getSeconds() : dtime.getSeconds());
    return Y + M + D + h + m + s;
  }


  // 倒计时函数
  // @param string time_string 字符串格式的时间
  // @param int last_time 持续时间（单位：秒）
  // @return array time_array [时间,天,时,分,秒],时间是微秒为单位的值,天,时,分,秒值已经过左侧0补位

  recTime(time_string, last_time) {
    // 声明一个数组，按顺序存放时间的 天,时,分,秒
    let time_array = [];
    const l_time = last_time;
    // 将日期中的'-'转成'/',兼容iOS系统
    const shijian = time_string.replace(/-/g, '/');
    const endTime = new Date(shijian);
    const nowTime = new Date();
    const t = endTime.getTime() + l_time * 1000 - nowTime.getTime();
    // 如果已超时（即时间差为负数），则将t置为0;
    const tstr = t < 0 ? 0 : t;

    const d = Math.floor(t / 1000 / 60 / 60 / 24);
    const dstr = d < 10 ? ('0' + d) : d;
    const h = Math.floor(t / 1000 / 60 / 60 % 24);
    const hstr = h < 10 ? ('0' + h) : h;
    const m = Math.floor(t / 1000 / 60 % 60);
    const mstr = m < 10 ? ('0' + m) : m;
    const s = Math.floor(t / 1000 % 60);
    const sstr = s < 10 ? ('0' + s) : s;

    time_array = [tstr, dstr, hstr, mstr, sstr];
    return time_array;
  }


  getDate() {
    const dtime = new Date();
    const year   = dtime.getFullYear().toString();
    const month  = dtime.getMonth() + 1 < 10 ? '0' + (dtime.getMonth() + 1).toString() : (dtime.getMonth() + 1).toString();
    const theDay = dtime.getDate() < 10 ? '0' + dtime.getDate().toString() : dtime.getDate().toString();
    const hour   = dtime.getHours() < 10 ? '0' + dtime.getHours().toString() : dtime.getHours().toString();
    const minute = dtime.getMinutes() < 10 ? '0' + dtime.getMinutes().toString() : dtime.getMinutes().toString();
    const second = dtime.getSeconds() < 10 ? '0' + dtime.getSeconds().toString() : dtime.getSeconds().toString();
    return {
      'year': year,
      'month': month,
      'day': theDay,
      'hour': hour,
      'minute': minute,
      'second': second,
      'week': dtime.getDay()
    };
  }


}
