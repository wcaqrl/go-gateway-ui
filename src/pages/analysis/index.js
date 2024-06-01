import React from 'react';
import { AnalysisWrapper } from './style';


const Analysis = () => {
	return (
		<AnalysisWrapper>
			<div className='stat-card stat-card-small'>
				<div>
					<i className='iconfont '>&#xf0ac;</i>
				</div>
				<div>
					<p>服务数</p>
					<p>5</p>
				</div>
			</div>
			<div className='stat-card stat-card-small'>
				<div>
					<i className='iconfont '>&#xe621;</i>
				</div>
				<div>
					<p>当日请求量</p>
					<p>2000</p>
				</div>
			</div>
			<div className='stat-card stat-card-small'>
				<div>
					<i className='iconfont '>&#xe61e;</i>
				</div>
				<div>
					<p>当前QPS</p>
					<p>13</p>
				</div>
			</div>
			<div className='stat-card stat-card-small'>
				<div>
					<i className='iconfont '>&#xe69b;</i>
				</div>
				<div>
					<p>租户数</p>
					<p>5</p>
				</div>
			</div>
			<div className='stat-card'>
				这里是日流量统计
			</div>
			<div className='stat-card'>
				服务类型占比
			</div>
		</AnalysisWrapper>
	);
}

export default Analysis;
