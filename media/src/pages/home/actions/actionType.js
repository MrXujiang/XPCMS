import keyMirror from 'keymirror'
/**
 * keymirror作用是提供压缩优化，会自动生成和键一样的对应的值
 */

export default keyMirror({
    FETCH_DATA_BEGIN: null,
    FETCH_DATA_SUCCESS: null,
    FETCH_DATA_FAILURE: null,
    FETCH_CONFIG_BEGIN: null,
    FETCH_CONFIG_SUCCESS: null,
    FETCH_CONFIG_FAIL: null,
})