import WPAPI from 'wpapi'

const env =
  process.env.NODE_ENV === 'development' ? 'development' : process.env.NODE_ENV
let endpoint = 'https://api.praksismagasin.no/api'
if (env !== 'development') {
  endpoint = 'https://api.praksismagasin.no/api'
}

// const endpoint = '/api'
const wpCache = {}

const wp = new WPAPI({
  endpoint,
  transport: {
    get: (wpreq, callback) => {
      // Cache requests
      let result = wpCache[wpreq]
      if (result) {
        if (callback && typeof callback === 'function') {
          callback(null, result)
        }
        return Promise.resolve(result)
      }
      return WPAPI.transport.get(wpreq, callback).then((result) => {
        wpCache[wpreq] = result
        return result
      })
    },
  },
})

// Create custom routes
wp.navMenus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z0-9_-]+)')
wp.search = wp.registerRoute('relevanssi/v1', '/search/')
wp.contentType = wp.registerRoute('wp/v2', 'content_type/(?P<id>[\\d]+)')
wp.contentTypes = wp.registerRoute('wp/v2', 'content_type')
wp.profile = wp.registerRoute('wp/v2', 'profile/(?P<id>[\\d]+)')
wp.profiles = wp.registerRoute('wp/v2', 'profile')
wp.publicSettings = wp.registerRoute('hey/v1', 'settings')

const excludeEmptyTerms = (terms) => {
  return terms.filter((term) => {
    return term.count > 0
  })
}

export const cachedPrivateRequest = (requestUrl) => {
  if (!wpCache[requestUrl]) {
    wpCache[requestUrl] = fetch(requestUrl, {
      method: 'get',
      credentials: 'include',
    }).then((res) => {
      return res.json()
    })
  }
  return wpCache[requestUrl]
}

export const getSettings = () => {
  return wp.publicSettings()
}

export const loggedIn = () => {
  const requestUrl = endpoint + '/hey/v1/loggedin'
  return cachedPrivateRequest(requestUrl)
}

export const getLatestRevisions = (id) => {
  const requestUrl = endpoint + '/hey/v1/revisions/' + id
  return cachedPrivateRequest(requestUrl)
}

export const baseUrl = (path = '') => {
  return window.location.protocol + '//' + window.location.host + path
}

export const getObjectLink = (obj) => {
  if (obj && obj.type) {
    if (obj.type === 'page') {
      return '/' + obj.slug
    }
    return '/' + obj.type + '/' + obj.slug
  }
  console.log('Nothing found')
}

export const getProfileById = (id) => {
  return wp.profile().id(id).embed()
}

export const search = (queryTerm) => {
  return wp.search().param('s', queryTerm)
}

export const getPostsByCategory = (id, page = 1, perPage = 12) => {
  return wp.posts().categories(id).perPage(perPage).page(page)
}

export const getPostsByTag = (id) => {
  return wp.posts().tags(id)
}

export const getPostsByTaxonomy = (tax, ids) => {
  return wp.posts().param(tax, ids)
}

export const getPostsByIds = (ids = []) => {
  return wp.posts().include(ids)
}

export const getCategoryBySlug = (slug) => {
  return wp
    .categories()
    .slug(slug)
    .then((cats) => cats[0])
}

export const getTags = () => {
  return wp.tags().perPage(100).then(excludeEmptyTerms)
}

export const getCategories = () => {
  return wp.categories().then(excludeEmptyTerms)
}

export const getContentTypes = () => {
  return wp.contentTypes().then(excludeEmptyTerms)
}

export const getContentType = (slug) => {
  return wp
    .contentTypes()
    .slug(slug)
    .then((cats) => cats[0])
}

export const getTagBySlug = (slug) => {
  return wp
    .tags()
    .slug(slug)
    .then((tags) => tags[0])
}

export const getPosts = (page = 1) => {
  return wp
    .posts()
    .perPage(10)
    .page(page)
    .embed()
    .then((res) => {
      if (page < 2) {
        // Move sticky posts first if on the first page
        res.sort((a, b) => {
          return a.sticky ? -1 : b.sticky ? 1 : 0
        })
      }
      return res
    })
}

export const getNavMenu = (slug) => {
  return wp.navMenus().id(slug)
}

export const getPostBySlug = (slug) => {
  return wp
    .posts()
    .slug(slug)
    .embed()
    .then((res) => {
      return res[0]
    })
    .catch((err) => console.log(err))
}

export const getPageBySlug = (slug) => {
  return wp
    .pages()
    .slug(slug)
    .embed()
    .then((res) => res[0])
}

export const getPageById = (id) => {
  return wp.pages().id(id)
}

export const getProtectedPost = (id, password) => {
  return wp.posts().id(id).password(password)
}

export const getProtectedPage = (id, password) => {
  return wp.pages().id(id).password(password)
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

export const getStickyPosts = () => {
  return wp.posts().sticky(true)
}

export const getPreview = ({ id, postType }) => {
  let requestUrl
  if (postType === 'post') {
    requestUrl = wp.posts().id(id).revisions().toString()
  } else if (postType === 'page') {
    requestUrl = wp.pages().id(id).revisions().toString()
  }
  if (requestUrl) {
    return cachedPrivateRequest(requestUrl)
  }
}

export const getPostTerms = (post, type = null) => {
  let allTerms = {}
  if (post._embedded && post._embedded['wp:term']) {
    post._embedded['wp:term'].forEach((terms) => {
      terms.forEach((term) => {
        if (!allTerms[term.taxonomy]) {
          allTerms[term.taxonomy] = []
        }
        allTerms[term.taxonomy].push(term)
      })
    })
  }
  if (type) {
    return allTerms[type] ? allTerms[type] : null
  }
  return allTerms
}

export const getPostTags = (post) => {
  if (
    post._embedded &&
    post._embedded['wp:term'] &&
    post._embedded['wp:term'][1]
  ) {
    return post._embedded['wp:term'][1]
  }
  return []
}

export default wp
