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
    this._dpi = window.devicePixelRatio
    this._table = this.shadowRoot.querySelector('.table')
    this._a = this.shadowRoot.querySelector('.canvasWrapper')
    this.ctx = this._table.getContext('2d')
    this._paddleOne = undefined
    this._paddleTwo = undefined
    this._ball = undefined
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
    this._fixDpi()
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

  disconnectedCallback () {
    clearInterval(this._intervalID)
    this._a.removeEventListener('keydown', this._boundOnKeyDown)
    this._a.removeEventListener('keyup', this._boundOnKeyUp)
  }

  _fixDpi () {
    const styleWidth = +window.getComputedStyle(this._table).getPropertyValue('width').slice(0, -2)
    const styleHeight = +window.getComputedStyle(this._table).getPropertyValue('height').slice(0, -2)
    this._table.setAttribute('height', styleHeight * this._dpi)
    this._table.setAttribute('width', styleWidth * this._dpi)
    /* console.log(styleHeight * this._dpi)
    console.log(this._dpi) */
  }

  _onKeyDown (event) {
    event.preventDefault()
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
    paddle.setAttribute('paddlewidth', 10)
    paddle.setAttribute('paddleheight', 30)
    if (player1) {
      paddle.setAttribute('paddlecolor', '#FF4136')
      paddle._setRight(this._table.width)
    } else {
      paddle.setAttribute('paddlecolor', '#0074D9')
      paddle._setLeft()
    }
    paddle._setTop(this._table.height)

    return this._table.appendChild(paddle)
  }

  _createBall () {
    const ball = document.createElement('pong-ball')
    ball.setAttribute('ballradius', 3)
    ball.setAttribute('ballcolor', '#F012BE')
    ball._setStartPosition(this._table.width, this._table.height)
    return this._table.appendChild(ball)
  }

  _createShapes () {
    this._paddleOne = this._createPaddle(true)
    this._paddleTwo = this._createPaddle(false)
    this._ball = this._createBall()
  }

  _renderBoard () {
    this.ctx.clearRect(0, 0, this._table.width, this._table.height)
    this._fixDpi()
    this._movePaddle(this._paddleOne, this._paddleOneUp, this._paddleOneDown)
    this._movePaddle(this._paddleTwo, this._paddleTwoUp, this._paddleTwoDown)

    this._paddleOne._render(this.ctx)
    this._paddleTwo._render(this.ctx)
    this._ball._render(this.ctx)
  }

  _movePaddle (paddle, up, down) {
    if (up) {
      if (paddle._getY() > 0) {
        paddle._moveUp()
      }
    }
    if (down) {
      if ((paddle._getY() + paddle._getHeight()) < this._table.height) {
        paddle._moveDown()
      }
    }
  }
}
window.customElements.define('pong-table', PongTable)
