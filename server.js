const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'KS-V-P-Service/public')));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});