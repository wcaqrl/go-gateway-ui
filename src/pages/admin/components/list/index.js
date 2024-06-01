import React, { useEffect, useState} from 'react';
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
			title: '邮箱',
			dataIndex: 'email',
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
						<button type='button' key={`show-admin-${item}`} className='button action-show' onClick={() => navigate('/admin/show/' + item)} ><i className='iconfont '>&#xe697;</i></button>
						<Divider direction={direction} />
						<button type='button' key={`edit-admin-${item}`} className='button action-edit' onClick={() => navigate('/admin/edit/' + item)} ><i className='iconfont '>&#xe678;</i></button>
						<Divider direction={direction} />
						<button type='button' key={`delete-admin-${item}`} className='button action-delete'>
							<PopConfirm
								title={'确定要删除吗?'}
								desc={'数据删除后不可恢复'}
								trigger={['click']}
								placement={'bottomRight'}
								confirmText={'确定'}
								cancelText={'取消'}
								onConfirm={() => deleteAdmin(item)}
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

	const { getAdmins, deleteAdmin } = props;
	const [data, setData] = useState(props.admins.get('list'));
	const [page, setPage] = useState(props.admins.get('page'));
	const [perpage, setPerpage] = useState(props.admins.get('perpage'));
	const [total, setTotal] = useState(props.admins.get('total'));
	const [showPages, setShowPages] = useState(config.show_pages);
	const [isEllipsis, setIsEllipsis] = useState(config.is_ellipsis);

	useEffect(() => {
		getAdmins({...searchData, page, perpage});
	}, [page, perpage, searchData]);

	useEffect(() => {
		setData(props.admins.get('list'));
		setPage(props.admins.get('page'));
		setPerpage(props.admins.get('perpage'));
		setTotal(props.admins.get('total'));
	}, [props.admins]);


	function handleAdd() {
		navigate('/admin/add');
	}

	return (
		<ListWrapper>
			<Search
				fields={['name', 'email', 'order_num', 'is_delete', 'sort']}
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
				href={assembleQuery(searchData, '/admin')}
			/>
		</ListWrapper>
	);
}


const mapState = (state) => {
	return {
		admins: state.getIn(['admin', 'admins']),
	}
}


const mapDispatch = (dispatch) => {
	return {
		getAdmins(params) {
			dispatch(actions.getAdmins(params));
		},
		deleteAdmin(id) {
			dispatch(actions.deleteAdmin(id));
		},
	}
}

export default connect(mapState, mapDispatch)(List);
