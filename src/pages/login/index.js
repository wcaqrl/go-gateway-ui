import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	LoginContainer,
	LoginBox,
	LoginLeft,
	LoginRight,
	LoginForm,
	LoginFormParagraph,
	LoginFormParagraphCaptcha,
	LoginFormCaptchaImg,
	Input,
	LoginFormParagraphSubmit
} from './style';
import { actions } from './store';
import {CacheUtil} from "../../utils/cache";


function Login(props) {
	const { captchaId, captchaUrl, refreshCaptcha, doLogin } = props
	const navigate  = useNavigate()
	const accountRef = useRef('')
	const passwordRef = useRef('')
	const captchaCodeRef = useRef('')
	const captchaIdRef = useRef('')

	useEffect(() => {
		let token = (new CacheUtil()).getExpire('token') || '';
		if (token) {
			navigate('/', {replace: true})
		}
	}, [])

	return (
		<LoginContainer>
			<LoginBox>
				<LoginLeft>
					<i className='iconfont' >&#xe9eb;</i>
					<span>Welcome, Govern!</span>
				</LoginLeft>
				<LoginRight>
					<LoginForm>
						<LoginFormParagraph>
							<Input placeholder='账号|邮箱|手机' type='text' ref={accountRef} />
							<i className='iconfont'>&#xe655;</i>
						</LoginFormParagraph>
						<LoginFormParagraph>
							<Input placeholder='密码' type='password' ref={passwordRef} />
							<i className='iconfont'>&#xe734;</i>
						</LoginFormParagraph>
						<LoginFormParagraphCaptcha>
							<Input placeholder='请输入验证码' type='text' name="captcha_code" required ref={captchaCodeRef} />
							<LoginFormCaptchaImg onClick={() => refreshCaptcha()} src={captchaUrl}/>
							<Input type='hidden' name="captcha_id" ref={captchaIdRef} value={captchaId}/>
						</LoginFormParagraphCaptcha>
						<LoginFormParagraphSubmit>
							<Input type='submit' value="Login" onClick={(e) => {
								e.preventDefault(); doLogin(
								accountRef.current.value,
								passwordRef.current.value,
								captchaIdRef.current.value,
								captchaCodeRef.current.value)}} />
						</LoginFormParagraphSubmit>
					</LoginForm>
				</LoginRight>
			</LoginBox>
		</LoginContainer>
	);
}

const mapState = (state) => ({
	captchaId: state.getIn(['login', 'captchaId']),
	captchaUrl: state.getIn(['login', 'captchaUrl']),
});


const mapDispatch = (dispatch) => ({
	refreshCaptcha() {
		dispatch(actions.captcha())
	},
	doLogin(account, password, captchaId, captchaCode) {
		dispatch(actions.login(account, password, captchaId, captchaCode));
	}
});

export default connect(mapState, mapDispatch)(Login);