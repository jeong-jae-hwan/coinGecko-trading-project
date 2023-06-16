import { Cookies } from 'react-cookie'

const cookies = new Cookies()

/**
 *
 * @param {*} name 쿠키의 키
 * @param {*} value 쿠키의 값
 * @param {*} options
 */
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, {
    path: '/',
    // domain: process.env.COOKIE_DOMAIN,
  })
}

/**
 *
 * @param {*} name
 * @returns
 */
export const getCookie = name => {
  return cookies.get(name)
}

export const removeCookie = name => {
  cookies.remove(name, { path: '/' })
}

// export const removeCookie = name => {
//   cookies.remove(name, { path: '/', domain: process.env.COOKIE_DOMAIN })
// }
