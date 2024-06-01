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

	const { getAdmin } = props;
	const navigate = useNavigate();
	const [data, setData] = useState(fromJS({}));
	const timeUitl = new TimeUtil();
	const transUtil = new TransUtil();

	let { id } = useParams();
	let [load, setLoad] = useState(false);
	useEffect(async () => {
		if (id) {
			let tmpData = await getAdmin(id);
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
						<span>邮箱: </span>
						<span>{data.get('email')}</span>
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
						<button type='button' onClick={() => navigate('/admin/edit/' + data.get('id'))}>编辑</button>
						<button type='button' onClick={() => navigate('/admin/change/' + data.get('id'))}>修改密码</button>
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
		getAdmin(id) {
			return actions.getAdmin(id);
		},
	}
}

export default connect(mapState, mapDispatch)(Show);
