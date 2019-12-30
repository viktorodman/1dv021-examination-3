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
        :host {
        padding: 0;
        margin: 0;
        }
       .table {
        width: 100%;
        height: 100%;
        background-color: #3D9970;
        display: block;
        margin: auto;
       }
    </style>
    <a href="#" class="canvasWrapper">
   <canvas class="table">
   </canvas>
   </a>
`
/**
 * Represents a Pong Table
 * REF: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Create_the_Canvas_and_draw_on_it
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

    this._table = this.shadowRoot.querySelector('.table')
    this._a = this.shadowRoot.querySelector('.canvasWrapper')
    this.ctx = this._table.getContext('2d')
    this._paddleOne = undefined
    this._paddleTwo = undefined
    this._twoPlayers = false

    this._paddleOneUp = false
    this._paddleOneDown = false
    this._paddleTwoUp = false
    this._paddleTwoDown = false
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
    this._a.focus()
    this._boundOnKeyDown = this._onKeyDown.bind(this)
    this._boundOnKeyUp = this._onKeyUp.bind(this)
    this._createShapes()
    this._intervalID = window.setInterval(() => {
      this._renderBoard()
    }, 10)

    this._a.addEventListener('keydown', this._boundOnKeyDown)
    this._a.addEventListener('keyup', this._boundOnKeyUp)
  }

  _onKeyDown (event) {
    event.preventDefault()
    console.log(event.code)
    switch (event.code) {
      case 'ArrowUp': this._paddleOneUp = true
        break
      case 'ArrowDown': this._paddleOneDown = true
        break
      case 'KeyW': this._paddleTwoUp = true
        break
      case 'KeyS': this._paddleTwoDown = true
    }
  }

  _onKeyUp (event) {
    event.preventDefault()
    switch (event.code) {
      case 'ArrowUp': this._paddleOneUp = false
        break
      case 'ArrowDown': this._paddleOneDown = false
        break
      case 'KeyW': this._paddleTwoUp = false
        break
      case 'KeyS': this._paddleTwoDown = false
    }
  }

  _createPaddle (player1) {
    const paddle = document.createElement('pong-paddle')
    paddle.setAttribute('canvaswidth', this._table.width)
    paddle.setAttribute('canvasheight', this._table.height)
    player1 ? paddle.setAttribute('paddleposition', 'right') : paddle.setAttribute('paddleposition', 'left')

    return this._table.appendChild(paddle)
  }

  _createShapes () {
    this._paddleOne = this._createPaddle(true)
    this._paddleTwo = this._createPaddle(false)
  }

  _renderBoard () {
    this.ctx.clearRect(0, 0, this._table.width, this._table.height)
    if (this._paddleOneUp) {
      this._paddleOne._moveUp()
    }
    if (this._paddleOneDown) {
      this._paddleOne._moveDown()
    }
    if (this._paddleTwoUp) {
      this._paddleTwo._moveUp()
    }
    if (this._paddleTwoDown) {
      this._paddleTwo._moveDown()
    }

    this._paddleOne._render(this.ctx)
    this._paddleTwo._render(this.ctx)
  }
}
window.customElements.define('pong-table', PongTable)
