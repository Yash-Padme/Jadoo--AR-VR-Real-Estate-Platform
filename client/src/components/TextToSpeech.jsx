import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = ({ text }) => {
  const { speak, cancel, voices } = useSpeechSynthesis();

  const defaultVoice = voices.find(voice => voice.default);

  const handleSpeak = () => {
    speak({ text, voice: defaultVoice });
  };

  const handleCancel = () => {
    cancel();
  };

  return (
    <div className=''>
      <div className='flex justify-center items-center gap-4'  >
      <p className='hidden'>Description: {text}</p>
<div className='flex flex-col gap-2'>
  <button onClick={handleSpeak} className='px-2 py-1 border-2 border-black bg-white rounded-md  font-bold'>Speak</button>
  <button onClick={handleCancel} className='px-2 py-1 border-2 border-black bg-white  rounded-md font-bold'>Stop</button>
</div>

      </div>
      
    </div>
  );
};

export default TextToSpeech;
