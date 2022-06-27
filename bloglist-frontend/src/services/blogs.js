import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log("from blog service: ", newObject, config)
  const response = await axios.post(baseUrl, newObject, config)
  console.log("response: ", response)
  return response.data
}

const edit = async (newObject, id) => {
  const url = `${baseUrl}/${id}`
  axios.put(url, newObject)
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${id}`

  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, edit, remove }
