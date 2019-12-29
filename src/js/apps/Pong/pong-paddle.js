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
        .paddleWrapper {
            width: 10px;
            
            /* background-color: #0074D9; */
        }
        .paddleTop {
            width: 100%;
            height: 20px;
            background-color: red;
        }
        .paddleMiddle {
            width: 100%;
            height: 20px;
            background-color: blue;
        }
        .paddleBottom {
            width: 100%;
            height: 20px;
            background-color: green;
        }
    </style>
    <div class="paddleWrapper">
        <div class="paddleTop"></div>
        <div class="paddleMiddle"></div>
        <div class="paddleBottom"></div>
    </div>
`
class PongPaddle extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._intervalID = undefined
    this._paddle = this.shadowRoot.querySelector('.paddle')
  }

  connectedCallback () {
    /*  const width = this._paddle.offsetWidth
    console.log(width) */
    /* this.dispatchEvent(new window.CustomEvent('altchange', { detail: { columns, rows } })) */
  }
}

window.customElements.define('pong-paddle', PongPaddle)
