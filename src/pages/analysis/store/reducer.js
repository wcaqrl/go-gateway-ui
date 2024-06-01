import * as constants from './constants';
import { fromJS } from 'immutable';
import config from "../../../config";

const defaultState = fromJS({

});

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		default:
			return state;
	}
}

export default stateAction;