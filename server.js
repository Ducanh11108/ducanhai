require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const OpenAI = require('openai');

const app = express();

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.BASEURL
});


app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        const additionalMessage = {
            role: 'system',
            content: 'You are a helpfull chatbot, your responsibility is to answer all user questions in a humorous way and in Vietnamese language, '
        };

        const response = await openai.chat.completions.create({
            model: 'gemini-2.0-flash',
            messages: [additionalMessage, ...messages],
        });
        res.json(response.choices[0].message);
    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
