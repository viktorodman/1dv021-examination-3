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
    </style>    
`
// https://stackoverflow.com/questions/52128997/how-to-create-canvas-class-with-javascript-es6
class PongPaddle extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._height = 30
    this._width = 10
    this._paddleSpacing = 10
    this.color = 'black'
    this._tableSide = undefined

    this._position = {
      x: null,
      y: null
    }
    this._myCanvas = {
      canvasWidth: undefined,
      canvasHeight: undefined
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
    return ['paddleposition', 'canvaswidth', 'canvasheight']
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
    if (name === 'paddleposition') {
      this._tableSide = newValue
    }
    if (name === 'canvaswidth') {
      this._myCanvas.canvasWidth = Number(newValue)
    }
    if (name === 'canvasheight') {
      this._myCanvas.canvasHeight = Number(newValue)
      this._position.y = (Number(newValue) / 2) - (this._height / 2)
    }
  }

  connectedCallback () {

  }

  _render (canvas) {
    if (this._tableSide === 'right') {
      this._position.x = (this._myCanvas.canvasWidth - this._width) - this._paddleSpacing
    }
    if (this._tableSide === 'left') {
      this._position.x = this._paddleSpacing
    }

    canvas.beginPath()
    canvas.rect(this._position.x, this._position.y, this._width, this._height)
    canvas.fillStyle = this.color
    canvas.fill()
    canvas.closePath()
  }
}

window.customElements.define('pong-paddle', PongPaddle)
