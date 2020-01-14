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
/**
 * Represents the home screen of a Pong Game
 *
 * @class PongHome
 * @extends {window.HTMLElement}
 */
class PongHome extends window.HTMLElement {
  /**
   * Creates an instance of PongHome.
   * @memberof PongHome
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._numberOfPlayers = null
    this._alternatives = this.shadowRoot.querySelector('.alternatives')
    this._playButton = this.shadowRoot.querySelector('.play')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongHome
   */
  connectedCallback () {
    this._boundOnAltChange = this._onAltChange.bind(this)
    this._boundOnPlayClick = this._onPlayClick.bind(this)

    this._alternatives.addEventListener('click', this._boundOnAltChange)
    this._playButton.addEventListener('click', this._boundOnPlayClick)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof PongHome
   */
  disconnectedCallback () {
    this._alternatives.removeEventListener('click', this._boundOnAltChange)
    this._playButton.removeEventListener('click', this._boundOnPlayClick)
  }

  /**
   * Dispatches a custom event with the number of players choosen
   *
   * @param {Event} event A click event
   * @memberof PongHome
   */
  _onPlayClick (event) {
    if (!this._numberOfPlayers) {
      return
    }
    this.dispatchEvent(new window.CustomEvent('startgame', { detail: this._numberOfPlayers }))
  }

  /**
   * Changes the numberofplayers property
   * depending on what radiobutton that was clicked
   *
   * @param {Event} event A click event
   * @memberof PongHome
   */
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
