import { fireEvent, render, screen } from '@testing-library/react';
import { test } from 'vitest';
import App from '../src/App';

test('the counter starts at 0', () => {
  render(<App />);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent('0');
});

test('minus button has correct text', () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId('minus-button');
  expect(minusButtonElement).toHaveTextContent('-');
});

test('plus button has correct text', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('plus-button');
  expect(plusButtonElement).toHaveTextContent('+');
});

test('When the - button is pressed, the counter changes to -1', () => {
  render(<App />);
  const minusButtonElement = screen.getByTestId('minus-button');
  fireEvent.click(minusButtonElement);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent('-1');
});

test('When the + button is pressed, the counter changes to 1', () => {
  render(<App />);
  const plusButtonElement = screen.getByTestId('plus-button');
  fireEvent.click(plusButtonElement);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent('1');
});

test('on/off button has blue color', () => {
  render(<App />);
  const onOffButtonElement = screen.getByTestId('on-off-button');
  expect(onOffButtonElement).toHaveStyle({
    backgroundColor: 'blue',
  });
});

test('Prevent the -,+ button from being pressed when the on/off button is clicked', () => {
  render(<App />);
  const onOffButtonElement = screen.getByTestId('on-off-button');
  fireEvent.click(onOffButtonElement);
  const minusButtonElement = screen.getByTestId('minus-button');
  const plusButtonElement = screen.getByTestId('plus-button');
  expect(minusButtonElement).toBeDisabled();
  expect(plusButtonElement).toBeDisabled();
});
