import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'

import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle, Fonts } from './stylesheet'
import './index.css'
import './stylesheet/fonts.js'
import './stylesheet/animation.js'
import './stylesheet/globalStyles.js'
import './stylesheet/vars.js'

import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Fonts />
					<GlobalStyle />
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
