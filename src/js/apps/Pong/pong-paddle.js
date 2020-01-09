/**
 * Module for PongPaddle
 *
 * @module src/js/Pong/pong-paddle
 * @author Viktor Ödman
 * @version 1.0.0
*/

/**
 * Represents a Pong Paddle
 *
 * @class PongPaddle
 * @extends {window.HTMLElement}
 */
class PongPaddle extends window.HTMLElement {
  /**
   * Creates an instance of PongPaddle.
   * @memberof PongPaddle
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this._dpi = window.devicePixelRatio
    this._height = 30
    this._width = 10
    this._paddleSpacing = 20
    this._color = 'black'
    this._tableSide = undefined
    this._dy = 1.9
    this._name = undefined

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
    return ['paddlecolor', 'paddlewidth', 'paddleheight', 'paddlename']
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
    if (name === 'paddlename') {
      this._name = newValue
    }
  }

  /**
   * Renders the Pong Paddle
   *
   * @param {CanvasRenderingContext2D} canvas A html canvas
   * @memberof PongBall
   */
  _render (canvas) {
    canvas.beginPath()
    canvas.rect(this._position.x, this._position.y, this._width, this._height)
    canvas.fillStyle = this._color
    canvas.fill()
    canvas.closePath()
  }

  /**
   * Sets the Start Position of the ball
   *
   * @param {Number} canvasWidth The canvas width
   * @param {Number} canvasHeight The canvas height
   * @param {Boolean} rightPaddle True if the paddle should be on the right side
   * @memberof PongPaddle
   */
  _setStartPosition (canvasWidth, canvasHeight, rightPaddle) {
    if (rightPaddle) {
      this._setRight(canvasWidth)
      this._tableSide = 'right'
    } else {
      this._tableSide = 'left'
      this._setLeft()
    }
    this._setTop(canvasHeight)
  }

  /**
   * Sets the paddles direction so it moves up
   *
   * @memberof PongPaddle
   */
  _moveUp () {
    this._position.y -= this._dy
  }

  /**
   * Sets the paddles direction so it moves down
   *
   * @memberof PongPaddle
   */
  _moveDown () {
    this._position.y += this._dy
  }

  /**
   * Moves the paddle to the left side of the canvas
   *
   * @memberof PongPaddle
   */
  _setLeft () {
    this._position.x = this._paddleSpacing
  }

  /**
   * Moves the paddle to the right side of the canvas
   *
   * @memberof PongPaddle
   */
  _setRight (canvasWidth) {
    this._position.x = (canvasWidth - this._width) - this._paddleSpacing
  }

  /**
   * moves paddle vertical position to the middle of the canvas
   *
   * @param {Number} canvasHeight The height of the canvas
   * @memberof PongPaddle
   */
  _setTop (canvasHeight) {
    this._position.y = (canvasHeight / 2) - (this._height / 2)
  }

  /**
  * Gets the hight of the paddle
  *
  * @returns {Number} The paddles height
  * @memberof PongPaddle
  */
  _getHeight () {
    return this._height
  }

  /**
  * Gets the width of the paddle
  *
  * @returns {Number} The paddles width
  * @memberof PongPaddle
  */
  _getWidth () {
    return this._width
  }

  /**
   * Gets the top of paddles vertical position
   *
   * @returns {Number} A vertical position
   * @memberof PongPaddle
   */
  _getY () {
    return this._position.y
  }

  /**
  * Gets the paddles horizontal position
  *
  * @returns {Number} The horizontal position of the paddle
  * @memberof PongPaddle
  */
  getX () {
    let xPosition = this._position.x + this._getWidth()
    if (this._tableSide === 'right') {
      xPosition = this._position.x - (this._getWidth() / 2)
    }
    return xPosition
  }

  /**
   * Gets the vertical position of the bottom of the paddle
   *
   * @returns {Number} The bottom position of the paddle
   * @memberof PongPaddle
   */
  getBottomPos () {
    return (this._getY() + this._getHeight())
  }

  /**
   * Gets the name attribute of the paddle
   *
   * @returns {String} A name
   * @memberof PongPaddle
   */
  getName () {
    return this._name
  }

  getTopEdge () {
    return this._getY() + (this._getHeight() / 3)
  }

  getBottomEdge () {
    return this.getBottomPos() - (this._getHeight() / 3)
  }
}

window.customElements.define('pong-paddle', PongPaddle)
