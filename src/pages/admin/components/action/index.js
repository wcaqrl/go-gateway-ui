import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import {ActionWrapper, HintWrapper, InputWrapper, SpanWrapper, SubmitWrapper} from './style';
import PropTypes from "prop-types";
import {actions} from "../../store";


function Action(props){

	const { handleSubmit, reset, watch, control, register, formState: {errors} } = useForm();
	const { getAdmin, addAdmin, updateAdmin } = props;
	const [name ,setName] = useState(props.name);
	const [email ,setEmail] = useState(props.email);
	const [orderNum ,setOrderNum] = useState(props.order_num);
	const [isDelete ,setIsDelete] = useState(props.is_delete);
	const [password, setPassword] = useState(props.password);

	let { id } = useParams();
	let [load, setLoad] = useState(!id);
	useEffect(async () => {
		if (id) {
			 let data = await getAdmin(id);
			 if (data && data.name) {
			 	await setName(data.name);
			 }
			 if (data && data.email) {
				 await setEmail(data.email);
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
			email: data.email,
		}
		if (!!data.order_num) {
			tmpData.order_num = parseInt(data.order_num);
		}
		if (!id) {
			tmpData.password = data.password;
		} else {
			tmpData.id = id;
		}
		id ? updateAdmin(tmpData) : addAdmin(tmpData)
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
					<label htmlFor="email">
						<span>邮箱:</span>
						<input id='email' type='email' placeholder='please input an email!'
							   defaultValue={email}
							   {...register("email", {
								   required: true,
								   pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.email && errors.email.type === "required"}>email is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.email && errors.email.type === "pattern"}>email format invalid!</SpanWrapper>
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
				{ id ? '' :
					<>
						<InputWrapper>
							<label htmlFor="password">
								<span>密码:</span>
								<input id='password' type='password' placeholder='please input password!'
									   defaultValue={password}
									   {...register("password", {
										   required: true,
										   maxLength: 16,
										   validate: (val) => val.length >= 6,
									   })}
								/>
							</label>
						</InputWrapper>
						<HintWrapper>
							<SpanWrapper isDisplay={errors.password && errors.password.type === "required"}>password is required!</SpanWrapper>
							<SpanWrapper isDisplay={errors.password && errors.password.type === "maxLength"}>name length no more than 16 characters!</SpanWrapper>
							<SpanWrapper isDisplay={errors.password && errors.password.type === "validate"}>name length no less than 6 characters!</SpanWrapper>
						</HintWrapper>
					</>
				}
				<input id="id" name="id" type="hidden" defaultValue={id} />
				<SubmitWrapper><input type="submit" value={id ? '编辑' : '添加'} /></SubmitWrapper>
			</form> : '' }
		</ActionWrapper>
	);
}


Action.propTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
	order_num: PropTypes.number
}

Action.defaultProps = {
	name: '',
	email: '',
	password: '',
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
		addAdmin(data) {
			return actions.addAdmin(data);
		},
		updateAdmin(data) {
			return actions.updateAdmin(data);
		}
	}
}

export default connect(mapState, mapDispatch)(Action);
