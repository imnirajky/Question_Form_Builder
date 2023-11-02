import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const PreviewCloze = () => {
  const [options, setOptions] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/get/cloze")
      .then((response) => response.json())
      .then((responseData) => {
        if (Array.isArray(responseData) && responseData.length > 0) {
          const firstData = responseData[0];
          if (firstData.options && Array.isArray(firstData.options)) {
            setOptions(firstData.options);
          }
          if (firstData.sentence) {
            const sentenceWords = firstData.sentence.split(/\s+/);
            setWords(sentenceWords);
          }
        } 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function onDragEnd(result) {
    if (!result.destination) {
      return; 
    }

    const tempWords = result.destination.droppableId?.split('-');
    let destinationIndex = parseInt(tempWords[1]);
    let sourceIndex = result.source.index;
    

    let sourceDroppableId = result.source.droppableId;
    let destinationDroppableId = tempWords[0];

    if (destinationDroppableId === sourceDroppableId) {
      return; 
    }
    
    const updatedOptionList = [...options];
    const [draggedItem] = updatedOptionList.splice(sourceIndex, 1);
    setOptions(updatedOptionList);

    const wordList = [...words];
    console.log(wordList)
    wordList[destinationIndex] = draggedItem;
    setWords(wordList);
}


  return (
    <div className="w-full h-auto border-2 shadow-md shadow-rose-700 rounded m-8 p-5 flex flex-col items-center">
      <p className="font-semibold mb-10 underline">Fill in the blanks</p>
      <DragDropContext onDragEnd={onDragEnd}>
        
        <div className="flex justify-evenly mb-4 mx-2">
        {words.map((item, index) => (
        <Droppable key={index} droppableId={`droppable-${index}`}>
        {(provided) => (
        <div className="font-semibold text-2xl ml-3"
          ref={provided.innerRef}
          {...provided.droppableProps}
          index={index}
        >
          {(item === '____') ? <div className='bg-slate-600 w-14 h-10 rounded-md text-white text-center'>___</div> : item}
          
          {provided.placeholder}
        </div>
        )}
        </Droppable>
        ))}
        </div>

        <Droppable droppableId="options">
          {(provided) => (
            <div className="flex flex-row justify-evenly mt-3" ref={provided.innerRef} {...provided.droppableProps}>
              {options.map((item, index) => (
                <Draggable draggableId={index.toString()} index={index} key={index}>
                  {(provided) => (
                    <div
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      className="rounded-md mx-1 p-1 bg-pink-700 text-white"
                    >
                      <div>{item}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PreviewCloze;

