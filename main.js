import { header } from './header.js';
import { barraNavegacion } from './barraNavegacion.js';

console.log('header', document.querySelector('head'));
document.querySelector('head').innerHTML += header();
document.querySelector('#barraNavegacion').innerHTML = barraNavegacion();
