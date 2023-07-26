// @ts-check
/* eslint-disable no-param-reassign */

import View from './View';
import { STATUSES } from './configuration';

// BEGIN (write your solution here) (write your solution here)
export default function app() {
  const formContainerEl = document.querySelector('.container');
  const inputEls = formContainerEl?.querySelectorAll('[data-editable-target]');

  if (inputEls?.length === 0) throw new Error('Now inputs available');

  const view = new View(formContainerEl);

  const state = {};

  inputEls?.forEach((inputEl) => {
    const name = inputEl.dataset.editableTarget;
    const status = STATUSES.viewing;
    const currentValue = null;

    state[name] = {
      status,
      name,
      currentValue,
    };
  });

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
      state[name].status = STATUSES.viewing;

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

  view.addEventHandler(dispatchEvent);
}
// END
