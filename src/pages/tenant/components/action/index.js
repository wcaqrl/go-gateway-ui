import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import {ActionWrapper, HintWrapper, InputWrapper, SpanWrapper, SubmitWrapper} from './style';
import PropTypes from "prop-types";
import {actions} from "../../store";


function Action(props){

	const { handleSubmit, register, formState: {errors} } = useForm();
	const { getTenant, addTenant, updateTenant } = props;
	const [name ,setName] = useState(props.name);
	const [tenantId, setTenantId] = useState(props.tenant_id);
	const [tenantKey, setTenantKey] = useState(props.tenant_key);
	const [party, setParty] = useState(props.party);
	const [qps, setQps] = useState(props.qps);
	const [qpd, setQpd] = useState(props.qpd);
	const [whiteList, setWhiteList] = useState(props.white_list);
	const [orderNum ,setOrderNum] = useState(props.order_num);
	const [isDelete ,setIsDelete] = useState(props.is_delete);

	let { id } = useParams();
	let [load, setLoad] = useState(!id);
	useEffect(async () => {
		if (id) {
			let data = await getTenant(id);
			if (data && data.name) {
			await setName(data.name);
			}
			if (data && data.tenant_id) {
				await setTenantId(data.tenant_id);
			}
			if (data && data.tenant_key) {
				await setTenantKey(data.tenant_key);
			}
			if (data && data.party) {
				await setParty(data.party);
			}
			if (data && data.qps) {
				await setQps(data.qps);
			}
			if (data && data.qpd) {
				await setQpd(data.qpd);
			}
			if (data && data.white_list) {
				await setWhiteList(data.white_list);
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
			tenant_id: data.tenant_id,
			tenant_key: data.tenant_key,
			party: data.party,
			qps: data.qps,
			qpd: data.qpd,
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
		id ? updateTenant(tmpData) : addTenant(tmpData)
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
					<label htmlFor="tenant_id">
						<span>租户ID:</span>
						<input id='tenant_id' type='text' placeholder='please input tenant id!'
							   defaultValue={tenantId}
							   {...register("tenant_id", {
								   required: true,
								   validate: val => val.length === 32,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.tenant_id && errors.tenant_id.type === "required"}>tenant_id is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.tenant_id && errors.tenant_id.type === "validate"}>tenant_id must be 32 characters</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="tenant_key">
						<span>租户密匙:</span>
						<input id='tenant_key' type='text' placeholder='please input tenant key!'
							   defaultValue={tenantKey}
							   {...register("tenant_key", {
								   required: true,
								   validate: val => val.length === 32,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.tenant_key && errors.tenant_key.type === "required"}>tenant_key is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.tenant_key && errors.tenant_key.type === "validate"}>tenant_key must be 32 characters</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="party">
						<span>应用类型:</span>
						<input id='party' type='number' placeholder='please input party number!'
							   defaultValue={party}
							   {...register("party", {
								   min: 0
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.party && errors.party.type === "min"}>party no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="qps">
						<span>QPS:</span>
						<input id='qps' type='number' placeholder='please input qps number!'
							   defaultValue={qps}
							   {...register("qps", {
								   min: 0
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.qps && errors.qps.type === "min"}>qps no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="qpd">
						<span>QPD:</span>
						<input id='qpd' type='number' placeholder='please input qpd number!'
							   defaultValue={qpd}
							   {...register("qpd", {
								   min: 0
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.qpd && errors.qpd.type === "min"}>qpd no less than 0!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="white_list">
						<span>白名单:</span>
						<input id='white_list' type='text' placeholder='please input white list!'
							   defaultValue={whiteList}
							   {...register("white_list", {
								   required: false,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.white_list && errors.white_list.type === "required"}>white list is required!</SpanWrapper>
				</HintWrapper>
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
	tenant_id: PropTypes.string,
	tenant_key: PropTypes.string,
	party: PropTypes.number,
	qps: PropTypes.number,
	qpd: PropTypes.number,
	white_list: PropTypes.object,
	order_num: PropTypes.number
}

Action.defaultProps = {
	name: '',
	tenant_id: '',
	tenant_key: '',
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
		addTenant(data) {
			return actions.addTenant(data);
		},
		updateTenant(data) {
			return actions.updateTenant(data);
		}
	}
}

export default connect(mapState, mapDispatch)(Action);
