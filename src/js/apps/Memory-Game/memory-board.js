/**
 * Module for MemoryBoard
 *
 * @module src/js/apps/Memory-Game/memory-board
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `
<style>
div {
  margin: auto
}
.brickContainer {
    text-align: center;
    min-width: 100%;
    max-width: fit-content;
}

a {
  text-decoration: none;
  display: inline-block;
  max-height: 80px;
}

a:focus {
  background-color: #001f3f;
}
.hidden {
  visibility: hidden;
}
.row {
 max-height: 80px;
}
</style>
<div class='brickContainer'> 
</div>
`
/**
 * Represents a Memory-Board
 *
 * @class MemoryBoard
 * @extends {window.HTMLElement}
 */

class MemoryBoard extends window.HTMLElement {
  /**
   * Creates an instance of MemoryBoard.
   * @memberof MemoryBoard
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._defaultImage = 'image/memory-images/0.png'
    this._brickContainer = this.shadowRoot.querySelector('.brickContainer')
    this._rows = 4
    this._columns = 4
    this._brickArray = []
    this._clearedBricks = 0
    this._turn1 = null
    this._turn2 = null
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof MemoryBoard
   */
  static get observedAttributes () {
    return ['rows', 'columns']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof MemoryBoard
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'rows') {
      this._rows = newValue
    }
    if (name === 'columns') {
      this._columns = newValue
    }
  }

  // https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b
  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof MemoryBoard
   */
  connectedCallback () {
    this._createBrickArray()
    this.shuffleBrickArray()
    this._updateRendering()

    this._boundOnKeyDown = this._onKeyDown.bind(this)
    this._boundOnBrickClick = this._onBrickClick.bind(this)

    this._brickContainer.addEventListener('click', this._boundOnBrickClick)
    this._brickContainer.addEventListener('keydown', this._boundOnKeyDown)
  }

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof MemoryBoard
   */
  disconnectedCallback () {
    this._brickContainer.removeEventListener('click', this._boundOnBrickClick)
    this._brickContainer.removeEventListener('keydown', this._boundOnKeyDown)
  }

  /**
   * Creates a board with memory-bricks
   *
   * @memberof MemoryBoard
   */
  _updateRendering () {
    this._createRowDivs()
    let currentRow = 1
    let rowIndex = 0

    for (let i = 0; i < this._columns * this._rows; i++) {
      const div = this._brickContainer.querySelector(`.row${currentRow}`)
      const a = document.createElement('a')
      const brick = document.createElement('memory-brick')

      brick.setAttribute('default', this._defaultImage)
      a.href = '#'
      a.setAttribute('brick-id', i + 1)
      a.setAttribute('row-index', rowIndex)

      a.appendChild(brick)
      rowIndex++
      if ((i + 1) % this._columns === 0) {
        currentRow++
        rowIndex = 0
      }
      div.appendChild(a)
    }
  }

  /**
   * Runs when a memory-brick is clicked with the mouse
   *
   * @param {Event} event A click event
   * @memberof MemoryBoard
   */
  _onBrickClick (event) {
    console.log(event.target)
    this.flipBrick(event.target.parentElement)
    event.preventDefault()
  }

  /**
   * Runs when a keyboard key is pressed
   *
   * @param {Event} event A keydown event
   * @memberof MemoryBoard
   */
  _onKeyDown (event) {
    event.preventDefault()
    switch (event.code) {
      case 'ArrowLeft': this._arrowLeft(event.target)
        break
      case 'ArrowRight': this._arrowRight(event.target)
        break
      case 'ArrowUp': this._arrowUp(event.target)
        break
      case 'ArrowDown': this._arrowDown(event.target)
        break
      case 'Enter' : this.flipBrick(event.target)
    }
  }

  /**
   * Runs when the arrow up key is pressed
   * Sets focus on the brick above the current brick
   *
   * @param {HTMLElement} eventTarget An html element
   * @memberof MemoryBoard
   */
  _arrowUp (eventTarget) {
    const index = Number(eventTarget.getAttribute('row-index'))

    if (eventTarget.parentElement.previousElementSibling !== null) {
      eventTarget.parentElement.previousSibling.childNodes[index].focus()
    }
  }

  /**
   * Runs when the arrow down key is pressed
   * Sets focus on the brick below the current brick
   *
   * @param {HTMLElement} eventTarget An html element
   * @memberof MemoryBoard
   */
  _arrowDown (eventTarget) {
    const index = Number(eventTarget.getAttribute('row-index'))
    if (eventTarget.parentElement.nextSibling !== null) {
      eventTarget.parentElement.nextSibling.childNodes[index].focus()
    }
  }

  /**
   * Runs when the arrow left key is pressed
   * Sets focus on the brick to the left of the current brick
   *
   * @param {HTMLElement} eventTarget An html element
   * @memberof MemoryBoard
   */
  _arrowLeft (eventTarget) {
    if (eventTarget.previousSibling !== null) {
      eventTarget.previousSibling.focus()
    }
  }

  /**
   * Runs when the arrow right key is pressed
   * Sets focus on the brick to the right of the current brick
   *
   * @param {HTMLElement} eventTarget An html element
   * @memberof MemoryBoard
   */
  _arrowRight (eventTarget) {
    if (eventTarget.nextSibling !== null) {
      eventTarget.nextSibling.focus()
    }
  }

  /**
   * Flips the passed memory-brick and also checks if
   * the brick is equal to the previous brick
   *
   * @param {HTMLElement} eventTarget An 'a' element.
   * @memberof MemoryBoard
   */
  flipBrick (eventTarget) {
    if (eventTarget.nodeName !== 'A' || this._turn2) {
      return
    }

    if (!this._turn1) {
      this._turn1 = eventTarget
      this._changePicture(this._turn1.firstChild, this._getImage(this._turn1))
    } else if (this._turn1 !== eventTarget) {
      this._turn2 = eventTarget
      this._changePicture(this._turn2.firstChild, this._getImage(this._turn2))

      const match = this._checkMatch(this._getImage(this._turn1), this._getImage(this._turn2))
      // MATCH
      if (match) {
        setTimeout(() => {
          this._turn1.firstChild.classList.add('hidden')
          this._turn2.firstChild.classList.add('hidden')
          this._turn1 = null
          this._turn2 = null
          this._clearedBricks++
          this.checkWin()
        }, 500)
      } else {
        // NO MATCH
        setTimeout(() => {
          this._changePicture(this._turn1.firstChild, this._defaultImage)
          this._changePicture(this._turn2.firstChild, this._defaultImage)

          this._turn1 = null
          this._turn2 = null
        }, 1200)
      }
    }
  }

  /**
   * Dispatches an event if all bricks are cleared from the board
   *
   * @memberof MemoryBoard
   */
  checkWin () {
    if (this._clearedBricks === this._columns * this._rows / 2) {
      this.dispatchEvent(new window.CustomEvent('gameover'))
    }
  }

  /**
   * Checks if two URL's are the same.
   *
   * @param {String} image1 An image url
   * @param {String} image2 An image url
   * @returns {Boolean} Return true if the urls match
   * @memberof MemoryBoard
   */
  _checkMatch (image1, image2) {
    let match = false
    if (image1 === image2) {
      match = true
    }
    return match
  }

  /**
   * Changes the picture on the passed memory-brick.
   *
   * @param {HTMLElement} brick A memory-brick
   * @param {String} image An image URL
   * @memberof MemoryBoard
   */
  _changePicture (brick, image) {
    brick.setAttribute('url', image)
  }

  /**
   * Gets an image based on the passed bricks 'brick-id'
   *
   * @param {HTMLElement} brick A memory-brick
   * @returns {String} An image url
   * @memberof MemoryBoard
   */
  _getImage (brick) {
    const index = Number(brick.getAttribute('brick-id')) - 1
    const image = this._brickArray[index]
    return image
  }

  /**
   * Creates divs for the rows on the board
   *
   * @memberof MemoryBoard
   */
  _createRowDivs () {
    for (let i = 0; i < this._rows; i++) {
      const div = document.createElement('div')
      div.setAttribute('class', `row${i + 1}`)
      div.classList.add('row')
      this._brickContainer.appendChild(div)
    }
  }

  /**
   * Creates an array with picture urls
   *
   * @memberof MemoryBoard
   */
  _createBrickArray () {
    const numberOfBricks = this._rows * this._columns / 2
    for (let i = 0; i < numberOfBricks; i++) {
      this._brickArray.push(`image/memory-images/${i + 1}.png`)
      this._brickArray.push(`image/memory-images/${i + 1}.png`)
    }
  }

  /**
   * Shuffles an Array
   *
   * @memberof MemoryBoard
   */
  shuffleBrickArray () {
    let currentIndex = this._brickArray.length
    let temporaryValue = 0
    let randomIndex = 0

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = this._brickArray[currentIndex]
      this._brickArray[currentIndex] = this._brickArray[randomIndex]
      this._brickArray[randomIndex] = temporaryValue
    }
  }
}

window.customElements.define('memory-board', MemoryBoard)
