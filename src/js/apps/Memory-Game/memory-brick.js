/**
 * Module for MemoryBrick
 *
 * @module src/js/apps/Memory-Game/memory-brick
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
          height: 200px;
          width: 200px;
          
        }
        .brickImage {
            max-width: 80px;
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
/**
 * Represent a MemoryBrick
 *
 * @class MemoryBrick
 * @extends {window.HTMLElement}
 */
class MemoryBrick extends window.HTMLElement {
  /**
   * Creates an instance of MemoryBrick.
   * @memberof MemoryBrick
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._image = this.shadowRoot.querySelector('.brickImage')
    this._imageURL = null
    this._defaultImage = undefined
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof MemoryBrick
   */
  static get observedAttributes () {
    return ['url', 'default']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof MemoryBrick
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'url') {
      this._imageURL = newValue
      this.setImage()
    }
    if (name === 'default') {
      this._defaultImage = newValue
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryBrick
   */
  connectedCallback () {
    this._image.setAttribute('src', this._defaultImage)
  }

  /**
   * Changes the img of the brick
   *
   * @memberof MemoryBrick
   */
  setImage () {
    this._image.setAttribute('src', this._imageURL)
  }
}

window.customElements.define('memory-brick', MemoryBrick)
