import React from 'react';
import { Outlet } from "react-router-dom";
import { TenantWrapper } from './style';


const Tenant = () => {
	return (
		<TenantWrapper>
			<Outlet />
		</TenantWrapper>
	);
}

export default Tenant;
