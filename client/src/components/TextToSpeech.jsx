import React from "react";

const TextToSpeech = ({ text }) => {
  const handleSpeak = () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    const defaultVoice = voices.find((voice) => voice.default);

    if (defaultVoice) {
      utterance.voice = defaultVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-center w-full gap-4">
        <p className="hidden">Description: {text}</p>

        <div className="flex flex-row gap-3 ml-auto">
          <button
            onClick={handleSpeak}
            className="px-4 py-1 border-2 border-black bg-white rounded-md font-bold hover:bg-gray-100 transition-colors shadow-sm"
          >
            Speak
          </button>

          <button
            onClick={handleStop}
            className="px-4 py-1 border-2 border-black bg-white rounded-md font-bold hover:bg-gray-100 transition-colors shadow-sm"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
