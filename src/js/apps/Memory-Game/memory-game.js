const template = document.createElement('template')
template.innerHTML = `
    <style>
      .winText {
        text-align: center;
        font-size: 60px;
        color: green;
      }
      .mainDivMemory {
        text-align: center; 
        color: black;
        font-size: 30px;
      }
    </style>
    <div class="mainDivMemory">
      <form id="asd">
        <label for="alt1">
          4x4
          <input id="alt1" type="radio" name="Alternatives" rows="4" columns="4">
        </label>
        <label for="alt2">
          2x2
          <input id="alt2" type="radio" name="Alternatives" rows="2" columns="2">
        </label>
        <label for="alt3">
          2x4
          <input id="alt3" type="radio" name="Alternatives" rows="2" columns="4">
        </label>
      </form>
      <div class="boardDiv">
      </div>
    </div>
`
class MemoryGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._sizes = this.shadowRoot.querySelector('#sizes')

    this._boardDiv = this.shadowRoot.querySelector('.boardDiv')
    this.memoryBoard = undefined
    this._form = this.shadowRoot.querySelector('#asd')
  }

  connectedCallback () {
    this.addMemoryBoard(4, 4)
    this._form.addEventListener('click', event => {
      this.cleanForm(this._boardDiv)
      const rows = Number(event.target.getAttribute('rows'))
      const columns = Number(event.target.getAttribute('columns'))
      this.addMemoryBoard(rows, columns)
    })
  }

  cleanForm (element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.firstChild)
    }
  }

  addMemoryBoard (boardRows, boardColumns) {
    const board = document.createElement('memory-board')

    board.setAttribute('rows', boardRows)
    board.setAttribute('columns', boardColumns)

    this._boardDiv.appendChild(board)
    this.memoryBoard = this.shadowRoot.querySelector('memory-board')
    this.memoryBoard.addEventListener('gameover', event => {
      this._win()
    })
  }

  _win () {
    this.cleanForm(this._boardDiv)
    const h1 = document.createElement('h1')
    h1.setAttribute('class', 'winText')
    h1.textContent = 'YOU WIN'
    this._boardDiv.appendChild(h1)
  }
}

window.customElements.define('memory-game', MemoryGame)
