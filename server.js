/*
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

//endpoint & perform tasks
app.post('/dream', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      // size: '512x512',
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
});*/
// v4
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

    // Check if prompt exists
    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt is required',
      });
    }

    const aiResponse = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    const image = aiResponse.data[0].url;
    res.send({image});

  } catch (error) {
    console.error('OpenAI Error:', error);

    // Handle specific OpenAI errors
    if (error.code === 'billing_hard_limit_reached') {
      return res.status(402).json({
        error: 'API credit limit reached. Please check your OpenAI billing status.',
        details: error.message,
      });
    }

    // Handle rate limits
    if (error.code === 'rate_limit_reached') {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        details: error.message,
      });
    }

    // Generic error handler
    res.status(500).json({
      error: 'An error occurred during image generation',
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/dream`));