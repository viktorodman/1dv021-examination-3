/**
 * Module for MemoryGame
 *
 * @module src/js/Memory-Game/memory-game
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
      span {
        color: white;
        font-family: monospace;
      }
      .winText {
        text-align: center;
        font-size: 60px;
        color: green;
      }
      .memoryWrapper {
        text-align: center; 
        color: black;
        font-size: 30px;
        width: 100%;
        height: 100%;
        background-color: #a0a0a0;
        
      }
      .boardDiv {
        width: 100%;
        height: 90%;
      }
    </style>
    <div class="memoryWrapper">
        <memory-alternatives></memory-alternatives>
        <memory-start-screen></memory-start-screen>
        <game-timer></game-timer>
        <!-- <memory-board></memory-board>
        <memory-game-buttons></memory-game-buttons> -->
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

    this._memoryWrapper = this.shadowRoot.querySelector('.memoryWrapper')
    this._alternatives = this.shadowRoot.querySelector('memory-alternatives')
    this._startScreen = this.shadowRoot.querySelector('memory-start-screen')

    this._memoryBoard = undefined
    this._boardSize = null
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

  _onAltChange (event) {
    this._boardSize = [event.detail.rows, event.detail.columns]
  }

  _onStartGame (event) {
    if (this._boardSize) {
      this._alternatives.removeEventListener('altchange', this._boundOnAltChange)
      this._startScreen.removeEventListener('startgame', this._boundOnStartGame)
      this._startScreen.remove()
      this._alternatives.remove()
      this.addGameButtons()
      this.addMemoryBoard(this._boardSize[0], this._boardSize[1])
    }
  }

  _onRestart (event) {
    this._memoryBoard.removeEventListener('gameover', this._boundOnWin)
    this._memoryBoard.remove()
    this.addMemoryBoard(this._boardSize[0], this._boardSize[1])
  }

  _onHome (event) {
    this.cleanForm(this._memoryWrapper)
    const alternatives = document.createElement('memory-alternatives')
    const startScreen = document.createElement('memory-start-screen')

    this._memoryWrapper.appendChild(alternatives)
    this._memoryWrapper.appendChild(startScreen)
    this._alternatives = this.shadowRoot.querySelector('memory-alternatives')
    this._startScreen = this.shadowRoot.querySelector('memory-start-screen')
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
  addMemoryBoard (boardRows, boardColumns) {
    const board = document.createElement('memory-board')

    board.setAttribute('rows', boardRows)
    board.setAttribute('columns', boardColumns)

    this._memoryWrapper.insertBefore(board, this._gameButtons)

    this._memoryBoard = this.shadowRoot.querySelector('memory-board')

    this._memoryBoard.addEventListener('gameover', this._boundOnWin)
  }

  addGameButtons () {
    const gameButtons = document.createElement('memory-game-buttons')
    this._memoryWrapper.appendChild(gameButtons)

    this._gameButtons = this.shadowRoot.querySelector('memory-game-buttons')

    this._gameButtons.addEventListener('restartclick', this._boundOnRestart)
    this._gameButtons.addEventListener('homeclick', this._boundOnHome)
  }

  /**
   * Runs the game is over
   *
   * @memberof MemoryGame
   */
  _onWin (event) {
    this.cleanForm(this._boardDiv)
    const h1 = document.createElement('h1')
    h1.setAttribute('class', 'winText')
    h1.textContent = 'YOU WIN'
    this._boardDiv.appendChild(h1)
  }
}

window.customElements.define('memory-game', MemoryGame)
