import React from 'react'

/**
 * Two levels of div required otherwise padding-bottom won't work on Firefox.
 * See: https://stackoverflow.com/questions/42708323/percentage-padding-margin-on-grid-item-ignored-in-firefox
 */
const SquareTileWrapper = ({ children, ...props }) => (
  <div>
    <div className="squareTileWrapper" {...props}>
      {children}
    </div>
  </div>
)
export default SquareTileWrapper
