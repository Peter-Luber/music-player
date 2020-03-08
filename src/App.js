import React from "react";
import "./App.css";
import paused from "./img/play.svg";
import playing from "./img/pause.svg";
import nudy from "./midi/pissypamper.mp3";
import uplifter from "./midi/uplifter.mp3";
import carti from "./midi/alotOnMyMind.mp3";

class App extends React.Component {
  state = {
    button: paused,
    title: "",
    current: 0,
    pop5: [
      {
        id: 1,
        title: "riser",
        artist: "lex luger",
        url: uplifter
      },
      {
        id: 2,
        title: "pissy pamper ft. playboi carti",
        artist: "young nudy",
        url: nudy
      },
      {
        id: 3,
        title: "alot on my mind",
        artist: "playboi carti",
        url: carti
      }
    ]
  };

  playPause = song => {
    if (this.state.button === paused) {
      song.play();
      this.setState({
        button: playing,
        title: this.state.pop5[this.state.current].title,
        artist: this.state.pop5[this.state.current].artist
      });
    } else if (this.state.button === playing && !this.refs.audioRef.ended) {
      song.pause();
      this.setState({
        button: paused
      });
    } else if (this.state.button === playing && this.refs.audioRef.ended) {
      song.play();
    }
  };

  endCycle = () => {
    this.setState(
      {
        title: this.state.pop5[this.state.current + 1].title,
        current: this.state.current + 1,
        button: paused
      },
      () => {
        this.refs.audioRef.load();
        this.playPause(this.refs.audioRef);
      }
    );
  };

  keyCtrl = event => {
    if (event.key === " ") {
      this.refs.imgRef.click();
    }
  };

  render() {
    return (
      <div className="App">
        <audio
          ref="audioRef"
          src={this.state.pop5[this.state.current].url}
          onEnded={() => this.endCycle()}
        ></audio>
        <div
          className="Player"
          onKeyDown={this.keyCtrl}
          autofocus="true"
          tabIndex="1"
        >
          <div id="accentLine">
            <div className="Current-track">pop 5</div>
            <div className="Player-header">
              <div id="title">{this.state.title}</div>
              <div id="artist">{this.state.artist}</div>
            </div>
            <div id="playBox">
              <img
                id="controlButton"
                ref="imgRef"
                alt="play/pause button"
                src={this.state.button}
                onClick={() => this.playPause(this.refs.audioRef)}
              ></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
