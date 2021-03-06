const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const VideoModel = require('../db/VideoModel');
// const cors = require('cors');

if (!process.env.JEST_WORKER_ID) {
  const db = require('../db/index.js');
}

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

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/video-player-service/api/get-video', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)

  let params;

  if (req.query.videoId) {
    params = { videoYouTubeId: req.query.videoId }
  } else {
    randomIndex = Math.floor(Math.random() * 100)
    params = { videoIndex: randomIndex };
  }
  
  VideoModel.findOne(params, function (err, video) {
    if (err) {
      console.log(err)
      res.send(500, 'video not found!')
    } else {
      res.send(video)
    }
  });
})


// catch-all
app.get('*', (req, res) => {
  console.log(`Serving GET request on path: ${req.path}`)
  res.send(404, 'This page does not exist! Please try another URL, or go back to home page!')
})
const server = app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })

module.exports = server;