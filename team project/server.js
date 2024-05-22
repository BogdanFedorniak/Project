const express = require('express');
const app = express();

// Налаштування CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Слухаємо запити на порті 3000
app.listen(3000, () => {
    console.log('Сервер запущено на порті 3000');
});