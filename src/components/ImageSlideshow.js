import React from 'react'
import RoundedButton from './RoundedButton'

const ImageSlideshow = ({ src, onNext, onPrev, onClose }) => (
  <div
    className="imageSlideshow"
    onClick={event => {
      if (event.target === event.currentTarget) onClose()
    }}
  >
    <RoundedButton
      style={{ position: 'absolute', top: '0px', right: '0px' }}
      onClick={onClose}
    >
      &times;
    </RoundedButton>
    <RoundedButton onClick={onPrev}>&lt;</RoundedButton>
    <img
      onClick={onNext}
      src={src}
      alt="Slideshow"
      style={{
        zIndex: 500,
        flex: '0 1 auto',
        minWidth: '0',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    />
    <RoundedButton onClick={onNext}>&gt;</RoundedButton>
  </div>
)

export default ImageSlideshow
