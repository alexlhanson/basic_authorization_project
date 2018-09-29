'use strict';

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('./public'));

app.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}`);
});
