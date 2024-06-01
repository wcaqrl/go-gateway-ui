import React from 'react';
import { connect } from 'react-redux';
import { actions } from './store';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { MenuWrapper, MenuItem, MenuTitle, MenuSub } from './style';


function Menu(props) {
	const { menu, fold, changeSelected } = props;
	return (
		<MenuWrapper>
			{
				genMenuTree(menu, fold, changeSelected)
			}
		</MenuWrapper>
	);
}


function CustomLink({ children, to, ...props }: LinkProps) {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });

	return (
		<>
			<Link
				/*style={
					{
						textDecoration: match ? "underline" : "none"
					}
				}*/
				// className={ match ? 'sub-menu active-menu' : 'sub-menu'}
				to={to}
				{...props}
			>
				{children}
			</Link>
			{/*{match && " (active)"}*/}
		</>
	);
}


function genMenuTree(menu, fold, changeSelected) {
	return menu.map((m) => {
		if (!m.get('children')) {
			return (
				<MenuSub fold={fold} key={m.get('id')} subSelected={m.get('subSelected')} >
					<li onClick={() => changeSelected(m.get('trail'))}>
						<CustomLink to={m.get('link_to')} >
							{m.get('name')}
						</CustomLink>
					</li>
				</MenuSub>
			);
		}
		return (
			<MenuItem key={m.get('id')}>
				<MenuTitle fold={fold} titleSelected={m.get('titleSelected')} onClick={() => changeSelected(m.get('trail'))}>
					<i className='iconfont' dangerouslySetInnerHTML={{ __html: m.get('icon') }}></i>
					<span>{m.get('name')}</span>
					{ fold ? <i className='iconfont'>&#xe686;</i> : <i className='iconfont'>&#xe685;</i> }
				</MenuTitle>
				{ m.get('titleSelected') ? genMenuTree(m.get('children'), fold, changeSelected) : ''}
			</MenuItem>
		);
	});
}


const mapState = (state) => {
	return {
		menu: state.getIn(['menu', 'menu']),
		fold: state.getIn(['sider', 'fold']),
	}
};


const mapDispatch = (dispatch) => ({
	changeSelected(trail) {
		dispatch(actions.changeSelected(trail));
	}
});

export default connect(mapState, mapDispatch)(Menu);
