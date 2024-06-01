import React from 'react';
import { connect } from 'react-redux';
import Menu from './components/menu';
import { SiderContainer, SiderWrapper, SiderHeader, SiderFooter, Logo } from './style';
import logoSvg from '../../../../statics/image/logo.svg';
import { actions } from "./store";

function Sider(props) {
	const { fold, fixed, toggleFold, isDisplay } = props
	return (
			<SiderContainer fold={fold} isDisplay={isDisplay}>
				<SiderWrapper fixed={fixed}>
					<SiderHeader>
						<Logo>
							<img src={logoSvg} alt="" />
							<h1>Govern UI</h1>
						</Logo>
					</SiderHeader>
					<Menu />
					<SiderFooter onClick={() => toggleFold(!fold)}>
						<i className="iconfont">&#xeb6d;</i>
					</SiderFooter>
				</SiderWrapper>
			</SiderContainer>
	);
}


const mapState = (state) => {
	return {
		fold: state.getIn(['sider', 'fold']),
		fixed: state.getIn(['settings', 'siderFixed']),
		isDisplay: state.getIn(['settings', 'siderShow']),
	}
}


const mapDispatch = (dispatch) => {
	return {
		toggleFold(fold) {
			dispatch(actions.changeFold(fold))
		}
	}
}

export default connect(mapState, mapDispatch)(Sider);
