import React from 'react'

const RoundedButton = ({ children, ...props }) => (
  <span className="roundedButton" role="button" {...props}>
    {children}
  </span>
)

export default RoundedButton
