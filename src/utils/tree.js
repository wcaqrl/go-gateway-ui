/**
 * 树形结构菜单过滤
 */
export function clean_tree(arr, keys={}){
  const tree = [];
  if(Object.keys(keys).length > 0) {
    for (const i in arr) {
      const tmp = {
        children: undefined,
      };

      for (const k in keys) {
        if (arr[i].hasOwnProperty(keys[k])) {
          tmp[k] = arr[i][keys[k]];
        }
      }

      if (arr[i].hasOwnProperty('children') && (arr[i].children.length) > 0) {
        tmp.children = clean_tree(arr[i].children, keys);
      }/*else{
        tmp['isLeaf'] = true;
      }*/
      // delete arr[i]['pid'];
      tree.push(tmp);
    }
  }
  return tree;
}

export function find_menu(arr, key, val) {
  let result = null;
  for (const i in arr) {
    if (arr[i][key] === val) {
      result = arr[i];
      break;
    }
    if (!result) {
      if (arr[i].hasOwnProperty('children')) {
        result = find_menu(arr[i].children, key, val);
      }
    }
  }
  return result;
}


export function menu_init(arr, ids) {
  for (const i in arr) {
    arr[i].titleSelected = false;
    arr[i].subSelected = false;
    for (let j = 0; j < ids.length; j++) {
      if (arr[i].id === ids[j]) {
        j === 0 ? arr[i].titleSelected = true : arr[i].subSelected = true;
      }
    }
    if (arr[i].hasOwnProperty('children')) {
      arr[i].children = menu_init(arr[i].children, ids);
    }
  }
  return arr;
}
