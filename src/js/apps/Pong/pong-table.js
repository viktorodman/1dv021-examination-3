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
/**
 * Represents a Pong Table
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

  }
}
window.customElements.define('pong-table', PongTable)
