// Create web server 

// Importing the required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    const comments = fs.readFileSync('comments.json', 'utf-8');
    const commentsArray = JSON.parse(comments);
    commentsArray.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(commentsArray));
    res.redirect('/comments');
});

app.get('/comments', (req, res) => {
    const comments = fs.readFileSync('comments.json', 'utf-8');
    const commentsArray = JSON.parse(comments);
    res.render('comments', { comments: commentsArray });
});

// Server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});