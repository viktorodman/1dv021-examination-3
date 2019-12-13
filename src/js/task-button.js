/**
 * Module for TaskButton
 *
 * @module src/js/task-button
 * @author Viktor Ödman
 * @version 1.0.0
*/

const template = document.createElement('template')
template.innerHTML = `

`
/**
 * Represents a Button
 *
 * @class TaskButton
 * @extends {window.HTMLElement}
 */
class TaskButton extends window.HTMLElement {
  /**
   * Creates an instance of TaskButton.
   * @memberof TaskButton
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  /**
   * Runs when the element is appended to a document-connected element
   *
   * @memberof TaskButton
   */
  connectedCallback () {

  }
}

window.customElements.define('task-button', TaskButton)
