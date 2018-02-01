import React from 'react'

// backgroundColor is taken out of props but ignored
const Image = ({ path, backgroundColor, ...props }) => (
  <div
    role="button"
    title="Click to enlarge"
    style={{
      backgroundImage: `url("${path}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    {...props}
  />
)

export default Image
