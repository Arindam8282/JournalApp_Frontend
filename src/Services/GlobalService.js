import {  useState } from "react";
import API from "../APIHandler/API";
import GlobalContext from "./GlobalContext";

const GlobalService = ({children}) => {
  const [Journals,setJournals] = useState([]);
  const [Journal,setJournal] = useState(null);
  const [journalLoader,setJournalLoader] = useState(false)
  const [searchJournal,setSearchJournal] = useState({
    result:[],
    loader:false
  });
  const [searchText,setSearchText] = useState('')
  const [searchTimeout,setSearchTimeout] = useState(setTimeout(()=>{},1000))

  // search journals
  const onSearchType = (value)=>{
    clearTimeout(searchTimeout)
    setSearchText(value)
    if(value.trim('')!=='') {
      setSearchJournal({...searchJournal,loader:true}) 
      setSearchTimeout(setTimeout(()=>searchJournals(value),1000))    
    }
  }
  const searchJournals = (value)=> {
    API({
      uri:'/contact/search?all='+value,
      type:'GET',
      withCredential: true,
      onSuccess:(res)=> {
        console.log(res)
        setSearchJournal({...searchJournal,
          result:res,
          loader:false
        }) 
      },
      onFail:(error)=> {
        console.log(error)
        setSearchJournal({...searchJournal,
          loader:false,
        }) 
      }
    })
  } 
  
  // create a journal 
  const createJournal = (jdata,onCreate) =>{
    setJournalLoader(true)
    API({
      uri:'/contact/create',
      type:'POST',
      withCredential: true,
      body: jdata,      
      onSuccess:(res)=> {
        console.log(res)
        setJournals([res,...Journals])
        setJournalLoader(false)
        onCreate()
      },
      onFail:(error)=> {
        console.log(error)
        setJournalLoader(false)
      }
    })
  }

  // load all journals
  const getJournals = ()=>{
    setJournalLoader(true)
    API({
      uri:'/contact/all',
      type:'GET',
      withCredential: true,
      
      onSuccess:(res)=> {
        console.log(res)
        setJournals(res)
        setJournalLoader(false)
      },
      onFail:(error)=> {
        console.log(error)
        setJournalLoader(false)
      }
    })
  }

  //edit a journal
  const editJournal = (pos,jdata,index) => {
    let arr = Journals
    arr[index] = jdata
    setJournalLoader(true)
    API({
      uri:'/contact/edit/'+pos,
      type:'PUT',
      body: jdata,
      withCredential: true,      
      onSuccess:(res)=> {
        setJournal(jdata)
        setJournals(arr)
        setJournalLoader(false)
      },
      onFail:(error)=> {
        console.log(error)
        setJournalLoader(false)
      }
    })
  }

  // delete a journal
  const deleteJournal = (pos,index,onDelete)=> {
    setJournalLoader(true)
    API({
      uri:'/contact/delete/'+pos,
      type:'DELETE',
      withCredential: true,      
      onSuccess:(res)=> {
        setJournals([...Journals.filter((item,ind) => item._id!==pos)])
        setJournalLoader(false)
        onDelete()
      },
      onFail:(error)=> {
        console.log(error)
        setJournalLoader(false)
      }
    })

  }

  // get a journal
  const getJournal = (pos,onFail) => {
    setJournalLoader(true)
    API({
      uri:'/contact/'+pos,
      type:'GET',
      withCredential: true,      
      onSuccess:(res)=> {
        console.log('error from gets',res)
        setJournal(res)
        setJournalLoader(false)
      },
      onFail:(error)=> {
        console.log('error from gete',error)
        setJournalLoader(false)
        onFail()
      }
    })
  }

  return ( 
    <div>
      <GlobalContext.Provider value={{
        searchText,
        searchJournal,
        Journal,
        Journals,
        journalLoader,
        createJournal,
        editJournal,
        deleteJournal,
        getJournal,
        onSearchType,
        getJournals,
        setJournal
      }}>
          {children}
      </GlobalContext.Provider>
    </div> 
  );
}
 
export default GlobalService;