import Header from "../../Components/Header/Header";
import JournalList from "../../Components/JournalList/JournalList";
import CreateJournalModal from "../../Components/Modals/CreateJournalModal/CreateJournalModal";

const Home = () => {
  return (  
    <div>
      <Header />
      <JournalList />
      <CreateJournalModal />
    </div> 
  );
}
 
export default Home;