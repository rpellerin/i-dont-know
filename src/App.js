import React, { Component } from "react";
import Text from "./components/Text";
import Video from "./components/Video";
import Image from "./components/Image";
import SquareTileWrapper from "./components/SquareTileWrapper";
import ImageSlideshow from "./components/ImageSlideshow";
import "./App.css";
import assets from "./assets.json";

const TileBuilder = {
  IMAGE: Image,
  TEXT: Text,
  VIDEO: Video,
};

const sendMessageIframe = (iframe, func) =>
  iframe.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func,
      args: [],
    }),
    "*"
  );
class App extends Component {
  state = { imageIndexToShow: -1 };

  keyPressed = ({ keyCode }) => {
    if (this.state.imageIndexToShow === -1) return;
    switch (keyCode) {
      case 37: // left
      case 75: // k
      case 38: // top
        return this.onPrev();
      case 39: // right
      case 74: // j
      case 40: // bottom
        return this.onNext();
      case 27: // esc
        return this.setImageIndexToShow(-1);
      default:
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.keyPressed);
    this.youtubeIframes = Array.from(
      document.querySelectorAll('iframe[src*="youtube"]')
    );
  }

  setImageIndexToShow = (imageIndexToShow) => {
    this.setState({ imageIndexToShow });
  };

  findNextPrevImageIndexToShow = (increment) => {
    let imageIndexToShow = this.state.imageIndexToShow;
    do {
      imageIndexToShow =
        (imageIndexToShow + increment + assets.length) % assets.length; // + assets.length to avoid neg values
    } while (!assets[imageIndexToShow] || !assets[imageIndexToShow].path);
    this.setState({ imageIndexToShow });
  };

  onNext = () => this.findNextPrevImageIndexToShow(1);
  onPrev = () => this.findNextPrevImageIndexToShow(-1);

  pauseAllVideosBut(node) {
    if (this.youtubeIframes) {
      this.youtubeIframes
        .filter((iframe) => iframe !== node)
        .forEach((iframe) => {
          sendMessageIframe(iframe, "pauseVideo");
          iframe.dataset.nextFunc = "playVideo";
        });
    }
  }

  render() {
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
          const Component = TileBuilder[type];
          const onClick = () => this.setImageIndexToShow(tileIndex);
          return (
            <SquareTileWrapper
              tabIndex={tileIndex + 1}
              key={tileIndex}
              onKeyPress={(event) => {
                if ([32, 13].includes(event.charCode)) {
                  // space or enter keys
                  event.preventDefault();
                  if (type === "IMAGE") onClick();
                  if (type === "TEXT") event.target.childNodes[0].click();
                  if (type === "VIDEO") {
                    const iframe = event.target.childNodes[0];
                    this.pauseAllVideosBut(iframe);
                    sendMessageIframe(iframe, iframe.dataset.nextFunc);
                    iframe.dataset.nextFunc =
                      iframe.dataset.nextFunc === "playVideo"
                        ? "pauseVideo"
                        : "playVideo";
                  }
                }
              }}
            >
              <Component
                className="tile"
                onClick={type === "IMAGE" ? onClick : null}
                {...tile}
              />
            </SquareTileWrapper>
          );
        })}
      </div>
    );
  }
}

export default App;
