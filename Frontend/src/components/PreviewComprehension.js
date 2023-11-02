import React, { useState, useEffect } from 'react';

const PreviewComprehension = () => {
  const [comprehensionData, setComprehensionData] = useState([]);

  useEffect(() => {
    async function fetchComprehensionFunction() {
      const data = await fetch("http://localhost:5000/api/get/comprehensions");
      const tempData = await data.json();
      console.log(tempData);
      setComprehensionData(tempData[0]);
    }

    fetchComprehensionFunction();
  }, []);

  return (

    <div className="w-full mx-auto mt-8 p-4 bg-white shadow-lg shadow-slate-700 rounded-md">
        <p className='text-center font-semibold underline mb-4'>Comprehension Test</p>
      <p className="text-sm mb-4">{comprehensionData?.comprehension}</p>
      <form>
        {comprehensionData?.mcqs ? (
          comprehensionData.mcqs.map((mcq, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-sm mb-2">{index+1}. {mcq?.question}</p>
              {mcq?.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center mb-2">
                  <input type="radio" name={`mcq-${index}`} value={option} className="mr-2 text-xs" />
                  {option}
                </label>
              ))}
            </div>
          ))
        ) : (
          <p>Loading comprehension data...</p>
        )}
      </form>
    </div>
  );
};

export default PreviewComprehension;
