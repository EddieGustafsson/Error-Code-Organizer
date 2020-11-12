const BASE_API = process.env.REACT_APP_BASE_API + "v1"

const API = {
  "project": `${BASE_API}/project/`,
  "error_code": `${BASE_API}/error_code/`,
  "error_codes": `${BASE_API}/error_codes/`,
  "user": `${BASE_API}/auth/user/`,
  "login": `${BASE_API}/auth/login/`,
  "register": `${BASE_API}/auth/register/`
}

export default API