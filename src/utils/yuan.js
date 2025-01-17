/**
 * 转化成RMB元字符串
 * @param value
 * @param digits 当数字类型时，允许指定小数点后数字的个数，默认2位小数
 */
// tslint:disable-next-line:no-any
export function yuan(value, digits= 2) {
  if (typeof value === 'number') {
    value = value.toFixed(digits);
  }
  return `&yen ${value}`;
}
