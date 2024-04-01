const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const chatroutes = require('./routes/chatRoutes');
const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

app.use('/', chatroutes);


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is running on the ${port}`);
})