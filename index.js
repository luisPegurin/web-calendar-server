const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
require('./src/routes/index')(app);
const port = require('./src/config/env.config.js').port;
 


app.listen(port, () => {
    console.log(`Server is running at localhost:${port}`)
})