/**
 * Module for InfoBar
 *
 * @module src/js/desktop/InfoBar
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .wrapper {
            width: 100%;
            height: 5%;
            background-color: red;
        }
    </style>
    <div class="wrapper">
        <span>TEST</span>
    </div>
`
class InfoBar extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('info-bar', InfoBar)
