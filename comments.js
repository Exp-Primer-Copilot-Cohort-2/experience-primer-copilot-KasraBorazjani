// create web server 
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const comments = [];
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname === '/addComment') {
        let str = '';
        req.on('data', (chunk) => {
            str += chunk;
        });
        req.on('end', () => {
            const comment = qs.parse(str);
            comments.push(comment);
            res.writeHead(301, { 'Location': '/index.html' });
            res.end();
        });
    } else if (pathname === '/getComments') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});
server.listen(8080, () => {
    console.log('Server is running at http://