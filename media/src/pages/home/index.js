import React from 'react'
import ReactDOM from 'react-dom'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import RouterWrap from './routers'

// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'
// import reducers from './reducers'
import ErrorBoundary from "components/errorBoundary"

// const middleWares = [thunk];

// const store = compose(applyMiddleware(...middleWares))(createStore)(reducers);

// const unsubscribe = store.subscribe(() =>
//   	console.log("store: ", store.getState())
// )

function render() {
	ReactDOM.render(
		(<LocaleProvider locale={zhCN}>
				<ErrorBoundary>
					{/* <Provider store={store}> */}
						<RouterWrap />
					{/* </Provider> */}
				</ErrorBoundary>
		</LocaleProvider>), document.getElementById('root')
	);
}

// 支持react热替换
if(module.hot){
	module.hot.accept(RouterWrap, render);
}

render()
