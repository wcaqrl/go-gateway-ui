import React, {Fragment, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom';
import Sider from './components/sider';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import Settings from './components/settings';
import Mask from '../../components/mask';
import { HomeWrapper, MainWrapper } from './style';
import config from "../../config";
import { CacheUtil } from "../../utils/cache";
import axiosInstance from "../../utils/request";
import useWatcher from "../../hooks/router-watcher";
import { OnRouterBefore } from "../../route";
import {useLocation} from "react-router";


function Home(props) {

	const { displayDivider, toggleDividerDisplay } = props;
	const navigate  = useNavigate();
	const [maskOpen, setMaskOpen] = useState(props.maskOpen);
	const { addListener } = useWatcher();
	const [token, setToken] = useState('');

	useEffect(() => {
		let theToken = (new CacheUtil()).getExpire('token') || '';
		if (!theToken) {
			navigate('/login', {replace: true});
		} else {
			setToken(theToken);
		}
	}, [])

	useEffect(() => {
		const timer = setInterval(() => {
			const cacheUtil   = new CacheUtil();
			const token       = cacheUtil.getExpire('token') || '';
			const expiration  = cacheUtil.getExpiration('token');
			const currentTime = parseInt(Date.now() / 1000);
			if (token && (expiration - currentTime < Math.ceil(config.token_cache_time/2))) {
				axiosInstance.get('/refreshToken', {
					baseURL: config.govern_host
				}).then((response) => {
					if (response.data['refreshToken']) {
						cacheUtil.setExpire('token', response.data['refreshToken'], config.token_cache_time);
					}
				});
			}
		}, Math.floor(config.token_cache_time / 3) * 1000);
		return () => clearInterval(timer)
	}, []);

	useEffect(() => {
		addListener(OnRouterBefore);
	}, []);

	return ( token ?
		<Fragment>
			<HomeWrapper>
				<Sider />
				<MainWrapper>
					<Header />
					<Content>
						<Outlet />
					</Content>
					<Footer />
				</MainWrapper>
			</HomeWrapper>
			<Settings setMaskOpen={setMaskOpen}/>
			<Mask open={maskOpen}/>
		</Fragment> : ''
	);
}

const mapState = (state) => ({
	displayDivider: state.getIn(['divider', 'isDisplay']),
	maskOpen: state.getIn(['home', 'maskOpen']),
})


const mapDispatch = (dispatch) => {
	return {

	}
}

export default connect(mapState, mapDispatch)(Home);