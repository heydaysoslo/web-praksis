import FrontPage from '../templates/FrontPage'
import Taxonomy from '../templates/Taxonomy'
import Preview from '../templates/Preview'
import Search from '../templates/Search'
import Tag from '../templates/Tag'
import Single from '../templates/Single'

import ContentType from '../containers/ContentType'

export const routes = [
  {
    name: 'home',
    path: '/',
    component: FrontPage,
    exact: true,
  },
  {
    name: 'posts',
    path: '/posts',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'postsPage',
    path: '/posts/side/:page',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'searchPage',
    path: '/sok',
    component: Search,
    exact: true,
  },
  {
    name: 'searchResult',
    path: '/sok/:query',
    component: Search,
    exact: true,
  },
  {
    name: 'archive',
    path: '/arkiv',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'archivePage',
    path: '/arkiv/side/:page',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'categoryPage',
    path: '/kategori',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'category',
    path: '/kategori/:cat',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'categoryPagina',
    path: '/kategori/:cat/side/:page',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'articleType',
    path: '/innleggstype/:cat',
    component: ContentType,
    exact: true,
    props: {
      taxonomy: 'content_type',
    },
  },
  {
    name: 'tag',
    path: '/stikkord/:tag',
    component: Tag,
    exact: true,
  },
  {
    name: 'preview',
    path: '/_preview/:id/:postType',
    component: Preview,
    exact: true,
  },
  {
    name: 'postType',
    path: '/:type/:slug',
    component: Single,
    exact: false,
  },
  {
    name: 'page',
    path: '/:slug',
    component: Single,
    exact: true,
  },
]

/* 

Use:
replaceAll('I love cat and camel', {'cat':'dog', 'camel':'dromedar'})
// Output: 'I love dog and dromedar'

*/
export const replaceAll = (str, mapObj) => {
  const keys = Object.keys(mapObj)
  if (!Array.isArray(keys) || !keys.length) {
    return str
  }
  var re = new RegExp(keys.join('|'), 'gi')
  return str.replace(re, (matched) => {
    return mapObj[matched.toLowerCase()]
  })
}

/* 

Use:
getRouteLink('post', {':slug':'pizatime'})

*/
export const getRouteLink = (type, replace = {}) => {
  const pageLinkObject = routes.filter((r) => r.name === type)[0]
  const url = replaceAll(pageLinkObject.path, replace)
  return url
}

/*

Helpers

*/
export const getPaginatedCategoryLink = ({ slug, page }) => {
  if (!slug) {
    return getRouteLink('archivePage', { ':page': page })
  }
  if (page <= 1) {
    // If it's the first page, get root url without pagenumber
    return getRouteLink('category', { ':cat': slug })
  }
  return getRouteLink('categoryPagina', { ':cat': slug, ':page': page })
}

export const getCategoryPageLink = () => {
  return getRouteLink('archive')
}
