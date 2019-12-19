const template = document.createElement('template')
template.innerHTML = `
        <style>
            input {
                visibility: hidden;
            }
            input:checked + label {
                /* background-color: #3d3d3d; */
                border-bottom: 4px solid #f2b83a;
            }
            label {
                width: 30px;
                color: #f2b83a;
                padding: 5px;
            }
            .altWrapper {
                background-color: #6e6f70;
                height: 10%;
                width: 65%;
                display: inline-block;
                padding: 10px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        </style>
        <div class="altWrapper">
            <input id="alt1" type="radio" name="Alternatives" rows="4" columns="4">
            <label for="alt1">4x4</label>
            <input id="alt2" type="radio" name="Alternatives" rows="2" columns="2">
            <label for="alt2">2x2</label>
            <input id="alt3" type="radio" name="Alternatives" rows="2" columns="4">
            <label for="alt3">2x4</label>
        </div>
`

class MemoryAlternatives extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._radioButtons = this.shadowRoot.querySelectorAll('input')
    this._altWrapper = this.shadowRoot.querySelector('.altWrapper')
  }

  connectedCallback () {
    this._boundOnRadioClick = this._onRadioClick.bind(this)

    this._altWrapper.addEventListener('click', this._boundOnRadioClick)
  }

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
