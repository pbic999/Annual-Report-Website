import axios from 'axios'

const fetchData = axios.create({baseURL:'http://localhost:319/'})

export default fetchData