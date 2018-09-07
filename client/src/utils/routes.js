import FrontPage from '../containers/FrontPage'
import PostsPage from '../containers/PostsPage'
import PostPage from '../containers/PostPage'
import Page from '../containers/Page'
import Preview from '../containers/Preview'

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: FrontPage,
    exact: true
  },
  {
    name: 'Posts',
    path: '/posts',
    component: PostsPage,
    exact: true
  },
  {
    name: 'Post',
    path: '/posts/:slug',
    component: PostPage,
    exact: false
  },
  {
    name: 'Preview',
    path: '/_preview/:id/:wpnonce',
    component: Preview,
    exact: true
  },
  {
    name: 'Page',
    path: '/:slug',
    component: Page,
    exact: true
  }
]
