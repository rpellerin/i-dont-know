import React from 'react'

const Link = ({ children, ...rest }) => (
  <a {...rest} target="_blank">
    {children}
  </a>
)
const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>

export default ({ text, backgroundColor, tabIndex, ...props }) => {
  const Wrapper = props.href ? Link : Div
  return (
    <div
      className="ttu b sans-serif aspect-ratio aspect-ratio--1x1"
      tabIndex={tabIndex}
    >
      <Wrapper
        style={{
          fontSize: text.length && text.length < 25 ? '4vw' : '2vw',
          backgroundColor
        }}
        className="aspect-ratio--object flex items-center justify-center tc pa2"
        {...props}
      >
        <span
          style={{
            overflowWrap: 'break-word',
            mixBlendMode: 'difference' /* opposite to background-color */
          }}
          className="mw-100 white"
        >
          {text}
        </span>
      </Wrapper>
    </div>
  )
}
