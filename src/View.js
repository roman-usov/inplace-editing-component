import { STATUSES } from './configuration';
import { createEditingEl, createViewingEl } from './utilities';

export default class View {
  constructor(formContainer) {
    this.containerEl = formContainer;

    this.renderOptions = {
      [STATUSES.viewing]: this.renderViewing.bind(this),
      [STATUSES.editing]: this.renderEditing.bind(this),
    };

    this.inputContainers = {};

    Array.from(this.containerEl.children).forEach((input) => {
      const name = input.dataset.editableTarget;
      this.inputContainers[name] = input;
    });
  }

  addEventHandler(handler) {
    Object.values(this.inputContainers).forEach((inputContainer) => {
      inputContainer.addEventListener('click', handler);
      inputContainer.addEventListener('submit', handler);
    });
  }

  render(state) {
    const renderEl = this.renderOptions[state.status];
    renderEl(state);
  }

  renderViewing(state) {
    const parent = this.inputContainers[state.name];
    parent.replaceChildren(createViewingEl(state.name, state.currentValue));
  }

  renderEditing(state) {
    const parent = this.inputContainers[state.name];
    const form = createEditingEl(state.name);
    const textInput = form.querySelector('input[type="text"]');

    if (state.currentValue) {
      textInput.value = state.currentValue;
    }

    parent.replaceChildren(form);
    textInput.focus();
  }
}
