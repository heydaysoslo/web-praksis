import React from 'react'
import { formatArticeDate } from '../utils/date'

const PostDate = ({ date, className }) => {
  return (
    <time dateTime={date} className={className}>
      {formatArticeDate(date)}
    </time>
  )
}

export default PostDate
