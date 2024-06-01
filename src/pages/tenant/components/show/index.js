import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ShowWrapper } from './style';
import { TimeUtil } from "../../../../utils/time";
import { TransUtil } from "../../../../utils/trans";
import { fromJS } from "immutable";
import { actions } from "../../store";
import NoData from "../../../../components/no-data";


function Show(props) {

	const { getTenant } = props;
	const navigate = useNavigate();
	const [data, setData] = useState(fromJS({}));
	const timeUitl = new TimeUtil();
	const transUtil = new TransUtil();

	let { id } = useParams();
	let [load, setLoad] = useState(false);
	useEffect(async () => {
		if (id) {
			let tmpData = await getTenant(id);
			setData(fromJS(tmpData));
			setLoad(true);
		}
	}, []);

	return (
		<ShowWrapper>
			{ load ? (data.isEmpty() ? <NoData /> :
				<div className='show-data'>
					<p>
						<span>ID: </span>
						<span>{data.get('id')}</span>
					</p>
					<p>
						<span>名称: </span>
						<span>{data.get('name')}</span>
					</p>
					<p>
						<span>租户ID: </span>
						<span>{data.get('tenant_id')}</span>
					</p>
					<p>
						<span>租户密匙: </span>
						<span>{data.get('tenant_key')}</span>
					</p>
					<p>
						<span>应用类型: </span>
						<span>{data.get('party')}</span>
					</p>
					<p>
						<span>QPS: </span>
						<span>{data.get('qps')}</span>
					</p>
					<p>
						<span>QPD: </span>
						<span>{data.get('qpd')}</span>
					</p>
					<p>
						<span>白名单: </span>
						<span>{data.get('white_list')}</span>
					</p>
					<p>
						<span>排序值: </span>
						<span>{data.get('order_num')}</span>
					</p>
					<p>
						<span>状态: </span>
						<span style={{color: transUtil.getDeleteColor(data.get('is_delete'))}}>{transUtil.getDeleteText(data.get('is_delete'))}</span>
					</p>
					<p>
						<span>创建时间: </span>
						<span>{timeUitl.timetrans(data.get('create_time'))}</span>
					</p>
					<p>
						<span>更新时间: </span>
						<span>{timeUitl.timetrans(data.get('create_time'))}</span>
					</p>
					<p className='show-action'>
						<button type='button' onClick={() => navigate('/tenant/edit/' + data.get('id'))}>编辑</button>
					</p>
				</div>
			) : ''}
		</ShowWrapper>
	);
}


const mapState = (state) => {
	return {

	}
}


const mapDispatch = (dispatch) => {
	return {
		getTenant(id) {
			return actions.getTenant(id);
		},
	}
}

export default connect(mapState, mapDispatch)(Show);
