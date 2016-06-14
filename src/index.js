//Aquí se encuentra todo el código del cliente

require('babel-polyfill');
var page = require('page');

//Inicialmente definimos rutas
// var main = document.getElementById('main-container')

// page('/', function (ctx, next)) {
//	 main.innerHTML = 'Home'; //diga home 	
// )}

// page('/signup', function(ctx, next)) {
//	 main.innerHTML = 'Signup'; //diga signup
// })

require('./homepage');
require('./signup');
require('./signin');
require('./footer');

//Se inicializa page invocandolo sin parámetros o dandole start
//page.start();
page();