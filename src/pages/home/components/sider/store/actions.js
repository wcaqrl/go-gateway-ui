import * as constants from './constants';
import { fromJS } from 'immutable';


export const changeFold = (fold) => ({
	type: constants.CHANGE_FOLD,
	fold: fromJS(fold),
});

