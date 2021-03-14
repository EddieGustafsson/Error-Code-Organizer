const BASE_API = process.env.REACT_APP_BASE_API + "v1"

const API = {
  "project": `${BASE_API}/project/`,
  "error_code": `${BASE_API}/error_code/`,
  "error_codes": `${BASE_API}/error_codes/`,
  "auth": `${BASE_API}/auth/user/`,
  "login": `${BASE_API}/auth/login/`,
  "register": `${BASE_API}/auth/register/`,
  "user": `${BASE_API}/user/`
}

export default API