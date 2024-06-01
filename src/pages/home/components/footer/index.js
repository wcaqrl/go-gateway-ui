import React from 'react';
import { connect } from 'react-redux';
import { FooterWrapper } from "./style";


function Footer(props) {
	return (
		<FooterWrapper>
			<p>
				<a href="#">Govern UI Studio</a>
				<a href="#"><i className="iconfont">&#xe72a;</i></a>
				<a href="#">Govern Team</a>
			</p>
			<p>
				<i className="iconfont">&#xe60f;</i> 2022 Powered By Govern Team
			</p>
		</FooterWrapper>
	);
}


const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['footer', 'focused']),
	}
}


const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
