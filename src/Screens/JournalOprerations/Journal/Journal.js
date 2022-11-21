import { Button } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JournalCard from '../../../Components/Cards/JournalCard/JournalCard';
import GlobalContext from '../../../Services/GlobalContext';
import './Journal.css'

const Journal = () => {
  const {pos} = useParams();
  const {getJournal,Journal} = useContext(GlobalContext);
  const navigate = useNavigate()
  useEffect(()=>{
    getJournal(pos,()=>navigate('/'))
  },[]) // eslint-disable-line
  return ( 
    <div className='Journal'>
      {(pos===Journal?._id && Journal!== null) ? <div>
        <JournalCard 
          pos={pos}
          name={Journal.firstName+" "+Journal.lastName}
          mail={Journal.email}
          contacts={Journal.phoneNumbers}
          address={Journal.address}
          isPage={true}
        />
      </div>:
      <div>Loading...</div>}
      <Button variant='contained' onClick={()=>navigate('/')}>Back</Button>
    </div> 
  );
}
 
export default Journal;