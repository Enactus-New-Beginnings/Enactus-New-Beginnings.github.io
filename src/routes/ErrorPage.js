import logo from '../img/logo.png';
import { Link } from "react-router-dom";

import '../styles/Home.css';
import '../styles/Error.css'

function ErrorPage() {
  return (
    <div className="App">
      <header className="Error-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="error-title">Sorry :(</h1>
        <div className='error-box'>
            <p style={{color: 'white'}}>Looks like this page does not exist. <Link to="/">Click here</Link> to go back to the home page, or <a href="mailto:fy101@scarletmail.rutgers.edu">contact us</a> if you believe something should be here.</p>
        </div>
      </header>
    </div>
  );
}

export default ErrorPage;
