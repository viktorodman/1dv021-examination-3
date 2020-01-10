/**
 * Module for PongTable
 *
 * @module src/js/Pong/pong-table
 * @author Viktor Ödman
 * @version 1.0.0
*/

import './pong-paddle.js'
import './pong-ball.js'
import './pong-score.js'

const template = document.createElement('template')
template.innerHTML = `
    <style>
        :host {
        padding: 0;
        margin: 0;
        }
       
       .table {
         width: 100%;
         height: 100%;
       }
    </style>
      <div class="table">
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

    this._collisionCounter = 0
    this._winScore = 5
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

  /**
   * Runs when the element is removed from a document-connected element
   *
   * @memberof PongTable
   */
  disconnectedCallback () {
    clearInterval(this._intervalID)
    this._canvasWrapper.removeEventListener('keydown', this._boundOnKeyDown)
    this._canvasWrapper.removeEventListener('keyup', this._boundOnKeyUp)
    this._canvasWrapper.removeEventListener('keydown', this._boundOnSpace)
  }

  /**
   *
   *
   * @memberof PongTable
   */
  _pauseGame () {
    this._paddleOne._render(this.ctx)
    this._paddleTwo._render(this.ctx)
    this._ball._render(this.ctx)
    this._p1Score._render(this.ctx)
    this._p2Score._render(this.ctx)
    this.ctx.font = '30px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('Press Space To Start', this._table.width / 2, this._table.height / 3)
    this._canvasWrapper.addEventListener('keydown', this._boundOnSpace)
  }

  /**
   * Starts an interval thats repaints the canvas
   * every 10 milliseconds
   *
   * @memberof PongTable
   */
  _startGame () {
    this._intervalID = window.setInterval(() => {
      this._renderBoard()
    }, 10)
  }

  /**
   * Handles the keydown events for the players
   *
   * @param {Event} event A keydown event
   * @memberof PongTable
   */
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

  /**
  * Handles the keyup events for the players
  *
  * @param {Event} event A keyup event
  * @memberof PongTable
  */
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

  /**
   * Handles keypress for the 'space' key
   *
   * @param {Event} event A keydown event
   * @memberof PongTable
   */
  _onSpace (event) {
    event.preventDefault()
    if (event.code !== 'Space') {
      return
    }
    this._canvasWrapper.removeEventListener('keydown', this._boundOnSpace)
    this._pause = false
    this._startGame()
  }

  /**
   * Creates a html canvas and appends it to the wrapper
   *
   * @returns {HTMLCanvasElement} The created canvas
   * @memberof PongTable
   */
  _createCanvas () {
    const canvas = document.createElement('canvas')
    canvas.width = this._resolution.width
    canvas.height = this._resolution.height
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.backgroundColor = '#85144b'
    return this._canvasWrapper.appendChild(canvas)
  }

  /**
   * Create a new paddle element
   *
   * @param {Boolean} player1 True if its player one
   * @returns {HTMLElement} The created element
   * @memberof PongTable
   */
  _createPaddle (player1) {
    const paddle = document.createElement('pong-paddle')
    paddle.setAttribute('paddlewidth', 40)
    paddle.setAttribute('paddleheight', 70)
    if (player1) {
      paddle.setAttribute('paddlecolor', '#7FDBFF')
      paddle.setAttribute('paddlename', 'Player 1')
      paddle._setStartPosition(this._table.width, this._table.height, true)
    } else {
      paddle.setAttribute('paddlecolor', '#FF851B')
      paddle.setAttribute('paddlename', 'Player 2')
      paddle._setStartPosition(this._table.width, this._table.height, false)
    }

    return this._table.appendChild(paddle)
  }

  /**
   * Creates a pong-ball element
   *
   * @returns {HTMLElement} The created element
   * @memberof PongTable
   */
  _createBall () {
    const ball = document.createElement('pong-ball')
    ball.setAttribute('ballradius', 10)
    ball.setAttribute('ballcolor', '#FFFFFF')
    ball._setStartPosition(this._table.width, this._table.height)
    return this._table.appendChild(ball)
  }

  /**
   * Create a new score element
   *
   * @param {Boolean} player1 True if its player one
   * @returns {HTMLElement} The created element
   * @memberof PongTable
   */
  _createScore (player1) {
    const score = document.createElement('pong-score')

    if (player1) {
      score.setScorePosition(this._table.width, this._table.height, true)
    } else {
      score.setScorePosition(this._table.width, this._table.height, false)
    }

    return this._table.appendChild(score)
  }

  /**
   * Creates all the elements for the game
   *
   * @memberof PongTable
   */
  _createShapes () {
    this._paddleOne = this._createPaddle(true)
    this._paddleTwo = this._createPaddle(false)
    this._ball = this._createBall()
    this._p1Score = this._createScore(true)
    this._p2Score = this._createScore(false)
  }

  /**
   * Renders all the parts of the game
   *
   * @memberof PongTable
   */
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

    this._updatePaddles(ballY, ballRadius)
    this._updateBall()
    this._updateScore()

    this._checkWallCollision(ballX, ballY, ballRadius)
    this._rightPaddleCollision(ballX, ballY, ballRadius, this._paddleOne)
    this._leftPaddleCollision(ballX, ballY, ballRadius, this._paddleTwo)

    this._checkWin(this._p1Score.getScore(), this._paddleOne.getName())
    this._checkWin(this._p2Score.getScore(), this._paddleTwo.getName())
  }

  /**
   * Updates the paddles positions
   *
   * @memberof PongTable
   */
  _updatePaddles (ballY, ballRadius) {
    this._movePaddle(this._paddleOne, this._paddleOneUp, this._paddleOneDown)
    if (this._twoPlayers) {
      this._movePaddle(this._paddleTwo, this._paddleTwoUp, this._paddleTwoDown)
    } else {
      this._moveBot(ballY, ballRadius, this._paddleTwo)
    }

    this._paddleOne._render(this.ctx)
    this._paddleTwo._render(this.ctx)
  }

  /**
   * Updates the balls position
   *
   * @memberof PongTable
   */
  _updateBall () {
    this._ball._move()
    this._ball._render(this.ctx)
  }

  /**
  * Updates the players scores
  *
  * @memberof PongTable
  */
  _updateScore () {
    this._p1Score._render(this.ctx)
    this._p2Score._render(this.ctx)
  }

  /**
   * Check for the Collisions between the ball and the walls
   *
   * @param {Number} ballX The balls vertical position
   * @param {Number} ballY The balls Horizontal position
   * @param {Number} ballRadius The balls radius
   * @memberof PongTable
   */
  _checkWallCollision (ballX, ballY, ballRadius) {
    if (ballY - ballRadius < 0) {
      this._ball._moveDown()
    }
    if (ballY + ballRadius > this._table.height) {
      this._ball._moveUp()
    }
    if (ballX < 0) {
      this._p1Score.addScore()
      this._collisionCounter = 0
      this._ball.setStartSpeed()
      this._pause = true
    }
    if (ballX > this._table.width) {
      this._p2Score.addScore()
      this._collisionCounter = 0
      this._ball.setStartSpeed()
      this._pause = true
    }
  }

  /**
   * Checks collision between the left paddle and the ball
   *
   * @param {Number} ballX The balls vertical position
   * @param {Number} ballY The balls Horizontal position
   * @param {Number} ballRadius The balls radius
   * @param {HTMLElement} paddle The left paddle
   * @memberof PongTable
   */
  _leftPaddleCollision (ballX, ballY, ballRadius, paddle) {
    const ballXPos = ballX - ballRadius + this._ball.getDirection().dirX
    if (ballXPos <= paddle.getX() && ballXPos >= paddle.getX() - (paddle._getWidth() / 4) && ballY + ballRadius > paddle._getY() && ballY - ballRadius < paddle.getBottomPos()) {
      this._ball._moveRight()
      this._collisionCounter += 1
      if (this._collisionCounter % 2 === 0) {
        this._ball.accelerate()
      }
      console.log(this._collisionCounter)
      this._paddleEdgeCollision(ballY, ballRadius, paddle)
    }
  }

  /**
   * Checks collision between the right paddle and the ball
   *
   * @param {Number} ballX The balls vertical position
   * @param {Number} ballY The balls Horizontal position
   * @param {Number} ballRadius The balls radius
   * @param {HTMLElement} paddle The right paddle
   * @memberof PongTable
   */
  _rightPaddleCollision (ballX, ballY, ballRadius, paddle) {
    const directionSpeed = this._ball.getDirection().dirX
    const ballXPos = ballX - ballRadius + directionSpeed
    if (ballXPos >= paddle.getX() && ballXPos <= paddle.getX() + (paddle._getWidth() / 4) && ballY + ballRadius > paddle._getY() && ballY - ballRadius < paddle.getBottomPos()) {
      this._ball._moveLeft()
      this._paddleEdgeCollision(ballY, ballRadius, paddle)
      this._collisionCounter += 1
      if (this._collisionCounter % 2 === 0) {
        this._ball.accelerate()
      }
      console.log(this._collisionCounter)
    }
  }

  /**
   * Checks if the ball collides with the bottom or top edge
   * of the passed paddle
   *
   * @param {Number} ballY The balls Horizontal position
   * @param {Number} ballRadius The balls radius
   * @param {HTMLElement} paddle A pong-paddle
   * @memberof PongTable
   */
  _paddleEdgeCollision (ballY, ballRadius, paddle) {
    if (ballY + ballRadius > paddle._getY() && ballY + ballRadius < paddle.getTopEdge()) {
      this._ball._moveUp()
    } else if (ballY - ballRadius < paddle.getBottomPos() && ballY - ballRadius > paddle.getBottomEdge()) {
      this._ball._moveDown()
    }
  }

  /**
  * Moves the passed paddle
  *
  * @param {HTMLElement} paddle The passed pong-paddle
  * @param {Boolean} up true if the paddles up key is pressed
  * @param {Boolean} down true if the paddles down key is pressed
  * @memberof PongTable
  */
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

  /**
   * Moving the paddles based on the position of the ball
   *
   * @memberof PongTable
   */
  _moveBot (ballY, ballRadius, paddle) {
    if (ballY < paddle._getY()) {
      if (paddle._getY() > 0) {
        paddle._moveUp()
      }
    }
    if (ballY + ballRadius > paddle._getY() && ballY - ballRadius < paddle.getBottomPos()) {
      if (this._ball.getVerticalDirection() === 'down') {
        if (paddle.getBottomPos() < this._table.height) {
          this._paddleTwo._moveDown()
        } else {
          if (this._paddleTwo.getBottomPos() < this._table.height) {
            this._paddleTwo._moveDown()
          }
        }
      }
    }
    if (this._ball.getPosition().y > this._paddleTwo.getBottomPos()) {
      if (this._paddleTwo.getBottomPos() < this._table.height) {
        this._paddleTwo._moveDown()
      }
    }
  }

  /**
   * Checks if any of the players score equals the win score
   * Dispatches an event if a win has occurred
   *
   * @param {Number} score A players score
   * @param {String} player A players name
   * @memberof PongTable
   */
  _checkWin (score, player) {
    if (score === 5) {
      this.dispatchEvent(new window.CustomEvent('win', { detail: player }))
    }
  }
}
window.customElements.define('pong-table', PongTable)
