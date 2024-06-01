import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GlobalStyle } from './style';
import './statics/iconfont/iconfont.css';
import { store } from './store';
import {Router} from "./route";



function App() {
	return (
		<Provider store={store} >
			<GlobalStyle />
			<HashRouter>
				<Router />
			</HashRouter>
		</Provider>
	);
}

export default App;