// @ts-check
/* eslint-disable no-param-reassign */

// BEGIN (write your solution here) (write your solution here)
const STATUSES = {
  initial: 'initial',
  editing: 'editing',
  saved: 'saved',
};

function createFormEl(name) {
  const formEl = document.createElement('form');
  const labelEl = document.createElement('label');
  const inputEl = document.createElement('input');
  const submitEl = document.createElement('input');

  labelEl.classList.add('sr-only');
  labelEl.setAttribute('for', name);
  labelEl.textContent = name;

  inputEl.setAttribute('type', 'text');
  inputEl.setAttribute('id', name);
  inputEl.setAttribute('name', name);
  inputEl.setAttribute('value', '');

  submitEl.setAttribute('type', 'submit');
  submitEl.setAttribute('value', `Save ${name}`);

  formEl.append(labelEl);
  formEl.append(inputEl);
  formEl.append(submitEl);

  return formEl;
}

function createResultEl(dataAttrValue, content = null, childEl = null) {
  const resultEl = document.createElement('div');
  resultEl.dataset.editableTarget = dataAttrValue;

  if (content) {
    resultEl.textContent = content;
  }

  if (childEl) {
    resultEl.append(childEl);
  }

  return resultEl;
}

function createSavedResultEl(dataAttrValue, content) {
  return createResultEl(dataAttrValue, content);
}

function createDefaultResultEl(dataAttrValue) {
  const italicizedEl = document.createElement('i');

  italicizedEl.textContent = dataAttrValue;

  return createResultEl(dataAttrValue, null, italicizedEl);
}

class View {
  constructor(formContainer) {
    this.containerEl = formContainer;
    this.renderOptions = {};

    this.renderOptions[STATUSES.initial] = this.renderDefault.bind(this);
    this.renderOptions[STATUSES.saved] = this.renderSaved.bind(this);
    this.renderOptions[STATUSES.editing] = this.renderEditing.bind(this);

    this.inputContainers = {};

    Array.from(this.containerEl.children).forEach((child) => {
      const name = child.dataset.editableTarget;
      this.inputContainers[name] = child;
    });
  }

  addHandler(handler) {
    Object.values(this.inputContainers).forEach((inputContainer) => {
      inputContainer.addEventListener('click', handler);
      inputContainer.addEventListener('submit', handler);
    });
  }

  render(state) {
    const renderEl = this.renderOptions[state.status];
    renderEl(state);
  }

  renderDefault(elState) {
    const parent = this.inputContainers[elState.name];
    parent.replaceChildren(createDefaultResultEl(elState.name));
  }

  renderSaved(elState) {
    const parent = this.inputContainers[elState.name];
    parent.replaceChildren(createSavedResultEl(elState.name, elState.currentValue));
  }

  renderEditing(elState) {
    const parent = this.inputContainers[elState.name];
    const form = createFormEl(elState.name);
    const textInput = form.querySelector('input[type="text"]');

    if (elState.currentValue) {
      textInput.value = elState.currentValue;
    }

    parent.replaceChildren(form);
    textInput.focus();
  }
}

export default function app() {
  const formEl = document.querySelector('.container');
  const view = new View(formEl);

  const state = {
    name: {
      status: STATUSES.initial, // initial, editing, saved
      name: 'name',
      currentValue: null,
    },
    email: {
      status: STATUSES.initial, // initial, editing, saved
      name: 'email',
      currentValue: null,
    },
  };

  function handleEdit(e) {
    let clickedEl = e.target;

    if (!clickedEl.matches('i') && !clickedEl.matches('div')) return;

    if (clickedEl.matches('i')) {
      clickedEl = clickedEl.closest('[data-editable-target]');
    }

    const name = clickedEl.dataset.editableTarget;
    state[name].status = STATUSES.editing;

    view.render(state[name]);
  }

  function handleSave(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.forEach((value, name) => {
      state[name].currentValue = value || null;
      state[name].status = value ? STATUSES.saved : STATUSES.initial;

      view.render(state[name]);
    });
  }

  function dispatchEvent(e) {
    const events = {
      click: handleEdit,
      submit: handleSave,
    };

    const eventType = e.type;

    if (!eventType) return;

    events[eventType](e);
  }

  view.addHandler(dispatchEvent);
}
// END
