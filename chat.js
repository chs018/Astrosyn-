import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const input = document.getElementById("user-input");
const chatWin = document.getElementById("chat-window");



const GEMINI_API_KEY = "GEMINI_SECRET_KEY" ; 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });


const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "You are AstroBot, an AI assistant for cosmic exploration. Provide engaging and informative answers about space, astronomy, and related topics. Keep responses concise and keep response to 2 lines at maximum",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Understood! I'm ready to explore the cosmos with you. What would you like to know about today?",
        },
      ],
    },
  ],
  generationConfig: {
    maxOutputTokens: 300,
  },
});


input.addEventListener("keypress", async function (e) {
  if (e.key === "Enter" && input.value.trim()) {
    const userMsg = input.value.trim();
    displayMessage("🧑‍🚀 You", userMsg);
    input.value = "";

    const botMsgElement = displayMessage("🤖 AstroBot", "Typing...");

   try {
      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      const text = response.text();
console.log(text);

      botMsgElement.textContent = `🤖 AstroBot: ${text}`;
    } catch (error) {
      console.error("Chat error:", error);
      botMsgElement.textContent = "⚠️ AstroBot is currently offline or encountered an error.";
    }
      

}
});

function displayMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("mb-1");
  div.textContent = `${sender}: ${text}`;
  chatWin.appendChild(div);
  chatWin.scrollTop = chatWin.scrollHeight;
  return div;
}
