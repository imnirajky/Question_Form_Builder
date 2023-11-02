import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import SaveBtn from './SaveBtn';

function Comprehension() {
  const [comprehensionText, setComprehensionText] = useState('');
  const [mcqs, setMcqs] = useState([{ question: '', options: ['', '', '', ''] }]);

  function saveComprehension(){
    const comprehensionObj = {};
    comprehensionObj.comprehension = comprehensionText;
    comprehensionObj.mcqs = mcqs;

    fetch("http://localhost:5000/api/save/comprehensions", {
      method: "POST",
      body: JSON.stringify(comprehensionObj),
      headers:{
        'content-type': 'application/json'
      }
    });
  }



  const handleComprehensionChange = (e) => {
    setComprehensionText(e.target.value);
  }

  const handleMcqQuestionChange = (e, index) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index].question = e.target.value;
    setMcqs(updatedMcqs);
  }

  const handleMcqOptionChange = (e, mcqIndex, optionIndex) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[mcqIndex].options[optionIndex] = e.target.value;
    setMcqs(updatedMcqs);
  }

  const addMcq = () => {
    const updatedMcqs = [...mcqs];
    updatedMcqs.push({ question: '', options: ['', '', '', ''] });
    setMcqs(updatedMcqs);
  }

  const removeMcq = (index) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs.splice(index, 1);
    setMcqs(updatedMcqs);
  }

  return (  
    <div className="p-2 w-4/6 min-h-96px shadow-teal-800 shadow-lg rounded-lg mb-7 border-b-2 border-l-2">
      <div className='h-fit w-full'>
        <label className="block font-semibold mb-2">Comprehension Text:</label>
        <div className="w-full mt-4">
        <textarea
        className="w-[100%] h-36 border-2 rounded p-2 text-xs"
        placeholder='Enter Comprehension here..'
        value={comprehensionText}
        onChange={handleComprehensionChange}
      ></textarea>
      </div>
        <p className="font-semibold text-sm mb-4 mt-4">Multiple Choice Questions:</p>
        {mcqs.map((mcq, mcqIndex) => (
          <div key={mcqIndex} className="p-1 border-b-2 rounded-md border-slate-700 mb-2">
            <div>
              <label className="block mb-1 text-xs">Question: {mcqIndex+1}</label>
              <input
                type="text"
                value={mcq.question}
                onChange={(e) => handleMcqQuestionChange(e, mcqIndex)}
                className="w-80 h-6 p-1 border rounded outline-none text-xs"
                placeholder='Type Question'
              />
            </div>
            <div>
              <label className="block mb-1 text-xs">Options:</label>
              {mcq.options.map((option, optionIndex) => (
                <div key={optionIndex} className='h-fit flex flex-col justify-evenly mb-2 '>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleMcqOptionChange(e, mcqIndex, optionIndex)}
                    className="w-80 h-5 p-2 border rounded-md outline-none text-xs"
                    placeholder={`Type Option ${optionIndex+1}`}     
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => removeMcq(mcqIndex)}
              className="mt-1 p-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
          onClick={addMcq}
          className="p-1 m-2 flex items-center cursor-pointer bg-blue-500 text-white rounded text-sm"
        >
          <AddCircleIcon /> Add MCQ
        </button>

        <SaveBtn handleSave={saveComprehension} />
    </div>
  );
}

export default Comprehension;
