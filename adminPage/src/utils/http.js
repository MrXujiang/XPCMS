import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if(response) {
    if (response.status === 200 || response.status === 304) {
      return response.data
      // 如果不需要除了data之外的数据，可以直接 return response.data
    } else if (response.status === 401) {
      location.href = '/login';
    } else {
      throw response.data
    }
  } else {
    throw {data:'网络错误'}
  }
  
}

// axios默认参数配置
axios.defaults.baseURL = '/api/v0';
axios.defaults.timeout = 10000;

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (res) => {
        return checkStatus(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (res) => {
        return checkStatus(res)
      }
    )
  },
  del (url, params) {
    return axios({
      method: 'delete',
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (res) => {
        return checkStatus(res)
      }
    )
  }
}
