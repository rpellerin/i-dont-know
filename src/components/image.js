import React from 'react'

/* eslint-disable jsx-a11y/anchor-has-content */
export default ({ path, href, tabIndex, onClick }) => (
  <div
    tabIndex={tabIndex}
    role="button"
    title="Click to enlarge"
    target="_blank"
    className="tile"
    style={{
      backgroundImage: `url("${path}")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    onClick={onClick}
  />
)
/* eslint-enable jsx-a11y/anchor-has-content */
