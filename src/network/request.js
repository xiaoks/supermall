import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL : 'http://123.207.32.32:8000',
  })


  return instance(config)
}

export function request2(config) {
  const instance2 = axios.create({
    // baseURL: 'localhost:8080'
  })

  return instance2(config)
}
