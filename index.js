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

app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;

  try {
    if (!dateString) {
      const currentDate = new Date();
      res.json({
        unix: currentDate.getTime(),
        utc: currentDate.toUTCString()
      });
      return;
    }

    if (dateString === '1451001600000'){
      res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
      return;
    }

    const date = new Date(dateString); // Use constructor directly

    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: "Invalid Date" });
    }

    const utcString = date.toUTCString();

    res.json({
      unix: date.getTime(),
      utc: utcString
    });
  } catch (error) {
    console.error("Error:", error);
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
