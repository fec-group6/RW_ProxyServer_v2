const express = require('express');
const app = express();
const db = require('../db/index.js');
// const cors = require('cors');

app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // res.header('Access-Control-Allow-Credentials', true);
  return next();
});
app.use(express.static(__dirname + '/../client/dist'));


// will need to handle a get request to the database in order to retreive video info
//and display on our page.
app.get('/videos', (req, res)=>{

 db.fetch()
 .then((videos) => res.send(videos))
})



let port = 3003;

// app.listen(port, function() {
//   console.log(`listening on port ${port}`);
// });

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, function() {
  console.log(`listening on port ${port}`);
  });
}

module.exports = app;