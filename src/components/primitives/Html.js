import ReactHtmlParser from 'react-html-parser'

const Html = ({ children }) => {
  return ReactHtmlParser(children)
}

export default Html
