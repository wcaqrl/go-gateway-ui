import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ShowWrapper } from './style';
import { TimeUtil } from "../../../../utils/time";
import { TransUtil } from "../../../../utils/trans";
import { fromJS } from "immutable";
import { actions } from "../../store";
import NoData from "../../../../components/no-data";
import {inArray} from "../../../../utils/str";


function Show(props) {

	const { getBasis } = props;
	const navigate = useNavigate();
	const [data, setData] = useState(fromJS({}));
	const timeUitl = new TimeUtil();
	const transUtil = new TransUtil();

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
						<span>简要描述: </span>
						<span>{data.get('description')}</span>
					</p>
					<p>
						<span>负载类型: </span>
						<span>{data.get('load_type')}</span>
					</p>
					<p>
						<span>开启鉴权: </span>
						<span>{data.get('open_auth')}</span>
					</p>
					<p>
						<span>黑名单: </span>
						<span>{data.get('black_list')}</span>
					</p>
					<p>
						<span>白名单: </span>
						<span>{data.get('white_list')}</span>
					</p>
					<p>
						<span>客户端ip限流: </span>
						<span>{data.get('client_ip_flow_limit')}</span>
					</p>
					<p>
						<span>服务端限流: </span>
						<span>{data.get('service_flow_limit')}</span>
					</p>
					<p>
						<span>检查方法: </span>
						<span>{data.get('check_method')}</span>
					</p>
					<p>
						<span>检查超时时间: </span>
						<span>{data.get('check_timeout')}</span>
					</p>
					<p>
						<span>检查间隔时间: </span>
						<span>{data.get('check_interval')}</span>
					</p>
					<p>
						<span>轮询方式: </span>
						<span>{data.get('round_type')}</span>
					</p>
					<p>
						<span>服务端主机权重: </span>
						<span>{data.get('server_host_list')}</span>
					</p>
					<p>
						<span>服务端禁用host列表: </span>
						<span>{data.get('forbid_host_list')}</span>
					</p>
					<p>
						<span>建立连接超时时间: </span>
						<span>{data.get('upstream_connect_timeout')}</span>
					</p>
					<p>
						<span>TLS握手超时时间: </span>
						<span>{data.get('tls_handshake_timeout')}</span>
					</p>
					<p>
						<span>获取header超时时间: </span>
						<span>{data.get('upstream_header_timeout')}</span>
					</p>
					<p>
						<span>连接最大空闲时间: </span>
						<span>{data.get('upstream_idle_timeout')}</span>
					</p>
					<p>
						<span>匹配类型: </span>
						<span>{data.get('http_rule_type')}</span>
					</p>
					<p>
						<span>规则内容: </span>
						<span>{data.get('http_rule')}</span>
					</p>
					<p>
						<span>支持https: </span>
						<span>{data.get('http_is_https')}</span>
					</p>
					<p>
						<span>启用strip_uri: </span>
						<span>{data.get('http_is_strip_uri')}</span>
					</p>
					<p>
						<span>支持websocket: </span>
						<span>{data.get('http_is_websocket')}</span>
					</p>
					<p>
						<span>url重写规则: </span>
						<span>{data.get('http_url_rewrite')}</span>
					</p>
					<p>
						<span>HTTP Header转换: </span>
						<span>{data.get('http_header_transfor')}</span>
					</p>
					<p>
						<span>TCP端口: </span>
						<span>{data.get('tcp_port')}</span>
					</p>
					<p>
						<span>GRPC端口: </span>
						<span>{data.get('grpc_port')}</span>
					</p>
					<p>
						<span>GRPC Header转换: </span>
						<span>{data.get('grpc_header_transfor')}</span>
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
						<button type='button' onClick={() => navigate('/basis/edit/' + data.get('id'))}>编辑</button>
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
		getBasis(id) {
			return actions.getBasis(id);
		},
	}
}

export default connect(mapState, mapDispatch)(Show);
