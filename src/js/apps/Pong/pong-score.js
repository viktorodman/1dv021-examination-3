/**
 * Module for PongScore
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

    this._side = undefined
    this._font = '60px Arial'
    this._fontSize = undefined
    this._score = 0
    this._position = {
      x: null,
      y: null
    }
  }

  /**
   * Renders the Pong Score
   *
   * @param {CanvasRenderingContext2D} canvas A html canvas
   * @memberof PongScore
   */
  render (canvas) {
    canvas.font = this._font

    canvas.textAlign = 'center'

    canvas.fillText(this._score, this._position.x, this._position.y)
  }

  /**
   * Sets the position of the score
   *
   * @param {Number} canvasWidth The canvas width
   * @param {Number} canvasHeight The canvas height
   * @param {Boolean} right True if the score should be on the right side
   * @memberof PongScore
   */
  setScorePosition (canvasWidth, canvasHeight, right) {
    if (right) {
      this._position.x = (canvasWidth / 2) + (canvasWidth / 6)
      this._side = true
    } else {
      this._position.x = (canvasWidth / 2) - (canvasWidth / 6)
      this._side = false
    }

    this._position.y = canvasHeight / 10
  }

  /**
   * Adds 1 to the score
   *
   * @memberof PongScore
   */
  addScore () {
    this._score += 1
  }

  /**
   * Gets the current score
   *
   * @returns {number} The current score
   * @memberof PongScore
   */
  getScore () {
    return this._score
  }
}

window.customElements.define('pong-score', PongScore)
