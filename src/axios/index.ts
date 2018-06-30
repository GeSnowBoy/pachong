import axios from 'axios'
import {baseURL} from '@/config'

let axiosCopy = axios.create({
    baseURL
})

export default axiosCopy
