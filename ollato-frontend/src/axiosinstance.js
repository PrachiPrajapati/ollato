import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://3.7.98.19:1340/api'
})

// eslint-disable-next-line dot-notation
instance.defaults.headers.common['Authorization'] = 'token'

export default instance
