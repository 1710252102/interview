const data = require('./data/1.json');
const express = require('express');
const path=require('path');
const app = express();
app.use(express.static(path.join(__dirname)));
app.get('/base', (req, res) => {
	res.send(data)
});
app.listen(3000);
console.log('成功');