import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SaveButton from './SaveBtn';

const Items = ({options, description}) => {
  const [items, setItems] = useState([{ category: '', items: '' }]);

  const saveCategorize = () => {
    const reorderedData = [...items];
    const nonEmptyItems = reorderedData.filter(obj => obj && Object.keys(obj).length > 0);
    const transformedData = {};
   
    nonEmptyItems.forEach((entry) => {
      const { category, items } = entry;
    
      if (!transformedData[category]) {
        transformedData[category] = [items];
      } else {
        transformedData[category].push(items);
      }
    });

    const data = {};
    data.description = description;
    data.Categorize = transformedData;
    fetch("http://localhost:5000/api/save/categorize", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }


  const handleInputChange = (index, value, requiredAction) => {
    // console.log(items);
    const newItems = [...items];
    if(requiredAction === 'itemName'){
      newItems[index].items = value;
      if(value.length>0 && index+1 == items.length){
        newItems[index+1] = {};
       }
    }else{
      newItems[index].category = value;
    }

     setItems(newItems);
  }

  const removeItems = (index) => {
    if(items.length<=2){
      return;
    }
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }


  const theme = createTheme({
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: 'gray',
            fontSize: '24px', 
            transition: 'color 0.3s, font-size 0.3s', 
            '&:hover': {
              color: '#801313',
              fontSize: '28px',
            },
          },
        },
      },
    },
  });
  
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const reorderedData = reorderData(result.source.index, result.destination.index);  
    setItems(reorderedData);
  }

  function reorderData(sourceIndex, destinationIndex) {
    const reorderedData = [...items];
    const nonEmptyItems = reorderedData.filter(obj => Object.keys(obj).length > 0);
    const [movedItem] = nonEmptyItems.splice(sourceIndex, 1);
    nonEmptyItems.splice(destinationIndex, 0, movedItem);
    
    nonEmptyItems.push({});
  
    return nonEmptyItems;
  }

  return (
    <div className='border-t-2 mt-2'>
    <div className='flex justify-between'>
      <span className='font-semibold mb-2'>Type Items and choose Belongs to</span>
    </div>
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="Items">
      {
        (provided) => (
    <div
    ref={provided.innerRef}
    {...provided.droppableProps}
    >
    {items.map((eachItem, index) => (
      <Draggable draggableId={index.toString()} index={index}>
        {
          (provided) => (
        <div key={index} className="flex"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
        <DragIndicatorIcon />
        <div>
        <input
          className="min-w-[150px] p-1 border border-gray-300 rounded mb-1 outline-none"
          type="text"
          placeholder={`Item ${index + 1}`}
          value={eachItem?.items}
          onChange={(e) => handleInputChange(index, e.target.value, 'itemName')}
        />
        </div>
        <div className='flex justify-center'>
            <select className="min-w-[80px] p-1 border border-gray-300 rounded mb-1 outline-none mx-2" onChange={(e) => handleInputChange(index, e.target.value, 'categoryOption')}>
            <option className="min-w-[80px] p-1 border border-gray-300 rounded mb-1">Choose Category</option>
                {
                    options.map((option, index) => (
                    <option className="min-w-[80px] p-1 border border-gray-300 rounded mb-1 outline-none" key={index} value={option}>{option}</option>
                    ))
                } 
            </select>
        </div>
        {(index+1 < items.length) ? <DeleteIcon theme={theme} onClick={() => removeItems(index)}/> : null}
        </div>
          )
        }
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
        )}
    </Droppable>
    </DragDropContext>

      <SaveButton handleSave={saveCategorize} />
    </div>
  );
}


export default Items;

