/**
 * Example backend that takes a long time to respond.
 * Please do not modify!
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000;
const delay = 200;

app.use(cors());
app.use(bodyParser.json());

const messages = [
	{
		author: "Grace Hopper",
		text: "Found a bug",
	},
	{
		author: "Grace Hopper",
		text: "Optimized the COBOL libraries",
	},
	{
		author: "Adele Goldberg",
		text: "Fixed a compiler bug",
	},
];

app.get('/messages', (req, res) => {
	setTimeout(() => {
		res.send(messages);
	}, delay);
});

app.post('/messages', (req, res) => {
	setTimeout(() => {
		messages.push(req.body);

		res.send({ status: 'okay' });
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
});
