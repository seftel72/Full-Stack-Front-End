const http = require('http');

http.createServer(function (req,res) {
res.write('On the way to being a FULL STACK engineer!');
res.end();
}
).listen(3000);


console.log('Server Started on port 3K');

