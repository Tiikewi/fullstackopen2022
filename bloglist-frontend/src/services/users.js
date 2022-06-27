import axios from "axios"
const baseUrl = "/api/users"

const getUsers = async () => {
  const request = await axios.get(baseUrl)
  console.log("request data: ", request.data)
  return request.data
}

export default { getUsers }
