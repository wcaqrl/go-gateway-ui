import React from 'react';
import { Outlet } from "react-router-dom";
import { BasisWrapper } from './style';


const Basis = () => {
	return (
		<BasisWrapper>
			<Outlet />
		</BasisWrapper>
	);
}

export default Basis;
