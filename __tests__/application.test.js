// @ts-check

import fs from 'fs';
import path from 'path';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import testingLibrary from '@testing-library/dom';
import run from '../src/application.js';

const { screen } = testingLibrary;

beforeEach(() => {
  const pathToFixture = path.join('__fixtures__', 'index.html');
  const initHtml = fs.readFileSync(pathToFixture).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application 1', async () => {
  const name = document.querySelector('[data-editable-target="name"]');
  await name.click();
  expect(screen.getAllByRole('textbox')).toHaveLength(1);

  const inputName = screen.getByRole('textbox', { name: 'name' });
  await userEvent.default.type(inputName, 'Hexlet');
  const submitName = screen.getByRole('button');
  await userEvent.default.click(submitName);
  expect(inputName).not.toBeInTheDocument();

  const email = document.querySelector('[data-editable-target="email"]');
  await email.click();
  const inputEmail = screen.getByRole('textbox', { name: 'email' });

  await userEvent.default.type(inputEmail, 'support@hexlet.io');
  const submitEmail = screen.getByRole('button');
  await userEvent.default.click(submitEmail);
  expect(inputEmail).not.toBeInTheDocument();

  expect(screen.getByText('Hexlet')).toBeInTheDocument();
  expect(screen.getByText('support@hexlet.io')).toBeInTheDocument();
});

test('application 2', async () => {
  const name = document.querySelector('[data-editable-target="name"]');
  await name.click();
  expect(screen.getAllByRole('textbox')).toHaveLength(1);

  const inputName = screen.getByRole('textbox', { name: 'name' });
  await userEvent.default.type(inputName, 'Hexlet');
  const submitName = screen.getByRole('button', { name: 'Save name' });

  const email = document.querySelector('[data-editable-target="email"]');
  await email.click();
  const inputEmail = screen.getByRole('textbox', { name: 'email' });

  await userEvent.default.type(inputEmail, 'support@hexlet.io');
  const submitEmail = screen.getByRole('button', { name: 'Save email' });

  await userEvent.default.click(submitName);
  await userEvent.default.click(submitEmail);
  expect(inputName).not.toBeInTheDocument();
  expect(inputEmail).not.toBeInTheDocument();

  expect(screen.getByText('Hexlet')).toBeInTheDocument();
  expect(screen.getByText('support@hexlet.io')).toBeInTheDocument();

  await document.querySelector('[data-editable-target="email"]').click();
  await userEvent.default.clear(screen.getByRole('textbox', { name: 'email' }));

  await userEvent.default.click(screen.getByRole('button', { name: 'Save email' }));

  await document.querySelector('[data-editable-target="name"]').click();
  await userEvent.default.clear(screen.getByRole('textbox', { name: 'name' }));

  await userEvent.default.click(screen.getByRole('button', { name: 'Save name' }));

  expect(screen.getByText('name')).toBeInTheDocument();
  expect(screen.getByText('email')).toBeInTheDocument();
});
