import * as constants from './constants';
import { fromJS } from 'immutable';
import config from "../../../config";

const defaultState = fromJS({
	admins: fromJS({
		'list': [],
		"total": 0,
		"page": 1,
		"perpage": config.perpage,
	})
});

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_ADMINS:
			return state.merge({admins: fromJS(action.admins)});
		default:
			return state;
	}
}

export default stateAction;