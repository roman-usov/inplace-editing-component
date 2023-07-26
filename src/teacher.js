// BEGIN (write your solution here)
const render = (state, element) => {
  const elementName = element.dataset.editableTarget;
  element.innerHTML = '';

  const buildText = () => {
    if (state.value === '') {
      const i = document.createElement('i');
      i.textContent = elementName;
      return i;
    }

    return document.createTextNode(state.value);
  };

  const buildForm = () => {
    const form = document.createElement('form');
    const label = document.createElement('label');
    label.setAttribute('for', elementName);
    label.classList.add('sr-only');
    label.textContent = elementName;
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', elementName);
    input.setAttribute('id', elementName);
    input.setAttribute('value', state.value);

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', `Save ${elementName}`);
    form.append(label, input, submit);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const value = formData.get(elementName).trim();
      state.value = value;
      state.mode = 'text';
      render(state, element);
    });

    return { form, input };
  };

  switch (state.mode) {
    case 'text': {
      const text = buildText();
      element.append(text);
      break;
    }
    case 'form': {
      const { form, input } = buildForm();
      element.append(form);
      input.select();
      break;
    }
    default:
      // https://ru.hexlet.io/blog/posts/sovershennyy-kod-defolty-v-svitchah
      throw new Error(`Unknown mode: ${state.mode}`);
  }
};

export default () => {
  const elements = document.querySelectorAll('[data-editable-target]');
  // у каждого элемента свой стейт. Можно добавлять новые элементы с data-editabe-target в HTML,
  // не меняя код
  elements.forEach((element) => {
    const state = {
      // состояние приложения определено в виде состояний конечного автомата вместо флагов
      mode: 'text',
      value: '',
    };

    element.addEventListener('click', () => {
      if (state.mode === 'text') {
        state.mode = 'form';
        render(state, element);
      }
    });
  });
};
// END