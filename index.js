// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
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

//  app.get("/api2/:date", function (req, res) {
//    const date_string = new Date(req.params.date);
//    const date = Date.parse(req.params.date);
//    console.log(date);
//    if (isNaN(date.getTime()))
//     {res.json({ error : "Invalid Date" })};
//    res.json({ unix: date, utc: date_string.getUTCDate()  });
//  });

app.get("/api/:date", function (req, res) {
  const dateString = req.params.date;

  // Validate date format using a regular expression
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD
  if (!dateFormatRegex.test(dateString)) {
    return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD." });
  }

  // Create a Date object and check for validity
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: "Invalid date." });
  }

  // Additional check for valid date components
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  if (year < 1000 || month < 0 || month > 11 || day < 1 || day > 31) {
    return res.status(400).json({ error: "Invalid date components." });
  }

  // If all validations pass, proceed with response
  res.json({
    unix: date.getTime(),
    utc: date.getUTCDate()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
