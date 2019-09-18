import axios from 'axios'
import store from '@/store/index'

export default () => {
  return axios.create({
    baseURL: `http://localhost:3128/`,
    headers: {
      authorization: `${store.state.token}`
    }
  })
}
