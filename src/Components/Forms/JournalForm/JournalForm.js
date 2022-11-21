import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, IconButton, TextField } from "@mui/material";
import './JournalForm.css'

const JournalForm = ({
  open = false,
  handleClose = ()=> {},
  isEditable = false,
  Journal = null,
  journalLoader = false,
  onConfirm = ()=> {}
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  React.useEffect(()=>{
    if(isEditable){setFormData(Journal)}
  },[Journal]) // eslint-disable-line

  const [formData,setFormData] = React.useState({
    firstName:  '',
    lastName: '',
    email: '',
    phoneNumbers: [''],
    address: ''
  });


  console.log('prop',formData)

  const handleFormData = (obj) => {
    setFormData({...formData,...obj})
  }
  

  const toggleNumber = ()=>{
    if(formData?.phoneNumbers.length>0 && formData?.phoneNumbers.length<3)
      setFormData({...formData,phoneNumbers:[...formData.phoneNumbers,'']})
    if(formData?.phoneNumbers.length>1 && formData?.phoneNumbers.length<3)
      setFormData({...formData,phoneNumbers:[...formData.phoneNumbers.filter((item,index)=> index!==1)]})
  }

  return ( 
    <div>   
      <Modal
        style={{overflow:'scroll'}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {  (isEditable ? Journal?._id!==formData?._id || !journalLoader : !journalLoader)   ?   <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                { isEditable ? 'Update' : 'New'} Journal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className='c-form-wrapper'>
                <TextField 
                  onChange={(e)=>{
                    handleFormData({"firstName":e.target.value})
                  }} 
                  value={formData?.firstName} 
                  type={'text'} 
                  placeholder={'Enter FirstName'}
                  fullWidth
                />
                <TextField 
                  onChange={(e)=>{
                    handleFormData({"lastName":e.target.value})
                  }} 
                  value={formData?.lastName} 
                  type={'text'}               
                  placeholder={'Enter LastName'}
                  fullWidth
                />
                <TextField onChange={(e)=>{
                  handleFormData({"email":e.target.value})
                }} value={formData?.email} type={'email'} 
                placeholder={'Enter Email'}
                fullWidth

                />
                {formData?.phoneNumbers.map((number,index)=> 
                  <div style={{display:'flex',alignItems:'center',gap:'5px',flexWrap:'nowrap'}} key={index}>
                    <TextField 
                      onChange={(e)=>{
                        let arr = formData?.phoneNumbers
                        arr[index] = e.target.value
                        handleFormData({"phoneNumbers":[...arr]})
                      }} value={number} type={'number'} 
                      placeholder={'Enter Phone '+(index+1)}
                      fullWidth
                    />
                    {(index===(formData?.phoneNumbers.length-1)) &&
                      <IconButton onClick={toggleNumber} style={{border:formData?.phoneNumbers.length>1?'2px solid red':'2px solid green',borderRadius:'50%'}} variant="outlined" aria-label="delete" size="small" color={formData?.phoneNumbers.length>1? "error":"success"}>
                        {formData?.phoneNumbers.length>1? <RemoveIcon fontSize='inherit' /> : <AddIcon fontSize="inherit" />}
                      </IconButton>
                    }
                  </div>) 
                }
                <TextField onChange={(e)=>{
                  handleFormData({"address":e.target.value})
                }} value={formData?.address} type={'text'} 
                placeholder={'Enter address'}
                fullWidth
                />
                </div>
              </Typography>
              
            <div>
              <Button onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={()=>{
                onConfirm(formData,handleClose)
              }}>
                { !isEditable ? 'Create' : 'Edit'}
              </Button>          
            </div>
          </div> : <div>Loading...</div>}
        </Box>
      </Modal>
    </div>
  );
}

export default JournalForm;