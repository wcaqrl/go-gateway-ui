import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
	fold: false,
});

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_FOLD:
			return state.merge({fold: action.fold});
		default:
			return state;
	}
}

export default stateAction;