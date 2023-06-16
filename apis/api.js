import axios from 'axios'

//
/// baseUrl
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

//
/// 마켓 테이블
export const fetchGetExchanges = async () => {
  const result = await API.get('/exchanges')
  return result
}

//
/// 마켓 거래쌍목록
export const fetchGetExchangeSet = async id => {
  const result = await API.get(`/exchanges/${id}/tickers`)
  return result
}
