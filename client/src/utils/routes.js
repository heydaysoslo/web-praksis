import FrontPage from '../containers/FrontPage'
import PostsPage from '../containers/PostsPage'
// import PostPage from '../containers/PostPage'
// import Page from '../containers/Page'
import Single from '../containers/Single'
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
    path: '/:type/:slug',
    component: Single,
    exact: false
  },
  {
    name: 'Page',
    path: '/:slug',
    component: Single,
    exact: true
  },
  {
    name: 'Preview',
    path: '/_preview/:id/:postType/:hash',
    component: Preview,
    exact: true
  }
]
