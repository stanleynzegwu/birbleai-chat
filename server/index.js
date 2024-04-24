import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import Replicate from "replicate";

const app = express()
dotenv.config()
app.use(cors(
  {
      origin: ["https://birbleai-chat-frontend.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true
  }
));
app.use(express.json())

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from BirbleAi!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const input = {
      top_p: 1,
      prompt: prompt,
      temperature: 0.5,
      system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
      max_new_tokens: 500
  };
      
      let response = ''; // Initialize an empty response string

      for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
        response += event.toString();
    }
  
      // Send the aggregated response back to the client
      res.status(200).json({ response });

      

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))