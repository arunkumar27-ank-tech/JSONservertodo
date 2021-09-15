import {
  BrowserRouter as Router,
  Route
  
} from "react-router-dom";
import './App.css';
import Header from './componenets/Header';
import Notespagelist from './pages/notespagelist';
import Notepage from './pages/Notepage';


function App() {
  return ( 
    <Router>
    <div className="container dark">
      <div className='app'>
      < Header />
      <Route path='/' exact component ={Notespagelist}/>
      <Route path='/note/:id' exact component ={Notepage}/>
      </div>
    </div>
    </Router>
  );
}

export default App;
