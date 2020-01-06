/**
 * Module for PongHome
 *
 * @module src/js/Pong/pong-home
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
    
    </style>
    <span>TEST</span>
`

class PongHome extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
}

window.customElements.define('pong-home', PongHome)
