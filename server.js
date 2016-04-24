require('dotenv').config();
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config')
const fs = require('fs');

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.join(__dirname, 'static')))
app.use('/api', express.static(path.join(__dirname, 'storage')))

app.get('/api/photos', (req, res) => {
    const file = path.join(__dirname, 'storage', 'images.json');
    const start = +req.query.cursor || 0;
    const limit = 10;

    fs.readFile(file, (err, string) => {
        const db = JSON.parse(string);
        const photos = db.photos.photo;
        const cursor = start + limit;
        const data = photos.slice(start, cursor);
        const done = photos.length === cursor;

        res.send({cursor, done, data})
    });
})

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'static/index.html'));
})

app.listen(3000, 'localhost', (err)=> {
    if (err) console.log(err)
    else console.log('Listening at http://localhost:3000');
})
