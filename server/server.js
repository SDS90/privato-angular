const express = require('express');

const path = require('path');

// создаём Express-приложение
let app = express();

app.use('*/css',express.static('css'));
app.use('*/js',express.static('js'));
app.use('*/fonts',express.static('fonts'));
app.use('*/images',express.static('images'));
app.use('*/ajax',express.static('ajax'));
app.use('*/partials',express.static('partials'));


// создаём маршрут для главной страницы
// http://localhost:8080/
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// запускаем сервер на порту 8080
app.listen(8080);
console.log('Server run on 8080 port');