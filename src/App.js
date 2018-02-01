import React, { Component } from 'react'
import Text from './components/Text'
import Video from './components/Video'
import Image from './components/Image'
import SquareTileWrapper from './components/SquareTileWrapper'
import ImageSlideshow from './components/ImageSlideshow'
import './App.css'
import assets from './assets.json'

const TileBuilder = {
  IMAGE: Image,
  TEXT: Text,
  VIDEO: Video
}
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
        return this.setImageIndexToShow(-1)
      default:
    }
  }

  componentDidMount () {
    window.addEventListener('keyup', this.keyPressed)
  }

  setImageIndexToShow = imageIndexToShow => {
    this.setState({ imageIndexToShow })
  }

  findNextPrevImageIndexToShow = increment => {
    let imageIndexToShow = this.state.imageIndexToShow
    do {
      imageIndexToShow =
        (imageIndexToShow + increment + assets.length) % assets.length // + assets.length to avoid neg values
    } while (!assets[imageIndexToShow] || !assets[imageIndexToShow].path)
    this.setState({ imageIndexToShow })
  }

  onNext = () => this.findNextPrevImageIndexToShow(1)
  onPrev = () => this.findNextPrevImageIndexToShow(-1)

  render () {
    return (
      <div className="grid-container">
        {this.state.imageIndexToShow !== -1 && (
          <ImageSlideshow
            onNext={this.onNext}
            onPrev={this.onPrev}
            src={assets[this.state.imageIndexToShow].path}
            onClose={() => this.setImageIndexToShow(-1)}
          />
        )}
        {assets.map(({ type, ...tile }, tileIndex) => {
          const Component = TileBuilder[type]
          return (
            <SquareTileWrapper tabIndex={tileIndex + 1} key={tileIndex}>
              <Component
                className="tile"
                onClick={() => this.setImageIndexToShow(tileIndex)}
                {...tile}
              />
            </SquareTileWrapper>
          )
        })}
      </div>
    )
  }
}

export default App
