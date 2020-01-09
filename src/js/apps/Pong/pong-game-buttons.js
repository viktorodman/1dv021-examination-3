/**
 * Module for PongGameButtons
 *
 * @module src/js/apps/Pong-Game/pong-game-buttons
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
      button {
        outline: none;
        font-size: 20px;
      }
    </style>

    <div class="gameButtons">
        <button class="restart" name="restart">Restart</button>
        <button class="home" name="home">HOME</button>
    </div>
`
/**
 * Represent buttons for a Pong game
 *
 * @class PongGameButtons
 * @extends {window.HTMLElement}
 */
class PongGameButtons extends window.HTMLElement {
  /**
   * Creates an instance of PongGameButtons.
   * @memberof PongGameButtons
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._gameButtons = this.shadowRoot.querySelector('.gameButtons')
    this._buttons = this.shadowRoot.querySelectorAll('button')
    this._fColor = undefined
    this._bgColor = undefined
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof PongGameButtons
   */
  static get observedAttributes () {
    return ['fcolor', 'bgcolor']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof PongGameButtons
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'bgcolor') {
      this._bgColor = newValue
    }
    if (name === 'fcolor') {
      this._fColor = newValue
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongGameButtons
   */
  connectedCallback () {
    this._boundOnButtonClick = this._onButtonClick.bind(this)

    this._buttons.forEach(button => {
      button.style.color = this._fColor
      button.style.backgroundColor = this._bgColor
    })

    this._gameButtons.addEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof PongGameButtons
   */
  disconnectedCallback () {
    this._gameButtons.removeEventListener('click', this._boundOnButtonClick)
  }

  /**
   * Dispatches event depending what button that is clicked
   *
   * @param {Event} event A click event
   * @memberof PongGameButtons
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
window.customElements.define('pong-game-buttons', PongGameButtons)
