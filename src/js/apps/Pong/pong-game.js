/**
 * Module for PongGame
 *
 * @module src/js/Pong/pong-game
 * @author Viktor Ödman
 * @version 1.0.0
*/

import './pong-table.js'
import './pong-game-over.js'
import './pong-home.js'
import './pong-game-buttons.js'

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .wrapper {
            width: 100%;
            height: 100%;
            background-color: #111111;
            margin: auto;
            text-align: center;
        }
    </style>
    <div class="wrapper">
        <pong-home></pong-home>
    </div>
`
/**
 * Represents a PongGame
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
    this._twoPlayers = false
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongGame
   */
  connectedCallback () {
    this._boundOnStartGame = this._onStartGame.bind(this)
    this._boundOnWin = this._onWin.bind(this)
    this._boundOnRestart = this._onRestart.bind(this)
    this._boundOnHome = this._onHome.bind(this)

    this._home.addEventListener('startgame', this._boundOnStartGame)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof PongGame
   */
  disconnectedCallback () {
    if (this._home) {
      this._home.removeEventListener('startgame', this._boundOnStartGame)
    }
    if (this._gameButtons) {
      this._gameButtons.removeEventListener('restartclick', this._boundOnRestart)
      this._gameButtons.removeEventListener('homeclick', this._boundOnHome)
    }
    if (this._pongTable) {
      this._pongTable.removeEventListener('win', this._boundOnWin)
    }
  }

  /**
   * Runs when the user presses start game
   * Adds a new pongtable to the wrapper
   *
   * @param {CustomEvent} event A startgame event
   * @memberof PongGame
   */
  _onStartGame (event) {
    this._home.removeEventListener('startgame', this._boundOnStartGame)
    this._home.remove()

    if (event.detail === 2) {
      this._twoPlayers = true
    }
    this._createPongTable(this._twoPlayers)
  }

  /**
  * Runs when a win occurs
  * Removes the pong-table and adds game-buttons and
  * a game-over elements
  *
  * @param {CustomEvent} event A win event
  * @memberof PongGame
  */
  _onWin (event) {
    const gameOver = document.createElement('pong-game-over')
    const gameButtons = document.createElement('pong-game-buttons')
    gameOver.setAttribute('winnername', `${event.detail} Wins!`)
    gameOver.setAttribute('wintext', 'Play Again')
    gameButtons.setAttribute('fcolor', '#FFFFFF')
    gameButtons.setAttribute('bgcolor', '#4a4a4a')

    this._pongTable.removeEventListener('win', this._boundOnWin)
    this._pongTable.remove()

    this._gameOver = this._wrapper.appendChild(gameOver)
    this._gameButtons = this._wrapper.appendChild(gameButtons)

    this._gameButtons.addEventListener('restartclick', this._boundOnRestart)
    this._gameButtons.addEventListener('homeclick', this._boundOnHome)
  }

  /**
  * Runs when the restart button is clicked
  * Removes the game-buttons element and the game-over element
  * And adds a new pong-table with the same settings as before
  *
  * @param {CustomEvent} event A restartclick event
  * @memberof PongGame
  */
  _onRestart (event) {
    this._removeGameOver()
    this._createPongTable(this._twoPlayers)
  }

  /**
  * Runs when the home button is clicked
  * Removes the game-buttons element and the game-over element
  * And adds a pong-home element
  *
  * @param {CustomEvent} event A homeclick event
  * @memberof PongGame
  */
  _onHome (event) {
    this._removeGameOver()
    this._twoPlayers = false
    this._home = this._wrapper.appendChild(document.createElement('pong-home'))
    this._home.addEventListener('startgame', this._boundOnStartGame)
  }

  /**
   * Creates a new pong-table
   *
   * @param {Boolean} twoPlayers true or false
   * @memberof PongGame
   */
  _createPongTable (twoPlayers) {
    const table = document.createElement('pong-table')

    if (twoPlayers) {
      table.setAttribute('twoplayers', 'true')
    }

    this._pongTable = this._wrapper.appendChild(table)
    this._pongTable.addEventListener('win', this._boundOnWin)
  }

  /**
   * Removes the game-over element and the game-buttons
   *
   * @memberof PongGame
   */
  _removeGameOver () {
    this._gameButtons.removeEventListener('restartclick', this._boundOnRestart)
    this._gameButtons.removeEventListener('homeclick', this._boundOnHome)
    this._gameOver.remove()
    this._gameButtons.remove()
  }
}

window.customElements.define('pong-game', PongGame)
