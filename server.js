/*
// openai
import * as dotenv from 'dotenv'

dotenv.config()

import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
  apikey: process.env.OPENAI,
})
const openai = OpenAIApi(configuration)

// express
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/dream', async (req, res) => {
  const prompt = req.body.prompt
  const aiResponse = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024',
  })

  const image = aiResponse.data.data[0].url
  res.send({image})
})

app.listen(8080, () => console.log('make art on http://localhost:8080/dream'))*/

///////////////////////////////////////////////////////////////////////////
/* V2
// openai
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// express
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    res.send({image});

  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
});

app.listen(8080, () => console.log('Make art on http://localhost:8080/dream'));*/
////////////////////////////// v3
// openai
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// express
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or default to 3000

app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    res.send({image});

  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
});

// Enhanced error handling for server startup
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/dream`);
}).on('error', (err) => {
  if (err.code === 'EACCES') {
    console.error(`Port ${PORT} requires elevated privileges`);
  } else if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error(err);
  }
  process.exit(1);
});