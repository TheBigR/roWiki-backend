const path = require('path');
const express = require('express');
const errorHandler = require('./errorHandling');
const app = express();

// json parser middleware
app.use(express.json());
// static files middleware
app.use(express.static(path.join(__dirname, 'public')));

const pagesRouter = require('./routes/pages.route');

app.use('/api', pagesRouter);


app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/error.html'));
});

app.all('/test', (req, res) => {
    throw new Error()
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.use(errorHandler);

app.listen(3000,
    () => console.log('roWiki API server listening on port 3000!')
);