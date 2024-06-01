import * as constants from './constants';
// import { fromJS } from 'immutable';

export const changeOpen = (open) => ({
	type: constants.CHANGE_OPEN,
	open: open
});

export const changeTheme = (key) => ({
	type: constants.CHANGE_THEME,
	key: key
});

export const changeSwitch = (val, type) => ({
	type: type,
	close: val
});
