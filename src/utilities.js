export function createEditingEl(name) {
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

export function createViewingEl(name, content) {
  const resultEl = document.createElement('div');
  resultEl.dataset.editableTarget = name;

  if (content) {
    resultEl.textContent = content;
  } else {
    const italicizedEl = document.createElement('i');
    italicizedEl.textContent = name;
    resultEl.append(italicizedEl);
  }

  return resultEl;
}
