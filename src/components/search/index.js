import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import './search.css';
import {TransUtil} from "../../utils/trans";
import {inArray} from "../../utils/str";


function Search(props) {

	const {fields, sortFields, defaultSearchData, setSearchData, setPage}   = props;
	const [name, setName]   = useState(defaultSearchData.name ? defaultSearchData.name : '');
	const [email, setEmail] = useState(defaultSearchData.email ? defaultSearchData.email : '');
	const [tenantId, setTenantId] = useState(defaultSearchData.tenant_id ? defaultSearchData.tenant_id : '');
	const [party, setParty] = useState(defaultSearchData.party !== undefined ? defaultSearchData.party : '');
	const [roundType, setRoundType] = useState(defaultSearchData.round_type !== undefined ? defaultSearchData.round_type : '');
	const [httpRuleType, setHttpRuleType] = useState(defaultSearchData.http_rule_type !== undefined ? defaultSearchData.http_rule_type : '');
	const [httpRule, setHttpRule] = useState(defaultSearchData.http_rule ? defaultSearchData.http_rule : '');
	const [orderNum, setOrderNum] = useState(defaultSearchData.order_num !== undefined ? defaultSearchData.order_num : '');
	const [isDelete, setIsDelete] = useState(defaultSearchData.is_delete !== undefined ? defaultSearchData.is_delete : '');
	const [sort, setSort] = useState(defaultSearchData.sort ? defaultSearchData.sort : '');
	const transUtil = new TransUtil();
	let deletes = transUtil.getDeleteMap();
	const sorts = {
		'asc':   '升序',
		'desc':  '降序',
	};
	const initSortFields = {
		'id': 'ID',
		'order_num': '排序值',
		'update_time': '更新时间',
	};

	let sortMap = {};
	if (sortFields) {
		for (let f of sortFields) {
			if (initSortFields.hasOwnProperty(f)) {
				for (let k2 in sorts) {
					let tmpKey = f + '.' + k2;
					sortMap[tmpKey] = initSortFields[f] + sorts[k2];
				}
			}
		}
	}


	const fieldMap = {
		'name': {
			'name': '名称',
			'value': name,
			'type': 'text',
			'func': setName,
		},
		'order_num': {
			'name': '排序值',
			'value': orderNum,
			'type': 'number',
			'func': setOrderNum,
		},
		'is_delete': {
			'name': '状态',
			'value': isDelete,
			'type': 'select',
			'func': setIsDelete,
			'options': deletes,
		},
		'sort': {
			'name': '排序',
			'value': sort,
			'type': 'select',
			'func': setSort,
			'options': sortMap,
		},
		'email': {
			'name': '邮箱',
			'value': email,
			'type': 'email',
			'func': setEmail,
		},
		'tenant_id': {
			'name': '租户ID',
			'value': tenantId,
			'type': 'text',
			'func':  setTenantId,
		},
		'party': {
			'name': '应用类型',
			'value': party,
			'type': 'number',
			'func': setParty,
		},
		'round_type': {
			'name': '轮询方式',
			'value': roundType,
			'type': 'number',
			'func': setRoundType,
		},
		'http_rule_type': {
			'name': '匹配类型',
			'value': httpRuleType,
			'type': 'number',
			'func': setHttpRuleType,
		},
		'http_rule': {
			'name': '规则',
			'value': httpRule,
			'type': 'text',
			'func': setHttpRule,
		},
	};


	function handleSubmit(e) {
		e.preventDefault();
		let data = {};
		for (let f of fields) {
			if (f === 'name' && !!name) {
				data[f] = name;
			} else if (f === 'order_num' && !!orderNum && !isNaN(orderNum)) {
				data[f] = parseInt(orderNum);
			} else if (f === 'is_delete' && !!isDelete && !isNaN(isDelete)) {
				data[f] = parseInt(isDelete);
			}  else if (f === 'party' && !!party && !isNaN(party)) {
				data[f] = parseInt(party);
			} else if (f === 'sort' && !!sort) {
				data[f] = sort;
			} else if (f === 'email' && !!email) {
				data[f] = email;
			} else if (f === 'tenant_id' && !!tenantId) {
				data[f] = tenantId;
			} else if (f === 'http_rule' && !!httpRule) {
				data[f] = httpRule;
			}
		}
		setPage(1);
		setSearchData(data);
	}


	function handleReset(e) {
		e.preventDefault();
		for (let f of fields) {
			if (fieldMap.hasOwnProperty(f)) {
				fieldMap[f]['func'](defaultSearchData.hasOwnProperty(f) ? defaultSearchData[f] : '');
			}
		}
	}


	return (
		<form onSubmit={handleSubmit} onReset={handleReset} className='search'>
			{
				fields.map((f) => {
					if (fieldMap[f]['type'] === 'select') {
						const options = Object.keys(fieldMap[f]['options']);
						return <label htmlFor={f} key={f} className='search-label'>
							<span>{fieldMap[f]['name']}:</span>
							<select id={f} name={f}
									value={fieldMap[f]['value']}
									onChange={(e) => fieldMap[f]['func'](e.target.value)}>
								<option value={null}>未知</option>
								{
									options.map((d) => {
										return <option key={d} value={d} >{fieldMap[f]['options'][d]}</option>
									})
								}
							</select>
						</label>
					} else {
						return <label htmlFor={f} key={f} className='search-label'>
							<span>{fieldMap[f]['name']}:</span>
							<input id={f} name={f} type={fieldMap[f]['type']}
								   value={fieldMap[f]['value']}
								   onChange={(e) => fieldMap[f]['func'](e.target.value)}/>
						</label>
					}
				})
			}
			<button className='search-submit' type="submit">查询</button>
			<button className='search-reset'  type="reset">重置</button>
		</form>
	);
}


Search.propTypes = {
	fields: PropTypes.array.isRequired,
	sortFields: PropTypes.array.isRequired,
	defaultSearchData: PropTypes.object.isRequired,
	setSearchData: PropTypes.func.isRequired,
	setPage: PropTypes.func.isRequired,
}

Search.defaultProps = {

}


export default Search;
