import React from 'react';
import ReactDOM from 'react-dom';
import { MetaMaskProvider } from "metamask-react";
import App from './components/App';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import './css/index.css';

ReactDOM.render(
	<React.StrictMode>
		<MetaMaskProvider>
            <App />
        </MetaMaskProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
