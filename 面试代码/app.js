const express = require('express');
const path = require('path')
var app = express();
app.use(express.static(path.join(__dirname, "")));
// app.get('/login', function (req, res) {
//     res.send({
//         name: 'cm'
//     });
// })
app.post('/login', function (req, res) {
    console.log(1);
    res.send({
        name: 'cm'
    });
})
app.listen(3000);
console.log('服务器启动成功');