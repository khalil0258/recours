import './App.css';
 
import RouteContainer from './route/Route';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
 
import {   useState } from 'react';
import Spinner from './components/Spinner';
import { useSelector } from 'react-redux';
 
 
 
 

function App() {
 
  const loading = useSelector(state => state.auth.loading);
  
 

  return (
    <div className="App">
     {loading&&<Spinner/>}
        <RouteContainer/>
     
     </div>
      

   
  );
}

export default App;
