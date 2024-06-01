import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './table.css';
import {randStr} from "../../utils/str";


function Table(props) {

	const { columns, data, rowKey } = props;

	return (
		<div className='table-container'>
			<table className='table'>
				<thead>
					<tr>
						{
							columns.map((item) => {
								return <th key={item.get('title')}
										   style={item.get('layout') ? item.get('layout').toObject() : {}}
								>{item.get('title')}</th>
							})
						}
					</tr>
				</thead>
				<tbody>
				{
					data.map((item) => {
						return (
							<tr key={item.get(rowKey)}>
								{
									columns.map((column) => {
										if (column.get('dataIndex')) {
											let val = item.get(column.get('dataIndex'));
											if (column.get('render')) {
												val = column.get('render')(val);
											}
											return <td
												key={`show-${item.get(rowKey)}-${randStr()}`}
												style={column.get('style') ? column.get('style').toObject() : {}}
												title={column.get('showTooltip') ? val : ''}
											>{val}</td>
										} else if (column.get('keyName')) {
											let key = item.get(column.get('keyName'));
											if (column.get('render')) {
												return <td
													key={`show-${item.get(rowKey)}-${key}`}
													style={column.get('style') ? column.get('style').toObject() : {}}
												>{column.get('render')(item.get(rowKey))}</td>
											}
										}
									})
								}
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>
	);
}

Table.propTypes = {
	columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	rowKey: PropTypes.string,
}

Table.defaultProps = {
	columns: [],
	data: [],
	rowKey: '',
}

export default Table;
