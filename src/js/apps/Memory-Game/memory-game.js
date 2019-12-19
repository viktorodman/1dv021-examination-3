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

    this._boardDiv = this.shadowRoot.querySelector('.boardDiv')
    this.memoryBoard = undefined
    this._alternatives = this.shadowRoot.querySelector('memory-alternatives')
    this._boardSize = null
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryGame
   */
  connectedCallback () {
    /* this.addMemoryBoard(4, 4) */
    this._boundOnAltChange = this._onAltChange.bind(this)

    this._alternatives.addEventListener('altchange', this._boundOnAltChange)
  }

  _onAltChange (event) {
    this._boardSize = [event.detail.rows, event.detail.columns]
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

    this._boardDiv.appendChild(board)
    this.memoryBoard = this.shadowRoot.querySelector('memory-board')
    this.memoryBoard.addEventListener('gameover', event => {
      this._win()
    })
  }

  /**
   * Runs the game is over
   *
   * @memberof MemoryGame
   */
  _win () {
    this.cleanForm(this._boardDiv)
    const h1 = document.createElement('h1')
    h1.setAttribute('class', 'winText')
    h1.textContent = 'YOU WIN'
    this._boardDiv.appendChild(h1)
  }
}

window.customElements.define('memory-game', MemoryGame)
