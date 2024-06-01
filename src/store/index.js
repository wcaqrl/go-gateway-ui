import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as settingsReducer } from '../pages/home/components/settings/store';
import { reducer as siderReducer } from '../pages/home/components/sider/store';
import { reducer as headerReducer } from '../pages/home/components/header/store';
import { reducer as adminReducer } from '../pages/admin/store';
import { reducer as tenantReducer } from '../pages/tenant/store';
import { reducer as basisReducer } from '../pages/basis/store';
import { reducer as footerReducer } from '../pages/home/components/footer/store';
import { reducer as menuReducer } from '../pages/home/components/sider/components/menu/store';


export const reducer = combineReducers({
	login: loginReducer,
	home: homeReducer,
	settings: settingsReducer,
	sider: siderReducer,
	header: headerReducer,
	admin: adminReducer,
	tenant: tenantReducer,
	basis: basisReducer,
	footer: footerReducer,
	menu: menuReducer,
});


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;
const composeEnhancers = composeWithDevTools({});

export const store = createStore(reducer, composeEnhancers(
	applyMiddleware(thunk)
));
