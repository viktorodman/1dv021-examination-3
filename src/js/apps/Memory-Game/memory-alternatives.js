/**
 * Module for MemoryAlternatives
 *
 * @module src/js/apps/Memory-Game/memory-alternatives
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
        <style>
            input {
                visibility: hidden;
            }
            input:checked + label {
                /* background-color: #3d3d3d; */
                border-bottom: 4px solid #001f3f;
            }
            input:hover + label {
              color: #003973;
              border-bottom: 4px solid #003973;
            }
            label {
                width: 30px;
                color: #001f3f;
                padding: 5px;
            }
            .wrapper {
                background-color: #317a5a;
                height: 10%;
                /* width: 65%; */
                display: inline-block;
                padding: 10px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        </style>
        <div class="wrapper">
            <input id="alt1" type="radio" name="Alternatives" rows="4" columns="4">
            <label for="alt1">4x4</label>
            <input id="alt2" type="radio" name="Alternatives" rows="2" columns="2">
            <label for="alt2">2x2</label>
            <input id="alt3" type="radio" name="Alternatives" rows="2" columns="4">
            <label for="alt3">2x4</label>
        </div>
`
/**
 * Represents Alternatives for a Memory Game
 *
 * @class MemoryAlternatives
 * @extends {window.HTMLElement}
 */
class MemoryAlternatives extends window.HTMLElement {
  /**
   * Creates an instance of MemoryAlternatives.
   * @memberof MemoryAlternatives
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._radioButtons = this.shadowRoot.querySelectorAll('input')
    this._wrapper = this.shadowRoot.querySelector('.wrapper')
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryAlternatives
   */
  connectedCallback () {
    this._boundOnRadioClick = this._onRadioClick.bind(this)

    this._wrapper.addEventListener('click', this._boundOnRadioClick)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof MemoryAlternatives
   */
  disconnectedCallback () {
    this._wrapper.removeEventListener('click', this._boundOnRadioClick)
  }

  /**
   * Dispatches a event when a radiobutton is clicked
   *
   * @param {Event} event A click event
   * @memberof MemoryAlternatives
   */
  _onRadioClick (event) {
    if (event.target.nodeName !== 'INPUT') {
      return
    }
    const columns = event.target.getAttribute('columns')
    const rows = event.target.getAttribute('rows')
    this.dispatchEvent(new window.CustomEvent('altchange', { detail: { columns, rows } }))
  }
}

window.customElements.define('memory-alternatives', MemoryAlternatives)
