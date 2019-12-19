const template = document.createElement('template')
template.innerHTML = `
    <style>
        .wrapper {
           /*  background-color: #c4c4c4; */
            margin-top: 20px;
            /* width: 90%;
            margin: 0 auto; */
        }
        button {
            font-size: 30px;
        }
    </style>
    <div class="wrapper">
        <div class="title">
            <span>Memory Game</span>
        </div>
        <div class="description">
            <span>Select a board size and press start</span>
        </div>
        <div class="buttons">
            <button>START</button>
        </div>
    </div>
`

class MemoryStartScreen extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._button = this.shadowRoot.querySelector('button')
  }

  connectedCallback () {
    this._boundOnButtonClick = this._onButtonClick.bind(this)

    this._button.addEventListener('click', this._boundOnButtonClick)
  }

  disconnectedCallback () {
    this._button.removeEventListener('click', this._boundOnButtonClick)
  }

  _onButtonClick (event) {
    this.dispatchEvent(new window.CustomEvent('startgame'))
  }
}

window.customElements.define('memory-start-screen', MemoryStartScreen)
