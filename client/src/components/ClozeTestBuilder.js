import React, { useState, useRef } from 'react';
import SaveButton from './SaveBtn';

 
function ClozeTestBuilder() {
  const [inputValue, setInputValue] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const inputRef = useRef(null);

  function saveCloze () {
    const clozeObject = {};
    clozeObject.sentence = underlineSelectedWords();
    clozeObject.options = selectedWords;
    fetch("http://localhost:5000/api/save/cloze", {
        method: "POST",
        body:JSON.stringify(clozeObject),
        headers:{
          'content-type':'application/json' 
        }
    });
  }
  

  const handleSentenceChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
  };

  const handleDoubleClick = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      setSelectedWords((prevSelectedWords) => [...prevSelectedWords, selectedText]);
    }
  };

  const removeSelectedWord = (word) => {
    setSelectedWords((prevSelectedWords) => prevSelectedWords.filter((w) => w !== word));
  };

  const underlineSelectedWords = () => {
    let text = inputValue;
    selectedWords.forEach((word) => {
      text = text.replace(new RegExp(`\\b${word}\\b`, 'g'), ` ____ `);
    });
    return text;
  };

  return (
    <div className="p-4 h-fit w-4/6 shadow-rose-800 shadow-md rounded-lg mb-10 border-b-2 border-l-2 border-t-2">
      <p className='font-semibold'>Cloze Test</p>
      <div className="mt-4 mb-3">
        <label className="mb-2 mr-2 inline font-semibold">Preview:</label>
        <p className="border-b border-b-rose-800 shadow-sm rounded p-1 w-fit w-min-[50%] inline font-semibold">{underlineSelectedWords()}</p>
      </div>
      <label htmlFor="sentenceInput" className="block mb-2 font-semibold text-sm text-red-700">Type your sentence and double click on the words to make it option:</label>
      <div className="w-[70%] h-12px">
        <input
        className="w-[70%] h-10px p-1 border border-gray-300 rounded"
          type="text"
          id="sentenceInput"
          ref={inputRef}
          placeholder="Type your sentence here"
          value={inputValue}
          onChange={handleSentenceChange}
          onDoubleClick={handleDoubleClick}
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 font-semibold text-sm">Selected Words:</label>
        <ul className="flex justify-evenly w-fit">
          {selectedWords.map((word, index) => (
            <li className="flex justify-center font-semibold rounded-md p-1 m-2 bg-purple-900 text-white" key={index}>
              {word}{' '}
              <button onClick={() => removeSelectedWord(word)} className="text-red-600 font-bold ml-2">
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <SaveButton handleSave={saveCloze} />
    </div>
  );
}

export default ClozeTestBuilder;

