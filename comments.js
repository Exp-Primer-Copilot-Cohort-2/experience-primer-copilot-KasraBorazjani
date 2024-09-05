// create web server 
const express = require('express');
const app = express();
const port = 3000;

// import the comments module
const comments = require('./comments');

// create a new comment
const newComment = {
    username: 'stranger',
    comment: 'Hello, world!'
};

// add the new comment
comments.addComment(newComment);

// log all comments
console.log(comments.getComments());

// start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});