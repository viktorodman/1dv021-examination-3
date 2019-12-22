/**
 * Module for MemoryGameButtons
 *
 * @module src/js/apps/Memory-Game/memory-game-buttons
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>

    </style>

    <div class="gameButtons">
        <button class="restart" name="restart">Restart</button>
        <button class="home" name="home">HOME</button>
    </div>
`
/**
 * Represent buttons for a memory game
 *
 * @class MemoryGameButtons
 * @extends {window.HTMLElement}
 */
class MemoryGameButtons extends window.HTMLElement {
  /**
   * Creates an instance of MemoryGameButtons.
   * @memberof MemoryGameButtons
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._gameButtons = this.shadowRoot.querySelector('.gameButtons')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryGameButtons
   */
  connectedCallback () {
    this._boundOnButtonClick = this._onButtonClick.bind(this)

    this._gameButtons.addEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof MemoryGameButtons
   */
  disconnectedCallback () {
    this._gameButtons.removeEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Dispatches event depending what button that is clicked
   *
   * @param {Event} event A click event
   * @memberof MemoryGameButtons
   */
  _onButtonClick (event) {
    if (event.target.nodeName !== 'BUTTON') {
      return
    }
    if (event.target.name === 'restart') {
      this.dispatchEvent(new window.CustomEvent('restartclick'))
    }
    if (event.target.name === 'home') {
      this.dispatchEvent(new window.CustomEvent('homeclick'))
    }
  }
}
window.customElements.define('memory-game-buttons', MemoryGameButtons)
