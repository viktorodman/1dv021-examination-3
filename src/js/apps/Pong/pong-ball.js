/**
 * Module for PongPaddle
 *
 * @module src/js/Pong/pong-paddle
 * @author Viktor Ödman
 * @version 1.0.0
*/

class PongBall extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._color = 'black'
    this._radius = 10
    this._dy = 1
    this._dx = 1
    this._position = {
      x: null,
      y: null
    }
    this._direction = {
      dirY: 2,
      dirX: 2
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

  connectedCallback () {

  }

  _render (canvas) {
    canvas.beginPath()
    canvas.arc(this._position.x, this._position.y, this._radius, 0, Math.PI * 2)
    canvas.fillStyle = this._color
    canvas.fill()
    canvas.closePath()
  }

  getDirection () {
    return this._direction
  }

  getPosition () {
    return this._position
  }

  _move () {
    this._position.x += this._direction.dirX
    this._position.y += this._direction.dirY
  }

  _moveUp () {
    this._direction.dirY = -2
  }

  _moveDown () {
    this._direction.dirY = 2
  }

  _moveLeft () {
    this._direction.dirX = -2
  }

  _moveRight () {
    this._direction.dirY = 2
  }

  _getBallRadius () {
    return this._radius
  }

  _setStartPosition (canvasWidth, canvasHeight) {
    this._position.x = (canvasWidth / 2) - this._radius
    this._position.y = (canvasHeight / 2) - this._radius
  }
}

window.customElements.define('pong-ball', PongBall)
