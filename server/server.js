import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import Replicate from "replicate";


const replicate = new Replicate({
  auth: 'r8_338YflHn22MMxIEIgk6BIGgAhIIKSfr0qg0ga',
  // auth: process.env.REPLICATE_API_TOKEN,
});
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from BirbleAi!'
  })
})

app.post('/', async (req, res) => {
  console.log(process.env.REPLICATE_API_TOKEN)
  try {
    const prompt = req.body.prompt;
    console.log(prompt)

    const input = {
        top_k: 50,
        top_p: 0.9,
        prompt: prompt,
        temperature: 0.6,
        system_prompt: "You are a very helpful, respectful and honest assistant.",
        length_penalty: 1,
        max_new_tokens: 1024,
        prompt_template: "<s>[INST] {prompt} [/INST] ",
        presence_penalty: 0
      };
      
      // let response = ''; // Initialize an empty response string

      // // Aggregate all events into a single response
      // for await (const event of replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
      //     response += event.toString();
      // }
  
      // // Send the aggregated response back to the client
      // res.status(200).json({ response });

      for await (const event of replicate.stream("mistralai/mixtral-8x7b-instruct-v0.1", { input })) {
        process.stdout.write(event.toString());
      };
      
      

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))