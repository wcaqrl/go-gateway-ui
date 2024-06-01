import React from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {connect} from 'react-redux';
import {ChangeWrapper, HintWrapper, InputWrapper, SpanWrapper, SubmitWrapper} from './style';
import PropTypes from "prop-types";
import {actions} from "../../store";
import PopConfirm from "../../../../components/pop-confirm";


function Change(props){

	const { handleSubmit, watch, register, formState: {errors} } = useForm();
	const { changeAdmin, resetAdmin } = props;

	let { id } = useParams();

	function onSubmit(data) {
		let tmpData = {
			id: id,
			old_password: data.old_password,
			password: data.password,
			confirm_password: data.confirm_password,
		}
		changeAdmin(tmpData);
	}

	return (
		<ChangeWrapper >
			<form onSubmit={handleSubmit(onSubmit)}>
				<InputWrapper>
					<label htmlFor='old_password'>
						<span>旧密码:</span>
						<input id='old_password' type='password' placeholder='please input old password!'
							   defaultValue=''
							   {...register("old_password", {
								   required: true,
								   minLength: 6,
								   maxLength: 18,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.old_password && errors.old_password.type === "required"}>old password is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.old_password && errors.old_password.type === "minLength"}>password length no less than 6 characters!</SpanWrapper>
					<SpanWrapper isDisplay={errors.old_password && errors.old_password.type === "maxLength"}>password length no more than 18 characters!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor='password'>
						<span>新密码:</span>
						<input id='password' type='password' placeholder='please input new password!'
							   defaultValue=''
							   {...register("password", {
								   required: true,
								   minLength: 6,
								   maxLength: 18,
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.password && errors.password.type === "required"}>new password is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.password && errors.password.type === "minLength"}>password length no less than 6 characters!</SpanWrapper>
					<SpanWrapper isDisplay={errors.password && errors.password.type === "maxLength"}>password length no more than 18 characters!</SpanWrapper>
				</HintWrapper>
				<InputWrapper>
					<label htmlFor="confirm_password">
						<span>确认新密码:</span>
						<input id='confirm_password' type='password' placeholder='please input confirm password!'
							   defaultValue=''
							   {...register("confirm_password", {
								   required: true,
								   validate: val => val === watch('password'),
							   })}
						/>
					</label>
				</InputWrapper>
				<HintWrapper>
					<SpanWrapper isDisplay={errors.confirm_password && errors.confirm_password.type === "required"}>confirm password is required!</SpanWrapper>
					<SpanWrapper isDisplay={errors.confirm_password && errors.confirm_password.type === "validate"}>confirm password must consist with new password!</SpanWrapper>
				</HintWrapper>
				<input id="id" name="id" type="hidden" defaultValue={id} />
				<SubmitWrapper>
					<input type="submit" value='修改密码' />
					<PopConfirm
						title={'确定要重置密码吗?'}
						desc={'密码将被重置成123456'}
						trigger={['click']}
						placement={'bottom'}
						confirmText={'确定'}
						cancelText={'取消'}
						onConfirm={() => resetAdmin(id)}
						onCancel={()=>{}}
					><input type="button" value='重置密码'/>
					</PopConfirm>
				</SubmitWrapper>
			</form>
		</ChangeWrapper>
	);
}


Change.propTypes = {
	old_password: PropTypes.string,
	password: PropTypes.string,
	confirm_password: PropTypes.string,
}

Change.defaultProps = {
	old_password: '',
	password: '',
	confirm_password: '',
}


const mapState = (state) => {
	return {

	}
}


const mapDispatch = (dispatch) => {
	return {
		changeAdmin(data) {
			return actions.changeAdmin(data);
		},
		resetAdmin(id) {
			return actions.resetAdmin(id);
		}
	}
}

export default connect(mapState, mapDispatch)(Change);
