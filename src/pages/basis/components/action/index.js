import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import {ActionWrapper, HintWrapper, InputWrapper, SpanWrapper, SubmitWrapper} from './style';
import PropTypes from "prop-types";
import {actions} from "../../store";
import {inArray} from "../../../../utils/str";


function Action(props){

	const { handleSubmit, register, formState: {errors} } = useForm();
	const { getBasis, addBasis, updateBasis } = props;
	const [name ,setName] = useState(props.name);
	const [description ,setDescription] = useState(props.description);
	const [loadType ,setLoadType] = useState(props.load_type);
	const [openAuth ,setOpenAuth] = useState(props.open_auth);
	const [blackList, setBlackList] = useState(JSON.stringify(props.black_list));
	const [whiteList, setWhiteList] = useState(JSON.stringify(props.white_list));
	const [whiteHost, setWhiteHost] = useState(JSON.stringify(props.white_host));
	const [clientIpFlowLimit, setClientIpFlowLimit] = useState(props.client_ip_flow_limit);
	const [serviceFlowLimit, setServiceFlowLimit] = useState(props.service_flow_limit);
	const [checkMethod, setCheckMethod] = useState(props.check_method);
	const [checkTimeout, setCheckTimeout] = useState(props.check_timeout);
	const [checkInterval, setCheckInterval] = useState(props.check_interval);
	const [roundType, setRoundType] = useState(props.round_type);
	const [serverHostList, setServerHostList] = useState(JSON.stringify(props.server_host_list));
	const [forbidHostList, setForbidHostList] = useState(JSON.stringify(props.forbid_host_list));
	const [upstreamConnectTimeout, setUpstreamConnectTimeout] = useState(props.upstream_connect_timeout);
	const [tlsHandshakeTimeout, setTlsHandshakeTimeout] = useState(props.tls_handshake_timeout);
	const [upstreamHeaderTimeout, setUpstreamHeaderTimeout] = useState(props.upstream_header_timeout);
	const [upstreamIdleTimeout, setUpstreamIdleTimeout] = useState(props.upstream_idle_timeout);
	const [upstreamMaxIdle, setUpstreamMaxIdle] = useState(props.upstream_max_idle);
	const [httpRuleType, setHttpRuleType] = useState(props.http_rule_type);
	const [httpRule, setHttpRule] = useState(props.http_rule);
	const [httpIsHttps, setHttpIsHttps] = useState(props.http_is_https);
	const [httpIsStripUri, setHttpIsStripUri] = useState(props.http_is_strip_uri);
	const [httpIsWebsocket, setHttpIsWebsocket] = useState(props.http_is_websocket);
	const [httpUrlRewrite, setHttpUrlRewrite] = useState(JSON.stringify(props.http_url_rewrite));
	const [httpHeaderTransfor, setHttpHeaderTransfor] = useState(JSON.stringify(props.http_header_transfor));
	const [tcpPort, setTcpPort] = useState(props.tcp_port);
	const [grpcPort, setGrpcPort] = useState(props.grpc_port);
	const [grpcHeaderTransfor, setGrpcHeaderTransfor] = useState(JSON.stringify(props.grpc_header_transfor));
	const [orderNum ,setOrderNum] = useState(props.order_num);
	const [isDelete ,setIsDelete] = useState(props.is_delete);
	const [versionId ,setVersionId] = useState(props.version_id);

	let { id } = useParams();
	let [load, setLoad] = useState(!id);
	useEffect(async () => {
		if (id) {
			let data = await getBasis(id);
			const fields = ['black_list', 'white_list', 'white_host', 'server_host_list', 'forbid_host_list', 'http_url_rewrite', 'http_header_transfor', 'grpc_header_transfor'];
			for (let k in data) {
				if (data.hasOwnProperty(k)) {
					if (inArray(k, fields)) {
						data[k] = JSON.stringify(data[k]);
					}
				}
			}
			if (data && data.name) {
			await setName(data.name);
			}
			if (data && data.white_list) {
				await setWhiteList(data.white_list);
			}
			if (data && data.server_host_list) {
				await setServerHostList(data.server_host_list);
			}
			if (data && data.hasOwnProperty('order_num')) {
			 await setOrderNum(data.order_num);
			}
			setLoad(true);
		}
	}, []);

	function onSubmit(data) {
		let tmpData = {
			name: data.name,
			white_list: data.white_list,
		}
		if (!!data.order_num) {
			tmpData.order_num = parseInt(data.order_num);
		}
		if (!id) {
			tmpData.password = data.password;
		} else {
			tmpData.id = id;
		}
		id ? updateBasis(tmpData) : addBasis(tmpData)
	}

	return (
		<ActionWrapper >
			{ load ?
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputWrapper>
					<label htmlFor="name">
						<span>名称:</span>
						<input id='name' type='text' placeholder='please input a name!'
							   defaultValue={name}
							   {...register("name", {
								   required: true,
								   minLength: 2,
								   maxLength: 30,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.name && errors.name.type === "required"}>name is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.name && errors.name.type === "minLength"}>name length no less than 2 characters!</SpanWrapper>
					<SpanWrapper isDisplay={errors.name && errors.name.type === "maxLength"}>name length no more than 30 characters!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="description">
						<span>简要描述:</span>
						<input id='description' type='text' placeholder='please input description!'
							   defaultValue={description}
							   {...register("description", {
								   required: true,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.description && errors.description.type === "required"}>description is required!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="load_type">
						<span>负载类型:</span>
						<input id='load_type' type='number' placeholder='please input load type!'
							   defaultValue={loadType}
							   {...register("load_type", {
								   required: true,
								   min: 0,
								   max: 127,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.load_type && errors.load_type.type === "required"}>load type is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.load_type && errors.load_type.type === "min"}>load type no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.load_type && errors.load_type.type === "max"}>load type no greater than 127!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="open_auth">
						<span>开启鉴权:</span>
						<input id='open_auth' type='number' placeholder='please input any number!'
							   defaultValue={openAuth}
							   {...register("open_auth", {
								   required: true,
								   min: 0,
								   max: 1,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.load_type && errors.load_type.type === "required"}>load type is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.load_type && errors.load_type.type === "min"}>load type no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.load_type && errors.load_type.type === "max"}>load type no greater than 1!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="black_list">
						<span>黑名单:</span>
						<input id='black_list' type='text' placeholder='please input black list!'
							   defaultValue={blackList}
							   {...register("black_list", {
								   minLength: 2,
								   maxLength: 30,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.black_list && errors.black_list.type === "minLength"}>black list length no less than 2 characters!</SpanWrapper>
					<SpanWrapper isDisplay={errors.black_list && errors.black_list.type === "maxLength"}>black list length no more than 30 characters!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="white_list">
						<span>白名单:</span>
						<input id='white_list' type='text' placeholder='please input white list!'
							   defaultValue={whiteList}
							   {...register("white_list", {
								   minLength: 2,
								   maxLength: 30,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.white_list && errors.white_list.type === "minLength"}>white list length no less than 2 characters!</SpanWrapper>
					<SpanWrapper isDisplay={errors.white_list && errors.white_list.type === "maxLength"}>white list length no more than 30 characters!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="client_ip_flow_limit">
						<span>客户端ip限流:</span>
						<input id='client_ip_flow_limit' type='number' placeholder='please input any number!'
							   defaultValue={clientIpFlowLimit}
							   {...register("client_ip_flow_limit", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.client_ip_flow_limit && errors.client_ip_flow_limit.type === "required"}>client ip flow limit is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.client_ip_flow_limit && errors.client_ip_flow_limit.type === "min"}>client ip flow limit no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="service_flow_limit">
						<span>服务端限流:</span>
						<input id='service_flow_limit' type='number' placeholder='please input any number!'
							   defaultValue={serviceFlowLimit}
							   {...register("service_flow_limit", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.service_flow_limit && errors.service_flow_limit.type === "required"}>service flow limit is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.service_flow_limit && errors.service_flow_limit.type === "min"}>service flow limit  no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="check_method">
						<span>检查方法:</span>
						<input id='check_method' type='number' placeholder='please input any number!'
							   defaultValue={checkMethod}
							   {...register("check_method", {
								   required: true,
								   min: 0,
								   max: 127,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.check_method && errors.check_method.type === "required"}>check method is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.check_method && errors.check_method.type === "min"}>check method no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.check_method && errors.check_method.type === "max"}>check method no greater than 127!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="check_timeout">
						<span>检查超时时间:</span>
						<input id='check_timeout' type='number' placeholder='please input any number!'
							   defaultValue={checkTimeout}
							   {...register("check_timeout", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.check_timeout && errors.check_timeout.type === "required"}>check timeout is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.check_timeout && errors.check_timeout.type === "min"}>check timeout no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="check_interval">
						<span>检查间隔时间:</span>
						<input id='check_interval' type='number' placeholder='please input any number!'
							   defaultValue={checkInterval}
							   {...register("check_interval", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.check_interval && errors.check_interval.type === "required"}>check interval is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.check_interval && errors.check_interval.type === "min"}>check interval no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="round_type">
						<span>轮询方式:</span>
						<input id='round_type' type='number' placeholder='please input any number!'
							   defaultValue={roundType}
							   {...register("round_type", {
								   required: true,
								   min: 0,
								   max: 127,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.round_type && errors.round_type.type === "required"}>round type is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.round_type && errors.round_type.type === "min"}>round type no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.round_type && errors.round_type.type === "max"}>round type no greater than 127!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="server_host_list">
						<span>服务端主机权重:</span>
						<input id='server_host_list' type='text' placeholder='please input server host list!'
							   defaultValue={serverHostList}
						/>
					</label>
				</InputWrapper>
				<InputWrapper>
					<label htmlFor="forbid_host_list">
						<span>服务端禁用host列表:</span>
						<input id='forbid_host_list' type='text' placeholder='please input forbid host list!'
							   defaultValue={forbidHostList}
						/>
					</label>
				</InputWrapper>
				<InputWrapper>
					<label htmlFor="upstream_connect_timeout">
						<span>建立连接超时时间:</span>
						<input id='upstream_connect_timeout' type='number' placeholder='please input any number!'
							   defaultValue={upstreamConnectTimeout}
							   {...register("upstream_connect_timeout", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.upstream_connect_timeout && errors.upstream_connect_timeout.type === "required"}>upstream connect timeout is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.upstream_connect_timeout && errors.upstream_connect_timeout.type === "min"}>upstream connect timeout no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="tls_handshake_timeout">
						<span>TLS握手超时时间:</span>
						<input id='tls_handshake_timeout' type='number' placeholder='please input any number!'
							   defaultValue={tlsHandshakeTimeout}
							   {...register("tls_handshake_timeout", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.tls_handshake_timeout && errors.tls_handshake_timeout.type === "required"}>tls handshake timeout is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.tls_handshake_timeout && errors.tls_handshake_timeout.type === "min"}>tls handshake timeout no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="upstream_header_timeout">
						<span>获取header超时时间:</span>
						<input id='upstream_header_timeout' type='number' placeholder='please input any number!'
							   defaultValue={upstreamHeaderTimeout}
							   {...register("upstream_header_timeout", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.upstream_header_timeout && errors.upstream_header_timeout.type === "required"}>upstream header timeout is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.upstream_header_timeout && errors.upstream_header_timeout.type === "min"}>upstream header timeout no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="upstream_idle_timeout">
						<span>连接最大空闲时间:</span>
						<input id='upstream_idle_timeout' type='number' placeholder='please input any number!'
							   defaultValue={upstreamIdleTimeout}
							   {...register("upstream_idle_timeout", {
								   required: true,
								   min: 0,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.upstream_idle_timeout && errors.upstream_idle_timeout.type === "required"}>upstream idle timeout is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.upstream_idle_timeout && errors.upstream_idle_timeout.type === "min"}>upstream idle timeout no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="http_rule_type">
						<span>匹配类型:</span>
						<input id='http_rule_type' type='number' placeholder='please input any number!'
							   defaultValue={httpRuleType}
							   {...register("http_rule_type", {
								   required: true,
								   min: 0,
								   max: 127,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.http_rule_type && errors.http_rule_type.type === "required"}>http rule type is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_rule_type && errors.http_rule_type.type === "min"}>http rule type no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_rule_type && errors.http_rule_type.type === "max"}>http rule type no greater than 127!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="http_rule">
						<span>规则内容:</span>
						<input id='http_rule' type='text' placeholder='please input description!'
							   defaultValue={httpRule}
							   {...register("http_rule", {
								   required: true,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.http_rule && errors.http_rule.type === "required"}>http rule is required!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="http_is_https">
						<span>支持https:</span>
						<input id='http_is_https' type='number' placeholder='please input any number!'
							   defaultValue={httpIsHttps}
							   {...register("http_is_https", {
								   required: true,
								   min: 0,
								   max: 1,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.http_is_https && errors.http_is_https.type === "required"}>"http is https" is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_is_https && errors.http_is_https.type === "min"}>"http is https" no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_is_https && errors.http_is_https.type === "max"}>"http is https" no greater than 1!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="http_is_strip_uri">
						<span>启用strip_uri:</span>
						<input id='http_is_strip_uri' type='number' placeholder='please input any number!'
							   defaultValue={httpIsStripUri}
							   {...register("http_is_strip_uri", {
								   required: true,
								   min: 0,
								   max: 1,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.http_is_strip_uri && errors.http_is_strip_uri.type === "required"}>http is strip uri is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_is_strip_uri && errors.http_is_strip_uri.type === "min"}>http is strip uri no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_is_strip_uri && errors.http_is_strip_uri.type === "max"}>http is strip uri no greater than 1!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="http_is_websocket">
						<span>支持websocket:</span>
						<input id='http_is_websocket' type='number' placeholder='please input any number!'
							   defaultValue={httpIsWebsocket}
							   {...register("http_is_websocket", {
								   required: true,
								   min: 0,
								   max: 1,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.http_is_websocket && errors.http_is_websocket.type === "required"}>"http is websocket" is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_is_websocket && errors.http_is_websocket.type === "min"}>"http is websocket" no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.http_is_websocket && errors.http_is_websocket.type === "max"}>"http is websocket" no greater than 1!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="http_url_rewrite">
						<span>url重写规则:</span>
						<input id='http_url_rewrite' type='text' placeholder='please input http url rewrite rule!'
							   defaultValue={httpUrlRewrite}
						/>
					</label>
				</InputWrapper>
				<InputWrapper>
					<label htmlFor="http_header_transfor">
						<span>HTTP Header转换:</span>
						<input id='http_header_transfor' type='text' placeholder='please input http header transfor rule!'
							   defaultValue={httpHeaderTransfor}
						/>
					</label>
				</InputWrapper>
				<InputWrapper>
					<label htmlFor="tcp_port">
						<span>TCP端口:</span>
						<input id='tcp_port' type='number' placeholder='please input any number!'
							   defaultValue={tcpPort}
							   {...register("tcp_port", {
								   required: true,
								   min: 0,
								   max: 65535,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.tcp_port && errors.tcp_port.type === "required"}>tcp port is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.tcp_port && errors.tcp_port.type === "min"}>tcp port no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.tcp_port && errors.tcp_port.type === "max"}>tcp port no greater than 65535!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="grpc_port">
						<span>GRPC端口:</span>
						<input id='grpc_port' type='number' placeholder='please input any number!'
							   defaultValue={grpcPort}
							   {...register("grpc_port", {
								   required: true,
								   min: 0,
								   max: 65535,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.grpc_port && errors.grpc_port.type === "required"}>grpc port is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.grpc_port && errors.grpc_port.type === "min"}>grpc port no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.grpc_port && errors.grpc_port.type === "max"}>grpc port no greater than 65535!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="grpc_header_transfor">
						<span>GRPC Header转换:</span>
						<input id='grpc_header_transfor' type='text' placeholder='please input grpc header transfor rule!'
							   defaultValue={grpcHeaderTransfor}
						/>
					</label>
				</InputWrapper>
				<InputWrapper>
					<label htmlFor="order_num">
						<span>排序:</span>
						<input id='order_num' type='number' placeholder='please input order number!'
							   defaultValue={orderNum}
							   {...register("order_num", {
								   min: 0
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.order_num && errors.order_num.type === "min"}>order number no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="is_delete">
						<span>状态:</span>
						<input id='is_delete' type='number' placeholder='please input any number!'
							   defaultValue={isDelete}
							   {...register("is_delete", {
								   required: true,
								   min: 0,
								   max: 127,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.is_delete && errors.is_delete.type === "required"}>status is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.is_delete && errors.is_delete.type === "min"}>status no less than 0!</SpanWrapper>
					<SpanWrapper isDisplay={errors.is_delete && errors.is_delete.type === "max"}>status no greater than 127!</SpanWrapper>
				</HintWrapper>
				<input id="id" name="id" type="hidden" defaultValue={id} />
				<SubmitWrapper><input type="submit" value={id ? '编辑' : '添加'} /></SubmitWrapper>
			</form> : '' }
		</ActionWrapper>
	);
}


Action.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	load_type: PropTypes.number,
	open_auth: PropTypes.number,
	black_list: PropTypes.object,
	white_list: PropTypes.object,
	white_host: PropTypes.object,
	client_ip_flow_limit: PropTypes.number,
	service_flow_limit: PropTypes.number,
	check_method: PropTypes.number,
	check_timeout: PropTypes.number,
	check_interval: PropTypes.number,
	round_type: PropTypes.number,
	server_host_list: PropTypes.object,
	forbid_host_list: PropTypes.object,
	upstream_connect_timeout: PropTypes.number,
	tls_handshake_timeout: PropTypes.number,
	upstream_header_timeout: PropTypes.number,
	upstream_idle_timeout: PropTypes.number,
	upstream_max_idle: PropTypes.number,
	http_rule_type: PropTypes.number,
	http_rule: PropTypes.string,
	http_is_https: PropTypes.number,
	http_is_strip_uri: PropTypes.number,
	http_is_websocket: PropTypes.number,
	http_url_rewrite: PropTypes.object,
	http_header_transfor: PropTypes.object,
	tcp_port: PropTypes.number,
	grpc_port: PropTypes.number,
	grpc_header_transfor: PropTypes.object,
	order_num: PropTypes.number,
	is_delete: PropTypes.number,
	version_id: PropTypes.number,
	create_time: PropTypes.number,
	update_time: PropTypes.number,
}

Action.defaultProps = {
	name: '',
	description: '',
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
		addBasis(data) {
			return actions.addBasis(data);
		},
		updateBasis(data) {
			return actions.updateBasis(data);
		}
	}
}

export default connect(mapState, mapDispatch)(Action);
