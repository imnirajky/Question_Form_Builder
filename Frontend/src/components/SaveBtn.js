import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

function SaveButton({ handleSave }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = async () => {
    await handleSave(); 
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 1000);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={handleSaveClick}
      >
        Save
      </Button>
      {isSaved && <span>&#10004; Saved</span>}
    </div>
  );
}

export default SaveButton;
