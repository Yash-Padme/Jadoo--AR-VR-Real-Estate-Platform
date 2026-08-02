// OptionChatbot.js

import React, { useState, useEffect } from "react";
import chatbot from "../assets/Mantri.jpg";

const OptionChatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleOptionClick = (option) => {
    // Add selected option to chat history
    setChatHistory([...chatHistory, { type: "user", message: option }]);

    // Set the selected option
    setSelectedOption(option);

    // Expand the chatbot and start loading animation
    setIsExpanded(true);
    setIsLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      // Handle logic based on the selected option
      let botResponse = "";

      switch (option) {
        case "how to create a new account":
          botResponse =
            "To create a Jadoo Account...\n Click on Get statred button on Navbar , then fill the details and Click on Sign Up ";
          break;
        case "is registration free":
          botResponse =
            "Registering on Jadoo is free. You can register yourself as Owner,Buyer or Flatmate";
          break;
        case "how to find a property":
          botResponse =
            "To find property ..\n Click on For Tenants button on Navbar,there you will have a search bar where you can fill up the location where you want the property and it will show all the available property up there ";
          break;

        case "how can i contact a property seller":
          botResponse =
            "You may contact property owner by clicking on contact seller button visible on listing card. All you need to do is enter your phone number, email id and click submit";
          break;
        case "when will my property become visible":
          botResponse =
            "Usually it takes only 1 minute at worst case it takes maximum 5 minutes for a property to get screened and become visible on search ";
          break;
        case "what is the payment process":
          botResponse =
            "In Tenants section at every property you will have buy button at the bottom of the home card";
          break;

        default:
          botResponse = `Apologies, but we are currently unable to fulfill your request. Please check back later.`;
      }

      // Add bot response to chat history
      setChatHistory([...chatHistory, { type: "bot", message: botResponse }]);

      // Stop loading animation after receiving the response
      setIsLoading(false);

      // Reset selectedOption after displaying the bot response
      setSelectedOption(null);

      // Scroll chat history to the bottom
      const chatContainer = document.getElementById("chatContainer");
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 2000); // Simulated delay for the loading animation and better visual separation
  };

  // // Function to handle spoken input
  // const handleSpeak = () => {
  //   const recognition = new window.webkitSpeechRecognition();
  //   recognition.onresult = (event) => {
  //     console.error("Speech Error:", event.error);

  //     const result = event.results[event.results.length - 1][0].transcript;
  //     setTranscript(result);
  //   };
  //   recognition.start();
  // };

  const handleSpeak = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Listening...");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log("Recognized:", result);
      setTranscript(result);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
    };

    recognition.start();
  };

  console.log(window.SpeechRecognition);
  console.log(window.webkitSpeechRecognition);

  // Function to send the recorded question
  const handleSendQuestion = () => {
    if (transcript) {
      handleOptionClick(transcript);
    }
  };

  // Function to close the chatbot and reset chat history
  const handleCloseChatbot = () => {
    setSelectedOption(null);
    setIsExpanded(false);
    setChatHistory([]);
  };

  useEffect(() => {
    // Scroll chat history to the bottom when new messages are added
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      className={`font-playfair z-[100] fixed mb-2 bottom-4 right-4 transition-all ${isExpanded ? "h-[85vh] w-[350px] mb-[2vh]  " : "h-12 w-12"}`}
    >
      {isExpanded && (
        <button
          className="absolute top-4 pt-1 pr-1 right-2 text-lg font-bold"
          onClick={handleCloseChatbot}
        >
          X
        </button>
      )}
      {!isExpanded ? (
        <div
          className=" cursor-pointer absolute bottom-0 right-0"
          onClick={() => setIsExpanded(true)}
        >
          {/* You can customize the appearance of the small circle here */}
          <div className="h-[9vh] w-[9vh] rounded-full flex justify-center dark:bg-white bg-black">
            <img
              className="p-1 rounded-full border border-black"
              src={chatbot}
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="max-w-lg h-[85vh] mx-auto mt-4 p-4 border-2 rounded-xl border-black shadow bg-pink-100">
          <div>
            {isLoading && <p>Thinking...</p>}
            {selectedOption && (
              <p className="mb-2">You selected: {selectedOption}</p>
            )}
            {!isLoading && !selectedOption && (
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-[20px] font-bold font-serif ">
                  {" "}
                  Choose an option:
                </p>
                <div className="flex gap-2 flex-col">
                  <button
                    onClick={() =>
                      handleOptionClick("how to create a new account")
                    }
                    className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white font-semibold text-[12px] font-serif "
                  >
                    How to create a new account
                  </button>
                  <button
                    onClick={() => handleOptionClick("is registration free")}
                    className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white font-semibold text-[12px] font-serif"
                  >
                    Is registration free
                  </button>
                  <button
                    onClick={() => handleOptionClick("how to find a property")}
                    className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white font-semibold text-[12px] font-serif"
                  >
                    How to find a property
                  </button>
                  <button
                    onClick={() =>
                      handleOptionClick("how can i contact a property seller")
                    }
                    className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white font-semibold text-[12px] font-serif"
                  >
                    How can I contact a property seller
                  </button>
                  <button
                    onClick={() =>
                      handleOptionClick("when will my property become visible")
                    }
                    className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white font-semibold text-[12px] font-serif"
                  >
                    When will my property become visible
                  </button>
                  <button
                    onClick={() =>
                      handleOptionClick("what is the payment process")
                    }
                    className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white font-semibold text-[12px] font-serif"
                  >
                    What is the payment process
                  </button>
                </div>
              </div>
            )}
          </div>
          <div
            id="chatContainer"
            className="mb-4 mt-2 h-[38vh] overflow-y-auto"
          >
            <h2 className="text-lg font-semibold mb-2">Chatbot</h2>
            <div className="flex flex-col">
              {chatHistory.map((entry, index) => (
                <div
                  key={index}
                  className={`mb-2 ${entry.type === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`rounded p-2 inline-block ${entry.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                  >
                    {entry.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 relative bottom-4  ">
            <button
              className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white text-[12px]"
              onClick={handleSpeak}
            >
              Speak
            </button>
            {transcript && (
              <div className="bg-gray-200  p-2 rounded">{transcript}</div>
            )}
            <button
              className="btn p-1 pl-2 pr-2 border-[1.5px] border-black bg-blue-500 rounded-md text-white text-[12px]"
              onClick={handleSendQuestion}
            >
              &#10148;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionChatbot;
