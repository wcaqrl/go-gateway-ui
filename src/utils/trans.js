
export class TransUtil {


  getDeleteMap() {
    return {
      0: '可用',
      1: '已删除',
      2: '待删除',
    }
  }

  getDeleteText(isDelete) {
    const deleteMap = this.getDeleteMap()
    return deleteMap[isDelete] ? deleteMap[isDelete] : '未知';
  }

  getDeleteColor(isDelete) {
    const deleteMap = {
      0: '#53c41a',
      1: '#f5212d',
      2: '#fbae14',
    }
    return deleteMap[isDelete] ? deleteMap[isDelete] : '#a14d22';
  }


}
