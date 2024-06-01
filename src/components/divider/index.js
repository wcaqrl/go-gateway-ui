import React from 'react';
import './divider.css';


function Divider(props) {

	const { direction } = props;
	return (
		<div className={direction === 'vertical' ? 'divider-vertical' : 'divider-horizontal'}>
		</div>
	);
}

export default Divider;
