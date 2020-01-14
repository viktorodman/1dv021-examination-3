/**
 * Module for MemoryStartScreen
 *
 * @module src/js/apps/Memory-Game/memory-start-screen
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
        .wrapper {
            margin-top: 20px;
            color: #001f3f;
        }
        button {
            font-size: 30px;
            background-color: #317a5a;
            color: #001f3f;
            outline: none;
            margin-top: 30px;
            margin-bottom: 30px;
            border: 4px solid #001f3f;
        }
        button:hover {
            border: 4px solid #003973;
            color: #003973;
        }
    </style>
    <div class="wrapper">
        <div class="title">
            <span>Memory Game</span>
        </div>
        <div class="buttons">
            <button>START</button>
        </div>
        <div class="description">
            <span>Select a board size and press start</span>
        </div>
    </div>
`
/**
 * Represents a start screen for a memory game.
 *
 * @class MemoryStartScreen
 * @extends {window.HTMLElement}
 */
class MemoryStartScreen extends window.HTMLElement {
  /**
   * Creates an instance of MemoryStartScreen.
   * @memberof MemoryStartScreen
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._button = this.shadowRoot.querySelector('button')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryStartScreen
   */
  connectedCallback () {
    this._boundOnButtonClick = this._onButtonClick.bind(this)

    this._button.addEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof MemoryStartScreen
   */
  disconnectedCallback () {
    this._button.removeEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Runs when the start button is clicked
   * Dispatches a Custom event
   *
   * @param {Event} event A click event
   * @memberof MemoryStartScreen
   */
  _onButtonClick (event) {
    this.dispatchEvent(new window.CustomEvent('startgame'))
  }
}

window.customElements.define('memory-start-screen', MemoryStartScreen)
