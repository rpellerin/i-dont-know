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

class App extends Component {
  render () {
    return (
      <div className="bg-black grid-container">
        {assets.map(({ type, ...props }, tileIndex) => {
          const Component = TileBuilder[type]
          return (
            <Component tabIndex={tileIndex + 1} key={tileIndex} {...props} />
          )
        })}
      </div>
    )
  }
}

export default App
