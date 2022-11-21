import { useContext, useEffect } from 'react';
import GlobalContext from '../../Services/GlobalContext';
import JournalCard from '../Cards/JournalCard/JournalCard';
import './JournalList.css'
const JournalList = () => {
  const { Journals,searchJournal,getJournals,searchText } = useContext(GlobalContext)  
  useEffect(()=>{
    getJournals()
  },[]) // eslint-disable-line
  return ( 
    <div className='JournalList'>
      {searchText.trim('')!=='' ? 
        !searchJournal.loader ?
        searchJournal.result.length > 0 ?
            searchJournal.result.map((item,index)=>
                  <JournalCard 
                    index={index}
                    key={item._id}
                    pos={item._id}
                    name={item.firstName+" "+item.lastName}
                    mail={item.email}
                    address={item.address}
                    contacts={item.phoneNumbers}
                  />
                ) :<div>No search result</div> : <>Searching...</>
                
                : Journals.length > 0 ?
                  Journals.map((item,index)=>
                    <JournalCard 
                      index={index}
                      key={item._id}
                      pos={item._id}
                      name={item.firstName+" "+item.lastName}
                      mail={item.email}
                      address={item.address}
                      contacts={item.phoneNumbers}
                    />
                  ): <div>empty journals add one</div> 
      }
    </div> 
  );
}
 
export default JournalList;