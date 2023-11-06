const express = require('express');
const server = require('http').createServer();
const app = express();

    app.get('/', function(req, res) {

        res.sendFile('index.html', {root: __dirname});

    });


server.on('request', app);
server.listen(3000, function(){console.log('Sever started on port 3000'); });

process.on("SIGINT", () => {
    wss.clients.forEach(function each(client){
        client.close();
    });
    server.close(() => {
        shutDownDB();
    }    
  )
});

//** Begin Websocket */
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});
wss.on('connection', function connection(ws) {

    const numClients = wss.clients.size;
   

    if (ws.readyState === ws.OPEN){
        ws.send('Welcome to my server');
        console.log('Clients connected currently', numClients);
    }

    db.run(`INSERT INTO visitors (count, time)
        VALUES (${numClients}, datetime('now'))
    `);

    ws.on('close', function close(){
        wss.broadcast("Current Visitors:" + numClients);
        console.log('Client has disconnected');
    });

        


    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    }

    wss.broadcast("Current Visitors:" + numClients);

});

//** End Websockets */

//** Start DB */

const sqlite = require("sqlite3");
const db = new sqlite.Database(":memory:");

db.serialize(() => {
    db.run(`
        CREATE TABLE visitors(
        count INTEGER,
        time TEXT
        )
    `)
});


function getCounts() {
    db.each("SELECT * FROM visitors", (err, row) => {
        console.log(row);
    })
}

function shutDownDB(){
    getCounts();
    console.log("Shutting Down DB");
    db.close;

}
