/**
 * Module for PongBall
 *
 * @module src/js/Pong/pong-ball
 * @author Viktor Ödman
 * @version 1.0.0
*/

/**
 * Represents a Pong Ball
 *
 * @class PongBall
 * @extends {window.HTMLElement}
 */
class PongBall extends window.HTMLElement {
  /**
   * Creates an instance of PongBall.
   * @memberof PongBall
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._color = 'black'
    this._radius = 10
    this._verticalDirection = 'down'
    this._horizontalDirection = 'right'
    this._speed = 2
    this._position = {
      x: null,
      y: null
    }
    this._direction = {
      dirY: this._speed,
      dirX: -this._speed
    }
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof PongBall
   */
  static get observedAttributes () {
    return ['ballradius', 'ballcolor']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof PongBall
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'ballradius') {
      this._radius = Number(newValue)
    }
    if (name === 'ballcolor') {
      this._color = newValue
    }
  }

  /**
   * Renders the pong ball
   *
   * @param {CanvasRenderingContext2D} canvas A html canvas
   * @memberof PongBall
   */
  render (canvas) {
    canvas.beginPath()
    canvas.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2)
    canvas.fillStyle = this._color
    canvas.fill()
    canvas.closePath()
  }

  /**
  * Returns the current direction of the ball
  *
  * @returns {Number} A number representing the direction
  * @memberof PongBall
  */
  getDirection () {
    return this._direction
  }

  /**
  * Returns the current position of the ball
  *
  * @returns {Number} The current position of the ball
  * @memberof PongBall
  */
  getPosition () {
    return this._position
  }

  /**
   * Updates the balls position
   *
   * @memberof PongBall
   */
  move () {
    this._position.x += this._direction.dirX
    this._position.y += this._direction.dirY
  }

  /**
   * Sets the ball direction so it moves up
   *
   * @memberof PongBall
   */
  moveUp () {
    this._direction.dirY = -this._speed
    this._verticalDirection = 'up'
  }

  /**
   * Sets the ball direction so it moves down
   *
   * @memberof PongBall
   */
  moveDown () {
    this._direction.dirY = this._speed
    this._verticalDirection = 'down'
  }

  /**
   * Sets the ball direction so it moves left
   *
   * @memberof PongBall
   */
  moveLeft () {
    this._direction.dirX = -this._speed
    this._horizontalDirection = 'left'
  }

  /**
   * Sets the ball direction so it moves right
   *
   * @memberof PongBall
   */
  moveRight () {
    this._direction.dirX = this._speed
    this._horizontalDirection = 'right'
  }

  /**
   * Gets the balls radius
   *
   * @returns {Number} The balls radius
   * @memberof PongBall
   */
  getBallRadius () {
    return this._radius
  }

  /**
   * Sets the Start Position of the ball
   *
   * @param {Number} canvasWidth The canvas width
   * @param {Number} canvasHeight The canvas height
   * @memberof PongBall
   */
  setStartPosition (canvasWidth, canvasHeight) {
    this._position.x = (canvasWidth / 2)
    this._position.y = (canvasHeight / 2)
  }

  /**
  * Stops the ball from moving
  * Used in testing
  *
  * @memberof PongBall
  */
  stopBall () {
    this._direction.dirY = 0
    this._direction.dirX = 0
  }

  /**
   * Gets the current vertical direction in form of a string
   *
   * @returns {String} The current vertical direction
   * @memberof PongBall
   */
  getVerticalDirection () {
    return this._verticalDirection
  }

  /**
   * Gets the current horizontal direction in form of a string
   *
   * @returns {String} The current vertical direction
   * @memberof PongBall
   */
  getHorizontalDirection () {
    return this._horizontalDirection
  }

  /**
   * Adds 0.1 to the balls speed
   *
   * @memberof PongBall
   */
  accelerate () {
    this._speed += 0.1
  }

  /**
   * Sets the balls speed to its initial value
   *
   * @memberof PongBall
   */
  setStartSpeed () {
    this._speed = 2
  }
}

window.customElements.define('pong-ball', PongBall)
