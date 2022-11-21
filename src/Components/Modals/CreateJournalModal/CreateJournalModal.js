import * as React from 'react';
import JournalForm from '../../Forms/JournalForm/JournalForm';
import './CreateJournal.css'
import GlobalContext from '../../../Services/GlobalContext';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const CreateJournalModal = () => {
    const { createJournal } = React.useContext(GlobalContext)
    const [open,setOpen] = React.useState(false)

    const onCreate = (data,close) => {
      createJournal(data)
      close()
    }

  return( 
    <div>
      <IconButton onClick={()=>setOpen(true)} style={{position:'fixed',bottom:20,right:20,border:'2px solid green',borderRadius:'50%'}} variant="outlined" aria-label="delete" size="large" color="success">
            <AddIcon fontSize="inherit" />
      </IconButton>
      {open && <JournalForm 
        open={open}
        handleClose={()=>setOpen(false)}
        onConfirm={onCreate}
      />}
    </div>
  );
}

export default CreateJournalModal;