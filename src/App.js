import React, { Component } from 'react'
import Text from './components/text'
import Video from './components/video'
import Image from './components/image'
import './App.css'
import assets from './assets.json'

const TileBuilder = {
  IMAGE: Image,
  TEXT: Text,
  VIDEO: Video
}

const Arrow = ({ children, style, ...props }) => (
  <span
    style={{
      borderRadius: '50%',
      backgroundColor: 'white',
      color: 'black',
      height: '1.2em',
      width: '1.2em',
      textAlign: 'center',
      lineHeight: '1.2em',
      fontSize: '3em',
      verticalAlign: 'middle',
      cursor: 'pointer',
      ...style
    }}
    role="button"
    {...props}
  >
    {children}
  </span>
)

const SlideShow = ({ src, onNext, onPrev, onClose }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 500,
      padding: '10px',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
    onClick={event => {
      if (event.target === event.currentTarget) onClose()
    }}
  >
    <Arrow
      style={{ position: 'absolute', top: '10px', right: '10px' }}
      onClick={onClose}
    >
      X
    </Arrow>
    <Arrow onClick={onPrev}>&lt;</Arrow>
    <img
      onClick={onNext}
      src={src}
      alt="Slideshow"
      style={{
        zIndex: 500,
        flex: '0 0 auto',
        maxWidth: '100%',
        maxHeight: '100%'
      }}
    />
    <Arrow onClick={onNext}>&gt;</Arrow>
  </div>
)

class App extends Component {
  state = { imageIndexToShow: -1 }

  keyPressed = ({ keyCode }) => {
    if (this.state.imageIndexToShow === -1) return
    switch (keyCode) {
      case 37: // left
      case 75: // k
      case 38: // top
        return this.onPrev()
      case 39: // right
      case 74: // j
      case 40: // bottom
        return this.onNext()
      case 27: // esc
        return this.onClick(-1)
      default:
    }
  }

  componentDidMount () {
    window.addEventListener('keyup', this.keyPressed)
  }

  onClick = imageIndexToShow => {
    this.setState({ imageIndexToShow })
  }

  findNextImage = increment => {
    let imageIndexToShow = this.state.imageIndexToShow
    do {
      imageIndexToShow =
        (imageIndexToShow + increment + assets.length) % assets.length // + assets.length to avoid neg values
    } while (!assets[imageIndexToShow] || !assets[imageIndexToShow].path)
    this.setState({ imageIndexToShow })
  }

  onNext = () => this.findNextImage(1)
  onPrev = () => this.findNextImage(-1)

  render () {
    return (
      <div className="bg-black grid-container">
        {this.state.imageIndexToShow !== -1 && (
          <SlideShow
            onNext={this.onNext}
            onPrev={this.onPrev}
            src={assets[this.state.imageIndexToShow].path}
            onClose={() => this.onClick(-1)}
          />
        )}
        {assets.map(({ type, ...props }, tileIndex) => {
          const Component = TileBuilder[type]
          return (
            <Component
              tabIndex={tileIndex + 1}
              key={tileIndex}
              onClick={() => this.onClick(tileIndex)}
              {...props}
            />
          )
        })}
      </div>
    )
  }
}

export default App
