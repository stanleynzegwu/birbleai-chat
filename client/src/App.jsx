import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000", { prompt });

      console.log("Response from server:", response.data);

      // Clear the textarea after submitting
      setPrompt("");
    } catch (error) {
      console.error("Error sending data to server:", error);
      // Handle error
    }
  };

  return (
    <main className="p-4 flex w-full h-screen bg-[#100F2B] text-white">
      <div className="flex flex-col w-full h-full bg-bg_primary rounded-2xl ">
        <div className="chat_container flex-1 overflow-scroll p-3">
          <div className="h-screen">llo</div>
          <div className="h-screen">llo</div>
        </div>
        <form className="px-3 py-3 h-fit w-full bg-transparent" onSubmit={handleSubmit}>
          <div className="flex gap-3 pr-2 py-2 items-center bg-bg_prompt rounded-2xl">
            <Textarea
              name="prompt"
              value={prompt}
              onChange={handleInputChange}
              className="flex-1 bg-transparent"
              cols={1}
              rows={1}
            />
            <Button className="rounded-xl w-24 bg-gradient-to-r from-[#AD07C9] to-[#6335E5]">
              Enter
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
