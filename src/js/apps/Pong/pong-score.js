/**
 * Module for PongTable
 *
 * @module src/js/Pong/pong-score
 * @author Viktor Ödman
 * @version 1.0.0
*/
class PongScore extends window.HTMLElement {
  /**
   * Creates an instance of PongScore.
   * @memberof PongScore
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this._side = 'left'
    this._font = '30px Arial'
    this._fontSize = undefined
    this._score = 0
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
   * @memberof PongScore
   */
  static get observedAttributes () {
    return ['position']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof PongScore
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'position') {
      if (newValue === 'right') {
        this._side = 'right'
      }
    }
  }

  connectedCallback () {

  }

  _render (canvas) {
    canvas.font = this._font
    canvas.fillText(this._score, this._position.x, this._position.y)
  }

  setPosition (canvasWidth, canvasHeight) {
    if (this._side === 'right') {
      this._position.x = (canvasWidth / 2) + (canvasWidth / 6)
    } else {
      this._position.x = (canvasWidth / 2) - (canvasWidth / 6)
    }

    this._position.y = 0
  }
}

window.customElements.define('pong-score', PongScore)
