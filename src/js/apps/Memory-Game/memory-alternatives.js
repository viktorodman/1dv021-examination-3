class MemoryAlternatives extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {

  }
}

window.customElements.define('memory-alternatives', MemoryAlternatives)
