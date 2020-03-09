import React from "react";
import "./App.css";
import paused from "./img/play.svg";
import playing from "./img/pause.svg";
import ff from "./img/ff.svg";
import nudy from "./midi/pissypamper.mp3";
import uplifter from "./midi/uplifter.mp3";
import c1 from "./midi/alotOnMyMind.mp3";
import c2 from "./midi/didItAgain.mp3";
import c3 from "./midi/oneDay.mp3";
import c4 from "./midi/hellcat.mp3";
import c5 from "./midi/feelinNobody.mp3";
import c6 from "./midi/WOAH.mp3";
import c7 from "./midi/cantRelate.mp3";
import c8 from "./midi/WLR.mp3";

class App extends React.Component {
  state = {
    button: paused,
    title: "",
    current: 0,
    pop5: [
      {
        id: 0,
        title: "riser",
        artist: "lex luger",
        url: uplifter
      },
      {
        id: 1,
        title: "did it again",
        artist: "playboi carti",
        url: c2
      },
      {
        id: 2,
        title: "alot on my mind",
        artist: "playboi carti",
        url: c1
      },
      {
        id: 3,
        title: "one day",
        artist: "playboi carti",
        url: c3
      },
      {
        id: 4,
        title: "pissy pamper ft. playboi carti",
        artist: "young nudy",
        url: nudy
      },
      {
        id: 5,
        title: "hellcat",
        artist: "playboi carti",
        url: c4
      },
      {
        id: 6,
        title: "feelin nobody",
        artist: "playboi carti",
        url: c5
      },
      {
        id: 7,
        title: "WOAH",
        artist: "playboi carti",
        url: c6
      },
      {
        id: 8,
        title: "can't relate",
        artist: "playboi carti",
        url: c7
      },
      {
        id: 9,
        title: "whole lotta red",
        artist: "playboi carti",
        url: c8
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
    if (this.state.current < 9) {
      this.setState(
        {
          current: this.state.current + 1,
          button: paused,
          title: this.state.pop5[this.state.current + 1].title,
          artist: this.state.pop5[this.state.current + 1].artist
        },
        () => {
          this.refs.audioRef.load();
          this.playPause(this.refs.audioRef);
        }
      );
    } else {
      this.setState({
        button: paused,
        current: 0,
        title: this.state.pop5[0].title,
        artist: this.state.pop5[0].artist
      });
    }
  };

  backCycle = () => {
    if (this.state.current > 0) {
      this.setState(
        {
          current: this.state.current - 1,
          button: paused,
          title: this.state.pop5[this.state.current - 1].title,
          artist: this.state.pop5[this.state.current - 1].artist
        },
        () => {
          this.refs.audioRef.load();
          this.playPause(this.refs.audioRef);
        }
      );
    } else {
      this.setState(
        {
          current: this.state.pop5.length - 1,
          button: paused,
          title: this.state.pop5[this.state.current].title,
          artist: this.state.pop5[this.state.current].artist
        },
        () => {
          this.refs.audioRef.load();
          this.playPause(this.refs.audioRef);
        }
      );
    }
  };

  keyCtrl = event => {
    if (event.key === " ") {
      this.refs.imgRef.click();
    } else if (event.key === "ArrowRight") {
      this.endCycle();
    } else if (event.key === "ArrowLeft") {
      this.backCycle();
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
            <div className="Logo">
              <span role="img" aria-label="slatt++">
                🦋
              </span>
            </div>
            <div className="Display">
              <div id="title">{this.state.title}</div>
              <div id="artist">{this.state.artist}</div>
            </div>
            <div id="ctrlBox">
              <div id="rwBox" onClick={() => this.backCycle()}>
                <img id="rw" alt="rewind" src={ff} />
              </div>
              <div
                id="playBox"
                onClick={() => this.playPause(this.refs.audioRef)}
              >
                <img
                  id="playButton"
                  ref="imgRef"
                  alt="play/pause button"
                  src={this.state.button}
                />
              </div>
              <div id="ffBox" onClick={() => this.endCycle()}>
                <img id="ff" alt="fast forward" src={ff} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
