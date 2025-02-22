import { useState } from "react";
import { getAIResponse } from "../utils/ai-util"; // Import Gemini AI handler

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInput = (e) => setInputText(e.target.value);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    setIsLoading(true);
    try {
      const aiResponseText = await getAIResponse(inputText);
      const aiResponse = { text: aiResponseText, sender: "bot" };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Something went wrong. Try again.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={toggleChat} className="fixed bottom-5 right-5 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="bg-blue-500 text-white p-3 text-center font-bold">Chatbot</div>

          <div className="flex-1 p-3 bg-gray-50 overflow-y-auto max-h-80">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block px-4 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-200 text-black rounded-bl-none"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-black">Typing...</div>
              </div>
            )}
          </div>

          <div className="flex border-t border-gray-200 p-3 bg-white">
            <input
              type="text"
              value={inputText}
              onChange={handleInput}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              disabled={isLoading}
            />
            <button onClick={sendMessage} className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" disabled={isLoading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
