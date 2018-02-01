import React from 'react'

const SquareTileWrapper = ({ children, ...props }) => (
  <div className="squareTileWrapper" {...props}>
    {children}
  </div>
)
export default SquareTileWrapper
