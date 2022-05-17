/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const tests = require('./client.js');

test('poll title should be what is in localStorage', () => {
  localStorage.setItem('poll-name', 'Favourite colour?');
  expect(localStorage.getItem('poll-name')).toEqual('Favourite colour?');

})

test('id name should be what is in localStorage', () => {
  localStorage.setItem('id-name', 'Poll test');
  expect(localStorage.getItem('id-name')).toEqual('Poll test');
})

test('party count should be what is in localStorage', () => {
  localStorage.setItem('party-count', '2');
  expect(localStorage.getItem('party-count')).toEqual('2');

})

test('time amount should be what is in localStorage', () => {
  localStorage.setItem('time-amount', '5');
  expect(localStorage.getItem('time-amount')).toEqual('5');
})

test('option one should be what is in localStorage', () => {
  localStorage.setItem('option-one', 'Yellow');
  expect(localStorage.getItem('option-one')).toEqual('Yellow');

})

test('option two should be what is in localStorage', () => {
  localStorage.setItem('option-two', 'Red');
  expect(localStorage.getItem('option-two')).toEqual('Red');

})

test('option three should be what is in localStorage', () => {
  localStorage.setItem('option-three', 'Purple');
  expect(localStorage.getItem('option-three')).toEqual('Purple');

})

test('option four should be what is in localStorage', () => {
  localStorage.setItem('option-four', 'Green');
  expect(localStorage.getItem('option-four')).toEqual('Green');

})