import React from 'react';
import { MaskWrapper } from './style';

const Mask = (props) => {
	return (
		<MaskWrapper open={props.open} />
	);
}

export default Mask;