import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

const App = () => {
  // This state holds the text from transcript when we want to copy
  const [textToCopy, setTextToCopy] = useState("");

  // This hook copies the latest value of textToCopy to clipboard
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 2000,
  });

  // Starts continuous listening with Indian English language
  const startListening = () => 
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

  // Stops listening
  const stopListening = () => SpeechRecognition.stopListening();

  // Speech recognition transcript and support check
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  // 🔁 When "Copy" button is clicked first update the text, then copy
  const handleCopy = () => {
    setTextToCopy(transcript);
    setTimeout(() => {
      setCopied(); // Needs to be called AFTER state updates
    }, 0); // Timeout ensures state is updated before copying
  };

  return (
    <div className="bg-gradient-to-br from-[#CB9DF0] via-[#F0C1E1] to-[#FDDBBB] min-h-screen">

      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Speech to Text Converter</h2>
        <p className="text-gray-700 text-base mb-8">
          A React hook that converts speech from the mic to text
        </p>

        {/* Display transcript text */}
        <div className="main-content min-h-[200px] bg-gray-100 rounded-md p-6 shadow text-lg font-mono text-left overflow-y-auto">
          {transcript}
        </div>

        {/* Control buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleCopy}
            className="bg-[#547792] hover:bg-[#94B4C1] text-white font-bold py-2 px-4 rounded-full"
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={startListening}
            className="bg-[#547792] hover:bg-[#94B4C1] text-white font-bold py-2 px-4 rounded-full"
          >
            Start Listening
          </button>
          <button
            onClick={stopListening}
            className=" bg-[#547792] , hover:bg-[#94B4C1] text-white font-bold py-2 px-4 rounded-full"
          >
            Stop Listening
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
