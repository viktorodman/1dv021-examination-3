class MemoryStartScreen extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {

  }
}

window.customElements.define('memory-start-screen', MemoryStartScreen)
