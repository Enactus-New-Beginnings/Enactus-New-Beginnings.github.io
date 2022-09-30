import logo from '../img/logo.png';
import '../styles/Home.css';
import { Button } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">New <br/>Beginnings</h1>
        <p style={{width:'50%', color: 'black'}}>Our mission is to help formerly incarcerated individuals secure employment, establish strong relationships with mentors, and gain access to local resources in order to ease their transition from prison.</p>
      </header>
    </div>
  );
}

export default App;
