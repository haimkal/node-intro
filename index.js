const http = require ('http');
const fs = require ('fs');
const { resolve } = require('path');
const { report } = require('process');

http.createServer ((request, response)=> {
    if (request.url === '/write') {
        fs.writeFile('data.txt', 'Haim', (err)=> {
            if(err) {
                console.log(err);
                response.end();
                return;
            }
            response.write('File created!');
                response.end();
        });
    }
    else if (request.url === '/delete') {
        fs.unlink('data.txt', (err)=> {
            if(err){
                response.write(`${err}`);
                console.log(err);
                response.end();
                return;
            }
            response.write('File deleted!');
            response.end();
        });
    }
    else if (request.url === '/dice') {
        const randomNum = Math.floor(Math.random() * 6 + 1);
            response.write(`${randomNum}`);
            if (randomNum === 4){
                response.write("\nYou won!");
                response.end();
                return;
        }
        response.write("\nYou lost");
        response.end();
    }
    else {
        
        response.write('Unauthorized');
        response.end(); 
    }

}).listen(8080);

console.log('Listening on: http://localhost:8080');
