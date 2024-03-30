import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import RouteContainer from './route/Route';

function App() {
  return (
    <div className="App ">
        {/* <RouteContainer /> */}
        <div className='barsHolder'>
<SideBar/>
        <Header/>
        </div>
    </div>
  );
}

export default App;
