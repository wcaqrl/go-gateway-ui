import React from 'react';
import { connect } from 'react-redux';
import { HeaderWrapper, Logo, LeftWrapper, RightWrapper} from "./style";
import logoSvg from "../../../../statics/image/logo.svg";
import PopConfirm from "../../../../components/pop-confirm";
import {parseJWT} from "../../../../utils/str";
import {useNavigate} from "react-router-dom";
import {CacheUtil} from "../../../../utils/cache";
import Clock from "../../../../components/clock";


function Header(props) {
	const { fixed, isDisplay, siderShow, fold } = props;
	const navigate = useNavigate();
	const cacheUtil   = new CacheUtil();
	const token    = cacheUtil.getExpire('token') || '';
	const { id, name } = parseJWT(token);

	return (
		<HeaderWrapper fixed={fixed} isDisplay={isDisplay}>
			<Logo fixed={fixed}>
				<img src={logoSvg} alt="" />
				{/*<i className="iconfont">&#xeb6d;</i>*/}
			</Logo>
			<LeftWrapper fixed={fixed} siderShow={siderShow} siderFold={fold}>
				<li><span>武汉风行在线科技有限公司</span></li>
			</LeftWrapper>
			<RightWrapper>
				<Clock />
				<PopConfirm
					title={'确定要清除缓存吗?'}
					desc={''}
					trigger={['click']}
					placement={'rightTop'}
					confirmText={'确定'}
					cancelText={'取消'}
					onConfirm={()=>{}}
					onCancel={()=>{}}
				><i className="iconfont">&#xe601;</i></PopConfirm>
				<button type='button' onClick={() => navigate('/admin/show/' + id)}><i className="iconfont">&#xe6af;</i></button>
				<span>{name}</span>
				<PopConfirm
					title={'确定要退出登录吗?'}
					desc={''}
					trigger={['click']}
					placement={'rightTop'}
					confirmText={'确定'}
					cancelText={'取消'}
					onConfirm={()=>{}}
					onCancel={()=>{}}
				><i className="iconfont">&#xe66d;</i></PopConfirm>
			</RightWrapper>
		</HeaderWrapper>
	);
}


const mapState = (state) => {
	return {
		fixed: state.getIn(['settings', 'headerFixed']),
		isDisplay: state.getIn(['settings', 'headerShow']),
		siderShow: state.getIn(['settings', 'siderShow']),
		fold: state.getIn(['sider', 'fold']),
	}
}


const mapDispatch = (dispatch) => {
	return {

	}
}

export default connect(mapState, mapDispatch)(Header);
