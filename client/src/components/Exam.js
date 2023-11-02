import React, { useState } from 'react';
import Preview  from './Preview';
import PreviewCloze from './PreviewCloze';
import PreviewComprehension from './PreviewComprehension';
import { Link } from 'react-router-dom';

const Exam = () => {
  const [testSubmitted, setTestSubmitted] = useState(false);


  const handleSubmitTest = () => {
    setTimeout(() => {
      setTestSubmitted(true);
    }, 1000);
  };

  return (
    <div className='flex flex-col p-5 items-center justify-evenly'>
      {testSubmitted ? (
       
        <div className="text-green-600 text-3xl">
          Test Submit Successfully ✅
        </div>
      ) : (
        <>
          <Preview />
          <PreviewComprehension />
          <PreviewCloze />

          <button
            onClick={handleSubmitTest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Test ✅
          </button>
        </>
      )}
    </div>
  );
}

export default Exam;
