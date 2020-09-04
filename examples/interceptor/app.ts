import axios from '../../src/index'

// 请求拦截器中 它的执行顺序是跟添加顺序相反的
axios.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})

axios.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

// 返回拦截器 会输出 hello13
// 按照添加的数序输出
// 但是 '2' 被 eject() 方法给删掉了
axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})

let interceptor = axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})

axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

// 删除拦截器
axios.interceptors.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})
