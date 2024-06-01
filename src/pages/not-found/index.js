import React from 'react';
import { NotFoundWrapper } from './style';

const NotFound = (props) => {
	return (
		<NotFoundWrapper iconSize={props.iconSize}  msgSize={props.msgSize}>
			<div>
				<p><i className='iconfont '>&#xea43;</i></p>
				<p>未找到页面</p>
			</div>
		</NotFoundWrapper>
	);
}

export default NotFound;