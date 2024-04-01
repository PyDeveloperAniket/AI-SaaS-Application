const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config();

const {Configuration, OpenAIApi } = require("openai");
const Configuration = new Configuration({
    apikey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(Configuration);

const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,    
});


const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is running on the ${port}`);
})