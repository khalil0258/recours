import './App.css';
 
import RouteContainer from './route/Route';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
 
import { useState } from 'react';
 

function App() {
  const [openBar, setOpenBar] = useState(false);
  
  const sidebarOpener = (value) => {
    setOpenBar(value);
  };


  return (
    <div className="App">
     <div className='app_container'>
      
      <div className='main_container'>
         
        <RouteContainer/>
      </div>
     </div>
      

    </div>
  );
}

export default App;
