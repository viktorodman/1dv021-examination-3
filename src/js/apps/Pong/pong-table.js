/**
 * Module for PongTable
 *
 * @module src/js/Pong/pong-table
 * @author Viktor Ödman
 * @version 1.0.0
*/
const template = document.createElement('template')
template.innerHTML = `
    <style>
        .tableWrapper {
            width: 100%;
            height: 100%;
            background-color: #3D9970;
        }
        
        .tableLeft, .tableRight {
            height: 100%;
            width: 50%;
            float: left;
            border: 1px solid white;
            box-sizing: border-box;
        }
    </style>
    <div class="tableWrapper">
        <a href="#">
            <div class="tableLeft">
            <pong-paddle></pong-paddle>
            </div>
            <div class="tableRight">
            <pong-paddle class="paddleOne"></pong-paddle>
            </div>
        </a>
    </div>
`
/**
 * Represents a Pong Table
 *
 * @class PongTable
 * @extends {window.HTMLElement}
 */
class PongTable extends window.HTMLElement {
  /**
    * Creates an instance of PongTable.
    * @memberof PongTable
    */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._twoPlayers = false
    this._paddle = this.shadowRoot.querySelector('.paddleOne')
    this._topMax = 35
    this._topMin = 328
    this._topMiddle = 165
    this._tableWrapper = this.shadowRoot.querySelector('.tableWrapper')
    this._tableA = this.shadowRoot.querySelector('a')
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof PongTable
   */
  static get observedAttributes () {
    return ['twoplayers']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof PongTable
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'twoplayers') {
      if (newValue === 'true') {
        this._twoPlayers = true
      }
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongTable
   */
  connectedCallback () {
    this._startPositon()
    this._tableA.focus()
    this._boundOnKeyDown = this._onKeyDown.bind(this)
    this._tableWrapper.addEventListener('keydown', this._boundOnKeyDown)
  }

  _startPositon () {
    this._paddle.style.top = `${this._topMiddle}px`
  }

  _onKeyDown (event) {
    event.preventDefault()
    switch (event.code) {
      case 'ArrowUp': this._onArrowUp()
        break
      case 'ArrowDown': this._onArrowDown()
    }
  }

  _onArrowUp (target) {
    this._paddle.style.top = `${parseInt(this._paddle.style.top, 10) - 20}px`
  }

  _onArrowDown (target) {
    this._paddle.style.top = `${parseInt(this._paddle.style.top, 10) + 20}px`
  }
}
window.customElements.define('pong-table', PongTable)
