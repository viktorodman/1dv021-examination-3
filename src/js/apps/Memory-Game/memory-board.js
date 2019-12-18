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
  background-color: yellow;
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

class MemoryBoard extends window.HTMLElement {
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

  static get observedAttributes () {
    return ['rows', 'columns']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'rows') {
      this._rows = newValue
    }
    if (name === 'columns') {
      this._columns = newValue
    }
  }

  // https://gist.github.com/ebidel/2d2bb0cdec3f2a16cf519dbaa791ce1b
  connectedCallback () {
    this._createBrickArray()
    this.shuffleBrickArray()
    this._updateRendering()

    this._boundOnKeyDown = this._onKeyDown.bind(this)
    this._boundOnBrickClick = this._onBrickClick.bind(this)

    this._brickContainer.addEventListener('click', this._boundOnBrickClick)
    this._brickContainer.addEventListener('keydown', this._boundOnKeyDown)
  }

  disconnectedCallback () {
    this._brickContainer.removeEventListener('click', this._boundOnBrickClick)
    this._brickContainer.removeEventListener('keydown', this._boundOnKeyDown)
  }

  _updateRendering () {
    this._createRowDivs()
    let currentRow = 1
    let rowIndex = 0

    for (let i = 0; i < this._columns * this._rows; i++) {
      const div = this._brickContainer.querySelector(`.row${currentRow}`)
      const a = document.createElement('a')
      const brick = document.createElement('memory-brick')

      brick.setAttribute('url', this._defaultImage)
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

  _onBrickClick (event) {
    console.log(event.target)
    this.flipBrick(event.target.parentElement)
    event.preventDefault()
  }

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

  _arrowUp (eventTarget) {
    const index = Number(eventTarget.getAttribute('row-index'))

    if (eventTarget.parentElement.previousElementSibling !== null) {
      eventTarget.parentElement.previousSibling.childNodes[index].focus()
    }
  }

  _arrowDown (eventTarget) {
    const index = Number(eventTarget.getAttribute('row-index'))
    if (eventTarget.parentElement.nextSibling !== null) {
      eventTarget.parentElement.nextSibling.childNodes[index].focus()
    }
  }

  _arrowLeft (eventTarget) {
    if (eventTarget.previousSibling !== null) {
      eventTarget.previousSibling.focus()
    }
  }

  _arrowRight (eventTarget) {
    if (eventTarget.nextSibling !== null) {
      eventTarget.nextSibling.focus()
    }
  }

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

  checkWin () {
    if (this._clearedBricks === this._columns * this._rows / 2) {
      this.dispatchEvent(new window.CustomEvent('gameover'))
    }
  }

  _checkMatch (image1, image2) {
    let match = false
    if (image1 === image2) {
      match = true
    }
    return match
  }

  _changePicture (brick, image) {
    brick.setAttribute('url', image)
  }

  _getImage (brick) {
    const index = Number(brick.getAttribute('brick-id')) - 1
    const image = this._brickArray[index]
    return image
  }

  _createRowDivs () {
    for (let i = 0; i < this._rows; i++) {
      const div = document.createElement('div')
      div.setAttribute('class', `row${i + 1}`)
      div.classList.add('row')
      this._brickContainer.appendChild(div)
    }
  }

  _createBrickArray () {
    const numberOfBricks = this._rows * this._columns / 2
    for (let i = 0; i < numberOfBricks; i++) {
      this._brickArray.push(`image/memory-images/${i + 1}.png`)
      this._brickArray.push(`image/memory-images/${i + 1}.png`)
    }
  }

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
