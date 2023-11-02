import React, {useEffect, useState} from 'react';
import PreviewCategorize from './PreviewCategorize';


const Preview = () => {
  const [listOfCategorize, setListOfCategorize] = useState([]);

  useEffect(()=>{
    async function fetchCategorize(){
    const data = await fetch("http://localhost:5000/api/get/categorize");
    const categorize = await data.json();
    setListOfCategorize(categorize.data);
    console.log(categorize)
    }

    fetchCategorize();
  }, []);



  return (
    <div className='w-full'>
      {
        listOfCategorize.map((category, index) => <PreviewCategorize index={index} category={category}/>)
      }
    </div>
  );
}

export default Preview;
