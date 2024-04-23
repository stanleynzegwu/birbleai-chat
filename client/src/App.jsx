import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatStripe, generateUniqueId, loadInterval, loader, typeText } from "@/lib/utils";
import axios from "axios";
import { useRef, useState } from "react";

export default function App() {
  const [hadConversation, setHadConversation] = useState(false);
  const [prompt, setPrompt] = useState("");
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };
  const chatContainer = useRef();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:5000", { prompt });

  //     console.log("Response from server:", response.data);

  //     // Clear the textarea after submitting
  //     setPrompt("");
  //   } catch (error) {
  //     console.error("Error sending data to server:", error);
  //     // Handle error
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // user's chatstripe
    chatContainer.current.innerHTML += chatStripe(false, prompt);

    // to clear the textarea input
    setPrompt("");

    // bot's chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.current.innerHTML += chatStripe(true, " ", uniqueId);

    // to focus scroll to the bottom
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId);

    // messageDiv.innerHTML = "..."
    loader(messageDiv);

    try {
      const response = await axios.post("http://localhost:5000", { prompt });

      clearInterval(loadInterval);
      messageDiv.innerHTML = " ";

      typeText(messageDiv, response.data.response);
    } catch (error) {
      console.error("Error sending data to server:", error);

      clearInterval(loadInterval);
      messageDiv.innerHTML = " ";
      typeText(messageDiv, "Something went wrong");
    }
  };

  return (
    <main className="p-2 md:p-4 flex w-full h-screen bg-[#100F2B] text-white">
      <div className="flex flex-col w-full h-full bg-bg_primary rounded-2xl ">
        <div className="chat_container flex-1 overflow-scroll p-2 md:p-3" ref={chatContainer}>
          {/* <div className={`w-full h-full flex justify-center items-center `}>
            <img
              className="w-[60%] md:w-[40%] lg:w-[35%] object-cover"
              src="/astronaut1.png"
              alt="astronaut"
            />
          </div> */}
        </div>
        <form
          className="px-2 md:px-3 py-2 md:py-3 h-fit w-full bg-transparent"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 pr-2 py-2 items-center bg-bg_prompt rounded-2xl">
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
