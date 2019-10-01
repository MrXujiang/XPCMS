import actionType from './actionType'
import { ajax } from 'utils/common'

class Actions {
    static start() {
        return {
            type: actionType.FETCH_CONFIG_BEGIN
        }
    }

    static ok(data, cb) {
        cb && 'function' === typeof cb && cb(data);
        return {
            type: actionType.FETCH_CONFIG_SUCCESS,
            payload: data
        }
    }

    static fail(data, cb) {
        cb && 'function' === typeof cb && cb(data);
        return {
            type: actionType.FETCH_CONFIG_FAIL
        }
    }
}

export default (cb) => {
	return (dispatch, getState) => {
        dispatch(Actions.start());
		ajax({
			url: `/wt/config/get`,
			method: 'post',
		}).then(res => {
			if (res.state === '200') {
				if(res.data && res.data.config) {
					dispatch(Actions.ok(res.data.config, cb));
				}
			}
		}).catch(error => dispatch(Actions.fail(error, cb)))
	}
}