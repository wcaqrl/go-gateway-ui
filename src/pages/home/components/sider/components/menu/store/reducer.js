import * as constants from './constants';
import { fromJS } from 'immutable';
import { menu_init} from "../../../../../../../utils/tree";


const defaultState = fromJS({
	menu: [
		{
			"id": 1,
			"pid": 0,
			"key_name": "dashboard",
			"link_to": "/",
			"target_type": 1,
			"icon": "&#xe6ad;",
			"is_hide": 0,
			"is_open": 1,
			"order_num": 1,
			"trail": "0_1",
			"statum": 1,
			"name": "大盘统计",
			"children": [
				{
					"id": 2,
					"pid": 1,
					"key_name": "analysis",
					"link_to": "/",
					"target_type": 1,
					"icon": "",
					"is_hide": 0,
					"is_open": 1,
					"order_num": 2,
					"trail": "0_1_2",
					"statum": 1,
					"name": "数据分析"
				}
			]
		},
		{
			"id": 3,
			"pid": 0,
			"key_name": "admin",
			"link_to": "/admin",
			"target_type": 1,
			"icon": "&#xe616;",
			"is_hide": 0,
			"is_open": 1,
			"order_num": 3,
			"trail": "0_3",
			"statum": 1,
			"name": "管理员管理",
			"children": [
				{
					"id": 4,
					"pid": 3,
					"key_name": "admin_list",
					"link_to": "/admin",
					"target_type": 1,
					"icon": "",
					"is_hide": 0,
					"is_open": 1,
					"order_num": 4,
					"trail": "0_3_4",
					"statum": 1,
					"name": "管理员列表"
				},
				{
					"id": 5,
					"pid": 3,
					"key_name": "admin_add",
					"link_to": "/admin/add",
					"target_type": 1,
					"icon": "",
					"is_hide": 0,
					"is_open": 1,
					"order_num": 5,
					"trail": "0_3_5",
					"statum": 1,
					"name": "管理员添加"
				}
			]
		},
		{
			"id": 6,
			"pid": 0,
			"key_name": "tenant",
			"link_to": "/tenant",
			"target_type": 1,
			"icon": "&#xe6af;",
			"is_hide": 0,
			"is_open": 1,
			"order_num": 6,
			"trail": "0_6",
			"statum": 1,
			"name": "租户管理",
			"children": [
				{
					"id": 7,
					"pid": 6,
					"key_name": "tenant_list",
					"link_to": "/tenant",
					"target_type": 1,
					"icon": "",
					"is_hide": 0,
					"is_open": 1,
					"order_num": 7,
					"trail": "0_6_7",
					"statum": 1,
					"name": "租户列表"
				},
				{
					"id": 8,
					"pid": 6,
					"key_name": "tenant_add",
					"link_to": "/tenant/add",
					"target_type": 1,
					"icon": "",
					"is_hide": 0,
					"is_open": 1,
					"order_num": 8,
					"trail": "0_6_8",
					"statum": 1,
					"name": "租户添加"
				}
			]
		},
		{
			"id": 9,
			"pid": 0,
			"key_name": "basis",
			"link_to": "/basis",
			"target_type": 1,
			"icon": "&#xf0ac;",
			"is_hide": 0,
			"is_open": 1,
			"order_num": 9,
			"trail": "0_9",
			"statum": 1,
			"name": "服务管理",
			"children": [
				{
					"id": 10,
					"pid": 9,
					"key_name": "basis_list",
					"link_to": "/basis",
					"target_type": 1,
					"icon": "",
					"is_hide": 0,
					"is_open": 1,
					"order_num": 10,
					"trail": "0_9_10",
					"statum": 1,
					"name": "服务列表"
				},
				{
					"id": 11,
					"pid": 9,
					"key_name": "basis_add",
					"link_to": "/basis/add",
					"target_type": 1,
					"icon": "",
					"is_hide": 0,
					"is_open": 1,
					"order_num": 11,
					"trail": "0_9_11",
					"statum": 1,
					"name": "服务添加"
				}
			]
		},
	]
});

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_SELECTED:
			const newMenu = menu_init(state.get('menu').toJS(), action.ids);
			return state.merge({menu: fromJS(newMenu)});
		default:
			return state;
	}
}

export default stateAction;