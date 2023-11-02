import React, { useState } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

const PreviewCategorize = ({ category, index }) => {
  const allItems = Object.values(category);
  const description = allItems[1];
  const data = allItems[2];
  const listOfCategory = Object.keys(data);
  const listOfItems = Object.values(data);
  const itemsListInitial = [].concat(...listOfItems);

  const [itemsList, setItemsList] = useState(itemsListInitial);
  const [categories, setCategories] = useState(listOfCategory);
  const [itemDrop, setItemDrop] = useState([]);
  

  // console.log(itemDrop); 
  
  const addElementToItemDrop = (rowIndex, value) => {
  setItemDrop((prevItemDrop) => {
    const newArray = [...prevItemDrop];

    if (!newArray[rowIndex]) {
      newArray[rowIndex] = [];
    }

    let colIndex = newArray[rowIndex].length;
    newArray[rowIndex][colIndex] = value;

    return newArray;
  });
  };


  function onDragEnd(result) {
    if (!result.destination) {
      return; 
    }

    const words = result.destination.droppableId?.split('-');
    let destinationIndex = parseInt(words[1]);
    let sourceIndex = result.source.index;
    

    let sourceDroppableId = result.source.droppableId;
    let destinationDroppableId = words[0];

    if (destinationDroppableId === sourceDroppableId) {
      return; 
    }
    
    const updatedItemsList = [...itemsList];
    const [draggedItem] = updatedItemsList.splice(sourceIndex, 1);
    setItemsList(updatedItemsList);
    addElementToItemDrop(destinationIndex, draggedItem);
}

  return (
    <div className="w-full h-auto flex flex-col items-center">
          <DragDropContext onDragEnd={onDragEnd}>
      <div className=" w-fit p-2 h-fit border-2 border-slate-300 shadow-lg shadow-slate-700 rounded-md">
        <p className='font-semibold border-b-2'>{index + 1}. {description}</p>
        <div className="flex flex-col">
          <Droppable droppableId='itemLists'>
            {(provided) => (
              <div className="flex flex-row justify-evenly mt-3" ref={provided.innerRef} {...provided.droppableProps}>
                {itemsList.map((item, index) => (
                  <Draggable draggableId={index.toString()} index={index} key={index}>
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="rounded-md shadow-sm shadow-slate-400 mx-1 p-1 bg-slate-200"
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

<div className='flex m-3 mt-4 justify-evenly w-full'>
    {categories.map((category, categoryIndex) => (
    <Droppable key={categoryIndex} droppableId={`categoryList-${categoryIndex}`} index={categoryIndex}>
    {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps} index={categoryIndex}>
        <div className='rounded-md shadow-sm shadow-slate-400 mx-2 p-2 bg-teal-900 text-white text-center'>{category}</div>
        <div className='min-h-[100px] min-w-[150px] w-fit h-fit bg-teal-700 rounded-md mt-4 p-1 flex flex-col'>
          {
            itemDrop[categoryIndex] && itemDrop[categoryIndex].map((itemDropping, index) => (
              <div key={index} className="rounded-md shadow-sm mx-1 p-1 text-center font-semibold text-white bg-rose-700 m-1">
                {itemDropping}
              </div>
            ))
            // itemDrop?.map((itemDropping, index) => (<div key={index} className="rounded-md shadow-sm mx-1 p-1 bg-rose-700">{itemDropping}</div>))
          }
        </div>
        {provided.placeholder}
      </div>
    )}
    </Droppable>
    ))}
</div>

        </div>
      </div>
    </DragDropContext>

    </div>
  );
}

export default PreviewCategorize;                