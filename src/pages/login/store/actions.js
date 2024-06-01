import * as constants from './constants';
import axiosInstance from '../../../utils/request';
import {CacheUtil} from "../../../utils/cache";
import config from "../../../config";

const getCaptcha = () => ({
	type: constants.CAPTCHA
});

export const login = (account, password, captchaId, captchaCode) => {
	return (dispatch) => {
			axiosInstance.post('/admin/login',
			{
				email: account,
				password: password,
				captcha_id: captchaId,
				captcha_code: captchaCode
			}).then((response) => {
			if (response.data.accessToken) {
				(new CacheUtil()).setExpire('token', response.data.accessToken, config.token_cache_time);
				window.location.hash = '#/';
			}
		}).catch((error) => {
			dispatch(getCaptcha())
		});
	}
}


export const captcha = () => {
	return (dispatch) => {
		dispatch(getCaptcha())
	}
}