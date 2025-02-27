import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Link } from 'react-router-dom'

import Layout from '../components/Layout'
import {
  baseUrl,
  getArticleVariant,
  getObjectLink,
  getPostTerms,
} from '../utils/wp'
import { formatArticeDate } from '../utils/date'
import ShareButtons from '../components/ShareButtons'
import AcfImage from '../components/AcfImage'
import Author from '../components/Author'
import EditPostLink from '../components/EditPostLink'
import RelatedPosts from '../components/RelatedPosts'
import WpTheContent from '../components/WpTheContent'
import useLocalStorage from '../hooks/useLocalStorage'
import Box from '../components/primitives/Box'
import Heading from '../components/primitives/Heading'
import Container from '../components/primitives/Container'
import Text from '../components/primitives/Text'
import PreviewWarning from '../components/PreviewWarning'
import Pagebuilder from '../components/Pagebuilder'

const Article = ({ post, single, preview }) => {
  const [readArticles, setReadArticles] = useLocalStorage('readArticles', [])
  const [articleType, setArticleType] = useState(null)
  const articleStyle = getArticleVariant(post)
  const author =
    (post?.acf?.contributor && post?.acf?.contributor[0]) || post.author

  const getArticleType = () => {
    const articleTypes = getPostTerms(post, 'content_type')
    if (articleTypes && articleTypes[0]) {
      setArticleType(articleTypes[0])
    }
  }

  const onMount = () => {
    getArticleType()
    if (single) {
      // Record that the user has read this article before
      // Could have a timeout for more precise tracking
      if (!readArticles.includes(post.id)) {
        setReadArticles([...readArticles, post.id])
      }

      window.scrollTo(0, 0)
    }
  }

  useEffect(onMount, [])

  return (
    <Layout>
      <Box as="article" mb={6}>
        {preview && <PreviewWarning />}
        <Box textAlign="center" as="header" pt={[4, null, 5]}>
          <Container size="narrow">
            {post.type === 'post' && (
              <Box mb={3} color="grays.1">
                <time dateTime={post.date}>{formatArticeDate(post.date)}</time>
                {articleType && (
                  <>
                    {' • '}
                    <Link to={articleType.link}>{articleType.name}</Link>
                  </>
                )}
                {' • '}
                <span>
                  {post.read_time} {post.read_time > 1 ? 'minutter' : 'minutt'}{' '}
                  lesetid
                </span>
              </Box>
            )}
            {post?.title?.rendered && (
              <Heading $type={articleStyle} size="h1" as="h1">
                <span>{ReactHtmlParser(post.title.rendered)}</span>
              </Heading>
            )}
            {post.acf.intro && (
              <Text size="md" mt={4}>
                {ReactHtmlParser(post.acf.intro)}
              </Text>
            )}
          </Container>
        </Box>
        {post.featured_image && (
          <Container mt={[4, null, 5]}>
            <AcfImage image={post.featured_image} />
          </Container>
        )}
        <Container mt={[4, null, 5]} size="narrow">
          <WpTheContent className="editor" content={post?.content?.rendered} />
        </Container>
        {post?.acf?.blocks && (
          <Pagebuilder my={[5, null, null, 6]} blocks={post.acf.blocks} />
        )}
        <Container as="footer" mt={[5]} size="narrow">
          <Box borderBottom={1} pb={3}>
            <ShareButtons url={baseUrl(getObjectLink(post))} />
          </Box>
          {post.type === 'post' && (
            <Box mt={4}>
              <Author author={author} />
            </Box>
          )}
          <EditPostLink post={post} />
        </Container>
      </Box>

      {single && post?.type === 'post' && <RelatedPosts post={post} />}
      {post?.type === 'page' && <RelatedPosts title="Siste innlegg" />}
    </Layout>
  )
}

export default Article
