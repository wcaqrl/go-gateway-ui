import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	showScroll: false,
	maskOpen: false,
});


const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_HOME_DATA:
			return state;
		default:
			return state;
	}
}

export default stateAction;
