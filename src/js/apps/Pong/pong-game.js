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
            margin: auto;
            text-align: center;
        }
    </style>
    <div class="wrapper">
       <!--  <pong-table></pong-table> -->
        <pong-home></pong-home>
       <!--  <game-over></game-over>
        <memory-game-buttons fcolor="yellow" bgcolor="green" ><memory-game-buttons> -->
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

  _onStartGame (event) {
    this._home.removeEventListener('startgame', this._boundOnStartGame)
    this._home.remove()

    if (event.detail === 2) {
      this._twoPlayers = true
    }
    this._createPongTable(this._twoPlayers)
  }

  _onWin (event) {
    const gameOver = document.createElement('game-over')
    const gameButtons = document.createElement('memory-game-buttons')
    gameButtons.setAttribute('fcolor', '#FFFFFF')
    gameButtons.setAttribute('bgcolor', '#4a4a4a')
    this._pongTable.remove()
    this._gameOver = this._wrapper.appendChild(gameOver)
    this._gameButtons = this._wrapper.appendChild(gameButtons)

    this._gameButtons.addEventListener('restartclick', this._boundOnRestart)
    this._gameButtons.addEventListener('homeclick', this._boundOnHome)
  }

  _onRestart (event) {
    this._removeGameOver()
    this._createPongTable()
  }

  _onHome (event) {
    this._removeGameOver()
    this._twoPlayers = false
    this._home = this._wrapper.appendChild(document.createElement('pong-home'))
    this._home.addEventListener('startgame', this._boundOnStartGame)
  }

  _createPongTable (twoPlayers) {
    const table = document.createElement('pong-table')

    if (twoPlayers) {
      table.setAttribute('twoplayers', 'true')
    }

    this._pongTable = this._wrapper.appendChild(table)
    this._pongTable.addEventListener('win', this._boundOnWin)
  }

  _removeGameOver () {
    this._gameButtons.removeEventListener('restartclick', this._boundOnRestart)
    this._gameButtons.removeEventListener('homeclick', this._boundOnHome)
    this._gameOver.remove()
    this._gameButtons.remove()
  }
}

window.customElements.define('pong-game', PongGame)
