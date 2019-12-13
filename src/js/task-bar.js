/**
 * Module for TaskBar
 *
 * @module src/js/task-bar
 * @author Viktor Ödman
 * @version 1.0.0
*/

/**
 *  Represents a TaskBar
 *
 * @class TaskBar
 * @extends {window.HTMLElement}
 */
class TaskBar extends window.HTMLElement {
/**
 * Creates an instance of TaskBar.
 * @memberof TaskBar
 */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }
}

window.customElements.define('task-bar', TaskBar)
