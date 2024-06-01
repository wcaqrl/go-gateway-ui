import { fromJS } from 'immutable';
import * as constants from './constants';
import { changeCaptcha } from '../../../utils/captcha';


const defaultState = (() => {
	let captchaInfo = changeCaptcha();
	return fromJS({
		...captchaInfo,
	});
})();

const stateAction = (state = defaultState, action) => {
	switch(action.type) {
		case constants.CAPTCHA:
			return state.merge(changeCaptcha());
		default:
			return state;
	}
}

export default stateAction;