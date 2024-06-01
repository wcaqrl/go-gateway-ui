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
			layout: {
				width: '100px',
			},
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: '描述',
			dataIndex: 'description',
			layout: {
				width: '100px',
			},
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: '负载类型',
			dataIndex: 'load_type',
		},
		{
			title: '开启鉴权',
			dataIndex: 'open_auth',
		},
		{
			title: '轮询方式',
			dataIndex: 'round_type',
		},
		{
			title: '服务端主机权重',
			dataIndex: 'server_host_list',
			layout: {
				width: '120px',
			},
			render: (val) => JSON.stringify(val),
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: '匹配类型',
			dataIndex: 'http_rule_type',
		},
		{
			title: '规则内容',
			dataIndex: 'http_rule',
			ellipsis: true,
			showTooltip: true,
		},
		{
			title: 'TCP端口',
			dataIndex: 'tcp_port',
		},
		{
			title: 'GRPC端口',
			dataIndex: 'grpc_port',
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
				width: '120px',
			},
			style: {
				textAlign: 'center',
				verticalAlign: 'middle',
			},
			render: (item) => {
				let direction = 'vertical';
				return (
					<>
						<button type='button' key={`stat-basis-${item}`} className='button action-stat' onClick={() => navigate('/basis/stat/' + item)} ><i className='iconfont '>&#xe815;</i></button>
						<Divider direction={direction} />
						<button type='button' key={`show-basis-${item}`} className='button action-show' onClick={() => navigate('/basis/show/' + item)} ><i className='iconfont '>&#xe697;</i></button>
						<Divider direction={direction} />
						<button type='button' key={`edit-basis-${item}`} className='button action-edit' onClick={() => navigate('/basis/edit/' + item)} ><i className='iconfont '>&#xe678;</i></button>
						<Divider direction={direction} />
						<button type='button' key={`delete-basis-${item}`} className='button action-delete'>
							<PopConfirm
								title={'确定要删除吗?'}
								desc={'数据删除后不可恢复'}
								trigger={['click']}
								placement={'bottomRight'}
								confirmText={'确定'}
								cancelText={'取消'}
								onConfirm={() => deleteBasis(item)}
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

	const { getBases, deleteBasis } = props;
	const [data, setData] = useState(props.bases.get('list'));
	const [page, setPage] = useState(props.bases.get('page'));
	const [perpage, setPerpage] = useState(props.bases.get('perpage'));
	const [total, setTotal] = useState(props.bases.get('total'));
	const [showPages, setShowPages] = useState(config.show_pages);
	const [isEllipsis, setIsEllipsis] = useState(config.is_ellipsis);

	useEffect(() => {
		getBases({...searchData, page, perpage});
	}, [page, perpage, searchData]);

	useEffect(() => {
		setData(props.bases.get('list'));
		setPage(props.bases.get('page'));
		setPerpage(props.bases.get('perpage'));
		setTotal(props.bases.get('total'));
	}, [props.bases]);


	function handleAdd() {
		navigate('/basis/add');
	}

	return (
		<ListWrapper>
			<Search
				fields={['name', 'round_type', 'http_rule_type', 'http_rule', 'order_num', 'is_delete', 'sort']}
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
				href={assembleQuery(searchData, '/basis')}
			/>
		</ListWrapper>
	);
}


const mapState = (state) => {
	return {
		bases: state.getIn(['basis', 'bases']),
	}
}


const mapDispatch = (dispatch) => {
	return {
		getBases(params) {
			dispatch(actions.getBases(params));
		},
		deleteBasis(id) {
			dispatch(actions.deleteBasis(id));
		},
	}
}

export default connect(mapState, mapDispatch)(List);
