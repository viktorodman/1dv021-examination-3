/**
 * Module for MemoryGame
 *
 * @module src/js/Memory-Game/memory-game
 * @author Viktor Ödman
 * @version 1.0.0
*/

import './game-timer.js'
import './memory-alternatives.js'
import './memory-board.js'
import './memory-game-buttons.js'
import './memory-start-screen.js'
import './memory-game-over.js'

const template = document.createElement('template')
template.innerHTML = `
    <style>
    :host {
      color: #001f3f;
      font-family: monospace;
    }
      .winText {
        text-align: center;
        font-size: 60px;
      }
      .memoryWrapper {
        text-align: center; 
        color: black;
        font-size: 30px;
        width: 100%;
        height: 100%;
        background-color: #3D9970;
        
      }
      .boardDiv {
        width: 100%;
        height: 90%;
      }
    </style>
    <div class="memoryWrapper">
        <memory-alternatives></memory-alternatives>
        <memory-start-screen></memory-start-screen>
    </div>
`
/**
 * Represents a Memory Game
 *
 * @class MemoryGame
 * @extends {window.HTMLElement}
 */
class MemoryGame extends window.HTMLElement {
  /**
   * Creates an instance of MemoryGame.
   * @memberof MemoryGame
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._boardSize = null

    this._memoryWrapper = this.shadowRoot.querySelector('.memoryWrapper')
    this._alternatives = this.shadowRoot.querySelector('memory-alternatives')
    this._startScreen = this.shadowRoot.querySelector('memory-start-screen')

    this._memoryBoard = undefined
    this._timer = undefined
    this._gameButtons = undefined
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryGame
   */
  connectedCallback () {
    this._boundOnAltChange = this._onAltChange.bind(this)
    this._boundOnStartGame = this._onStartGame.bind(this)
    this._boundOnRestart = this._onRestart.bind(this)
    this._boundOnHome = this._onHome.bind(this)
    this._boundOnWin = this._onWin.bind(this)

    this._alternatives.addEventListener('altchange', this._boundOnAltChange)
    this._startScreen.addEventListener('startgame', this._boundOnStartGame)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof MemoryGame
   */
  disconnectedCallback () {
    if (this._alternatives) {
      this._alternatives.removeEventListener('altchange', this._boundOnAltChange)
    }
    if (this._startScreen) {
      this._startScreen.removeEventListener('startgame', this._boundOnStartGame)
    }
    if (this._memoryBoard) {
      this._memoryBoard.removeEventListener('gameover', this._boundOnWin)
    }
    if (this._gameButtons) {
      this._gameButtons.removeEventListener('restartclick', this._boundOnRestart)
      this._gameButtons.removeEventListener('homeclick', this._boundOnHome)
    }
  }

  /**
   * Runs when a radiobutton is clicked on the memory-alternatives.
   * Sets the boardsize of the memory board
   *
   * @param {CustomEvent} event An altchange event
   * @memberof MemoryGame
   */
  _onAltChange (event) {
    this._boardSize = [event.detail.rows, event.detail.columns]
  }

  /**
   * Starts a new memory game
   * Runs when the start game button is clicked.
   *
   * @param {CustomEvent} event A startgame event
   * @memberof MemoryGame
   */
  _onStartGame (event) {
    if (this._boardSize) {
      this._alternatives.removeEventListener('altchange', this._boundOnAltChange)
      this._startScreen.removeEventListener('startgame', this._boundOnStartGame)
      this.cleanForm(this._memoryWrapper)
      this._addTimer()
      this._addGameButtons()
      this._addMemoryBoard(this._boardSize[0], this._boardSize[1])
    }
  }

  /**
   * Restarts the memory game
   * Runs when the restart button is clicked.
   *
   * @param {CustomEvent} event A restartclick event
   * @memberof MemoryGame
   */
  _onRestart (event) {
    this._memoryBoard.removeEventListener('gameover', this._boundOnWin)
    this._gameButtons.removeEventListener('restartclick', this._boundOnRestart)
    this._gameButtons.removeEventListener('homeclick', this._boundOnHome)
    this.cleanForm(this._memoryWrapper)
    this._addTimer()
    this._addGameButtons()
    this._addMemoryBoard(this._boardSize[0], this._boardSize[1])
  }

  /**
   * Removes the memory game and displays the start screen
   * Runs when the home button is clicked
   *
   * @param {CustomEvent} event A homeclick event
   * @memberof MemoryGame
   */
  _onHome (event) {
    this.cleanForm(this._memoryWrapper)
    const alternatives = document.createElement('memory-alternatives')
    const startScreen = document.createElement('memory-start-screen')

    this._alternatives = this._memoryWrapper.appendChild(alternatives)
    this._startScreen = this._memoryWrapper.appendChild(startScreen)
    this._boardSize = null

    this._alternatives.addEventListener('altchange', this._boundOnAltChange)
    this._startScreen.addEventListener('startgame', this._boundOnStartGame)
  }

  /**
   * Removes all child elements of the passed element
   *
   * @param {HTMLElement} element A HTML element
   * @memberof MemoryGame
   */
  cleanForm (element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.firstChild)
    }
  }

  /**
   * Creates a Memory Board
   *
   * @param {Number} boardRows Number of rows
   * @param {Number} boardColumns Number of columns
   * @memberof MemoryGame
   */
  _addMemoryBoard (boardRows, boardColumns) {
    const board = document.createElement('memory-board')

    board.setAttribute('rows', boardRows)
    board.setAttribute('columns', boardColumns)

    this._memoryWrapper.insertBefore(board, this._gameButtons)

    this._memoryBoard = this.shadowRoot.querySelector('memory-board')

    this._memoryBoard.addEventListener('gameover', this._boundOnWin)
  }

  /**
   * Adds a 'memory-game-buttons' element
   *
   * @memberof MemoryGame
   */
  _addGameButtons () {
    const gameButtons = document.createElement('memory-game-buttons')
    gameButtons.setAttribute('bgcolor', '#317a5a')
    gameButtons.setAttribute('fcolor', '#001f3f')

    this._gameButtons = this._memoryWrapper.appendChild(gameButtons)

    this._gameButtons.addEventListener('restartclick', this._boundOnRestart)
    this._gameButtons.addEventListener('homeclick', this._boundOnHome)
  }

  /**
   * Adds a 'game-timer' Element
   *
   * @memberof MemoryGame
   */
  _addTimer () {
    const timer = document.createElement('game-timer')
    this._timer = this._memoryWrapper.appendChild(timer)
  }

  /**
   * Runs when the game is over
   *
   * @memberof MemoryGame
   */
  _onWin (event) {
    const time = this._timer._stopTimer()
    this._memoryBoard.remove()
    this._timer.remove()

    const gameOver = document.createElement('memory-game-over')
    gameOver.setAttribute('gametime', `Time: ${time}.s`)
    gameOver.setAttribute('gameinfo', `Attempts: ${event.detail}`)
    gameOver.setAttribute('wintext', 'You Win!')
    this._memoryWrapper.insertBefore(gameOver, this._gameButtons)
  }
}

window.customElements.define('memory-game', MemoryGame)
