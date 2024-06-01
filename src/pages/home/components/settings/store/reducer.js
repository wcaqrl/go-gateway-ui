import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	open: false,
	headerFixed: true,
	siderFixed: true,
	headerShow: true,
	siderShow: true,
	themes: [
		{
			key: 1,
			color: '#188efc',
			selected: true
		},
		{
			key: 2,
			color: '#f5212d',
			selected: false
		},
		{
			key: 3,
			color: '#fe531f',
			selected: false
		},
		{
			key: 4,
			color: '#fbae14',
			selected: false
		},
		{
			key: 5,
			color: '#14c2c3',
			selected: false
		},
		{
			key: 6,
			color: '#53c41a',
			selected: false
		},
		{
			key: 7,
			color: '#2f54eb',
			selected: false
		},
		{
			key: 8,
			color: '#722ed1',
			selected: false
		},
		{
			key: 9,
			color: '#a14d22',
			selected: false
		}
	]
});

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_OPEN:
			return state.merge({open: action.open});
		case constants.CHANGE_HEADER_FIXED_CLOSE:
			return state.merge({headerFixed: action.close});
		case constants.CHANGE_SIDER_FIXED_CLOSE:
			return state.merge({siderFixed: action.close});
		case constants.CHANGE_MAIN_HEADER_SHOW_CLOSE:
			return state.merge({headerShow: action.close});
		case constants.CHANGE_SIDER_SHOW_CLOSE:
			return state.merge({siderShow: action.close});
		case constants.CHANGE_THEME:
			const tmpThemes = [];
			let tmpThemeColor = '';
			for (let theme of state.get('themes')) {
				const tmpSelected = action.key === theme.get('key');
				if (tmpSelected) {
					tmpThemeColor = theme.get('color');
				}
				tmpThemes.push({
					key: theme.get('key'),
					color: theme.get('color'),
					selected: tmpSelected
				})
			}
			if (tmpThemeColor) {
				document.documentElement.style.setProperty('--theme', tmpThemeColor);
			}
			return state.merge({themes: fromJS(tmpThemes)});
		default:
			return state;
	}
}

export default stateAction;