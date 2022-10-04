import logo from '../img/logo.png';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Button, Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">New <br/>Beginnings</h1>
        <div className='box'>
            <p style={{color: 'black'}}>Our mission is to help formerly incarcerated individuals secure employment, establish strong relationships with mentors, and gain access to local resources in order to ease their transition from prison.</p>
        </div>
      </header>
      <body>
    <div className='features'>
        <Container>
            <Row>
                <Col sm="4">
                    <FontAwesomeIcon icon={solid('user-secret')} />
                    .col-6 .col-sm-4
                </Col>
                <Col sm="4">.col-6 .col-sm-4</Col>
                <Col sm="4">.col-sm-4</Col>
            </Row>
        </Container>
    </div>     
      </body>
    </div>
  );
}

export default App;
