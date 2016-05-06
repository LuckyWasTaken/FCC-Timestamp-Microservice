'use strict';

var express = require("express");
var http = require("http");
var app = express();
var chrono = require('chrono-node');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get("/", function(request, response) {
      response.render('index.html');
});

app.get("*", function(request, response) {
    //response.writeHead(200, { "Content-Type": "application/json" });
    var input = request.url.slice(1);
    var date;
    var obj = {
        natural: null,
        unix: null
    };
    if(!isNaN(input)) date = new Date(parseInt(input,10)*1000);
    else{
        date = chrono.parseDate(input.replace(new RegExp("%20",'g'),' '));
    }
    
    if(date!= null){
        obj.unix = date.getTime()/1000;
        obj.natural = date.toDateString();
    }
    
    response.end(JSON.stringify(obj));
});

http.createServer(app).listen(process.env.PORT);