import { fromJS } from 'immutable'
import configReducer from './configReducer'
// 将多个reducer合并成一个，并将state合并
import reduceReducers from 'reduce-reducers'

const initialState = fromJS({
	error: null,
	dataLoading: true,
	data: null
})

const reducer = reduceReducers(
    (state = initialState, action) => configReducer(state, action)
);

export default reducer