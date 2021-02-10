import FrontPage from '../containers/FrontPage'
import PostsPage from '../containers/PostsPage'
import Taxonomy from '../containers/Taxonomy'
import ContentType from '../containers/ContentType'
// import PostPage from '../containers/PostPage'
// import Page from '../containers/Page'
import Single from '../containers/Single'
import Preview from '../containers/Preview'
import Tag from '../containers/Tag'
import Search from '../containers/Search'

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: FrontPage,
    exact: true,
  },
  {
    name: 'Posts',
    path: '/posts',
    component: PostsPage,
    exact: true,
  },
  {
    name: 'Posts',
    path: '/posts/page/:pageNum',
    component: PostsPage,
    exact: true,
  },
  {
    name: 'Search',
    path: '/sok',
    component: Search,
    exact: true,
  },
  {
    name: 'Search',
    path: '/sok/:query',
    component: Search,
    exact: true,
  },
  {
    name: 'Category',
    path: '/kategori/:cat',
    component: Taxonomy,
    exact: true,
  },
  {
    name: 'Category',
    path: '/innleggstype/:cat',
    component: ContentType,
    exact: true,
    props: {
      taxonomy: 'content_type',
    },
  },
  {
    name: 'Tag',
    path: '/stikkord/:tag',
    component: Tag,
    exact: true,
  },
  {
    name: 'Preview',
    path: '/_preview/:id/:postType',
    component: Preview,
    exact: true,
  },
  {
    name: 'Post',
    path: '/:type/:slug',
    component: Single,
    exact: false,
  },
  {
    name: 'Page',
    path: '/:slug',
    component: Single,
    exact: true,
  },
]
