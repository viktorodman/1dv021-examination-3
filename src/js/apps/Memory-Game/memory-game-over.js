/**
 * Module for MemoryGameOver
 *
 * @module src/js/Pong/memory-game-over
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
            color: #FFFFFF;
        }
        .wrapper {
            margin: auto;
            width: 80%;
            height: 80%;
            text-align: center;
        }
        .winText {
            text-align: center;
            font-size: 60px;
        }
        .row{
            height: 20%;
        }
    </style>
    <div class="wrapper">
        <div class="row1 row">
            <span class="time"></span>
        </div>
        <div class="row2 row">
            <span class="gameInfo"></span>
        </div>
        <div class="row3 row">
            <span class="winnerName"></span>
        </div>
        <div class="row4 row">
            <span class="winText">YOU WIN</span>
        </div>
    </div>
`
/**
 * Represents a game over display
 *
 * @class MemoryGameOver
 * @extends {window.HTMLElement}
 */
class MemoryGameOver extends window.HTMLElement {
  /**
   * Creates an instance of MemoryGameOver.
   * @memberof MemoryGameOver
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._timeSelector = this.shadowRoot.querySelector('.time')
    this._gameInfoSelector = this.shadowRoot.querySelector('.gameInfo')
    this._winnerNameSelector = this.shadowRoot.querySelector('.winnerName')
    this._winTextSelector = this.shadowRoot.querySelector('.winText')

    this._time = undefined
    this._gameInfo = undefined
    this._winnerName = undefined
    this._winText = undefined
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof MemoryBoard
   */
  static get observedAttributes () {
    return ['gametime', 'gameinfo', 'winnername', 'wintext']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof MemoryBoard
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'gametime') {
      this._time = newValue
    }
    if (name === 'gameinfo') {
      this._gameInfo = newValue
    }
    if (name === 'winnername') {
      this._winnerName = newValue
    }
    if (name === 'wintext') {
      this._winText = newValue
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryGameOver
   */
  connectedCallback () {
    this._updateRendering()
  }

  /**
   * Updates the different elemts text
   *
   * @memberof MemoryGameOver
   */
  _updateRendering () {
    this._addTextContent(this._timeSelector, this._time)
    this._addTextContent(this._gameInfoSelector, this._gameInfo)
    this._addTextContent(this._winnerNameSelector, this._winnerName)
    this._addTextContent(this._winTextSelector, this._winText)
  }

  /**
   * Changes the text on the passed element with the passed text
   *
   * @param {HTMLElement} element An HTML element
   * @param {String} text A string
   * @memberof MemoryGameOver
   */
  _addTextContent (element, text) {
    if (text) {
      element.textContent = text
    }
  }
}

window.customElements.define('memory-game-over', MemoryGameOver)
