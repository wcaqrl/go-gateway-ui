import React from 'react';
import { Outlet } from "react-router-dom";
import { AdminWrapper } from './style';


const Admin = () => {
	return (
		<AdminWrapper>
			<Outlet />
		</AdminWrapper>
	);
}

export default Admin;
