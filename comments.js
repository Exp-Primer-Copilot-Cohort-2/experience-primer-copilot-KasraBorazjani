// create web server 
// create a route to handle all incoming requests
// send back the data that was requested
// if the data is not available, provide an error message
// start the server and listen on port 3000

const express = require('express');
const comments = require('./data/comments');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the comments web server!');
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ msg: `Comment with id ${req.params.id} not found` });
    }
    res.json(comment);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// run the server by running the command `node comments.js` in the terminal
// open the browser and enter the url `http://localhost:3000`
// to get all comments, enter the url `http://localhost:3000/comments`
// to get a comment with id 1, enter the url `http://localhost:3000/comments/1`
// to get a comment with id 10, enter the url `http://localhost:3000/comments/10`