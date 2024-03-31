import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import RouteContainer from './route/Route';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <div className="App">
      
        <RouteContainer />

    </div>
  );
}

export default App;
