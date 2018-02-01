import React from 'react'

// backgroundColor is taken out of props but ignored
const Video = ({ url, backgroundColor, ...props }) => (
  <iframe
    title={url}
    src={`https://www.youtube-nocookie.com/embed/${url}?rel=0&amp;showinfo=0&amp;enablejsapi=1`}
    frameBorder="0"
    data-next-func="playVideo"
    allowFullScreen
    {...props}
  />
)

export default Video
