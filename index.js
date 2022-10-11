// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json, request, response } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// creating my timestamp request
let responseObject = {}

app.get('/api/timestamp/:input', (request, response) =>{
  let input = request.params.input

  if (input.includes('-')) {
    responseObject['unix'] = new Date(input).getTime()
    responseObject['uct'] = new Date(input).toUTCString()   
  }else{
     /** parsig the string into an integer then storing it in the input variable */
     input = parseInt(input)
     responseObject['unix'] = new Date(input).getTime()
     responseObject['uct'] = new Date(input).toUTCString()
  }

  if (!responseObject['unix'] || !responseObject['uct']) {
    response.json({error: 'Invalid Date'})
  } 

  response.json(responseObject)
});

/* This is used for an empty url  just the time stamp without */
app.get('/api/timestamp', (request, response) => {
  responseObject['unix'] = new Date().getTime()
  responseObject['uct'] = new Date().toUTCString()

  response.json(responseObject) 
});

// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
