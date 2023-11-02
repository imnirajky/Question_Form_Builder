import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import Item from './Item';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
 
const CategoryInput = () => {
  const [categories, setCategories] = useState(["", ""]);
  const [description, setDescription] = useState("");

  const handleInputChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;

    if (value.length > 0 && index + 1 === categories.length) {
      newCategories[index + 1] = "";
    }

    setCategories(newCategories);
  };

  const removeCategory = (index) => {
    if (categories.length <= 2) {
      return;
    }
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

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
    setCategories(reorderedData);
  }

  function reorderData(sourceIndex, destinationIndex) {
    const reorderedData = [...categories];
    const [movedItem] = reorderedData.splice(sourceIndex, 1);
    reorderedData.splice(destinationIndex, 0, movedItem);
    return reorderedData;
  }

  return (
    <div className="h-fit w-4/6 p-4 shadow-emerald-900 shadow-lg rounded-lg mb-7 border-b-2 border-l-2">
      <p className="font-semibold mb-2">Categorize Test</p>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="min-w-[150px] p-1 border border-gray-300 rounded mb-1"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <p className="font-semibold mb-1">Categories</p>
        <Droppable droppableId="Category">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <Draggable draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="p-2"
                      >
                         <DragIndicatorIcon />
                        <input
                          type="text"
                          placeholder={`Category ${index + 1}`}
                          value={category}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          className="outline-none min-w-[150px] p-1 border border-gray-300 rounded"
                        />
                      </div>
                    )}
                  </Draggable>
                  {index + 1 < categories.length ? (
                    <DeleteIcon
                      theme={theme}
                      onClick={() => removeCategory(index)}
                      className="cursor-pointer text-gray-500 hover:text-red-500"
                    />
                  ) : null}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Item options={categories} description={description} />
      </DragDropContext>
    </div>
  );
};

export default CategoryInput;


