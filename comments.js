// create web server 
// get all comments
// get comment by id
// add comment
// update comment
// delete comment

// get all comments
router.get('/', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal error, please try again' });
        }
        res.json(comments);
    });
});

// get comment by id
router.get('/:id', function(req, res) {
    Comment.findById(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal error, please try again' });
        }
        res.json(comment);
    });
});

// add comment
router.post('/', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal error, please try again' });
        }
        res.json(comment);
    });
});

// update comment
router.put('/:id', function(req, res) {
    Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, comment) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal error, please try again' });
        }
        res.json(comment);
    });
});

// delete comment
router.delete('/:id', function(req, res) {
    Comment.findByIdAndRemove(req.params.id, function(err, comment) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal error, please try again' });
        }
        res.json(comment);
    });
});

module.exports = router;