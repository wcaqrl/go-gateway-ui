import React from 'react';
import { connect } from 'react-redux';
import { actions, constants } from './store';
import {
	SettingWrapper,
	SettingBar,
	SettingItem,
	SettingItemTheme,
	SettingItemThemeLi,
	SettingItemToggle,
	SwitchWrapper,
	SwitchCircle,
	Divider
} from './style';


function Settings(props){
	const {
		open,
		themes,
		headerFixed,
		siderFixed,
		headerShow,
		siderShow,
		changeTheme,
		toggleSwitch,
		toggleOpen,
		setMaskOpen,
	} = props;
	return (
		<SettingWrapper open={open}>
			<SettingBar onClick={() => {toggleOpen(!open); setMaskOpen(!open);}}>
				<i className="iconfont" dangerouslySetInnerHTML={{ __html: (open ? '&#xe606;' : '&#xe605;')}}></i>
			</SettingBar>
			<SettingItem>
				<h3>主题色</h3>
				<SettingItemTheme>
					{
						themes.map((theme) => {
							return (
								<SettingItemThemeLi background={theme.get('color')} key={theme.get('key')} onClick={() => changeTheme(theme.get('key'))}>
									{theme.get('selected') ? <i className="iconfont">&#xe607;</i> : ''}
								</SettingItemThemeLi>
							);
						})
					}
				</SettingItemTheme>
			</SettingItem>
			<Divider />
			<SettingItem>
				<h3>固定内容</h3>
				<SettingItemToggle>
					<li>
						<span>内容头部</span>
						<SwitchWrapper close={headerFixed} onClick={() => toggleSwitch(!headerFixed, constants.CHANGE_HEADER_FIXED_CLOSE)}>
							<SwitchCircle close={headerFixed} />
						</SwitchWrapper>
					</li>
					<li>
						<span>侧边菜单</span>
						<SwitchWrapper close={siderFixed} onClick={() => toggleSwitch(!siderFixed, constants.CHANGE_SIDER_FIXED_CLOSE)}>
							<SwitchCircle close={siderFixed} />
						</SwitchWrapper>
					</li>
				</SettingItemToggle>
			</SettingItem>
			<Divider />
			<SettingItem>
				<h3>显示内容</h3>
				<SettingItemToggle>
					<li>
						<span>内容头部</span>
						<SwitchWrapper close={headerShow} onClick={() => toggleSwitch(!headerShow, constants.CHANGE_MAIN_HEADER_SHOW_CLOSE)}>
							<SwitchCircle close={headerShow} />
						</SwitchWrapper>
					</li>
					<li>
						<span>侧边菜单</span>
						<SwitchWrapper close={siderShow} onClick={() => toggleSwitch(!siderShow, constants.CHANGE_SIDER_SHOW_CLOSE)}>
							<SwitchCircle close={siderShow} />
						</SwitchWrapper>
					</li>
				</SettingItemToggle>
			</SettingItem>
		</SettingWrapper>
	);
}


const mapState = (state) => {
	return {
		open: state.getIn(['settings', 'open']),
		themes: state.getIn(['settings', 'themes']),
		headerFixed: state.getIn(['settings', 'headerFixed']),
		siderFixed: state.getIn(['settings', 'siderFixed']),
		headerShow: state.getIn(['settings', 'headerShow']),
		siderShow: state.getIn(['settings', 'siderShow']),
	}
}


const mapDispatch = (dispatch) => {
	return {
		toggleOpen(open) {
			dispatch(actions.changeOpen(open))
		},
		changeTheme(key) {
			dispatch(actions.changeTheme(key))
		},
		toggleSwitch(val, type) {
			dispatch(actions.changeSwitch(val, type))
		}
	}
}

export default connect(mapState, mapDispatch)(Settings);
