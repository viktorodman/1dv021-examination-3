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
        padding: 0;
        margin: 0;
        }
       
       .test {
         width: 100%;
         height: 100%;
         background-color: orange;
       }
    </style>
      <div class="test">
       <a href="#" class="canvasWrapper">
       </a>
  </div>
  
`
/**
 * Represents a Pong Table
 * REF: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Create_the_Canvas_and_draw_on_it
 *
 * @class PongTable
 * @extends {window.HTMLElement}
 */
class PongTable extends window.HTMLElement {
  /**
    * Creates an instance of PongTable.
    * @memberof PongTable
    */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this._canvasWrapper = this.shadowRoot.querySelector('.canvasWrapper')
    this._resolution = {
      width: 1000,
      height: 500
    }
    this._table = this._createCanvas()
    this.ctx = this._table.getContext('2d')
    this._paddleOne = undefined
    this._paddleTwo = undefined
    this._ball = undefined
    this._twoPlayers = false

    this._paddleOneUp = false
    this._paddleOneDown = false
    this._paddleTwoUp = false
    this._paddleTwoDown = false
    this._pause = true
  }

  /**
   * Get what attributes attributeChangedCallback should look for
   *
   * @readonly
   * @static
   * @memberof PongTable
   */
  static get observedAttributes () {
    return ['twoplayers']
  }

  /**
   * Is called when some of the observed attributes is called
   *
   * @param {String} name the attribute name
   * @param {String} oldValue old attribute value
   * @param {String} newValue new attribute value
   * @memberof PongTable
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'twoplayers') {
      if (newValue === 'true') {
        this._twoPlayers = true
      }
    }
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof PongTable
   */
  connectedCallback () {
    this._canvasWrapper.focus()
    this._boundOnKeyDown = this._onKeyDown.bind(this)
    this._boundOnKeyUp = this._onKeyUp.bind(this)
    this._boundOnSpace = this._onSpace.bind(this)
    this._createShapes()
    this._pauseGame()

    this._canvasWrapper.addEventListener('keydown', this._boundOnKeyDown)
    this._canvasWrapper.addEventListener('keyup', this._boundOnKeyUp)
  }

  disconnectedCallback () {
    clearInterval(this._intervalID)
    this._canvasWrapper.removeEventListener('keydown', this._boundOnKeyDown)
    this._canvasWrapper.removeEventListener('keyup', this._boundOnKeyUp)
  }

  _pauseGame () {
    this._paddleOne._render(this.ctx)
    this._paddleTwo._render(this.ctx)
    this._ball._render(this.ctx)
    this.ctx.font = '30px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('Press Space To Start', this._table.width / 2, this._table.height / 3)
    this._canvasWrapper.addEventListener('keydown', this._boundOnSpace)
  }

  _startGame () {
    this._intervalID = window.setInterval(() => {
      this._renderBoard()
    }, 10)
  }

  _onKeyDown (event) {
    event.preventDefault()
    switch (event.code) {
      case 'ArrowUp': this._paddleOneUp = true
        break
      case 'ArrowDown': this._paddleOneDown = true
        break
      case 'KeyW': this._paddleTwoUp = true
        break
      case 'KeyS': this._paddleTwoDown = true
    }
  }

  _onKeyUp (event) {
    event.preventDefault()
    switch (event.code) {
      case 'ArrowUp': this._paddleOneUp = false
        break
      case 'ArrowDown': this._paddleOneDown = false
        break
      case 'KeyW': this._paddleTwoUp = false
        break
      case 'KeyS': this._paddleTwoDown = false
    }
  }

  _onSpace (event) {
    event.preventDefault()
    if (event.code !== 'Space') {
      return
    }
    this._canvasWrapper.removeEventListener('keydown', this._boundOnSpace)
    this._pause = false
    this._startGame()
  }

  _createCanvas () {
    const canvas = document.createElement('canvas')
    canvas.width = this._resolution.width
    canvas.height = this._resolution.height
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.backgroundColor = '#3D9970'
    return this._canvasWrapper.appendChild(canvas)
  }

  _createPaddle (player1) {
    const paddle = document.createElement('pong-paddle')
    paddle.setAttribute('paddlewidth', 20)
    paddle.setAttribute('paddleheight', 60)
    if (player1) {
      paddle.setAttribute('paddlecolor', '#FF4136')
      paddle._setStartPosition(this._table.width, this._table.height, true)
    } else {
      paddle.setAttribute('paddlecolor', '#0074D9')
      paddle._setStartPosition(this._table.width, this._table.height, false)
    }

    return this._table.appendChild(paddle)
  }

  _createBall () {
    const ball = document.createElement('pong-ball')
    ball.setAttribute('ballradius', 10)
    ball.setAttribute('ballcolor', '#FFFFFF')
    ball._setStartPosition(this._table.width, this._table.height)
    return this._table.appendChild(ball)
  }

  _createShapes () {
    this._paddleOne = this._createPaddle(true)
    this._paddleTwo = this._createPaddle(false)
    this._ball = this._createBall()
  }

  _renderBoard () {
    this.ctx.clearRect(0, 0, this._table.width, this._table.height)
    if (this._pause) {
      clearInterval(this._intervalID)
      this._ball._setStartPosition(this._table.width, this._table.height)
      this._paddleOne._setStartPosition(this._table.width, this._table.height, true)
      this._paddleTwo._setStartPosition(this._table.width, this._table.height, false)
      this._pauseGame()
    }

    const ballX = this._ball.getPosition().x
    const ballY = this._ball.getPosition().y
    const ballRadius = this._ball._getBallRadius()

    this._updatePaddles()
    this._updateBall()
    this._checkWallCollision(ballX, ballY, ballRadius)
    this._checkPaddleCollision(ballX, ballY, ballRadius, this._paddleOne.getX(), this._paddleTwo.getX())
  }

  _updatePaddles () {
    this._movePaddle(this._paddleOne, this._paddleOneUp, this._paddleOneDown)
    this._movePaddle(this._paddleTwo, this._paddleTwoUp, this._paddleTwoDown)
    this._paddleOne._render(this.ctx)
    this._paddleTwo._render(this.ctx)
  }

  _updateBall () {
    this._ball._move()
    this._ball._render(this.ctx)
  }

  _checkWallCollision (ballX, ballY, ballRadius) {
    if (ballY - ballRadius < 0) {
      this._ball._moveDown()
    }
    if (ballY + ballRadius > this._table.height) {
      this._ball._moveUp()
    }
    if (ballX < 0) {
      this._pause = true
    }
    if (ballX > this._table.width) {
      this._pause = true
    }
  }

  _checkPaddleCollision (ballX, ballY, ballRadius, rightPaddleX, leftPaddleX) {
    if (ballX - ballRadius === leftPaddleX) {
      if (ballY + ballRadius > this._paddleTwo._getY() && ballY - ballRadius < this._paddleTwo.getBottomPos()) {
        this._ball._moveRight()
      }
    }

    if (ballX === rightPaddleX) {
      if (ballY + ballRadius > this._paddleOne._getY() && ballY - ballRadius < this._paddleOne.getBottomPos()) {
        this._ball._moveLeft()
      }
    }
  }

  _movePaddle (paddle, up, down) {
    if (up) {
      if (paddle._getY() > 0) {
        paddle._moveUp()
      }
    }
    if (down) {
      if (paddle.getBottomPos() < this._table.height) {
        paddle._moveDown()
      }
    }
  }
}
window.customElements.define('pong-table', PongTable)
