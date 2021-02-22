import React from 'react'
import { postDateFormat } from '../utils/date'

const PostDate = ({ date, className }) => {
  return (
    <time dateTime={date} className={className}>
      {postDateFormat(date)}
    </time>
  )
}

export default PostDate
