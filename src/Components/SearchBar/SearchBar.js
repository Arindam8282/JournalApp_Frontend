import { TextField } from "@mui/material";
import { useContext } from "react";
import GlobalContext from "../../Services/GlobalContext";

const SearchBar = () => {
  const { onSearchType,searchText  } = useContext(GlobalContext)
  return ( 
    <div className="SearchBar">
      <TextField value={searchText} onChange={(e)=>onSearchType(e.target.value)} fullWidth placeholder="Search Journals by name or phonenumber"  />
    </div> 
  );
}
 
export default SearchBar;