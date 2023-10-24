// axios-case-converterは、snake_case / camelCaseを変換するため利用
import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

// ヘッダーはケバブケースのままで良いので、適用を外す
const options = {
  ignoreHeaders: true
}

// URLの共通部分を設定
export const client = applyCaseMiddleware(
  axios.create({
    //Cookieを利用
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_APP_API_DOMAIN
  }),
  options
)
