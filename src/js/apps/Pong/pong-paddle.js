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
            position: absolute;
            left: 40px;
        }
        .paddle {
            width: 10px;
            height: 70px;
            background-color: #0074D9;
            border-radius: 25px;
        }
    </style>
    <div class="paddle"></div>
`
class PongPaddle extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._intervalID = undefined
  }

  connectedCallback () {

  }
}

window.customElements.define('pong-paddle', PongPaddle)
