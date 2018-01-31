import React from 'react'

export default ({ url, tabIndex }) => (
  <div className="aspect-ratio aspect-ratio--1x1 bg-black" tabIndex={tabIndex}>
    <iframe
      title={url}
      className="tile aspect-ratio--object"
      src={`https://www.youtube-nocookie.com/embed/${url}?rel=0&amp;showinfo=0`}
      frameBorder="0"
      allowFullScreen
    />
  </div>
)
