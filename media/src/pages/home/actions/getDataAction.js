import actionType from './actionType'
import { ajax } from 'utils/common'

class Actions {
    static start() {
        return {
            type: actionType.FETCH_DATA_BEGIN
        }
    }

    static ok(data, cb) {
        cb && 'function' === typeof cb && cb(data);
        return {
            type: actionType.FETCH_DATA_SUCCESS,
            data: data
        }
    }

    static fail(data, cb) {
        cb && 'function' === typeof cb && cb(data);
        return {
            type: actionType.FETCH_DATA_FAILURE
        }
    }
}

export default (cb) => {
	return (dispatch, getState) => {
		dispatch(Actions.start());
		ajax({
			url: "/suite/config/"
		}).then(res => {
			const pageData = res.data.config;
			dispatch(Actions.ok(pageData, cb));
		}).catch(error => dispatch(Actions.fail(error, cb)))
	}
}