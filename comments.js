// Create web server
// Start server
// Add some comments
// Add a form to add more comments
// Add a button to delete all comments

// Create web server
var express = require('express');
var app = express();
var fs = require('fs');

// Start server
app.listen(3000, function() {
	console.log('Server started on http://localhost:3000');
});

// Add some comments
var comments = [];
fs.readFile('comments.json', function(err, data) {
	if (err) {
		console.log('Error reading comments.json');
	} else {
		comments = JSON.parse(data);
	}
});

app.get('/', function(req, res) {
	var output = '<h1>Comments</h1>';
	for (var i = 0; i < comments.length; i++) {
		output += '<p>' + comments[i] + '</p>';
	}
	output += '<form action="/add" method="post">' +
		'<input type="text" name="comment" placeholder="Your comment">' +
		'<button type="submit">Add comment</button>' +
		'</form>';
	output += '<form action="/delete" method="post">' +
		'<button type="submit">Delete all comments</button>' +
		'</form>';
	res.send(output);
});

// Add a form to add more comments
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.post('/add', function(req, res) {
	var comment = req.body.comment;
	comments.push(comment);
	fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
		if (err) {
			console.log('Error writing comments.json');
		}
	});
	res.redirect('/');
});

// Add a button to delete all comments
app.post('/delete', function(req, res) {
	comments = [];
	fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
		if (err) {
			console.log('Error writing comments.json');
		}
	});
	res.redirect('/');
});