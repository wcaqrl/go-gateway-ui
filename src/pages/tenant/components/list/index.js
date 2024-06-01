import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { ListWrapper, AddButton } from '../../../home/components/content/style';
import { actions } from "../../store";
import { TimeUtil } from "../../../../utils/time";
import { TransUtil } from "../../../../utils/trans";
import Paginator from "../../../../components/paginator";
import { fromJS } from "immutable";
import Table from "../../../../components/table";
import Divider from "../../../../components/divider";
import config from "../../../../config";
import Search from "../../../../components/search";
import { assembleQuery } from "../../../../utils/query";
import PopConfirm from "../../../../components/pop-confirm";


function List(props) {

	const navigate = useNavigate();
	const timeUitl = new TimeUtil();
	const transUtil = new TransUtil();
	let rowKey = 'id';
	let columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			layout: {
				width: '50px',
			},
		},
		{
			title: '名称',
			dataIndex: 'name',
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: '租户ID',
			dataIndex: 'tenant_id',
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: '租户密匙',
			dataIndex: 'tenant_key',
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: '应用类型',
			dataIndex: 'party',
			layout: {
				width: '60px',
			},
		},
		{
			title: 'QPS',
			dataIndex: 'qps',
			layout: {
				width: '50px',
			},
		},
		{
			title: 'QPD',
			dataIndex: 'qpd',
			layout: {
				width: '50px',
			},
		},
		{
			title: '白名单',
			dataIndex: 'white_list',
			render: (val) => JSON.stringify(val),
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: '排序值',
			dataIndex: 'order_num',
			layout: {
				width: '50px',
			},
		},
		{
			title: '状态',
			dataIndex: 'is_delete',
			layout: {
				width: '50px',
			},
			render: (text) => { return <span style={{color: transUtil.getDeleteColor(text)}}>{transUtil.getDeleteText(text)}</span>},
		},
		{
			title: '创建时间',
			dataIndex: 'create_time',
			layout: {
				width: '130px',
			},
			style: {
				textAlign: 'center',
			},
			render: (text) => timeUitl.timetrans(text),
		},
		{
			title: '更新时间',
			dataIndex: 'update_time',
			layout: {
				width: '130px',
			},
			style: {
				textAlign: 'center',
			},
			render: (text) => timeUitl.timetrans(text),
		},
		{
			title: '操作',
			fixed: 'right',
			keyName: 'operation',
			layout: {
				width: '100px',
			},
			style: {
				textAlign: 'center',
				verticalAlign: 'middle',
			},
			render: (item) => {
				let direction = 'vertical';
				return (
					<>
						<button type='button' key={`show-tenant-${item}`} className='button action-show' onClick={() => navigate('/tenant/show/' + item)} ><i className='iconfont '>&#xe697;</i></button>
						<Divider direction={direction} />
						<button type='button' key={`edit-tenant-${item}`} className='button action-edit' onClick={() => navigate('/tenant/edit/' + item)} ><i className='iconfont '>&#xe678;</i></button>
						<Divider direction={direction} />
						<button type='button' key={`delete-tenant-${item}`} className='button action-delete'>
							<PopConfirm
								title={'确定要删除吗?'}
								desc={'数据删除后不可恢复'}
								trigger={['click']}
								placement={'bottomRight'}
								confirmText={'确定'}
								cancelText={'取消'}
								onConfirm={() => deleteTenant(item)}
								onCancel={()=>{}}
							><i className='iconfont '>&#xe636;</i>
							</PopConfirm>
					</button>
					</>
				);
			},
		}
	];
	const defaultSearchData = {};
	let [searchData, setSearchData] = useState(defaultSearchData);

	const { getTenants, deleteTenant } = props;
	const [data, setData] = useState(props.tenants.get('list'));
	const [page, setPage] = useState(props.tenants.get('page'));
	const [perpage, setPerpage] = useState(props.tenants.get('perpage'));
	const [total, setTotal] = useState(props.tenants.get('total'));
	const [showPages, setShowPages] = useState(config.show_pages);
	const [isEllipsis, setIsEllipsis] = useState(config.is_ellipsis);

	useEffect(() => {
		getTenants({...searchData, page, perpage});
	}, [page, perpage, searchData]);

	useEffect(() => {
		setData(props.tenants.get('list'));
		setPage(props.tenants.get('page'));
		setPerpage(props.tenants.get('perpage'));
		setTotal(props.tenants.get('total'));
	}, [props.tenants]);


	function handleAdd() {
		navigate('/tenant/add');
	}

	return (
		<ListWrapper>
			<Search
				fields={['name', 'tenant_id', 'party', 'order_num', 'is_delete', 'sort']}
				sortFields={['id', 'order_num', 'update_time']}
				defaultSearchData={defaultSearchData}
				setSearchData={setSearchData}
				setPage={setPage}
			/>
			<AddButton onClick={handleAdd}>新建</AddButton>
			<Table columns={fromJS(columns)} data={data} rowKey={rowKey}/>
			<Paginator
				page={page}
				perpage={perpage}
				total={total}
				showPages={showPages}
				isEllipsis={isEllipsis}
				setPage={setPage}
				href={assembleQuery(searchData, '/tenant')}
			/>
		</ListWrapper>
	);
}


const mapState = (state) => {
	return {
		tenants: state.getIn(['tenant', 'tenants']),
	}
}


const mapDispatch = (dispatch) => {
	return {
		getTenants(params) {
			dispatch(actions.getTenants(params));
		},
		deleteTenant(id) {
			dispatch(actions.deleteTenant(id));
		},
	}
}

export default connect(mapState, mapDispatch)(List);
