import actionType from '../actions/actionType'

export default (state, action) => {
	switch(action.type){
		case actionType.FETCH_DATA_BEGIN: 
			return state.merge({
				dataLoading: true
			})
		case actionType.FETCH_DATA_SUCCESS: 
			return state.merge({
				dataLoading: false,
				data: action.payload
			})
		case actionType.FETCH_DATA_FAILURE: 
			return state.merge({
				dataLoading: false,
				error: action.payload
			})
		default:
			return state;
	}
}
