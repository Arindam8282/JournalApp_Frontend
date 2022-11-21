import { Button } from "@mui/material";
import { useContext, useState } from "react";
import GlobalContext from "../../../Services/GlobalContext";
import JournalForm from "../../Forms/JournalForm/JournalForm";

const EditJournal = ({
  index=0,
  pos = 0
}) => {

  const { 
    getJournal,
    Journal,
    journalLoader, 
    editJournal 
  } = useContext(GlobalContext)

  const [open,setOpen] = useState(false)

  const onEditClick = ()=> {
    setOpen(true)
    getJournal(pos)
  }
  const onEditSave = (data)=> {
    editJournal(pos,data,index)
  }
  return ( 
    <div>
      <Button onClick={onEditClick} variant='outlined' color='secondary' size="medium">
            Edit
      </Button>
        {open && <JournalForm 
          open={open}
          handleClose={()=>setOpen(false)}
          isEditable={true}
          Journal={Journal}
          journalLoader={journalLoader}
          onConfirm={onEditSave}
        />}
    </div> 
  );
}
 
export default EditJournal;