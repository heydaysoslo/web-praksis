import WPAPI from 'wpapi'
import base64 from 'base-64'

const wp = new WPAPI({
  endpoint: 'http://praksis.test/api'
})

// Create custom routes
wp.navMenus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z0-9_-]+)')
wp.search = wp.registerRoute('relevanssi/v1', '/search/')

const parseUserCredentials = hash => {
  const hashDecoded = base64.decode(hash)
  const hashParts = hashDecoded.split('*|*')
  return {
    username: hashParts[0],
    password: hashParts[1]
  }
}

export const search = queryTerm => {
  return wp.search().param('s', queryTerm)
}

export const getPostsByCategory = id => {
  return wp.posts().categories(id)
}

export const getPostsByTag = id => {
  return wp.posts().tags(id)
}

export const getTags = () => {
  return wp.tags()
}

export const getCategoryBySlug = slug => {
  return wp
    .categories()
    .slug(slug)
    .then(cats => cats[0])
}

export const getTagBySlug = slug => {
  return wp
    .tags()
    .slug(slug)
    .then(tags => tags[0])
}

export const getPosts = (page = 1) => {
  return wp
    .posts()
    .perPage(10)
    .page(page)
}

export const getNavMenu = slug => {
  return wp.navMenus().id(slug)
}

export const getPostBySlug = slug => {
  return wp
    .posts()
    .slug(slug)
    .embed()
    .then(res => res[0])
}

export const getPageBySlug = slug => {
  return wp
    .pages()
    .slug(slug)
    .embed()
    .then(res => res[0])
}

export const getProtectedPost = (id, password) => {
  return wp
    .posts()
    .id(id)
    .password(password)
}

export const getProtectedPage = (id, password) => {
  return wp
    .pages()
    .id(id)
    .password(password)
}

export const getProtectedObject = (id, type, password) => {
  let promise
  switch (type) {
    case 'post':
      promise = getProtectedPost(id, password)
      break
    default:
      promise = getProtectedPage(id, password)
      break
  }
  return promise
}

export const getObjectBySlug = ({ type, slug }) => {
  let promise
  switch (type) {
    case 'post':
      promise = getPostBySlug(slug)
      break
    default:
      promise = getPageBySlug(slug)
      break
  }
  return promise
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

export default wp
