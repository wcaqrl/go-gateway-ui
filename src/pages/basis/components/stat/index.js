import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { StatWrapper } from './style';
import { fromJS } from "immutable";
import { actions } from "../../store";
import NoData from "../../../../components/no-data";
import {inArray} from "../../../../utils/str";


function Stat(props) {

	const { getBasis } = props;
	const [data, setData] = useState(fromJS({}));

	let { id } = useParams();
	let [load, setLoad] = useState(false);
	useEffect(async () => {
		if (id) {
			let tmpData = await getBasis(id);
			const fields = ['black_list', 'white_list', 'white_host', 'server_host_list', 'forbid_host_list', 'http_url_rewrite', 'http_header_transfor', 'grpc_header_transfor'];
			for (let k in tmpData) {
				if (tmpData.hasOwnProperty(k)) {
					if (inArray(k, fields)) {
						tmpData[k] = JSON.stringify(tmpData[k]);
					}
				}
			}
			setData(fromJS(tmpData));
			setLoad(true);
		}
	}, []);

	return (
		<StatWrapper>
			{ load ? (data.isEmpty() ? <NoData /> :
				<div className='basis-stat'>
					这里是服务统计
				</div>
			) : ''}
		</StatWrapper>
	);
}


const mapState = (state) => {
	return {

	}
}


const mapDispatch = (dispatch) => {
	return {
		getBasis(id) {
			return actions.getBasis(id);
		},
	}
}

export default connect(mapState, mapDispatch)(Stat);
