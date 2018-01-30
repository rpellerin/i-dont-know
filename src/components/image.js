import React from 'react'

/* eslint-disable jsx-a11y/anchor-has-content */
export default ({ path, href, tabIndex }) => (
  <a
    tabIndex={tabIndex}
    role="button"
    href={path}
    title="Click to enlarge"
    target="_blank"
    style={{
      backgroundImage: `url("${path}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
)
/* eslint-enable jsx-a11y/anchor-has-content */
