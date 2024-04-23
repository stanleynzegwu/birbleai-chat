import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import Replicate from "replicate";

dotenv.config()


const app = express()
app.use(cors())
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

    // const input = {
    //     top_k: 50,
    //     top_p: 0.9,
    //     prompt: prompt,
    //     temperature: 0.6,
    //     system_prompt: "You are a very helpful, respectful and honest assistant.",
    //     length_penalty: 1,
    //     max_new_tokens: 1024,
    //     prompt_template: "<s>[INST] {prompt} [/INST] ",
    //     presence_penalty: 0
    //   };

    const input = {
      top_p: 1,
      prompt: prompt,
      temperature: 0.5,
      system_prompt: "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
      max_new_tokens: 500
  };
      
      let response = ''; // Initialize an empty response string

      // Aggregate all events into a single response
      // for await (const event of replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
      //     response += event.toString();
      // }

      for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
        response += event.toString();
    }
      // for await (const event of replicate.stream("meta/llama-2-70b-chat", { input })) {
      //   process.stdout.write(`${event}`)
      // };
  
      // Send the aggregated response back to the client
      res.status(200).json({ response });

      // for await (const event of replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
      //   process.stdout.write(event.toString());
      // };
      
      

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))