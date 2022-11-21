import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Journal from "./Screens/JournalOprerations/Journal/Journal";

const Router = () => {
  return ( 
    <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/journal/:pos" element={<Journal/>} />
      </Routes>
    </BrowserRouter>
    </> 
  );
}
 
export default Router;