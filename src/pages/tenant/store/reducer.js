import * as constants from './constants';
import { fromJS } from 'immutable';
import config from "../../../config";

const defaultState = fromJS({
	tenants: fromJS({
		'list': [],
		"total": 0,
		"page": 1,
		"perpage": config.perpage,
	})
});

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_TENANTS:
			return state.merge({tenants: fromJS(action.tenants)});
		default:
			return state;
	}
}

export default stateAction;