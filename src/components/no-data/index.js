import React from 'react';
import { NoDataWrapper } from './style';

const NoData = (props) => {
	return (
		<NoDataWrapper iconSize={props.iconSize}  msgSize={props.msgSize} >
			<div>
				<p><i className='iconfont '>&#xe6a6;</i></p>
				<p>未找到数据</p>
			</div>
		</NoDataWrapper>
	);
}

export default NoData;