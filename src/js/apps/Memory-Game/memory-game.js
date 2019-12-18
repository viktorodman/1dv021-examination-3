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
      .mainDivMemory {
        text-align: center; 
        color: black;
        font-size: 30px;
      }
    </style>
    <div class="mainDivMemory">
    <span>Play with the arrow keys and enter or with the mouse</span>
      <span>Choose a Size</span>
      <form id="asd">
        <label for="alt1">
          4x4
          <input id="alt1" type="radio" name="Alternatives" rows="4" columns="4">
        </label>
        <label for="alt2">
          2x2
          <input id="alt2" type="radio" name="Alternatives" rows="2" columns="2">
        </label>
        <label for="alt3">
          2x4
          <input id="alt3" type="radio" name="Alternatives" rows="2" columns="4">
        </label>
      </form>
      <div class="boardDiv">
      </div>
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

    this._sizes = this.shadowRoot.querySelector('#sizes')

    this._boardDiv = this.shadowRoot.querySelector('.boardDiv')
    this.memoryBoard = undefined
    this._form = this.shadowRoot.querySelector('#asd')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryGame
   */
  connectedCallback () {
    /* this.addMemoryBoard(4, 4) */
    this._boundOnInputClick = this._onInputClick.bind(this)

    this._form.addEventListener('click', this._boundOnInputClick)
  }

  _onInputClick (event) {
    if (event.target.nodeName !== 'INPUT') {
      return
    }
    this.cleanForm(this._boardDiv)
    const rows = Number(event.target.getAttribute('rows'))
    const columns = Number(event.target.getAttribute('columns'))
    this.addMemoryBoard(rows, columns)
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
