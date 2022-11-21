import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import Card from '@mui/material/Card';
const Header = () => {
  return ( 
    <Card className="Header">
      <div className='h-lower-sec'>
        <SearchBar />
      </div>
    </Card> 
  );
}
 
export default Header;