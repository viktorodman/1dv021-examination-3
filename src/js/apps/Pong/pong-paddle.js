/**
 * Module for PongPaddle
 *
 * @module src/js/Pong/pong-paddle
 * @author Viktor Ödman
 * @version 1.0.0
*/
// https://stackoverflow.com/questions/52128997/how-to-create-canvas-class-with-javascript-es6
class PongPaddle extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this._dpi = window.devicePixelRatio
    this._height = 30
    this._width = 10
    this._paddleSpacing = 20
    this._color = 'black'
    this._tableSide = undefined
    this._dy = 1

    this._position = {
      x: null,
      y: null
    }
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof PongPaddle
   */
  static get observedAttributes () {
    return ['paddlecolor', 'paddlewidth', 'paddleheight']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof PongPaddle
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'paddlecolor') {
      this._color = newValue
    }
    if (name === 'paddlewidth') {
      this._width = Number(newValue)
    }
    if (name === 'paddleheight') {
      this._height = Number(newValue)
    }
  }

  connectedCallback () {

  }

  _render (canvas) {
    canvas.beginPath()
    canvas.rect(this._position.x, this._position.y, this._width, this._height)
    canvas.fillStyle = this._color
    canvas.fill()
    canvas.closePath()
  }

  _setStartPosition (canvasWidth, canvasHeight, rightPaddle) {
    if (rightPaddle) {
      this._setRight(canvasWidth)
    } else {
      this._setLeft()
    }
    this._setTop(canvasHeight)
  }

  _moveUp () {
    this._position.y -= this._dy
  }

  _moveDown () {
    this._position.y += this._dy
  }

  _setLeft () {
    this._position.x = this._paddleSpacing
  }

  _setRight (canvasWidth) {
    this._position.x = (canvasWidth - this._width) - this._paddleSpacing
  }

  _setTop (canvasHeight) {
    this._position.y = (canvasHeight / 2) - (this._height / 2)
  }

  _getHeight () {
    return this._height
  }

  _getWidth () {
    return this._width
  }

  _getY () {
    return this._position.y
  }
}

window.customElements.define('pong-paddle', PongPaddle)
