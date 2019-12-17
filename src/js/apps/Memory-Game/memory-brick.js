const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
          height: 200px;
          width: 200px;
          
        }
        .brickImage {
            max-width: 80px;
            max-height: 80px;
        }
        .imgSelected { 
          border: 2px solid grey;
        }
        .imgDiv {
          display: inline-block;
          
          width: 200px;
          height: 200px;
        }
        
    </style>
    
      <img class="brickImage">
    
`
class MemoryBrick extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._image = this.shadowRoot.querySelector('.brickImage')
    this._imageURL = null
  }

  static get observedAttributes () {
    return ['url']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'url') {
      this._imageURL = newValue
      this.setImage()
    }
  }

  connectedCallback () {
    /* this._updateRendering() */
  }

  _updateRendering () {

  }

  setImage () {
    this._image.setAttribute('src', this._imageURL)
  }
}

window.customElements.define('memory-brick', MemoryBrick)
