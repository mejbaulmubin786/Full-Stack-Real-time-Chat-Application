const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(bodyParser.json())


// Example using OpenAI official client. If you prefer fetch, use node-fetch.
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)


app.post('/server/chat', async (req, res) => {
  try {
    const { message } = req.body
    // Create a chat completion - adjust model as you prefer (gpt-4o, gpt-4o-mini, etc.)
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ],
      max_tokens: 800
    })


    const reply = completion.data.choices[0].message.content
    res.json({ reply })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})


const PORT = process.env.PORT || 5173
app.listen(PORT, () => console.log('Server running on', PORT))


