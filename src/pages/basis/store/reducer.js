import * as constants from './constants';
import { fromJS } from 'immutable';
import config from "../../../config";

const defaultState = fromJS({
	bases: fromJS({
		'list': [],
		"total": 0,
		"page": 1,
		"perpage": config.perpage,
	})
});

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_BASES:
			return state.merge({bases: fromJS(action.bases)});
		default:
			return state;
	}
}

export default stateAction;