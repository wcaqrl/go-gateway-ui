import React from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { ContentWrapper } from './style';


function Content(props) {
	const { headerShow, headerFixed } = props;
	return (
		<ContentWrapper headerShow={headerShow} headerFixed={headerFixed}>
			<Outlet />
		</ContentWrapper>
	);
}


const mapState = (state) => {
	return {
		headerShow: state.getIn(['settings', 'headerShow']),
		headerFixed: state.getIn(['settings', 'headerFixed']),
	}
}


const mapDispatch = (dispatch) => {
	return {

	}
}

export default connect(mapState, mapDispatch)(Content);
