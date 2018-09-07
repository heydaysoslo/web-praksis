// import base64 from 'base-64'
import WPAPI from 'wpapi'
import base64 from 'base-64'
// import URL from 'url-parse'
// import Cookie from 'js-cookie'
// https://yarnpkg.com/en/package/wpapi

// const url = new URL(window.location.href);

const wp = new WPAPI({
  endpoint: 'http://praksis.test/api/'
  // username: 'preview',
  // password: '5DMpJK2FIbdy#vh8DFK3j@*5'
  // username: 'martinsanne',
  // password: '8BejSi9!jv@3s)Z5gu'
  // token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wcmFrc2lzLnRlc3QiLCJpYXQiOjE1MzYzMDIyODksIm5iZiI6MTUzNjMwMjI4OSwiZXhwIjoxNTM2OTA3MDg5LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.1CyISEvbRwbfuLnUtjAiG9Wo7DWy8y5dSN9rHABR_oQ'
})

// wp.myCustomResource = wp.registerRoute('v1', '/geolocation/')
// wp.myCustomResource()
//   .then(res => console.log('res', res))
//   .catch(err => console.log('err', err))

export const getPosts = (page = 1) => {
  return wp
    .posts()
    .perPage(10)
    .page(page)
}

export const getPostBySlug = slug => {
  return wp
    .posts()
    .slug(slug)
    .embed()
}

export const getPageBySlug = slug => {
  return wp.pages().slug(slug)
}

export const getProtectedPost = (id, password) => {
  return wp
    .posts()
    .id(id)
    .password(password)
}

const parseUserCredentials = hash => {
  const hashDecoded = base64.decode(hash)
  const hashParts = hashDecoded.split('*|*')
  return {
    username: hashParts[0],
    password: hashParts[1]
  }
}

export const getPreview = ({ id, hash, postType }) => {
  if (postType === 'post') {
    return wp
      .posts()
      .id(id)
      .revisions()
      .auth(parseUserCredentials(hash))
  } else if (postType === 'page') {
    return wp
      .pages()
      .id(id)
      .revisions()
      .auth(parseUserCredentials(hash))
  }
}

export const getMe = () => {
  return wp.users().me()
  // .setHeaders(
  //   'Authorization',
  //   'Bearer ' +
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wcmFrc2lzLnRlc3QiLCJpYXQiOjE1MzYzMDIyODksIm5iZiI6MTUzNjMwMjI4OSwiZXhwIjoxNTM2OTA3MDg5LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.1CyISEvbRwbfuLnUtjAiG9Wo7DWy8y5dSN9rHABR_oQ'
  // )

  // const headers = new Headers()
  // const username = 'martinsanne'
  // const password = 'Jrfn fTS2 dmZX KD29 IHDT aZrI'
  // headers.set(
  //   'Authorization',
  //   'Basic ' + base64.encode(username + ':' + password)
  // )
  // return fetch(`http://praksis.test/api/wp/v2/users/me`, {
  //   headers
  // }).then(res => res.json())
}

// const allCookies = Cookie.get()
// console.log(allCookies)

// https://oprea.rocks/blog/enable-jwt-authentication-for-the-wordpress-rest-api/
// getMe().then(res => {
//   console.log(res)
// })

export default wp
