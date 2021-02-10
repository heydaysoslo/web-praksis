import React, { useState, useEffect } from 'react'
import { getPosts } from '../utils/wp'

import Post from '../components/Post'

const PostsPage = ({ match }) => {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    const pageNum = match?.params?.pageNum || 1
    getPosts(pageNum).then((res) => {
      setPosts(res)
    })
  }

  useEffect(fetchPosts, [match?.params?.pageNum])

  return (
    <div className="main">
      <div className="container">
        <div className="cards">
          {posts && posts.map((p) => <Post key={p.id} post={p} />)}
        </div>
      </div>
    </div>
  )
}

// class PostsPage extends Component {
//   state = {
//     posts: [],
//     page: 1,
//   }

//   componentDidMount = () => {
//     const pageNum = this?.props?.match?.params?.pageNum || 1
//     getPosts(pageNum).then((res) => {
//       this.setState({
//         posts: res,
//       })
//     })
//   }

//   loadNextPage = () => {}

//   render() {
//     const { posts } = this.state
//     return (
//       <div className="main">
//         <div className="container">
//           <div className="cards">
//             {posts && posts.map((p) => <Post key={p.id} post={p} />)}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

export default PostsPage
