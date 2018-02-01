import React from 'react'

const Link = ({ children, ...props }) => (
  <a {...props} target="_blank">
    {children}
  </a>
)
const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Text = ({ text, backgroundColor, ...props }) => {
  const Wrapper = props.href ? Link : Div
  return (
    <Wrapper
      style={{
        fontSize: text.length && text.length < 25 ? '3em' : '1.5em',
        fontWeight: 'bold',
        textTranform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0.5em',
        backgroundColor
      }}
      {...props}
    >
      <span
        style={{
          overflowWrap: 'break-word',
          maxWidth: '100%',
          color: 'white',
          mixBlendMode: 'difference' /* opposite to background-color */
        }}
      >
        {text}
      </span>
    </Wrapper>
  )
}

export default Text
