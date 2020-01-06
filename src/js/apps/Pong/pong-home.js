/**
 * Module for PongHome
 *
 * @module src/js/Pong/pong-home
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            color: #FFFFFF;
        }
        .wrapper {
            width: 80%;
            height: 100%;
            /* background-color: green; */
            margin: auto;
            text-align: center;
        }
        .titlediv {
            height: 20%;
        }
        .alternatives {
            height: 20%;
        }
        .description {
            height: 20%;
            text-align: left;
            width: fit-content;
            margin: auto;
        }
        .buttons {
            height: 20%;
            font-size: 30px;
        }
        .play {
            font-size: 30px;
        }
        input {
                visibility: hidden;
            }
            input:checked + label {
                background-color: #3d3d3d;
                /* border-bottom: 4px solid #001f3f; */
            }
            label {
                width: 30px;
                color: #FFFFFF;
                padding: 5px;
                border: 2px solid #FFFFFF;
            }
            .title {
                font-size: 30px;
            }
    </style>
    <div class="wrapper">
        <div class="titlediv">
            <span class="title">PONG</span>
        </div>
        <div class="alternatives">
            <input id="alt1" type="radio" name="Alternatives">
            <label for="alt1">1 Player</label>
            <input id="alt2" type="radio" name="Alternatives">
            <label for="alt2">2 Players</label>
        </div>
        <div class="buttons">
            <button class="play">Play</button>
        </div>
        <div class="description">
            <span>Player 1 controls: ⬆, ⬇ </span>
            <br>
            <span>Player 2 controls: W, D</span>
        </div>
    </div>
`

class PongHome extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._numberOfPlayers = null
    this._alternatives = this.shadowRoot.querySelector('.alternatives')
    this._playButton = this.shadowRoot.querySelector('.play')
  }

  connectedCallback () {
    this._boundOnAltChange = this._onAltChange.bind(this)
    this._boundOnPlayClick = this._onPlayClick.bind(this)

    this._alternatives.addEventListener('click', this._boundOnAltChange)
    this._playButton.addEventListener('click', this._boundOnPlayClick)
  }

  _onPlayClick (event) {
    if (!this._numberOfPlayers) {
      return
    }
    this.dispatchEvent(new window.CustomEvent('startgame', { detail: this._numberOfPlayers }))
  }

  _onAltChange (event) {
    if (event.target.nodeName !== 'INPUT') {
      return
    }
    if (event.target.id === 'alt1') {
      this._numberOfPlayers = 1
    }
    if (event.target.id === 'alt2') {
      this._numberOfPlayers = 2
    }
  }
}

window.customElements.define('pong-home', PongHome)
