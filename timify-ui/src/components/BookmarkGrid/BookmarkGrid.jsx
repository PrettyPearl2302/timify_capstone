import React from 'react'
import BookmarkCard from '../BookmarkCard/BookmarkCard'

const BookmarkGrid = ({bookmarked}) => {

  return (
    <div className='podcast-grid'>
        {bookmarked.map((podcast) => (
            <BookmarkCard key={podcast.id} podcast={podcast} />
        ))}
    </div>
  )
}

export default BookmarkGrid