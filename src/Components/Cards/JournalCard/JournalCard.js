import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import './JournalCard.css'
import { CardActions } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import DeleteJournalModal from '../../Modals/DeleteJournal/DeleteJournal';
import EditJournal from '../../Modals/EditJournal/EditJournal';
export default function JournalCard({
  index=0,
  pos=0,
  name="Arindam Dutta",
  mail="dariindam507@gmail.com",
  address="43/31, Nabapally 22 bigha, kolkata - 700104",
  contacts=["+918282826909","+918282826909"],
  isPage = false
}) {
  const navigate = useNavigate()
  return (
    <Card className='c-pointer' sx={{ minWidth: 275 }}>
      <CardContent onClick={()=> !isPage && navigate('/journal/'+(pos))}>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">{mail}
        <a href={"mailto:"+mail}>
        <MailOutlineIcon /></a>
        </Typography>
        <Typography variant="body2">
          {address}
        </Typography>
        <Typography variant="body2">
          {contacts.map((item,index)=><div key={index}>{item}
          <a href={"tel:"+item}><CallIcon /></a>
          </div>)}
        </Typography>
      </CardContent>
      {/* {isPage &&  */}
      <CardActions>
        <EditJournal 
          index={index}
          pos={pos}
        />
        <DeleteJournalModal pos={pos} index={index} />
      </CardActions>
      {/* // } */}
    </Card>
  );
}
