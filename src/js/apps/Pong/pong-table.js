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
   <canvas class="table">
       <pong-paddle class="paddleOne" paddleposition="right"></pong-paddle>
       <pong-paddle class="paddleTwo" paddleposition="left"></pong-paddle>
   </canvas>
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
    this.ctx = this._table.getContext('2d')
    this._paddleOne = this.shadowRoot.querySelector('.paddleOne')
    this._paddleTwo = this.shadowRoot.querySelector('.paddleTwo')
    this._twoPlayers = false
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
    this._paddleOne.setAttribute('canvaswidth', this._table.width)
    this._paddleOne.setAttribute('canvasheight', this._table.height)
    this._paddleTwo.setAttribute('canvaswidth', this._table.width)
    this._paddleTwo.setAttribute('canvasheight', this._table.height)
    this._start()
  }

  _start () {
    this._paddleOne._render(this.ctx)
    this._paddleTwo._render(this.ctx)
  }
}
window.customElements.define('pong-table', PongTable)
