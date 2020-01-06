/**
 * Module for PongGame
 *
 * @module src/js/Pong/pong-game
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .wrapper {
            width: 100%;
            height: 100%;
            background-color: #111111;
        }
    </style>
    <div class="wrapper">
       <!--  <pong-table></pong-table> -->
        <pong-home></pong-home>
    </div>
`
/**
 * Represents a Pong Game
 *
 * @class PongGame
 * @extends {window.HTMLElement}
 */
class PongGame extends window.HTMLElement {
  /**
   * Creates an instance of PongGame.
   * @memberof PongGame
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._home = this.shadowRoot.querySelector('pong-home')
    this._pongTable = undefined
    this._wrapper = this.shadowRoot.querySelector('.wrapper')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongGame
   */
  connectedCallback () {
    this._boundOnStartGame = this._onStartGame.bind(this)
    this._boundOnWin = this._onWin.bind(this)
    /* this._pongTable.addEventListener('win', event => {
      const gameOver = document.createElement('game-over')
      this._pongTable.remove()
      this._wrapper.appendChild(gameOver)
    }) */
    this._home.addEventListener('startgame', this._boundOnStartGame)
  }

  _onStartGame (event) {
    this._home.removeEventListener('startgame', this._boundOnStartGame)
    this._home.remove()

    const table = document.createElement('pong-table')

    if (event.detail === 2) {
      table.setAttribute('twoplayers', 'true')
    }

    this._wrapper.appendChild(table)
  }

  _onWin (event) {
    const gameOver = document.createElement('game-over')
    this._pongTable.remove()
    this._wrapper.appendChild(gameOver)
  }
}

window.customElements.define('pong-game', PongGame)
